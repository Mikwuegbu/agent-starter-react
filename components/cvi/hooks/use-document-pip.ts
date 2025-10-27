import { useState, useEffect, useCallback, RefObject } from 'react';

export function useDocumentPIP(pipElementRef: RefObject<HTMLElement>) {
  const [isPipSupported, setIsPipSupported] = useState(false);
  const [isPipActive, setIsPipActive] = useState(false);
  const [pipWindow, setPipWindow] = useState<Window | null>(null);

  useEffect(() => {
    setIsPipSupported('documentPictureInPicture' in window);
  }, []);

  const copyStyles = useCallback((destination: Document) => {
    [...document.styleSheets].forEach((styleSheet) => {
      try {
        const cssRules = [...styleSheet.cssRules].map((rule) => rule.cssText).join('');
        const style = document.createElement('style');
        style.textContent = cssRules;
        destination.head.appendChild(style);
      } catch (e) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = styleSheet.type;
        link.media = styleSheet.media.mediaText;
        link.href = styleSheet.href;
        destination.head.appendChild(link);
      }
    });
  }, []);

    const enterPip = useCallback(async () => {
    if (!isPipSupported || !pipElementRef.current || (window as any).documentPictureInPicture.window) {
      return;
    }

    const pipContainer = pipElementRef.current;
    const originalParent = pipContainer.parentElement;

    const newPipWindow = await (window as any).documentPictureInPicture.requestWindow({
      width: pipContainer.scrollWidth,
      height: pipContainer.scrollHeight,
    });

    copyStyles(newPipWindow.document);
    newPipWindow.document.body.append(pipContainer);
    setPipWindow(newPipWindow);

    newPipWindow.addEventListener('pagehide', () => {
      if (originalParent) {
        originalParent.append(pipContainer);
      }
      setPipWindow(null);
    });
  }, [isPipSupported, pipElementRef, copyStyles]);

  const togglePip = useCallback(async () => {
    if ((window as any).documentPictureInPicture.window) {
      (window as any).documentPictureInPicture.window.close();
    } else {
      await enterPip();
    }
  }, [enterPip]);

  useEffect(() => {
    const handleEnter = () => setIsPipActive(true);
    const handleLeave = () => setIsPipActive(false);

    (window as any).documentPictureInPicture?.addEventListener('enter', handleEnter);

    return () => {
      (window as any).documentPictureInPicture?.removeEventListener('enter', handleEnter);
    };
  }, []);

  return { isPipSupported, isPipActive, togglePip, enterPip };
}
