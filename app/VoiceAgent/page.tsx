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
import PromptSuggestions from "../components/PromptSuggestions";
import Conversation from "../components/Conversation";
import VoiceSelector from "../components/VoiceSelector/VoiceSelector";
import { isMobile } from "react-device-detect";
import { PopupButton } from "../components/PopupButton";
import MobileMenu from "../components/MobileMenu";
import Latency from "../components/Latency";
import { PencilIcon } from "../components/icons/PencilIcon";
import { useStsQueryParams } from "../hooks/UseStsQueryParams";
import { useDeepgram } from "../context/DeepgramContextProvider";
import LandingSections from "../components/LandingSections";
import ProductNav from '../components/ProductNav';
// import { usePathname, useRouter } from "next/navigation";
import VoiceAgentHeroBanner from "../components/VoiceAgentHeroBanner";
import UseCaseSelectorBoxes from "../components/UseCaseSelectorBoxes";

interface UseCase {
  id: string;
  name: string;
  icon: React.ReactNode;
  instructions?: string;
  isSpecial?: boolean;
  initialPrompt?: string; 
}

const CalendarIconPlaceholder = () => <span className="mr-2">📅</span>;
const BriefcaseIconPlaceholder = () => <span className="mr-2">💼</span>;
const MoneyBagIconPlaceholder = () => <span className="mr-2">💰</span>;
const DiningIconPlaceholder = () => <span className="mr-2">🍽️</span>;

const useCaseData: UseCase[] = [
  {
    id: "test-call-guideline",
    name: "Test Call Guideline",
    icon: <PencilIcon />,
    isSpecial: true,
  },
  {
    id: "appointment-reconfirmation",
    name: "Appointment Reconfirmation",
    icon: <CalendarIconPlaceholder />,
    initialPrompt: "Your task is to act as a friendly and efficient virtual assistant for a dental clinic. Your goal is to call patients to confirm their upcoming dental appointments. Be polite, clear, and concise. Example: Hello [Patient Name], this is [Your Name] from [Clinic Name] calling to confirm your dental appointment scheduled for [Date] at [Time]. Please say 'confirm' to keep your appointment or 'reschedule' if you need to change it.",
  },
  {
    id: "sales-lead-acquisition",
    name: "Sales Lead Acquisition",
    icon: <BriefcaseIconPlaceholder />,
    initialPrompt: "You are a sales representative for a software company. Your task is to qualify leads that have shown interest in your product. Ask questions to understand their needs, budget, and timeline. Example: Hi [Lead Name], thanks for your interest in our product. To better understand if we're a good fit, could you tell me a bit about the challenges you're looking to solve?",
  },
  {
    id: "debt-recovery",
    name: "Debt Recovery",
    icon: <MoneyBagIconPlaceholder />,
    initialPrompt: "You are a debt recovery agent. Your role is to contact individuals regarding outstanding payments in a firm but respectful manner. Clearly state the purpose of the call, the amount due, and offer available payment options or assistance plans. Example: Hello [Debtor Name], this is [Your Name] from [Agency Name] regarding an outstanding balance of [Amount] for [Service/Product]. We'd like to help you resolve this. Are you in a position to make a payment today, or would you like to discuss payment arrangements?",
  },
  {
    id: "dining-recommendations",
    name: "Dining Recommendations",
    icon: <DiningIconPlaceholder />,
    initialPrompt: "You are a local food expert and virtual concierge. Your goal is to provide personalized dining recommendations. Ask about cuisine preferences, budget, location, and occasion to suggest the best restaurants. Example: Hello! Looking for a great place to eat in [City/Area]? What kind of food are you in the mood for, and what's your approximate budget per person?",
  },
];

export default function VoiceAgentPage() {
  const { messages, status } = useVoiceBot();
  const { rateLimited } = useDeepgram();
  const [conversationOpen, setConversationOpen] = useState(false);
  // const pathname = usePathname();
  // const router = useRouter();
  const { instructions: currentInstructions } = useStsQueryParams();

  const toggleConversation = () => setConversationOpen(!conversationOpen);

  const has4ConversationMessages = messages.filter(isConversationMessage).length > 3;

  const handleSelectUseCase = (useCase: UseCase) => {
    // console.log("Selected Use Case:", useCase.name);
    const params = new URLSearchParams(window.location.search);

    if (useCase.id === 'test-call-guideline') {
      // console.log("Test Call Guideline selected - specific action needed (e.g., open modal or clear other instructions).");
      params.delete('instructions');
    } else if (useCase.initialPrompt) {
      params.set('instructions', useCase.initialPrompt);
    } else {
      params.delete('instructions');
    }

    // router.push(`${pathname}?${params.toString()}`);
  };

  const appComponent = (
    <Suspense>
      <App
        defaultStsConfig={stsConfig}
        className="flex-shrink-0 h-auto items-end"
        requiresUserActionToInitialize={true}
      />
    </Suspense>
  );

  return (
    <main className="min-h-screen bg-black">
      <ProductNav />
      <VoiceAgentHeroBanner appComponent={appComponent} />
      <UseCaseSelectorBoxes 
        onSelectUseCase={handleSelectUseCase} 
        currentInstructions={currentInstructions}
      />
      <div className="container mx-auto px-4 py-8">
        {has4ConversationMessages ? (
          <div className="flex justify-center mt-auto mb-4 md:mt-4 text-gray-350">
            <button className="text-[14px] text-gray-350 py-4" onClick={toggleConversation}>
              See full conversation <CaretIcon className="rotate-90 h-4 w-4" />
            </button>
          </div>
        ) : null}

        {!has4ConversationMessages &&
          !rateLimited &&
          status !== VoiceBotStatus.SLEEPING &&
          status !== VoiceBotStatus.NONE && (
            <div className="w-full mt-8">
              <div className="flex justify-center text-gray-450">Try saying:</div>
              <div className="hidden md:grid max-w-max mx-auto grid-cols-3 gap-4 mt-6 relative">
                <PromptSuggestions />
              </div>
              <div className="scrollable-element w-full flex md:hidden gap-4 items-center mt-4 overflow-x-auto -mr-10">
                <PromptSuggestions />
              </div>
            </div>
          )}
      </div>
      {conversationOpen && <Conversation toggleConversation={toggleConversation} />}
      <div className="container mx-auto px-4 pb-8">
        <div className="hidden md:flex justify-start">
          <Suspense>
            <Latency />
          </Suspense>
        </div>
      </div>
      <div className="md:hidden">
        <Suspense>
          <VoiceSelector
            className={`fixed bottom-0 left-0 pb-[16px] pl-[16px]`}
            collapsible
          />
          <MobileMenu className="fixed bottom-4 right-4 text-gray-200" />
        </Suspense>
      </div>
      <LandingSections />
    </main>
  );
} 