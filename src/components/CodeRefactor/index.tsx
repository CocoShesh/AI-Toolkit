"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useGenerateContent } from "../../utils/useGenerateContent";
import type { formdata } from "../../utils/types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import Header from "../Header";
import { motion } from "framer-motion";
import useScrollToTop from "../../hooks/useScrollToTop";

const CodeRefactor = ({ onBack }: { onBack: () => void }) => {
  useScrollToTop();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formdata>();

  const { mutate, status, data } = useGenerateContent();
  const [refactorGoal, setRefactorGoal] = useState<string>("readability");

  const onSubmit = handleSubmit(data => {
    const goalInstructions = {
      readability:
        "Improve code readability with better variable names, comments, and formatting",
      performance: "Optimize the code for better performance",
      maintainability:
        "Refactor for better maintainability with proper design patterns and structure",
      modernize:
        "Update the code to use modern language features and best practices",
    };

    const prompt = `Refactor the following code to ${
      goalInstructions[refactorGoal as keyof typeof goalInstructions]
    }:
    
    ${data.code}
    
    Return only the refactored code without any additional explanations. Include comments explaining the changes made.`;

    mutate({ userMessage: prompt });
  });

  const refactorGoals = [
    { id: "readability", label: "Improve Readability" },
    { id: "performance", label: "Optimize Performance" },
    { id: "maintainability", label: "Enhance Maintainability" },
    { id: "modernize", label: "Modernize Code" },
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <div className=" mx-auto px-4 ">
        <Header toolName="Development" />
        <div className="max-w-7xl mx-auto mt-5 pb-10">
          {" "}
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

            {/* Refactor Goal Selector */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
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
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Refactoring Goal
                </h2>
              </div>

              <div className="flex flex-wrap w-full rounded-lg overflow-hidden border border-gray-200">
                {refactorGoals.map(goal => (
                  <button
                    key={goal.id}
                    onClick={() => setRefactorGoal(goal.id)}
                    className={`py-3 px-4 text-sm font-medium transition-colors flex-1 min-w-[120px] ${
                      refactorGoal === goal.id
                        ? "bg-blue-600 text-white"
                        : "bg-white hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    {goal.label}
                  </button>
                ))}
              </div>

              <div className="mt-4 text-sm text-gray-600">
                <strong className="font-medium">Selected Goal:</strong>{" "}
                {refactorGoal === "readability" &&
                  "Improve code clarity with better naming, formatting, and comments"}
                {refactorGoal === "performance" &&
                  "Optimize code execution speed and resource usage"}
                {refactorGoal === "maintainability" &&
                  "Restructure code for easier future maintenance and extension"}
                {refactorGoal === "modernize" &&
                  "Update code to use modern language features and best practices"}
              </div>
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
                          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                        />
                      </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Original Code
                    </h2>
                  </div>

                  <form onSubmit={onSubmit} className="space-y-5">
                    <div>
                      <textarea
                        id="code"
                        {...register("code", { required: "Code is required" })}
                        className="w-full h-[400px] p-4 font-mono text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                        placeholder="Paste your code here to refactor..."
                      />
                      {errors.code && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.code.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={status === "pending"}
                      className={`px-5 py-2 rounded-lg text-white font-medium flex items-center gap-2 transition-colors ${
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
                          Refactoring...
                        </>
                      ) : (
                        <>Refactor Code</>
                      )}
                    </button>
                  </form>
                </div>
              </div>

              {/* Results Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
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
                        Refactored Code
                      </h2>
                    </div>

                    {data && (
                      <button
                        onClick={() => navigator.clipboard.writeText(data)}
                        className="text-sm px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center gap-1 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        </svg>
                        Copy Code
                      </button>
                    )}
                  </div>

                  <div className="min-h-[400px] rounded-lg border border-gray-200 overflow-auto">
                    {status === "pending" ? (
                      <div className="flex flex-col items-center justify-center h-full bg-gray-50">
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
                        <p className="text-gray-500">
                          Refactoring your code...
                        </p>
                        <p className="text-sm text-gray-400 mt-2">
                          This may take a moment
                        </p>
                      </div>
                    ) : data ? (
                      <div className="h-full">
                        <SyntaxHighlighter
                          language="javascript"
                          style={vscDarkPlus}
                          customStyle={{
                            margin: 0,
                            padding: "16px",
                            borderRadius: "0.5rem",
                            height: "100%",
                            minHeight: "400px",
                            fontSize: "0.875rem",
                          }}
                          wrapLongLines={true}
                        >
                          {data}
                        </SyntaxHighlighter>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center bg-gray-50">
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
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <p className="text-gray-500">
                          Your refactored code will appear here
                        </p>
                        <p className="text-sm text-gray-400 mt-2">
                          Paste your code and click "Refactor Code"
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
                    Paste Your Code
                  </h4>
                  <p className="text-gray-600">
                    Add the code you want to improve and select your refactoring
                    goal
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
                    Our AI analyzes your code and applies best practices for
                    your goal
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-blue-600 text-xl font-bold">3</span>
                  </div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">
                    Get Improved Code
                  </h4>
                  <p className="text-gray-600">
                    Receive your refactored code with comments explaining the
                    changes
                  </p>
                </div>
              </div>{" "}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CodeRefactor;
