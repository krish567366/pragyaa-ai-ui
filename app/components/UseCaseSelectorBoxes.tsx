import React from 'react';

// Assuming you have icon components like these, or paths to SVGs
// For now, using placeholder text for icons.
const PencilIcon = () => <span className="mr-2">✏️</span>;
const CalendarIcon = () => <span className="mr-2">📅</span>;
const BriefcaseIcon = () => <span className="mr-2">💼</span>;
const MoneyBagIcon = () => <span className="mr-2">💰</span>;
const DiningIcon = () => <span className="mr-2">🍽️</span>;

interface UseCase {
  id: string;
  name: string;
  icon: React.ReactNode;
  instructions?: string; // Or however the use case is activated
  isSpecial?: boolean; // For the asterisk on "Test Call Guideline"
}

// This data would ideally come from a config or be passed as props
const useCases: UseCase[] = [
  {
    id: "test-call-guideline",
    name: "Test Call Guideline",
    icon: <PencilIcon />,
    isSpecial: true,
    // instructions: "Your default guideline..."
  },
  {
    id: "appointment-reconfirmation",
    name: "Appointment Reconfirmation",
    icon: <CalendarIcon />,
    // instructions: "Confirm appointment for [Date] at [Time]..."
  },
  {
    id: "sales-lead-acquisition",
    name: "Sales Lead Acquisition",
    icon: <BriefcaseIcon />,
  },
  {
    id: "debt-recovery",
    name: "Debt Recovery",
    icon: <MoneyBagIcon />,
  },
  {
    id: "dining-recommendations",
    name: "Dining Recommendations",
    icon: <DiningIcon />,
  },
];

interface UseCaseSelectorBoxesProps {
  // Define props here, e.g., a function to handle use case selection
  onSelectUseCase: (useCase: UseCase) => void;
  currentInstructions?: string | null; // To show the asterisk for Test Call Guideline if custom instructions are set
}

const UseCaseSelectorBoxes: React.FC<UseCaseSelectorBoxesProps> = ({ onSelectUseCase, currentInstructions }) => {
  return (
    <section className="py-12 md:py-16 bg-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {useCases.map((useCase) => (
            <button
              key={useCase.id}
              onClick={() => onSelectUseCase(useCase)}
              className="bg-gray-800 hover:bg-gray-700 text-white p-6 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex flex-col items-center text-center"
            >
              <div className="text-3xl mb-3">{useCase.icon}</div>
              <span className="font-medium text-base">
                {useCase.name}
                {useCase.id === 'test-call-guideline' && currentInstructions && <span className="text-green-spring"> *</span>}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCaseSelectorBoxes; 