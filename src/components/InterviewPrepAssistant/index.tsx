"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useGenerateContent } from "../../utils/useGenerateContent";
import type { formdata } from "../../utils/types";
import Header from "../Header";
import { motion } from "framer-motion";
import useScrollToTop from "../../hooks/useScrollToTop";

const InterviewPrepAssistant = ({ onBack }: { onBack: () => void }) => {
  useScrollToTop();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formdata>();

  const { mutate, status, data } = useGenerateContent();
  const [prepType, setPrepType] = useState<string>("questions");

  const onSubmit = handleSubmit(data => {
    let prompt = "";

    if (prepType === "questions") {
      prompt = `Generate a list of 10 common interview questions for a ${data.position} position at a ${data.industry} company. 
      For each question, provide a brief explanation of what the interviewer is looking for and a sample answer structure.`;
    } else if (prepType === "answers") {
      prompt = `Generate detailed sample answers for these interview questions for a ${data.position} position:
      
      ${data.questions}
      
      For each answer, include key points to highlight, relevant experience to mention, and how to structure the response effectively.`;
    } else if (prepType === "technical") {
      prompt = `Generate a list of technical interview questions and answers for a ${data.position} position in the ${data.industry} industry.
      
      Focus on these skills: ${data.skills}
      
      For each question, provide a detailed answer that demonstrates technical knowledge and problem-solving ability.`;
    } else if (prepType === "behavioral") {
      prompt = `Generate behavioral interview questions and sample answers for a ${
        data.position
      } position.
      
      Include questions about: ${
        data.skills ||
        "teamwork, leadership, conflict resolution, and problem-solving"
      }
      
      For each question, provide a STAR method (Situation, Task, Action, Result) sample answer.`;
    }

    mutate({ userMessage: prompt });
  });

  const prepTypes = [
    { id: "questions", label: "Common Questions" },
    { id: "answers", label: "Sample Answers" },
    { id: "technical", label: "Technical Interview" },
    { id: "behavioral", label: "Behavioral Questions" },
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <div className=" mx-auto px-4 ">
        <Header toolName="Career" />
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Form Card */}
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
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Interview Preparation
                    </h2>
                  </div>

                  {/* Prep Type Selector */}
                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Preparation Type
                    </label>
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                      {prepTypes.map(type => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setPrepType(type.id)}
                          className={`py-2 px-3 text-sm font-medium rounded-lg transition-colors ${
                            prepType === type.id
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <form onSubmit={onSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="position"
                          className="block mb-2 text-sm font-medium text-gray-700"
                        >
                          Position
                        </label>
                        <input
                          type="text"
                          id="position"
                          {...register("position", {
                            required: "Position is required",
                          })}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Software Engineer"
                        />
                        {errors.position && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.position.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="industry"
                          className="block mb-2 text-sm font-medium text-gray-700"
                        >
                          Industry
                        </label>
                        <input
                          type="text"
                          id="industry"
                          {...register("industry", {
                            required: "Industry is required",
                          })}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Technology"
                        />
                        {errors.industry && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.industry.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {prepType === "technical" || prepType === "behavioral" ? (
                      <div>
                        <label
                          htmlFor="skills"
                          className="block mb-2 text-sm font-medium text-gray-700"
                        >
                          {prepType === "technical"
                            ? "Technical Skills"
                            : "Focus Areas"}
                        </label>
                        <input
                          type="text"
                          id="skills"
                          {...register("skills")}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder={
                            prepType === "technical"
                              ? "JavaScript, React, Node.js, etc."
                              : "Leadership, Teamwork, Problem-solving, etc."
                          }
                        />
                      </div>
                    ) : prepType === "answers" ? (
                      <div>
                        <label
                          htmlFor="questions"
                          className="block mb-2 text-sm font-medium text-gray-700"
                        >
                          Interview Questions
                        </label>
                        <textarea
                          id="questions"
                          {...register("questions", {
                            required: "Questions are required",
                          })}
                          className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                          placeholder="List the interview questions you need answers for..."
                        />
                        {errors.questions && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.questions.message}
                          </p>
                        )}
                      </div>
                    ) : null}

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
                          Generating...
                        </>
                      ) : (
                        <>Generate Prep Materials</>
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
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {prepType === "questions" && "Interview Questions"}
                      {prepType === "answers" && "Sample Answers"}
                      {prepType === "technical" && "Technical Interview Prep"}
                      {prepType === "behavioral" &&
                        "Behavioral Questions & Answers"}
                    </h2>
                  </div>

                  <div className="min-h-[400px] max-h-[500px] bg-gray-50 rounded-lg border border-gray-200 p-4 overflow-auto">
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
                        <p className="text-gray-500">
                          Creating your interview prep materials...
                        </p>
                        <p className="text-sm text-gray-400 mt-2">
                          This may take a moment
                        </p>
                      </div>
                    ) : data ? (
                      <div className="text-gray-700 whitespace-pre-line">
                        {data}
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
                            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <p className="text-gray-500">
                          Your interview prep materials will appear here
                        </p>
                        <p className="text-sm text-gray-400 mt-2">
                          Fill out the form and click "Generate Prep Materials"
                        </p>
                      </div>
                    )}
                  </div>

                  {data && (
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() => navigator.clipboard.writeText(data)}
                        className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md flex items-center gap-1 transition-colors"
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
                        Copy to Clipboard
                      </button>
                    </div>
                  )}
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
                    Select Prep Type
                  </h4>
                  <p className="text-gray-600">
                    Choose the type of interview preparation materials you need
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-blue-600 text-xl font-bold">2</span>
                  </div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">
                    Enter Job Details
                  </h4>
                  <p className="text-gray-600">
                    Provide information about the position and industry
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-blue-600 text-xl font-bold">3</span>
                  </div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">
                    Get Prepared
                  </h4>
                  <p className="text-gray-600">
                    Receive customized interview questions and answers to help
                    you succeed
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

export default InterviewPrepAssistant;
