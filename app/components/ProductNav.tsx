"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LogoLink from './LogoLink';
import VoiceSelector from './VoiceSelector/VoiceSelector';

export default function ProductNav() {
  const pathname = usePathname();
  const isVoiceAgentPage = pathname === '/VoiceAgent';
  const isVoiceAgentNav = pathname === '/' || pathname === '/VoiceAgent';

  return (
    <div>
      <nav className="bg-black/50 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
        <div className="w-full">
          <div className="flex items-center justify-between h-16">
            {/* Logo on the left */}
            <div className="flex-shrink-0 ml-8">
              <LogoLink href="/" />
            </div>
            
            {/* Navigation links centered */}
            <div className="flex justify-center space-x-8">
              <Link 
                href="/VoiceAgent"
                className={`text-lg font-medium transition-colors ${
                  isVoiceAgentNav ? 'text-blue-400' : 'text-gray-300 hover:text-blue-300'
                }`}
              >
                VoiceAgent
              </Link>
              <Link 
                href="/voicelens"
                className={`text-lg font-medium transition-colors ${
                  pathname === '/voicelens' ? 'text-purple-400' : 'text-gray-300 hover:text-purple-300'
                }`}
              >
                VoiceLens
              </Link>
              <Link 
                href="/predictml"
                className={`text-lg font-medium transition-colors ${
                  pathname === '/predictml' ? 'text-purple-400' : 'text-gray-300 hover:text-purple-300'
                }`}
              >
                PredictML
              </Link>
            </div>
            
            {/* Empty div to maintain layout on non-VoiceAgent pages */}
            <div className="flex-shrink-0 w-[200px] mr-8">
              {isVoiceAgentPage && (
                <div className="hidden md:block">
                  <VoiceSelector collapsible={false} />
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Voice selector below navigation, only shown for VoiceAgent on mobile */}
      {isVoiceAgentPage && (
        <div className="md:hidden w-full bg-black/30 backdrop-blur-sm border-b border-gray-800">
          <div className="flex justify-end items-center h-12 mr-8">
            <VoiceSelector collapsible={false} />
          </div>
        </div>
      )}
    </div>
  );
} 