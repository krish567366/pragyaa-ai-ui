"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

import Transcript from "./Transcript";
import { useDeepgram } from "../context/DeepgramContextProvider";
import { useMicrophone } from "../context/MicrophoneContextProvider";
import { useVoiceBot } from '../context/VoiceBotContextProvider';
import { VoiceBotStatus, EventType } from '../types/voicebot';
import { createAudioBuffer, playAudioBuffer } from "../utils/audioUtils";
import { sendSocketMessage, sendMicToSocket } from "app/utils/deepgramUtils";
import { isMobile } from "react-device-detect";
import { usePrevious } from "@uidotdev/usehooks";
import { useStsQueryParams } from "app/hooks/UseStsQueryParams";
import RateLimited from "./RateLimited";

const AnimationManager = dynamic(() => import("./AnimationManager"), {
  ssr: false,
});

export const App = ({
  defaultStsConfig,
  onMessageEvent = () => {},
  requiresUserActionToInitialize = false,
  className = "",
}) => {
  const {
    status,
    messages,
    addVoicebotMessage,
    addBehindTheScenesEvent,
    isWaitingForUserVoiceAfterSleep,
    toggleSleep,
    startListening,
    startSpeaking,
  } = useVoiceBot();
  const {
    setupMicrophone,
    microphone,
    microphoneState,
    processor,
    microphoneAudioContext,
    startMicrophone,
  } = useMicrophone();
  const { socket, connectToDeepgram, socketState, rateLimited } = useDeepgram();
  const { voice, instructions, applyParamsToConfig } = useStsQueryParams();
  const audioContext = useRef(null);
  const agentVoiceAnalyser = useRef(null);
  const userVoiceAnalyser = useRef(null);
  const startTimeRef = useRef(-1);
  const [data, setData] = useState();
  const [isInitialized, setIsInitialized] = useState(requiresUserActionToInitialize ? false : null);
  const previousVoice = usePrevious(voice);
  const previousInstructions = usePrevious(instructions);
  const scheduledAudioSources = useRef([]);
  const pathname = usePathname();

  // AUDIO MANAGEMENT
  /**
   * Initialize the audio context for managing and playing audio. (just for TTS playback; user audio input logic found in Microphone Context Provider)
   */
  useEffect(() => {
    if (!audioContext.current) {
      audioContext.current = new (window.AudioContext || window.webkitAudioContext)({
        latencyHint: "interactive",
        sampleRate: 24000,
      });
      agentVoiceAnalyser.current = audioContext.current.createAnalyser();
      agentVoiceAnalyser.current.fftSize = 2048;
      agentVoiceAnalyser.current.smoothingTimeConstant = 0.96;
    }
  }, []);

  /**
   * Callback to handle audio data processing and playback.
   * Converts raw audio into an AudioBuffer and plays the processed audio through the web audio context
   */
  const bufferAudio = useCallback((data) => {
    const audioBuffer = createAudioBuffer(audioContext.current, data);
    if (!audioBuffer) return;
    scheduledAudioSources.current.push(
      playAudioBuffer(audioContext.current, audioBuffer, startTimeRef, agentVoiceAnalyser.current),
    );
  }, []);

  const clearAudioBuffer = () => {
    scheduledAudioSources.current.forEach((source) => source.stop());
    scheduledAudioSources.current = [];
  };

  // MICROPHONE AND SOCKET MANAGEMENT
  /**
   * Open the microphone at the very start when there isn't one.
   * Logic for microphone found in Microphone Context Provider
   */
  useEffect(() => {
    if (requiresUserActionToInitialize && !isInitialized) {
      return;
    }

    const initializeMicrophone = async () => {
      try {
        await setupMicrophone();
      } catch (error) {
        console.error('Failed to initialize microphone:', error);
        // Retry after a short delay
        setTimeout(async () => {
          try {
            await setupMicrophone();
          } catch (e) {
            console.error("Failed to initialize microphone on retry:", e);
          }
        }, 1000);
      }
    };

    initializeMicrophone();

    // Cleanup function
    return () => {
      if (microphone) {
        microphone.disconnect();
      }
      if (processor) {
        processor.disconnect();
      }
      if (microphoneAudioContext && microphoneAudioContext.state !== 'closed') {
        console.log("App.js: Closing microphoneAudioContext. Current state:", microphoneAudioContext.state);
        microphoneAudioContext.close();
      } else if (microphoneAudioContext) {
        console.warn("App.js: microphoneAudioContext already closed or in an unexpected state. State:", microphoneAudioContext.state);
      }
    };
  }, [
    setupMicrophone,
    requiresUserActionToInitialize,
    isInitialized,
  ]);

  useEffect(() => {
    let wakeLock;
    const requestWakeLock = async () => {
      try {
        // Wake lock will only be successfully granted if this useEffect is triggered as a result of a user action (a click or tap)
        if ("wakeLock" in navigator) {
          wakeLock = await navigator.wakeLock.request("screen");
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (isInitialized) {
      requestWakeLock();
    }

    return () => {
      if (wakeLock) {
        wakeLock.release();
      }
    };
  }, [isInitialized]);

  /**
   * Open Deepgram once the microphone opens.
   * Runs whenever the `microphone` changes state, but exits if no microphone state.
   * `microphone` is only set once it is ready to open and record audio.
   */
  /**
   * Performs checks to ensure that the system is ready to proceed with setting up the data transmission
   * Attaches an event listener to the microphone which sends audio data through the WebSocket as it becomes available
   */
  useEffect(() => {
    if (!processor || !microphone) {
      // If processor exists, ensure its onaudioprocess is cleared if microphone isn't ready
      if (processor && processor.onaudioprocess) {
        // console.log("[App.js Consolidated Effect] Clearing onaudioprocess due to missing microphone/processor early return.");
        processor.onaudioprocess = null;
      }
      return;
    }

    const shouldAttach =
      socket?.readyState === 1 && // Socket is open
      status !== VoiceBotStatus.SLEEPING && // Not sleeping
      microphoneState === 2; // Microphone is fully started

    if (shouldAttach) {
      if (processor.onaudioprocess !== sendMicToSocket(socket)) { // Avoid redundant assignments if function ref is same
        // console.log("[App.js Consolidated Effect] Attaching onaudioprocess. SocketState:", socket?.readyState, "Status:", status, "MicState:", microphoneState);
        processor.onaudioprocess = sendMicToSocket(socket);
      }
    } else {
      if (processor.onaudioprocess) {
        // console.log("[App.js Consolidated Effect] Clearing onaudioprocess. SocketState:", socket?.readyState, "Status:", status, "MicState:", microphoneState);
        processor.onaudioprocess = null;
      }
    }

    return () => {
      if (processor) {
        // console.log("[App.js Consolidated Effect Cleanup] Clearing onaudioprocess on processor instance during cleanup.");
        processor.onaudioprocess = null;
      }
    };
  }, [processor, socket, status, microphoneState, microphone]);

  /**
   * Create AnalyserNode for user microphone audio context.
   * Exposes audio time / frequency data which is used in the
   * AnimationManager to scale the animations in response to user/agent voice
   */
  useEffect(() => {
    if (microphoneAudioContext) {
      userVoiceAnalyser.current = microphoneAudioContext.createAnalyser();
      userVoiceAnalyser.current.fftSize = 2048;
      userVoiceAnalyser.current.smoothingTimeConstant = 0.96;
      microphone.connect(userVoiceAnalyser.current);
    }
  }, [microphoneAudioContext, microphone]);

  /**
   * Handles incoming WebSocket messages. Differentiates between ArrayBuffer data and other data types (basically just string type).
   * */
  const onMessage = useCallback(
    async (event) => {
      if (event.data instanceof ArrayBuffer) {
        if (status !== VoiceBotStatus.SLEEPING && !isWaitingForUserVoiceAfterSleep.current) {
          bufferAudio(event.data); // Process the ArrayBuffer data to play the audio
        }
      } else {
        console.log(event?.data);
        // Handle other types of messages such as strings
        setData(event.data);
        onMessageEvent(event.data);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [bufferAudio, status],
  );

  /**
   * Opens Deepgram when the microphone opens.
   * Runs whenever `microphone` changes state, but exits if no microphone state.
   */
  useEffect(() => {
    if (
      microphoneState === 1 &&
      socketState === -1 &&
      defaultStsConfig &&
      (!requiresUserActionToInitialize || (requiresUserActionToInitialize && isInitialized))
    ) {
      const combinedStsConfig = applyParamsToConfig(defaultStsConfig);
      connectToDeepgram(combinedStsConfig);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    microphoneState,
    socketState,
    requiresUserActionToInitialize,
    isInitialized,
    connectToDeepgram,
    defaultStsConfig,
    applyParamsToConfig
  ]);

  /**
   * Sets up a WebSocket message event listener to handle incoming messages through the 'onMessage' callback.
   */
  useEffect(() => {
    if (socket) {
      socket.addEventListener("message", onMessage);
      return () => socket.removeEventListener("message", onMessage);
    }
  }, [socket, onMessage]);

  useEffect(() => {
    if (previousVoice && previousVoice !== voice && socket && socketState === 1) {
      sendSocketMessage(socket, {
        type: "UpdateSpeak",
        model: voice,
      });
    }
  }, [voice, socket, socketState, previousVoice]);

  useEffect(() => {
    if (previousInstructions !== instructions && socket && socketState === 1) {
      const defaultThinkInstructions = defaultStsConfig?.agent?.think?.instructions;
      // Ensure dfltString is a string, or an empty string if defaultThinkInstructions is not a string or undefined.
      const dfltString = typeof defaultThinkInstructions === 'string' ? defaultThinkInstructions : "";

      // Assuming 'instructions' from useStsQueryParams (assigned to the 'instructions' variable)
      // is already a string or an empty string. If not, it should also be validated similarly.
      const queryString = instructions;

      let combinedMessageInstructions = "";
      if (dfltString && queryString) {
        combinedMessageInstructions = `${dfltString}\n${queryString}`;
      } else if (dfltString) {
        combinedMessageInstructions = dfltString;
      } else if (queryString) {
        combinedMessageInstructions = queryString;
      }
      // If both dfltString and queryString are effectively empty (empty strings),
      // combinedMessageInstructions will remain "".

      sendSocketMessage(socket, {
        type: "UpdateInstructions",
        instructions: combinedMessageInstructions,
      });
    }
  }, [defaultStsConfig, previousInstructions, instructions, socket, socketState]);

  /**
   * Manage responses to incoming data from WebSocket.
   * This useEffect primarily handles string-based data that is expected to represent JSON-encoded messages determining actions based on the nature of the message
   * */
  useEffect(() => {
    /**
     * When the API returns a message event, several possible things can occur.
     *
     * 1. If it's a user message, check if it's a wake word or a stop word and add it to the queue.
     * 2. If it's an agent message, add it to the queue.
     * 3. If the message type is `AgentAudioDone` switch the app state to `START_LISTENING`
     */

    if (typeof data === "string") {
      const userRole = (data) => {
        const userTranscript = data.content;

        /**
         * When the user says something, add it to the conversation queue.
         */
        if (status !== VoiceBotStatus.SLEEPING) {
          addVoicebotMessage({ user: userTranscript });
        }
      };

      /**
       * When the assistant/agent says something, add it to the conversation queue.
       */
      const assistantRole = (data) => {
        if (status !== VoiceBotStatus.SLEEPING && !isWaitingForUserVoiceAfterSleep.current) {
          startSpeaking();
          const assistantTranscript = data.content;
          addVoicebotMessage({ assistant: assistantTranscript });
        }
      };

      try {
        const parsedData = JSON.parse(data);

        /**
         * Nothing was parsed so return an error.
         */
        if (!parsedData) {
          throw new Error("No data returned in JSON.");
        }

        maybeRecordBehindTheScenesEvent(parsedData);

        /**
         * If it's a user message.
         */
        if (parsedData.role === "user") {
          startListening();
          userRole(parsedData);
        }

        /**
         * If it's an agent message.
         */
        if (parsedData.role === "assistant") {
          if (status !== VoiceBotStatus.SLEEPING) {
            startSpeaking();
          }
          assistantRole(parsedData);
        }

        /**
         * The agent has finished speaking so we reset the sleep timer.
         */
        if (parsedData.type === EventType.AGENT_AUDIO_DONE) {
          // Note: It's not quite correct that the agent goes to the listening state upon receiving
          // `AgentAudioDone`. When that message is sent, it just means that all of the agent's
          // audio has arrived at the client, but the client will still be in the process of playing
          // it, which means the agent is still speaking. In practice, with the way the server
          // currently sends audio, this means Talon will deem the agent speech finished right when
          // the agent begins speaking the final sentence of its reply.
          startListening();
        }
        if (parsedData.type === EventType.USER_STARTED_SPEAKING) {
          isWaitingForUserVoiceAfterSleep.current = false;
          startListening();
          clearAudioBuffer();
        }
        if (parsedData.type === EventType.AGENT_STARTED_SPEAKING) {
          const { tts_latency, ttt_latency, total_latency } = parsedData;
          if (!tts_latency || !ttt_latency) return;
          const latencyMessage = { tts_latency, ttt_latency, total_latency };
          addVoicebotMessage(latencyMessage);
        }
      } catch (error) {
        console.error(data, error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, socket]);

  const handleVoiceBotAction = () => {
    if (requiresUserActionToInitialize && !isInitialized) {
      setIsInitialized(true);
    }

    if (status !== VoiceBotStatus.NONE) {
      toggleSleep();
    }
  };

  const maybeRecordBehindTheScenesEvent = (serverMsg) => {
    switch (serverMsg.type) {
      case EventType.SETTINGS_APPLIED:
        addBehindTheScenesEvent({
          type: EventType.SETTINGS_APPLIED,
        });
        break;
      case EventType.USER_STARTED_SPEAKING:
        if (status === VoiceBotStatus.SPEAKING) {
          addBehindTheScenesEvent({
            type: "Interruption",
          });
        }
        addBehindTheScenesEvent({
          type: EventType.USER_STARTED_SPEAKING,
        });
        break;
      case EventType.AGENT_STARTED_SPEAKING:
        addBehindTheScenesEvent({
          type: EventType.AGENT_STARTED_SPEAKING,
        });
        break;
      case EventType.CONVERSATION_TEXT: {
        const role = serverMsg.role;
        const content = serverMsg.content;
        addBehindTheScenesEvent({
          type: EventType.CONVERSATION_TEXT,
          role: role,
          content: content,
        });
        break;
      }
      case EventType.END_OF_THOUGHT:
        addBehindTheScenesEvent({
          type: EventType.END_OF_THOUGHT,
        });
        break;
    }
  };

  // New useEffect to call startMicrophone when socket is connected and mic is ready
  useEffect(() => {
    if (socketState === 1 && microphoneState === 1) {
      console.log("[App.js Post-Connect Effect] Socket connected and microphone ready. Calling startMicrophone().");
      startMicrophone();
    }
  }, [socketState, microphoneState, startMicrophone]);

  // New useEffect to transition to LISTENING state once all initial setup is complete
  useEffect(() => {
    if (
      (isInitialized || !requiresUserActionToInitialize) &&
      socketState === 1 && // Deepgram connected
      microphoneState === 2 && // Microphone open and processor attached
      status === VoiceBotStatus.NONE && // Only if in initial state
      !rateLimited // And not rate limited
    ) {
      // console.log("[App.js] Initial setup complete, transitioning to LISTENING state.");
      startListening();
    }
  }, [isInitialized, requiresUserActionToInitialize, socketState, microphoneState, status, startListening, rateLimited]);

  if (rateLimited) {
    return <RateLimited />;
  }

  // MAIN UI
  return (
    <div className={className}>
      <AnimationManager
        agentVoiceAnalyser={agentVoiceAnalyser.current}
        userVoiceAnalyser={userVoiceAnalyser.current}
        onOrbClick={handleVoiceBotAction}
      />
      {!microphone ? (
        <div className="text-base text-gray-25 text-center w-full">Loading microphone...</div>
      ) : (
        <Fragment>
          {socketState === -1 && requiresUserActionToInitialize && (
            <button className="text-center w-full" onClick={handleVoiceBotAction}>
              <span className="text-xl">Tap to start!</span>
            </button>
          )}
          {socketState === 0 && (
            <div className="text-base text-gray-25 text-center w-full">Loading VoiceAgent...</div>
          )}
          {socketState > 0 && status === VoiceBotStatus.SLEEPING && (
            <div className="text-xl flex flex-col items-center justify-center mt-4 mb-10 md:mt-4 md:mb-10">
              <div className="text-gray-450 text-sm">
                I&apos;ve stopped listening. {isMobile ? "Tap" : "Click"} the orb to resume.
              </div>
            </div>
          )}
          {/* Transcript Section */}
          <div
            className={`h-20 md:h-12 text-sm md:text-base mt-2 flex flex-col items-center text-gray-200 overflow-y-auto`}
          >
            {messages.length > 0 ? <Transcript /> : null}
          </div>
        </Fragment>
      )}
    </div>
  );
};
