import React, { useRef, useEffect } from 'react';
import { GreenScreenStream, GreenScreenMethod, VideoResolution } from '@virtualscenery/greenscreenstream';
import { useIsMobile } from '@/hooks/use-mobile';
import { useConversation } from '@/context/ConversationContext';

interface ChromaKeyOverlayProps {
  videoElement: HTMLVideoElement | null;
}

export const ChromaKeyOverlay: React.FC<ChromaKeyOverlayProps> = ({ videoElement }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const greenScreenStreamRef = useRef<GreenScreenStream | null>(null);
  const initializedRef = useRef(false);
  const colorDetectionIntervalRef = useRef<number | null>(null);
  const { background, greenscreenEnabled } = useConversation();

  const isMobile = useIsMobile();

  // Effect to handle video element changes
  useEffect(() => {
    const initializeGreenScreen = async () => {
      // Use the passed videoElement or the ref, whichever is available
      const targetVideoElement = videoElement || videoRef.current;
      
      // Check if we have a valid video element and haven't initialized yet
      if (!targetVideoElement || initializedRef.current) return;
      
      // Check if the video element has a valid srcObject with video tracks
      const srcObject = targetVideoElement.srcObject;
      console.log('Video element srcObject:', srcObject);
      
      if (!srcObject) {
        console.warn('No srcObject found on video element');
        // Retry after a short delay if no srcObject is available yet
        setTimeout(initializeGreenScreen, 200);
        return;
      }
      
      const videoTracks = (srcObject as MediaStream).getVideoTracks();
      console.log('Video tracks:', videoTracks);
      
      if (videoTracks.length === 0) {
        console.warn('No video tracks found in srcObject');
        // Retry after a short delay if no tracks are available yet
        setTimeout(initializeGreenScreen, 200);
        return;
      }
      
      try {
        initializedRef.current = true;
        
        const track = videoTracks[0];
        
        // Create a new GreenScreenStream instance
        const greenScreenStream = new GreenScreenStream(
          GreenScreenMethod.VirtualBackgroundUsingGreenScreen, 
          VideoResolution.SD, 
        );
        
        greenScreenStreamRef.current = greenScreenStream;
        
        // Add the video track to the GreenScreenStream
        await greenScreenStream.addVideoTrack(track);
        
        // Initialize with the provided image as background
        console.log('Initializing with image background:', background.value);
        
        // Validate that background.value is a valid image URL
        if (background.value && (background.value.startsWith('http') || background.value.startsWith('/') || background.value.startsWith('data:image'))) {
          console.log('Using dynamic background:', background.value);
          await greenScreenStream.initialize(background.value);
        } else {
          // Fallback to default background if invalid
          console.warn('Invalid background URL, using default');
        }

        // Set initial chroma key for green screen detection
        const chromaKey = {
          r: 15 / 255,
          g: 253 / 255,
          b: 147 / 255,
        };
        greenScreenStream.setChromaKey(chromaKey.r, chromaKey.g, chromaKey.b);

        // Set advanced mask settings to reduce green spill
        greenScreenStream.setMaskRange(0.2, 0.40);
        greenScreenStream.start(60);

        console.log("GreenScreenStream started", greenScreenStream);
        
        // Set the processed stream as the source for our video element
        if (videoRef.current) {
          const processedStream = greenScreenStream.captureStream(25);
          console.log('Processed stream tracks:', processedStream.getTracks());
          console.log('Processed stream active:', processedStream.active);
          videoRef.current.srcObject = processedStream;
          console.log('Video element srcObject set');
        }
        
        // Store reference to greenScreenStream for color detection
        greenScreenStreamRef.current = greenScreenStream;
        
        // Log the background config for debugging
        console.log('Background config:', background);
        console.log('Video tracks count:', videoTracks.length);
        console.log('Video track ready state:', track.readyState);
        console.log('Video track label:', track.label);
        
        console.log("GreenScreenStream initialized with background type:", background.type);
      } catch (error) {
        console.error('Error initializing GreenScreenStream:', error);
        initializedRef.current = false; // Reset on error so we can retry
      }
    };

    // Start initialization
    initializeGreenScreen();

    // Cleanup function
    return () => {
      initializedRef.current = false;
      if (colorDetectionIntervalRef.current) {
        clearInterval(colorDetectionIntervalRef.current);
      }
      if (greenScreenStreamRef.current) {
        greenScreenStreamRef.current.stop();
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [videoElement]);


  useEffect(() => {
    if(background && greenScreenStreamRef.current){
      console.log("background changes", background)
      greenScreenStreamRef.current.setBackground(background.value);
    }
  }, [background]);


  const containerStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  };


  const videoStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    ...(isMobile ? { objectFit: 'cover' } : {}),
    objectPosition: 'center',
  };


  if(!greenscreenEnabled){
    // No green screen on mobile
    return <></>
  }

  // Always render the component, even if videoElement is null initially
  // The ref will be attached to the video element and used for processing
  return (
    <div style={containerStyle}>
      <video 
        ref={videoRef} 
        style={videoStyle} 
        autoPlay 
        muted 
        playsInline 
        onLoadedData={() => console.log('Video loaded data')}
        onPlaying={() => console.log('Video is playing')}
        onError={(e) => console.error('Video error:', e)}
      />
    </div>
  );
};
