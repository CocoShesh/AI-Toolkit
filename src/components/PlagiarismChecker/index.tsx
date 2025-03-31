"use client";

import { useForm } from "react-hook-form";
import type { formdata } from "../../utils/types";
import { useGenerateContent } from "../../utils/useGenerateContent";
import { useState, useEffect } from "react";
import Header from "../Header";
import { motion } from "framer-motion";
import useScrollToTop from "../../hooks/useScrollToTop";

const PlagiarismChecker = ({ onBack }: { onBack: () => void }) => {
  useScrollToTop();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formdata>();

  const [plagiarismData, setPlagiarismData] = useState({
    percentage: 0,
    analysis: "",
  });

  const { mutate, status, data } = useGenerateContent();

  useEffect(() => {
    if (data) {
      try {
        const jsonMatch = data.match(/```(?:json)?\s*\n([\s\S]*?)\n```/);
        let jsonData;

        if (jsonMatch && jsonMatch[1]) {
          jsonData = JSON.parse(jsonMatch[1]);
        } else {
          const directJsonMatch = data.match(/\{[\s\S]*\}/);
          if (directJsonMatch) {
            jsonData = JSON.parse(directJsonMatch[0]);
          }
        }

        if (jsonData && typeof jsonData.percentage === "number") {
          setPlagiarismData({
            percentage: jsonData.percentage,
            analysis: jsonData.analysis || "Analysis not available",
          });
        } else {
          setPlagiarismData({
            percentage: 0,
            analysis: data,
          });
        }
      } catch (error) {
        console.error("Error parsing plagiarism data:", error);
        setPlagiarismData({
          percentage: 0,
          analysis: data,
        });
      }
    }
  }, [data]);

  const onSubmit = handleSubmit(data => {
    const formattedInput = `You are a plagiarism detection expert. Analyze the following text for potential plagiarism. check in the internet the might this similar 
        
        Text to analyze: "${data.userInput}"
        
        Return your response in the following JSON format only:
        {
          "percentage": number, 
          "analysis": string 
        }
        
        Do not include any other text outside of this JSON structure.`;

    mutate({ userMessage: formattedInput });
  });

  const getColorClass = (percentage: number) => {
    if (percentage < 20) return "bg-green-500";
    if (percentage < 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <div className=" mx-auto px-4 ">
        <Header toolName="Analysis" />

        <div className="max-w-7xl mx-auto mt-5 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 2 * 0.05 }}
          >
            <div className="mb-6">
              <button
                onClick={onBack}
                className="flex items-center  cursor-pointer text-blue-600 hover:text-blue-800 transition-colors"
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Input Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-2 rounded-lg mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Your Text
                    </h2>
                  </div>

                  <form onSubmit={onSubmit}>
                    <textarea
                      id="text"
                      {...register("userInput", {
                        required: "Text is required",
                      })}
                      className="w-full min-h-[300px] p-4 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                      placeholder="Enter your text to check for plagiarism..."
                    />
                    {errors.userInput && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.userInput.message}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "pending"}
                      className={`mt-4 px-5 py-2 rounded-lg text-white font-medium flex items-center gap-2 transition-colors ${
                        status === "pending"
                          ? "bg-blue-400 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      {status === "pending" ? (
                        <>
                          <svg
                            className="animate-spin h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Checking...
                        </>
                      ) : (
                        <>Check Plagiarism</>
                      )}
                    </button>
                  </form>
                </div>
              </div>

              {/* Results Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-2 rounded-lg mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Plagiarism Report
                    </h2>
                  </div>

                  <div className="min-h-[300px] bg-gray-50 rounded-lg border border-gray-200 p-4">
                    {status === "pending" ? (
                      <div className="flex flex-col items-center justify-center h-full">
                        <svg
                          className="animate-spin h-8 w-8 text-blue-500 mb-3"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <p className="text-gray-500">Analyzing your text...</p>
                        <p className="text-sm text-gray-400 mt-2">
                          This may take a moment
                        </p>
                      </div>
                    ) : data ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-gray-800">
                            Plagiarism Score:
                          </h3>
                          <div className="flex items-center">
                            <div className="w-32 bg-gray-200 rounded-full h-2.5 mr-2">
                              <div
                                className={`${getColorClass(
                                  plagiarismData.percentage
                                )} h-2.5 rounded-full transition-all duration-500`}
                                style={{
                                  width: `${plagiarismData.percentage}%`,
                                }}
                              ></div>
                            </div>
                            <span
                              className={`font-bold ${
                                plagiarismData.percentage < 20
                                  ? "text-green-600"
                                  : plagiarismData.percentage < 50
                                  ? "text-yellow-600"
                                  : "text-red-600"
                              }`}
                            >
                              {plagiarismData.percentage}%
                            </span>
                          </div>
                        </div>

                        <div className="p-4 bg-white border border-gray-200 rounded-lg">
                          <h4 className="font-medium text-gray-800 mb-2">
                            Analysis:
                          </h4>
                          <p className="text-gray-700 whitespace-pre-line">
                            {plagiarismData.analysis}
                          </p>
                        </div>

                        <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                          <h4 className="font-medium text-blue-800 mb-1">
                            Recommendation:
                          </h4>
                          <p className="text-sm text-blue-700">
                            {plagiarismData.percentage < 20
                              ? "Your content appears to be mostly original. Great job!"
                              : plagiarismData.percentage < 50
                              ? "Your content contains some similarities to existing sources. Consider revising the highlighted sections."
                              : "Your content has significant similarities to existing sources. Major revisions are recommended."}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-12 w-12 text-gray-300 mb-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        </svg>
                        <p className="text-gray-500">
                          Your plagiarism check results will appear here
                        </p>
                        <p className="text-sm text-gray-400 mt-2">
                          Enter text and click "Check Plagiarism"
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="mt-12">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                How It Works
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-blue-600 text-xl font-bold">1</span>
                  </div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">
                    Enter Text
                  </h4>
                  <p className="text-gray-600">
                    Paste or type your content that you want to check for
                    plagiarism
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-blue-600 text-xl font-bold">2</span>
                  </div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">
                    AI Analysis
                  </h4>
                  <p className="text-gray-600">
                    Our AI compares your text against billions of online sources
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-blue-600 text-xl font-bold">3</span>
                  </div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">
                    Get Results
                  </h4>
                  <p className="text-gray-600">
                    Receive a detailed report with plagiarism percentage and
                    analysis
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PlagiarismChecker;
