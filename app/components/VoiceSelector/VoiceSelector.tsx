import { availableVoices } from "app/lib/constants";
import type { Voice } from "../../utils/deepgramUtils";
import Image from "next/image";
import { useEffect, useState, useRef, type FC, type MouseEventHandler } from "react";
import styles from "./VoiceSelector.module.scss";
import { useStsQueryParams } from "app/hooks/UseStsQueryParams";

const ANIMATION_DURATION = 200;

interface Props {
  className?: string;
  showLabel?: boolean;
  collapsible?: boolean;
}

const VoiceSelector: FC<Props> = ({ className = "", showLabel, collapsible = false }) => {
  const { voice, updateVoiceUrlParam } = useStsQueryParams();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [sortedVoices, setSortedVoices] = useState<Voice[]>(availableVoices);
  const isMounted = useRef(true);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleVoiceIconClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const newVoice = e.currentTarget.value;
    
    if (collapsible && !isOpen) {
      setIsOpen(true);
    } else if (collapsible) {
      setIsOpen(false);
    }
    
    if (newVoice) {
      updateVoiceUrlParam(newVoice);
    }
  };

  useEffect(() => {
    if (!isOpen && collapsible && voice && voice !== sortedVoices[0]?.canonical_name) {
      const selectedVoiceIndex = availableVoices.findIndex((v) => v.canonical_name === voice);
      if (selectedVoiceIndex >= 0) {
        const selectedVoice = availableVoices[selectedVoiceIndex];
        if (!selectedVoice) return;
        
        const sorted = [...availableVoices];
        sorted.splice(selectedVoiceIndex, 1);
        sorted.unshift(selectedVoice);

        setTimeout(() => {
          if (isMounted.current) {
            setSortedVoices(sorted);
          }
        }, ANIMATION_DURATION);
      }
    }
  }, [voice, collapsible, isOpen, sortedVoices]);

  const isSelected = (v: Voice): boolean => {
    if (!voice) return false;
    return voice === v.canonical_name;
  };

  const voicesListClassName = [
    styles["voice-list"],
    !collapsible && styles["voice-list--default"],
    collapsible && isOpen && styles["voice-list--collapsibleOpen"],
    collapsible && !isOpen && styles["voice-list--collapsibleClosed"],
  ]
    .flat()
    .filter(Boolean)
    .join(" ");

  const voiceListItemClassName = (voice: Voice) =>
    [
      styles["voice-list__item"],
      isSelected(voice)
        ? styles["voice-list__item--selected"]
        : styles["voice-list__item--unselected"],
    ]
      .flat()
      .join(" ");

  const collapsedBackgroundClassName = collapsible
    ? `bg-gradient-to-t ${isOpen ? "from-black w-full" : "from-transparent"} from-80% to-transparent`
    : "";

  if (!voice || !sortedVoices.length) {
    return null;
  }

  return (
    <div className={`${className} ${collapsedBackgroundClassName}`}>
      {showLabel && <div className="text-gray-450 text-sm mr-2">Voices:</div>}
      <ul className={voicesListClassName}>
        {sortedVoices.map((voiceItem, i) => (
          <li
            className={voiceListItemClassName(voiceItem)}
            key={voiceItem.canonical_name}
            style={
              collapsible && isOpen
                ? {
                    paddingLeft: i * 40,
                  }
                : {}
            }
          >
            <button
              className={styles["voice-list__icon"]}
              onClick={handleVoiceIconClick}
              value={voiceItem.canonical_name}
              style={
                (!collapsible || isOpen || isSelected(voiceItem))
                  ? {
                      border: `2px solid ${voiceItem.metadata.color}`,
                    }
                  : {}
              }
            >
              <Image
                src={voiceItem.metadata.image}
                alt={voiceItem.name}
                width={80}
                height={80}
                className="rounded-full object-scale-down"
                priority
              />
            </button>

            <div className={styles["voice-list__info"]}>
              <div className="flex flex-col items-center">
                <span className="text-lg font-semibold text-white">
                  {voiceItem.name}
                </span>
                <span className="text-sm text-gray-400">
                  {voiceItem.metadata.accent} {voiceItem.metadata.gender.toLowerCase()}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VoiceSelector;
