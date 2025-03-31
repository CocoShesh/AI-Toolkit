"use client";

import { useForm } from "react-hook-form";
import { useGenerateContent } from "../../utils/useGenerateContent";
import type { formdata } from "../../utils/types";
import Header from "../Header";
import { motion } from "framer-motion";
import useScrollToTop from "../../hooks/useScrollToTop";

const CoverLetterGenerator = ({ onBack }: { onBack: () => void }) => {
  useScrollToTop();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formdata>();

  const { mutate, status, data } = useGenerateContent();

  const onSubmit = handleSubmit(data => {
    const formattedInput = `Generate a professional cover letter for a ${data.jobTitle} position at ${data.company}. 
    
    My name is: ${data.name}
    My experience: ${data.experience}
    Key skills: ${data.skills}
    Job description: ${data.jobDescription}
    
    The cover letter should be formal, professional, and highlight my relevant skills and experience for the position. 
    It should be well-structured with an introduction, body paragraphs, and conclusion.`;

    mutate({ userMessage: formattedInput });
  });

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <div className="mx-auto px-4 ">
        <Header toolName="Writing" />
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
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Cover Letter Details
                    </h2>
                  </div>

                  <form onSubmit={onSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium text-gray-700"
                        >
                          Your Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          {...register("name", {
                            required: "Name is required",
                          })}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="John Doe"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="jobTitle"
                          className="block mb-2 text-sm font-medium text-gray-700"
                        >
                          Job Title
                        </label>
                        <input
                          type="text"
                          id="jobTitle"
                          {...register("jobTitle", {
                            required: "Job title is required",
                          })}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Software Engineer"
                        />
                        {errors.jobTitle && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.jobTitle.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="company"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        {...register("company", {
                          required: "Company name is required",
                        })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="ABC Corporation"
                      />
                      {errors.company && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.company.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="skills"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                        Key Skills (comma separated)
                      </label>
                      <input
                        type="text"
                        id="skills"
                        {...register("skills", {
                          required: "Skills are required",
                        })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Project management, communication, leadership"
                      />
                      {errors.skills && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.skills.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="experience"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                        Relevant Experience
                      </label>
                      <textarea
                        id="experience"
                        {...register("experience", {
                          required: "Experience is required",
                        })}
                        className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                        placeholder="Briefly describe your relevant experience..."
                      />
                      {errors.experience && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.experience.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="jobDescription"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                        Job Description
                      </label>
                      <textarea
                        id="jobDescription"
                        {...register("jobDescription", {
                          required: "Job description is required",
                        })}
                        className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                        placeholder="Paste the job description here..."
                      />
                      {errors.jobDescription && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.jobDescription.message}
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
                          Generating...
                        </>
                      ) : (
                        <>Generate Cover Letter</>
                      )}
                    </button>
                  </form>
                </div>
              </div>

              {/* Cover Letter Card */}
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
                      Generated Cover Letter
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
                          Creating your cover letter...
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
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <p className="text-gray-500">
                          Your cover letter will appear here
                        </p>
                        <p className="text-sm text-gray-400 mt-2">
                          Fill out the form and click "Generate Cover Letter"
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
                    Enter Details
                  </h4>
                  <p className="text-gray-600">
                    Provide your information, job details, and relevant
                    experience
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
                    Our AI creates a tailored cover letter highlighting your
                    qualifications
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-blue-600 text-xl font-bold">3</span>
                  </div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">
                    Review & Use
                  </h4>
                  <p className="text-gray-600">
                    Edit as needed and use your professional cover letter for
                    job applications
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

export default CoverLetterGenerator;
