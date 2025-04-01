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
  const [microphoneState, setMicrophoneState] = useState(0);
  const { socket } = useDeepgram();
  const isCleaningUp = useRef(false);
  const isSettingUp = useRef(false);

  const cleanupAudioContext = useCallback(() => {
    console.log("Starting cleanup of audio context...");
    if (isCleaningUp.current) {
      console.log("Cleanup already in progress, skipping...");
      return;
    }
    isCleaningUp.current = true;

    try {
      // First disconnect the nodes
      if (microphone) {
        try {
          console.log("Disconnecting microphone...");
          microphone.disconnect();
        } catch (error) {
          console.warn('Error disconnecting microphone:', error);
        }
      }
      if (processor) {
        try {
          console.log("Disconnecting processor...");
          processor.disconnect();
        } catch (error) {
          console.warn('Error disconnecting processor:', error);
        }
      }

      // Then close the audio context if it's not already closed
      if (microphoneAudioContext) {
        console.log("AudioContext state:", microphoneAudioContext.state);
        if (microphoneAudioContext.state !== 'closed') {
          try {
            console.log("Closing audio context...");
            microphoneAudioContext.close();
          } catch (error) {
            console.warn('Error closing audio context:', error);
          }
        } else {
          console.log("AudioContext is already closed");
        }
      }

      // Reset state
      setMicrophone(null);
      setProcessor(null);
      setMicrophoneAudioContext(null);
      setMicrophoneState(0);
    } finally {
      isCleaningUp.current = false;
      console.log("Cleanup completed");
    }
  }, [microphone, processor, microphoneAudioContext]);

  const setupMicrophone = useCallback(async () => {
    console.log("Starting microphone setup...");
    if (isSettingUp.current) {
      console.log("Setup already in progress, skipping...");
      return;
    }
    isSettingUp.current = true;

    try {
      // Clean up existing microphone if any
      cleanupAudioContext();

      // Request microphone access
      console.log("Requesting microphone access...");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("Microphone access granted");
      
      // Create new audio context
      console.log("Creating new audio context...");
      const newAudioContext = new AudioContext();
      const newMicrophone = newAudioContext.createMediaStreamSource(stream);
      const newProcessor = newAudioContext.createScriptProcessor(4096, 1, 1);

      // Set up event handlers
      newProcessor.onaudioprocess = (e) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
          const inputData = e.inputBuffer.getChannelData(0);
          socket.send(inputData);
        }
      };

      // Connect nodes
      console.log("Connecting audio nodes...");
      newMicrophone.connect(newProcessor);
      newProcessor.connect(newAudioContext.destination);

      // Update state
      setMicrophone(newMicrophone);
      setProcessor(newProcessor);
      setMicrophoneAudioContext(newAudioContext);
      setMicrophoneState(1);
      console.log("Microphone setup completed successfully");
    } catch (error) {
      console.error('Error setting up microphone:', error);
      setMicrophoneState(0);
      throw error;
    } finally {
      isSettingUp.current = false;
    }
  }, [socket, cleanupAudioContext]);

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

export default MicrophoneContextProvider; 