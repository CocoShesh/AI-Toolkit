"use client";

import { useForm } from "react-hook-form";
import type { formdata } from "../../utils/types";
import { useGenerateContent } from "../../utils/useGenerateContent";
import { useState } from "react";
import Header from "../Header";
import { motion } from "framer-motion";
import useScrollToTop from "../../hooks/useScrollToTop";

const HeadlineGenerator = ({ onBack }: { onBack: () => void }) => {
  useScrollToTop();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formdata>();

  const { mutate, status, data } = useGenerateContent();
  const [headlines, setHeadlines] = useState<string[]>([]);

  const onSubmit = handleSubmit(data => {
    const formattedInput = `Generate ${data.count} compelling headlines about "${data.topic}" for the ${data.industry} industry with a ${data.tone} tone.

    The headlines should be:
    - Attention-grabbing and clickable
    - Relevant to the ${data.industry} industry
    - Written in a ${data.tone} tone
    - Between 40-70 characters in length
    - Focused on the topic/keywords: ${data.topic}

    Return ONLY the headlines as a numbered list without any additional text or explanations.`;

    mutate(
      {
        userMessage: formattedInput,
      },
      {
        onSuccess: data => {
          if (data) {
            const lines = data.split("\n").filter(line => line.trim() !== "");
            const parsedHeadlines = lines.map(line => {
              return line.replace(/^\d+[.)\-\s]+|-|•|\*\s*/g, "").trim();
            });
            setHeadlines(parsedHeadlines);
          }
        },
      }
    );
  });

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <div className=" mx-auto px-4 ">
        <Header toolName="Transformation" />
        <div className="max-w-7xl mx-auto mt-5 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 2 * 0.05 }}
          >
            <div className="mb-6">
              <button
                onClick={onBack}
                className="flex items-center text-blue-600 cursor-pointer  hover:text-blue-800 transition-colors"
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
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Headline Settings
                    </h2>
                  </div>

                  <form onSubmit={onSubmit} className="space-y-5">
                    <div>
                      <label
                        htmlFor="topic"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                        Topic or Keywords
                      </label>
                      <input
                        type="text"
                        id="topic"
                        {...register("topic", {
                          required: "Topic is required",
                        })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your topic or keywords..."
                      />
                      {errors.topic && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.topic.message}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label
                          htmlFor="tone"
                          className="block mb-2 text-sm font-medium text-gray-700"
                        >
                          Tone
                        </label>
                        <select
                          id="tone"
                          {...register("tone", {
                            required: "Tone is required",
                          })}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="professional">Professional</option>
                          <option value="casual">Casual</option>
                          <option value="exciting">Exciting</option>
                          <option value="serious">Serious</option>
                        </select>
                        {errors.tone && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.tone.message}
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
                        <select
                          id="industry"
                          {...register("industry", {
                            required: "Industry is required",
                          })}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="tech">Technology</option>
                          <option value="health">Healthcare</option>
                          <option value="finance">Finance</option>
                          <option value="education">Education</option>
                          <option value="marketing">Marketing</option>
                        </select>
                        {errors.industry && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.industry.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="count"
                          className="block mb-2 text-sm font-medium text-gray-700"
                        >
                          Number of Headlines
                        </label>
                        <select
                          id="count"
                          {...register("count", {
                            required: "Number of Headlines is required",
                          })}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="5">5</option>
                          <option value="10">10</option>
                          <option value="15">15</option>
                          <option value="20">20</option>
                        </select>
                        {errors.count && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.count.message}
                          </p>
                        )}
                      </div>
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
                          Generating...
                        </>
                      ) : (
                        <>Generate Headlines</>
                      )}
                    </button>
                  </form>
                </div>
              </div>

              {/* Headlines Card */}
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
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Generated Headlines
                    </h2>
                  </div>

                  <div className="min-h-[400px] bg-gray-50 rounded-lg border border-gray-200 p-4 overflow-auto">
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
                          Creating your headlines...
                        </p>
                        <p className="text-sm text-gray-400 mt-2">
                          This may take a moment
                        </p>
                      </div>
                    ) : headlines.length > 0 ? (
                      <ul className="space-y-2">
                        {headlines.map((headline, index) => (
                          <li
                            key={index}
                            className="p-3 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer flex items-center"
                          >
                            <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center mr-3 text-sm font-medium">
                              {index + 1}
                            </span>
                            <span className="text-gray-700">{headline}</span>
                          </li>
                        ))}
                      </ul>
                    ) : data ? (
                      <ul className="space-y-2">
                        {data
                          .split("\n")
                          .filter(line => line.trim() !== "")
                          .map((headline, index) => (
                            <li
                              key={index}
                              className="p-3 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer flex items-center"
                            >
                              <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center mr-3 text-sm font-medium">
                                {index + 1}
                              </span>
                              <span className="text-gray-700">
                                {headline
                                  .replace(/^\d+[.)\-\s]+|-|•|\*\s*/g, "")
                                  .trim()}
                              </span>
                            </li>
                          ))}
                      </ul>
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
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                        <p className="text-gray-500">
                          Your headline suggestions will appear here
                        </p>
                        <p className="text-sm text-gray-400 mt-2">
                          Fill out the form and click "Generate Headlines"
                        </p>
                      </div>
                    )}
                  </div>

                  {headlines.length > 0 && (
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() =>
                          navigator.clipboard.writeText(headlines.join("\n"))
                        }
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
                        Copy All Headlines
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
                    Enter Topic
                  </h4>
                  <p className="text-gray-600">
                    Provide your topic, keywords, and customize settings
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-blue-600 text-xl font-bold">2</span>
                  </div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">
                    AI Generation
                  </h4>
                  <p className="text-gray-600">
                    Our AI creates multiple headline options tailored to your
                    specifications
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-blue-600 text-xl font-bold">3</span>
                  </div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">
                    Choose & Use
                  </h4>
                  <p className="text-gray-600">
                    Select your favorite headlines and use them in your content
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

export default HeadlineGenerator;
