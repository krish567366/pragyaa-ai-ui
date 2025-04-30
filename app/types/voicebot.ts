export enum VoiceBotStatus {
  NONE = "NONE",
  LISTENING = "LISTENING",
  SPEAKING = "SPEAKING",
  SLEEPING = "SLEEPING",
  PROCESSING = "PROCESSING",
  THINKING = "THINKING"
}

export enum EventType {
  SETTINGS_APPLIED = "SettingsApplied",
  AGENT_AUDIO_DONE = "AgentAudioDone",
  USER_STARTED_SPEAKING = "UserStartedSpeaking",
  AGENT_STARTED_SPEAKING = "AgentStartedSpeaking",
  CONVERSATION_TEXT = "ConversationText",
  END_OF_THOUGHT = "EndOfThought",
}

export type BehindTheScenesEvent =
  | { type: EventType.SETTINGS_APPLIED }
  | { type: EventType.USER_STARTED_SPEAKING }
  | { type: EventType.AGENT_STARTED_SPEAKING }
  | { type: EventType.CONVERSATION_TEXT; role: "user" | "assistant"; content: string }
  | { type: "Interruption" }
  | { type: EventType.END_OF_THOUGHT };

export type VoiceBotMessage = ConversationMessage | LatencyMessage;

export type ConversationMessage = UserMessage | AssistantMessage;

export type LatencyMessage = {
  type: "latency";
  latency: number;
};

export type UserMessage = {
  type: "user";
  user: string;
};

export type AssistantMessage = {
  type: "assistant";
  assistant: string;
};

export type VoiceBotState = {
  status: VoiceBotStatus;
  sleepTimer: number;
  messages: VoiceBotMessage[];
  attachParamsToCopyUrl: boolean;
  behindTheScenesEvents: BehindTheScenesEvent[];
};

export type VoiceBotAction = {
  type: string;
  payload?: unknown;
};

export const isConversationMessage = (message: VoiceBotMessage): message is ConversationMessage => 
  message.type === "user" || message.type === "assistant";

export const isLatencyMessage = (message: VoiceBotMessage): message is LatencyMessage => 
  message.type === "latency";

export const isUserMessage = (message: ConversationMessage): message is UserMessage => 
  message.type === "user";

export const isAssistantMessage = (message: ConversationMessage): message is AssistantMessage => 
  message.type === "assistant"; 