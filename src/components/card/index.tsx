import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

interface ServiceCardProps {
  service: {
    id: string;
    name: string;
    icon: React.ReactNode;
    description: string;
    category: string;
  };
  onClick: () => void;
  index: number;
}

export const ServiceCard = ({ service, onClick, index }: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <div
        onClick={onClick}
        className="group relative p-6 rounded-xl border border-gray-200 cursor-pointer transition-all hover:border-blue-300 hover:shadow-md bg-white hover:bg-blue-50/30 flex flex-col h-full"
      >
        <div className="mb-4 p-3 rounded-full bg-blue-100 w-fit group-hover:bg-blue-200 transition-colors">
          <div className="text-blue-600">{service.icon}</div>
        </div>
        <h3 className="font-medium text-lg mb-2 group-hover:text-blue-600 transition-colors">
          {service.name}
        </h3>
        <p className="text-gray-500 text-sm flex-grow">{service.description}</p>
        <div className="mt-4 flex justify-end">
          <button className="inline-flex  cursor-pointer items-center px-3 py-1.5 text-sm font-medium text-gray-700 rounded-md group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
            Open Tool
            <ArrowLeft className="h-4 w-4 ml-1 rotate-180" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
