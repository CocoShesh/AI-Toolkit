import { ArrowLeft } from "lucide-react";

export const ServiceLayout = ({
  title,
  children,
  onBack,
}: {
  title: string;
  children: React.ReactNode;
  onBack: () => void;
}) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="mr-4 p-2 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      {children}
    </div>
  );
};
