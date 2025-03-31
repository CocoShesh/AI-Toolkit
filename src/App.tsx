"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";

import { motion, useScroll } from "framer-motion";

import Header from "./components/Header";

import { services } from "./utils/types/service";
import ServiceRenderer from "./helpers";
import { ServiceCard } from "./components/card";

export default function WritingTools() {
  const { scrollYProgress } = useScroll();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    setMounted(true);
  }, []);

  const [categories] = useState([
    "all",
    ...Array.from(new Set(services.map(service => service.category))),
  ]);

  const filteredServices = services.filter(
    service =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedService) {
    return ServiceRenderer({
      selectedService,
      setSelectedService,
    });
  }

  if (!mounted) return null;

  return (
    <>
      <motion.div
        id="scroll-indicator"
        style={{
          scaleX: scrollYProgress,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 10,
          originX: 0,
          zIndex: 100,
          backgroundColor: "#5078ed",
        }}
      />
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="relative max-w-md mx-auto mb-10">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search for tools..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="mb-8">
            <div className="relative flex flex-wrap max-w-5xl justify-center gap-1 p-1.5 mb-10 bg-gray-100 rounded-lg  mx-auto shadow-sm">
              {categories.map(category => {
                const isActive = activeTab === category;
                const displayName =
                  category === "all"
                    ? "All Tools"
                    : category.charAt(0).toUpperCase() + category.slice(1);

                return (
                  <button
                    key={category}
                    onClick={() => setActiveTab(category)}
                    className={`relative px-4 py-2 cursor-pointer text-sm font-medium rounded-md transition-colors duration-200 z-10 ${
                      isActive
                        ? "text-gray-900"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                    aria-selected={isActive}
                    role="tab"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-white rounded-md shadow-sm"
                        initial={false}
                        transition={{
                          type: "spring",
                          duration: 0.5,
                          bounce: 0.2,
                        }}
                      />
                    )}
                    <span className="relative z-10">{displayName}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices
                  .filter(
                    service =>
                      activeTab === "all" || service.category === activeTab
                  )
                  .map((service, index) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      onClick={() => setSelectedService(service.id)}
                      index={index}
                    />
                  ))}
              </div>
            </div>
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">
                No tools found matching your search.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
