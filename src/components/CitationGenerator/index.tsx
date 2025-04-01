"use client";

import { useForm } from "react-hook-form";
import type { formdata } from "../../utils/types";
import { useGenerateContent } from "../../utils/useGenerateContent";
import Header from "../Header";
import { motion } from "framer-motion";
import useScrollToTop from "../../hooks/useScrollToTop";

const CitationGenerator = ({ onBack }: { onBack: () => void }) => {
  useScrollToTop();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<formdata>();

  const styleValue = watch("style");

  const { mutate, status, data } = useGenerateContent();

  const isValid = !watch("title") || !watch("author") || !watch("year");

  const onSubmit = handleSubmit(data => {
    const formattedInput = `Generate a citation in ${data.style} format with the following information:

  Title: ${data.title}
  Author: ${data.author}
  Source: ${data.source}
  Publication Year: ${data.year}

  Return ONLY the formatted citation without any explanations or additional text. Do not include markdown formatting, just plain text.`;

    mutate({ userMessage: formattedInput });
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
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Citation Details
                    </h2>
                  </div>

                  <form onSubmit={onSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="source"
                          className="block mb-2 text-sm font-medium text-gray-700"
                        >
                          Source Type
                        </label>
                        <select
                          id="source"
                          {...register("source", {
                            required: "Source is required",
                          })}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="book">Book</option>
                          <option value="journal">Journal Article</option>
                          <option value="website">Website</option>
                          <option value="newspaper">Newspaper</option>
                        </select>
                        {errors.source && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.source.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="style"
                          className="block mb-2 text-sm font-medium text-gray-700"
                        >
                          Citation Style
                        </label>
                        <select
                          id="style"
                          {...register("style", {
                            required: "Citation Style is required",
                          })}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="apa">APA</option>
                          <option value="mla">MLA</option>
                          <option value="chicago">Chicago</option>
                          <option value="harvard">Harvard</option>
                        </select>
                        {errors.style && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.style.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="title"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        {...register("title", {
                          required: "Title is required",
                        })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter title..."
                      />
                      {errors.title && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.title.message}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="author"
                          className="block mb-2 text-sm font-medium text-gray-700"
                        >
                          Author
                        </label>
                        <input
                          type="text"
                          id="author"
                          {...register("author", {
                            required: "Author is required",
                          })}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter author name..."
                        />
                        {errors.author && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.author.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="year"
                          className="block mb-2 text-sm font-medium text-gray-700"
                        >
                          Year
                        </label>
                        <input
                          type="text"
                          id="year"
                          {...register("year", {
                            required: "Publication year is required",
                          })}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter publication year..."
                        />
                        {errors.year && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.year.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={status === "pending" || isValid}
                      className={`px-5 py-2 rounded-lg text-white font-medium flex items-center gap-2 transition-colors ${
                        status === "pending" || isValid
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
                        <>Generate Citation</>
                      )}
                    </button>
                  </form>
                </div>
              </div>

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
                      Generated Citation
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
                        <p className="text-gray-500">
                          Creating your citation...
                        </p>
                      </div>
                    ) : data ? (
                      <div className="flex flex-col h-full">
                        <div className="flex-grow">
                          <p className="text-gray-700 p-4 bg-white border border-gray-200 rounded-lg">
                            {data}
                          </p>
                        </div>
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
                                d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                              />
                            </svg>
                            Copy to Clipboard
                          </button>
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
                          Your citation will appear here
                        </p>
                        <p className="text-sm text-gray-400 mt-2">
                          Fill out the form and click "Generate Citation"
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-4">
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                      <h3 className="text-sm font-medium text-blue-800 mb-1">
                        Citation Style Guide
                      </h3>
                      <p className="text-xs text-blue-700">
                        {errors.style?.message
                          ? "Please select a citation style"
                          : errors.style?.type === "required"
                          ? "Please select a citation style"
                          : styleValue === "apa"
                          ? "APA: Author, A. A. (Year). Title of work. Publisher."
                          : styleValue === "mla"
                          ? "MLA: Author. Title of Work. Publisher, Year."
                          : styleValue === "chicago"
                          ? "Chicago: Author, Title of Work (Publisher, Year)."
                          : "Harvard: Author (Year) Title of work. Publisher."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

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
                    Enter Source Details
                  </h4>
                  <p className="text-gray-600">
                    Provide information about your source including title,
                    author, and year
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-blue-600 text-xl font-bold">2</span>
                  </div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">
                    Choose Style
                  </h4>
                  <p className="text-gray-600">
                    Select your preferred citation style (APA, MLA, Chicago, or
                    Harvard)
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-blue-600 text-xl font-bold">3</span>
                  </div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">
                    Get Citation
                  </h4>
                  <p className="text-gray-600">
                    Receive a properly formatted citation ready to use in your
                    academic work
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

export default CitationGenerator;
