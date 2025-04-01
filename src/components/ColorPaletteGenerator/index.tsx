"use client";

import { useState } from "react";
import { Sliders, RefreshCw, Copy } from "lucide-react";
import { useGenerateContent } from "../../utils/useGenerateContent";
import { parseColorData } from "../../helpers/colorPallette";
import Header from "../Header";
import { motion } from "framer-motion";
import useScrollToTop from "../../hooks/useScrollToTop";

const ColorPaletteGenerator = ({ onBack }: { onBack: () => void }) => {
  useScrollToTop();
  const [baseColor, setBaseColor] = useState("#3B82F6");
  const [paletteType, setPaletteType] = useState("complementary");

  const { mutate, status, data } = useGenerateContent();

  const handleGenerate = () => {
    const prompt = `Generate a ${paletteType} color palette based on the base color ${baseColor}. The output should be an array of exactly 5 HEX color codes, dispplayed only the array of hex dont include any explanation or other etc..`;

    mutate({ userMessage: prompt });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <Header />
        <div className="max-w-7xl mx-auto mt-5 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 2 * 0.05 }}
          >
            <div className="mb-6">
              <button
                onClick={onBack}
                className="flex items-center cursor-pointer text-blue-600 hover:text-blue-800 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Back to Tools
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Palette Settings
                </h2>

                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="baseColor"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Base Color
                    </label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="color"
                        id="baseColor"
                        value={baseColor}
                        onChange={e => setBaseColor(e.target.value)}
                        className="h-10 w-20 rounded border border-gray-300 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={baseColor}
                        onChange={e => setBaseColor(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="#3B82F6"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Palette Type
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        "monochromatic",
                        "analogous",
                        "complementary",
                        "triadic",
                      ].map(type => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setPaletteType(type)}
                          className={`py-2 px-3 rounded-lg cursor-pointer border text-sm ${
                            paletteType === type
                              ? "bg-blue-50 border-blue-300 text-blue-700"
                              : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleGenerate}
                    disabled={status === "pending"}
                    className={`w-full py-3 px-4 rounded-lg cursor-pointer text-white font-medium flex items-center justify-center gap-2 ${
                      status === "pending"
                        ? "bg-blue-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {status === "pending" ? (
                      <>
                        <RefreshCw className="h-5 w-5 animate-spin" />
                        Generating Palette...
                      </>
                    ) : (
                      <>Generate Color Palette</>
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Color Palette
                </h2>

                <div className="bg-gray-100 rounded-lg border border-gray-200 p-4 min-h-[300px]">
                  {status === "pending" ? (
                    <div className="flex flex-col items-center justify-center h-[300px]">
                      <RefreshCw className="h-10 w-10 text-blue-500 animate-spin mx-auto mb-4" />
                      <p className="text-gray-500">
                        Generating your color palette...
                      </p>
                      <p className="text-sm text-gray-400 mt-2">
                        This may take a moment
                      </p>
                    </div>
                  ) : data ? (
                    <div className="space-y-4">
                      <div className="flex h-20 rounded-lg overflow-hidden">
                        {parseColorData(data).map(
                          (color: string, index: number) => (
                            <div
                              key={index}
                              className="flex-1 flex items-end justify-center"
                              style={{ backgroundColor: color }}
                            >
                              <div className="bg-white/80 backdrop-blur-sm w-full text-center py-1 text-xs font-medium">
                                {color}
                              </div>
                            </div>
                          )
                        )}
                      </div>

                      <div className="space-y-3">
                        {parseColorData(data).map(
                          (color: string, index: number) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
                            >
                              <div className="flex items-center">
                                <div
                                  className="w-10 h-10 rounded-lg mr-3"
                                  style={{ backgroundColor: color }}
                                ></div>
                                <span className="font-mono">{color}</span>
                              </div>
                              <button
                                onClick={() => copyToClipboard(color)}
                                className="p-2 text-gray-500 cursor-pointer hover:text-blue-600"
                              >
                                <Copy className="h-4 w-4" />
                              </button>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[300px]">
                      <Sliders className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">
                        Your color palette will appear here
                      </p>
                      <p className="text-sm text-gray-400 mt-2">
                        Select a base color and click "Generate Color Palette"
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-16 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                How Color Palette Generator Works
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <span className="text-blue-600 text-2xl font-bold">1</span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    Choose Base Color
                  </h3>
                  <p className="text-gray-600">
                    Select a starting color that represents your brand or
                    project's main color identity
                  </p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <span className="text-blue-600 text-2xl font-bold">2</span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    Select Palette Type
                  </h3>
                  <p className="text-gray-600">
                    Choose from different color harmony rules like
                    complementary, analogous, or monochromatic
                  </p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <span className="text-blue-600 text-2xl font-bold">3</span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    Apply & Export
                  </h3>
                  <p className="text-gray-600">
                    Copy color codes directly or export the entire palette for
                    use in design software and code
                  </p>
                </div>
              </div>

              <div className="mt-8 bg-blue-50 rounded-lg p-4 border border-blue-100">
                <h4 className="font-medium text-blue-700 mb-2">Pro Tip</h4>
                <p className="text-blue-600">
                  Test your palette with our accessibility checker to ensure
                  your colors have sufficient contrast for text readability and
                  meet WCAG guidelines.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ColorPaletteGenerator;
