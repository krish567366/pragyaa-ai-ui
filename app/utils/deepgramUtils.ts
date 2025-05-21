import { convertFloat32ToInt16, downsample } from "../utils/audioUtils";
import nextConfig from "next.config.mjs";

export const getApiKey = async () => {
  const fetchUrl = withBasePath("/api/authenticate");
  console.log("Attempting to fetch API key from:", fetchUrl);
  const result = await (await fetch(fetchUrl, { method: "POST" })).json();
  console.log("Full result from /api/authenticate:", result);

  return result.key;
};

export const sendMicToSocket = (socket: WebSocket) => (event: AudioProcessingEvent) => {
  console.log("[sendMicToSocket] Audio processing event, sending data.");
  const inputData = event?.inputBuffer?.getChannelData(0);
  const downsampledData = downsample(inputData, 48000, 16000);
  const audioDataToSend = convertFloat32ToInt16(downsampledData);
  socket.send(audioDataToSend);
};

export const sendSocketMessage = (socket: WebSocket, message: DGMessage) => {
  socket.send(JSON.stringify(message));
};

export const sendKeepAliveMessage = (socket: WebSocket) => () => {
  sendSocketMessage(socket, { type: "KeepAlive" });
};

export interface AudioConfig {
  input: {
    encoding: string;
    sample_rate: number;
  };
  output: {
    encoding: string;
    sample_rate: number;
    container?: string;
    buffer_size?: number;
  };
}

export interface AgentConfig {
  listen: { 
    provider: { 
      type: string; 
      model: string; 
      keyterms?: string[];
    }
  };
  speak: {
    provider: {
      type: string;
      model: string;
    };
    endpoint?: {
      url: string;
      headers?: Record<string, string>;
    };
  };
  think: {
    provider: { 
      type: string; 
      model: string;
    };
    prompt: string;
    functions?: LlmFunction[];
  };
}

export interface ContextConfig {
  messages: { role: string; content: string }[];
  replay: boolean;
}

export interface StsConfig {
  type: string;
  audio: AudioConfig;
  agent: AgentConfig;
  context?: ContextConfig;
}

export interface LlmFunction {
  name: string;
  description: string;
  url: string;
  method: string;
  headers: Header[];
  key?: string;
  parameters: LlmParameterObject | Record<string, never>;
}

export type LlmParameter = LlmParameterScalar | LlmParameterObject;

export interface LlmParameterBase {
  type: string;
  description?: string;
}

export interface LlmParameterObject extends LlmParameterBase {
  type: "object";
  properties: Record<string, LlmParameter>;
  required?: string[];
}

export interface LlmParameterScalar extends LlmParameterBase {
  type: "string" | "integer";
}

export interface Header {
  key: string;
  value: string;
}

export interface Voice {
  name: string;
  canonical_name: string;
  metadata: {
    accent: string;
    gender: string;
    image: string;
    color: string;
    sample: string;
  };
}

export type DGMessage =
  | { type: "Settings"; audio: AudioConfig; agent: AgentConfig }
  | { type: "UpdateInstructions"; instructions: string }
  | { type: "UpdateSpeak"; model: string }
  | { type: "KeepAlive" };

export const withBasePath = (path: string): string => {
  // Ensure nextConfig.basePath is treated as empty if it's not a non-empty string
  const basePath = (typeof nextConfig.basePath === 'string' && nextConfig.basePath.length > 0) ? nextConfig.basePath : '';
  
  // Prevent double slashes if path already starts with a slash and basePath is not empty
  if (basePath && path.startsWith('/')) {
    return basePath + path.substring(1);
  } 
  // Or if path doesn't start with a slash and basepath is not empty (add one)
  else if (basePath && !path.startsWith('/')){
    return basePath + '/' + path;
  }
  // If basePath is empty, just return the path (should typically start with / for API routes)
  return path;
};
