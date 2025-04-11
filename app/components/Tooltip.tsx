import { type FC, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export const Tooltip: FC<Props> = ({ children, className = "" }) => {
  return (
    <div className={`p-3 text-sm text-white bg-gray-900/50 backdrop-blur-sm border border-gray-700 ${className}`}>
      {children}
    </div>
  );
}; 