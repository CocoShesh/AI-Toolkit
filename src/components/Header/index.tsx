"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface HeaderProps {
  toolName?: string;
  title?: string;
  description?: string;
}

const Header = ({
  toolName = "Creative",
  title = "AI-Powered Creation Suite",
  description = "Professional tools to help you create, develop, and design more effectively",
}: HeaderProps) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-50 via-blue-100/30 to-blue-50 ">
      <div className="relative py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-blue-100/80 text-blue-700 backdrop-blur-sm border border-blue-200/50 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 mr-2" />
              AI-Powered {toolName} Tools
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-700 to-gray-900">
              {title}
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Header;
