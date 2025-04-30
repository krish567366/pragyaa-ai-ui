"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useRef,
} from "react";
import {
  voiceBotReducer,
  INCREMENT_SLEEP_TIMER,
} from "./VoiceBotReducer";
import type {
  VoiceBotMessage,
  ConversationMessage,
  LatencyMessage,
  UserMessage,
  AssistantMessage,
  VoiceBotState,
  BehindTheScenesEvent,
} from "../types/voicebot";
import { VoiceBotStatus } from '../types/voicebot';

const defaultSleepTimeoutSeconds = 30;

export const isConversationMessage = (message: VoiceBotMessage): message is ConversationMessage => {
  return message.type === "user" || message.type === "assistant";
};

export const isLatencyMessage = (message: VoiceBotMessage): message is LatencyMessage => {
  return message.type === "latency";
};

export const isUserMessage = (message: ConversationMessage): message is UserMessage => {
  return message.type === "user";
};

export const isAssistantMessage = (message: ConversationMessage): message is AssistantMessage => {
  return message.type === "assistant";
};

export interface VoiceBotContext extends VoiceBotState {
  addVoicebotMessage: (newMessage: VoiceBotMessage) => void;
  addBehindTheScenesEvent: (data: BehindTheScenesEvent) => void;
  isWaitingForUserVoiceAfterSleep: React.Ref<boolean>;
  startSpeaking: () => void;
  startListening: () => void;
  startSleeping: () => void;
  toggleSleep: () => void;
  displayOrder: VoiceBotMessage[];
  setAttachParamsToCopyUrl: (attachParamsToCopyUrl: boolean) => void;
}

export const VoiceBotContext = createContext<VoiceBotContext | null>(null);

export const useVoiceBot = () => {
  const context = useContext(VoiceBotContext);
  if (!context) {
    throw new Error('useVoiceBot must be used within a VoiceBotProvider');
  }
  return context;
};

interface Props {
  children: React.ReactNode;
}

export function VoiceBotProvider({ children }: Props) {
  const [state, dispatch] = useReducer(voiceBotReducer, {
    status: VoiceBotStatus.NONE,
    sleepTimer: 0,
    messages: [],
    attachParamsToCopyUrl: false,
    behindTheScenesEvents: [],
  });

  const isWaitingForUserVoiceAfterSleep = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: INCREMENT_SLEEP_TIMER });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (state.sleepTimer > defaultSleepTimeoutSeconds) {
      startSleeping();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.sleepTimer]);

  const addVoicebotMessage = (newMessage: VoiceBotMessage) => {
    dispatch({ type: "add_message", payload: newMessage });
  };

  const addBehindTheScenesEvent = (event: BehindTheScenesEvent) => {
    dispatch({ type: "add_behind_scenes_event", payload: event });
  };

  const startSleeping = () => {
    dispatch({ type: "start_sleeping" });
  };

  const startSpeaking = () => {
    dispatch({ type: "start_speaking" });
  };

  const startListening = () => {
    dispatch({ type: "start_listening" });
  };

  const toggleSleep = () => {
    if (state.status === VoiceBotStatus.SLEEPING) {
      startListening();
    } else {
      startSleeping();
    }
  };

  const setAttachParamsToCopyUrl = (attachParamsToCopyUrl: boolean) => {
    dispatch({ type: "set_attach_params_to_copy_url", payload: attachParamsToCopyUrl });
  };

  const value = {
    ...state,
    addVoicebotMessage,
    addBehindTheScenesEvent,
    isWaitingForUserVoiceAfterSleep,
    startSpeaking,
    startListening,
    startSleeping,
    toggleSleep,
    displayOrder: state.messages,
    setAttachParamsToCopyUrl,
  };

  return (
    <VoiceBotContext.Provider value={value}>
      {children}
    </VoiceBotContext.Provider>
  );
}
