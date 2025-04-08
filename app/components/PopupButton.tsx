import { type FC, useState } from "react";
import { Tooltip } from "app/components/Tooltip";

interface Props {
  children: React.ReactNode;
  popupContent: React.ReactNode;
  className?: string;
}

export const PopupButton: FC<Props> = ({ children, popupContent, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative ${className}`}
      >
        {children}
      </button>
      {isOpen && (
        <div className="absolute left-full ml-2 top-0">
          <Tooltip>{popupContent}</Tooltip>
        </div>
      )}
    </div>
  );
};
