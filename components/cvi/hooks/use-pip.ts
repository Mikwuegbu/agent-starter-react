import { useState, useEffect, useCallback, RefObject } from 'react';

export function usePIP(videoRef: RefObject<HTMLVideoElement>) {
  const [isPipSupported, setIsPipSupported] = useState(false);
  const [isPipActive, setIsPipActive] = useState(false);

  useEffect(() => {
    setIsPipSupported('pictureInPictureEnabled' in document && document.pictureInPictureEnabled);
  }, []);

  const enterPip = useCallback(async () => {
    if (!isPipSupported || !videoRef.current || document.pictureInPictureElement) {
      return;
    }

    const video = videoRef.current;

    const requestPip = async () => {
      try {
        await video.requestPictureInPicture();
      } catch (error) {
        console.error("PiP error on enter:", error);
      }
    };

    if (video.readyState >= 1) { // HAVE_METADATA
      requestPip();
    } else {
      video.addEventListener('loadedmetadata', requestPip, { once: true });
    }
  }, [isPipSupported, videoRef]);

  const togglePip = useCallback(async () => {
    if (!isPipSupported || !videoRef.current) {
      return;
    }

    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await videoRef.current.requestPictureInPicture();
      }
    } catch (error) {
      console.error("PiP error:", error);
    }
  }, [isPipSupported, videoRef]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const onEnterPip = () => setIsPipActive(true);
    const onLeavePip = () => setIsPipActive(false);

    // Check if we are already in PiP mode when the component mounts
    if (document.pictureInPictureElement === videoElement) {
      setIsPipActive(true);
    }

    videoElement.addEventListener('enterpictureinpicture', onEnterPip);
    videoElement.addEventListener('leavepictureinpicture', onLeavePip);

    return () => {
      videoElement.removeEventListener('enterpictureinpicture', onEnterPip);
      videoElement.removeEventListener('leavepictureinpicture', onLeavePip);
    };
  }, [videoRef]);

  return { isPipSupported, isPipActive, togglePip, enterPip };
}
