"use client";

import type { ReactNode } from "react";
import { DeepgramContextProvider } from "../context/DeepgramContextProvider";
import { MicrophoneContextProvider } from "../context/MicrophoneContextProvider";
import { VoiceBotProvider } from "../context/VoiceBotContextProvider";
import AnimatedBackground from "./AnimatedBackground.js";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AnimatedBackground>
      <VoiceBotProvider>
        <DeepgramContextProvider>
          <MicrophoneContextProvider>{children}</MicrophoneContextProvider>
        </DeepgramContextProvider>
      </VoiceBotProvider>
    </AnimatedBackground>
  );
} 