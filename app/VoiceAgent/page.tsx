"use client";
import { Suspense, useState } from "react";
import { App } from "../components/App";
import Intelligence from "../components/Intelligence";
import { stsConfig } from "../lib/constants";
import {
  isConversationMessage,
  useVoiceBot,
} from "../context/VoiceBotContextProvider";
import { VoiceBotStatus } from '../types/voicebot';
import { CaretIcon } from "../components/icons/CaretIcon";
import { withBasePath } from "../utils/deepgramUtils";
import PromptSuggestions from "../components/PromptSuggestions";
import Conversation from "../components/Conversation";
import VoiceSelector from "../components/VoiceSelector/VoiceSelector";
import { isMobile } from "react-device-detect";
import { PopupButton } from "../components/PopupButton";
import MobileMenu from "../components/MobileMenu";
import Latency from "../components/Latency";
import { PencilIcon } from "../components/icons/PencilIcon";
import InstructionInput from "../components/InstructionInput";
import Header from "../components/Header";
import { useStsQueryParams } from "../hooks/UseStsQueryParams";
import { useDeepgram } from "../context/DeepgramContextProvider";
import LandingSections from "../components/LandingSections";
import UseCaseButtons from "../components/UseCaseButtons";
import ProductNav from '../components/ProductNav';
import { usePathname } from "next/navigation";

const DesktopMenuItems = () => {
  const { instructions } = useStsQueryParams();
  return (
    <div className="flex flex-col space-y-4">
      <PopupButton
        className="flex items-center gap-2 p-3 text-white hover:bg-gray-800 bg-gray-900/50 border border-gray-700 rounded-lg font-medium"
        popupContent={<InstructionInput className="w-96" focusOnMount />}
      >
        <PencilIcon />
        <span>Test Call Guideline {instructions && <span className="text-green-spring">*</span>}</span>
      </PopupButton>
      <UseCaseButtons />
    </div>
  );
};

export default function VoiceAgentPage() {
  const { messages, status } = useVoiceBot();
  const { rateLimited } = useDeepgram();
  const [conversationOpen, setConversationOpen] = useState(false);
  const pathname = usePathname();
  const isVoiceAgent = pathname === '/VoiceAgent';

  const toggleConversation = () => setConversationOpen(!conversationOpen);

  const has4ConversationMessages = messages.filter(isConversationMessage).length > 3;

  return (
    <main className="min-h-screen bg-black">
      <ProductNav />
      <div className="h-dvh flex flex-col justify-between pb-12 md:pb-0">
        <div className="flex flex-col flex-grow">
          <div className="flex flex-grow relative">
            {/* Main Content - Centered with the right panel */}
            <div className="flex-1 flex justify-center items-start md:items-center">
              <div className="md:h-full flex flex-col min-w-[80vw] md:min-w-[30vw] max-w-[80vw] justify-center items-center">
                <div className="flex md:order-last md:mt-4 justify-center w-full">
                  <Intelligence />
                </div>
                <Suspense>
                  <App
                    defaultStsConfig={stsConfig}
                    className="flex-shrink-0 h-auto items-end"
                    requiresUserActionToInitialize={isMobile}
                  />
                </Suspense>
                {/* Desktop Menu Items - Positioned higher */}
                {isVoiceAgent && (
                  <div className="hidden md:flex absolute left-8 top-1/3 -translate-y-1/2">
                    <DesktopMenuItems />
                  </div>
                )}
                {/* Desktop Conversation Toggle */}
                {has4ConversationMessages ? (
                  <div className="hidden md:flex justify-center mt-auto mb-4 md:mt-4 text-gray-350">
                    <button className="text-[14px] text-gray-350 py-4" onClick={toggleConversation}>
                      See full conversation <CaretIcon className="rotate-90 h-4 w-4" />
                    </button>
                  </div>
                ) : null}

                {/* Speech Bubbles */}
                {!has4ConversationMessages &&
                  !rateLimited &&
                  status !== VoiceBotStatus.SLEEPING &&
                  status !== VoiceBotStatus.NONE && (
                    <div className="w-full">
                      {/* Desktop */}
                      <div className="hidden md:flex justify-center text-gray-450">Try saying:</div>
                      <div className="hidden md:grid max-w-max mx-auto grid-cols-3 gap-4 mt-6 relative">
                        <PromptSuggestions />
                      </div>
                      {/* Mobile */}
                      <div className="flex md:hidden justify-center text-gray-450 mt-2">
                        Try saying:
                      </div>
                      <div className="scrollable-element w-full flex md:hidden gap-4 items-center mt-4 overflow-x-auto -mr-10">
                        <PromptSuggestions />
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>

        {/* Conversation */}
        {conversationOpen && <Conversation toggleConversation={toggleConversation} />}

        {/* Desktop Bottom Stuff */}
        <div className={`hidden md:flex z-0 absolute bottom-0 left-8 right-8 mb-8`}>
          <div className="space-y-4">
            <Suspense>
              <Latency />
            </Suspense>
          </div>
        </div>

        {/* Mobile Bottom Stuff */}
        <div className={`flex flex-col z-0 items-center md:hidden`}>
          {has4ConversationMessages && (
            <div className="flex justify-center mt-auto text-gray-350">
              <button className="text-sm text-gray-350 pb-8" onClick={toggleConversation}>
                See full conversation <CaretIcon className="rotate-90 h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Mobile Voice Selector */}
        <Suspense>
          <VoiceSelector
            className={`absolute md:hidden bottom-0 left-0 pb-[16px] pl-[16px]`}
            collapsible
          />
          <MobileMenu className="fixed md:hidden bottom-4 right-4 text-gray-200" />
        </Suspense>
      </div>
      <LandingSections />
      {/* Footer Section */}
      <footer className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center space-y-8">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <img 
                src="/pragyaa_transparent_hor.png" 
                alt="VoiceAgent Logo" 
                className="h-8 object-contain"
              />
            </div>

            {/* Links */}
            <div className="flex items-center space-x-8 text-gray-400">
              <a href="#privacy" className="hover:text-purple-400 transition-colors">
                Privacy
              </a>
              <a href="#terms" className="hover:text-purple-400 transition-colors">
                Terms
              </a>
              <a href="#contact" className="hover:text-purple-400 transition-colors">
                Contact
              </a>
            </div>

            {/* Copyright */}
            <div className="text-gray-400 text-center">
              ©2025 Voxot Solutions Pvt Ltd. All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
} 