"use client";

import { useForm } from "react-hook-form";
import type { formdata } from "../../utils/types";
import { useGenerateImage } from "../../utils/useGenerateImage";
import Header from "../Header";
import { motion } from "framer-motion";
import useScrollToTop from "../../hooks/useScrollToTop";

const LogoMaker = ({ onBack }: { onBack: () => void }) => {
  useScrollToTop();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<formdata>();

  const { mutate, status, data: generatedImage } = useGenerateImage();

  const selectedStyle = watch("logoStyle") || "minimalist";
  const selectedColor = watch("colorScheme") || "blue";

  const onSubmit = handleSubmit(data => {
    const prompt = `Generate a high-quality logo for a ${data.industry} company named "${data.companyName}". 
    The logo should incorporate the following concept: ${data.concept} and feature a visually appealing color scheme. 
    Only display the logo without any additional text or descriptions.`;

    mutate({ userMessage: prompt });
  });

  const logoStyles = [
    { id: "minimalist", label: "Minimalist" },
    { id: "modern", label: "Modern" },
    { id: "vintage", label: "Vintage" },
    { id: "playful", label: "Playful" },
    { id: "geometric", label: "Geometric" },
    { id: "abstract", label: "Abstract" },
  ];

  const colorSchemes = [
    { id: "blue", label: "Blue" },
    { id: "green", label: "Green" },
    { id: "red", label: "Red" },
    { id: "purple", label: "Purple" },
    { id: "monochrome", label: "Monochrome" },
    { id: "gradient", label: "Gradient" },
  ];

  const industries = [
    "Technology",
    "Finance",
    "Healthcare",
    "Education",
    "Food & Beverage",
    "Retail",
    "Entertainment",
    "Real Estate",
    "Fitness",
    "Travel",
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <div className="mx-auto px-4 ">
        <Header toolName="Design" />
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
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Logo Details
                    </h2>
                  </div>

                  <form onSubmit={onSubmit} className="space-y-5">
                    <div>
                      <label
                        htmlFor="companyName"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                        Company/Brand Name
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        {...register("companyName", {
                          required: "Company name is required",
                        })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your company or brand name"
                      />
                      {errors.companyName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.companyName.message}
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
                        <option value="">Select an industry</option>
                        {industries.map(industry => (
                          <option key={industry} value={industry}>
                            {industry}
                          </option>
                        ))}
                      </select>
                      {errors.industry && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.industry.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="concept"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                        Logo Concept (Optional)
                      </label>
                      <input
                        type="text"
                        id="concept"
                        {...register("concept")}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="E.g., mountain, shield, leaf, abstract wave"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Logo Style
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {logoStyles.map(style => (
                          <label
                            key={style.id}
                            className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-colors ${
                              selectedStyle === style.id
                                ? "bg-blue-50 border-blue-300"
                                : "bg-white border-gray-200 hover:bg-gray-50"
                            }`}
                          >
                            <input
                              type="radio"
                              value={style.id}
                              {...register("logoStyle")}
                              className="sr-only"
                            />
                            <span className="text-sm font-medium">
                              {style.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Color Scheme
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {colorSchemes.map(scheme => (
                          <label
                            key={scheme.id}
                            className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-colors ${
                              selectedColor === scheme.id
                                ? "bg-blue-50 border-blue-300"
                                : "bg-white border-gray-200 hover:bg-gray-50"
                            }`}
                          >
                            <input
                              type="radio"
                              value={scheme.id}
                              {...register("colorScheme")}
                              className="sr-only"
                            />
                            <span className="text-sm font-medium">
                              {scheme.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={status == "pending"}
                      className={`px-5 py-2 rounded-lg text-white font-medium flex items-center gap-2 transition-colors ${
                        status == "pending"
                          ? "bg-blue-400 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      {status == "pending" ? (
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
                        <>Generate Logo</>
                      )}
                    </button>
                  </form>
                </div>
              </div>

              {/* Logo Preview Card */}
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
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Logo Preview
                    </h2>
                  </div>

                  <div className="min-h-[300px] bg-gray-50 rounded-lg border border-gray-200 p-4 flex items-center justify-center mb-4">
                    {status == "pending" ? (
                      <div className="flex flex-col items-center justify-center text-center">
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
                        <p className="text-gray-500">Creating your logo...</p>
                        <p className="text-sm text-gray-400 mt-2">
                          This may take a moment
                        </p>
                      </div>
                    ) : generatedImage ? (
                      <div className="w-full">
                        <img
                          src={`data:image/png;base64,${generatedImage}`}
                          alt="Generated logo"
                          className="max-w-full max-h-[300px] mx-auto rounded-lg shadow-sm"
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center">
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
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <p className="text-gray-500">
                          Your logo will appear here
                        </p>
                        <p className="text-sm text-gray-400 mt-2">
                          Fill out the form and click "Generate Logo"
                        </p>
                      </div>
                    )}
                  </div>

                  {/* {logoDescription && (
                <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 mb-4">
                  <h3 className="font-medium text-gray-800 mb-2">
                    Logo Description:
                  </h3>
                  <p className="text-sm text-gray-700">{logoDescription}</p>
                </div>
              )} */}

                  {generatedImage && (
                    <div className="flex justify-end space-x-2">
                      <a
                        href={`data:image/png;base64,${generatedImage}`}
                        download="logo.png"
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
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                        Download
                      </a>
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
                    Provide your brand name, industry, and design preferences
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
                    Our AI creates a unique logo based on your specifications
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-blue-600 text-xl font-bold">3</span>
                  </div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">
                    Download & Use
                  </h4>
                  <p className="text-gray-600">
                    Download your logo in high resolution for your branding
                    needs
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

export default LogoMaker;
