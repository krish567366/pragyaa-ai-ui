"use client";

import React, { useCallback, useEffect, useState, createContext, useContext, useRef } from 'react';
import { useDeepgram } from './DeepgramContextProvider';

interface MicrophoneContextType {
  microphone: MediaStreamAudioSourceNode | null;
  processor: ScriptProcessorNode | null;
  microphoneAudioContext: AudioContext | null;
  microphoneState: number;
  setupMicrophone: () => Promise<void>;
  startMicrophone: () => void;
  stopMicrophone: () => void;
}

const MicrophoneContext = createContext<MicrophoneContextType | null>(null);

export const useMicrophone = () => {
  const context = useContext(MicrophoneContext);
  if (!context) {
    throw new Error('useMicrophone must be used within a MicrophoneContextProvider');
  }
  return context;
};

const MicrophoneContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [microphone, setMicrophone] = useState<MediaStreamAudioSourceNode | null>(null);
  const [processor, setProcessor] = useState<ScriptProcessorNode | null>(null);
  const [microphoneAudioContext, setMicrophoneAudioContext] = useState<AudioContext | null>(null);
  const [microphoneState, setMicrophoneState] = useState(0); // 0: not_set_up, 1: ready, 2: open, -1: error
  const { socket } = useDeepgram();
  const isCleaningUp = useRef(false);
  const isSettingUp = useRef(false);

  const cleanupAudioContext = useCallback(() => {
    if (isCleaningUp.current) {
      // console.log("[MicProvider] Cleanup already in progress, skipping...");
      return;
    }
    isCleaningUp.current = true;
    // console.log("[MicProvider] Starting cleanup of audio context...");

    if (microphone?.disconnect) {
      try { microphone.disconnect(); } catch (e) { console.warn("[MicProvider] Error disconnecting microphone node:", e); }
    }
    if (processor?.disconnect) {
      try { processor.disconnect(); } catch (e) { console.warn("[MicProvider] Error disconnecting processor node:", e); }
    }
    
    if (microphoneAudioContext && microphoneAudioContext.state !== 'closed') {
      // console.log("[MicProvider] Closing AudioContext. Current state:", microphoneAudioContext.state);
      microphoneAudioContext.close().catch(e => console.warn("[MicProvider] Error closing AudioContext:", e));
    }

    setMicrophone(null);
    setProcessor(null);
    setMicrophoneAudioContext(null);
    setMicrophoneState(0); // Reset to not_set_up
    // console.log("[MicProvider] Audio context cleanup finished.");
    isCleaningUp.current = false;
  }, [microphone, processor, microphoneAudioContext]); // Depends on these to disconnect them

  const setupMicrophone = useCallback(async () => {
    if (isSettingUp.current) {
      // console.log("[MicProvider] Setup already in progress, skipping setupMicrophone call.");
      return;
    }
    isSettingUp.current = true;
    // console.log("[MicProvider] setupMicrophone called. Current mic state:", microphoneState);

    // Clean up any existing context *before* setting up a new one.
    // This makes setupMicrophone more idempotent.
    if (microphoneAudioContext && microphoneAudioContext.state !== 'closed') {
      // console.log("[MicProvider] Existing audio context found in setupMicrophone. Cleaning up first.");
      cleanupAudioContext(); // Call the main cleanup utility
      // Yield for a moment to allow cleanup effects to settle if necessary, though direct cleanup should be robust.
      // await new Promise(resolve => setTimeout(resolve, 0)); 
    } else if (microphone || processor) {
      // console.log("[MicProvider] Stale mic/processor nodes found without an open audio context. Cleaning.");
      cleanupAudioContext();
    }

    setMicrophoneState(0); // Indicate setting up (or re-setting up)
    // console.log("[MicProvider] Attempting to get user media...");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 16000, // Recommended for Deepgram
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true, // Enable noise suppression
          autoGainControl: true, // Enable auto gain control
        },
      });
      // console.log("[MicProvider] Got user media stream.");

      const newAudioContext = new AudioContext();
      const newMicrophoneNode = newAudioContext.createMediaStreamSource(stream);
      // Buffer size should be a power of 2, e.g., 4096. Adjust if needed.
      const newProcessorNode = newAudioContext.createScriptProcessor(4096, 1, 1);
      // console.log("[MicProvider] Audio nodes created.");

      setMicrophoneAudioContext(newAudioContext);
      setMicrophone(newMicrophoneNode);
      setProcessor(newProcessorNode);
      setMicrophoneState(1); // Ready for App.js to call startMicrophone()
      // console.log("[MicProvider] Microphone setup complete. State set to 1 (ready).");
    } catch (err) {
      console.error("[MicProvider] Error setting up microphone:", err);
      setMicrophoneState(-1); // Error state
      cleanupAudioContext(); // Clean up any partial setup
    } finally {
      isSettingUp.current = false;
      // console.log("[MicProvider] setupMicrophone finished execution. Mic state:", microphoneState);
    }
  }, [cleanupAudioContext, microphoneAudioContext, microphone, processor]); // Added dependencies for proper cleanup and re-entrancy checks

  const startMicrophone = useCallback(() => {
    console.log("Starting microphone...");
    if (microphone && processor && microphoneAudioContext) {
      try {
        microphone.connect(processor);
        processor.connect(microphoneAudioContext.destination);
        console.log("Microphone started successfully");
      } catch (error) {
        console.warn('Error starting microphone:', error);
      }
    } else {
      console.warn("Cannot start microphone: missing required components");
    }
  }, [microphone, processor, microphoneAudioContext]);

  const stopMicrophone = useCallback(() => {
    console.log("Stopping microphone...");
    cleanupAudioContext();
    console.log("Microphone stopped");
  }, [cleanupAudioContext]);

  // Cleanup on unmount
  useEffect(() => {
    console.log("MicrophoneContextProvider mounted");
    return () => {
      console.log("MicrophoneContextProvider unmounting...");
      if (!isCleaningUp.current) {
        cleanupAudioContext();
      }
    };
  }, [cleanupAudioContext]);

  return (
    <MicrophoneContext.Provider
      value={{
        microphone,
        processor,
        microphoneAudioContext,
        microphoneState,
        setupMicrophone,
        startMicrophone,
        stopMicrophone,
      }}
    >
      {children}
    </MicrophoneContext.Provider>
  );
};

export { MicrophoneContextProvider };
export default MicrophoneContextProvider; 