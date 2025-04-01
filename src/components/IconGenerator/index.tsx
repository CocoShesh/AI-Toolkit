"use client";

import { RefreshCw, Grid } from "lucide-react";
import Header from "../Header";
import { useGenerateImage } from "../../utils/useGenerateImage";
import type { formdata } from "../../utils/types";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useScrollToTop from "../../hooks/useScrollToTop";

const IconGenerator = ({ onBack }: { onBack: () => void }) => {
  useScrollToTop();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<formdata>();
  const { mutate, data, status } = useGenerateImage();
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const selectedStyle = watch("style") || "flat";
  const selectedFormat = watch("format") || "svg";
  useEffect(() => {
    if (data && data.length > 0) {
      setSelectedIcon(data[0]);
    }
  }, [data]);
  const onSubmit = handleSubmit(data => {
    const prompt = `Generate a high-quality icon image based on the following details:
  
    - Description: ${data.description}.
    - Style: The icon should have a ${selectedStyle} style, focusing on clean lines, proper contrast, and clarity.
    - Format: The icon should be in png format, optimized for both web and mobile usage. 
    - Characteristics: It should be professional, scalable, and easy to recognize, even at smaller sizes. The design must be unique, minimalistic, and visually appealing.
  
  Please generate an 4  image based on these details.`;

    mutate({ userMessage: prompt });
  });

  const iconStyle = [
    { id: "flat", label: "Flat" },
    { id: "outline", label: "Outline" },
    { id: "filled", label: "Filled" },
    { id: "gradient", label: "Gradient" },
    { id: "3d", label: "3d Render" },
    { id: "pixel", label: "pixel" },
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 ">
        <Header />
        <div className="max-w-7xl mx-auto mt-5 pb-10">
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
          <form onSubmit={onSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Icon Settings
                </h2>

                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Icon Description
                    </label>
                    <textarea
                      id="description"
                      {...register("description", {
                        required: "Description is required",
                      })}
                      className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Describe the icon you want to create (e.g., 'A minimalist rocket icon for a space app')"
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Icon Style
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {iconStyle.map(style => (
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
                            {...register("style")}
                            className="sr-only"
                          />
                          <span className="text-sm font-medium">
                            {style.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
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
                        Generating Icon...
                      </>
                    ) : (
                      <>Generate Icon</>
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Icon Preview
                </h2>

                <div className="bg-gray-100 rounded-lg border border-gray-200 h-[300px] flex items-center justify-center overflow-hidden">
                  {status === "pending" ? (
                    <div className="text-center">
                      <RefreshCw className="h-10 w-10 text-blue-500 animate-spin mx-auto mb-4" />
                      <p className="text-gray-500">Generating your icon...</p>
                      <p className="text-sm text-gray-400 mt-2">
                        This may take a moment
                      </p>
                    </div>
                  ) : data ? (
                    <img
                      src={`data:image/png;base64,${selectedIcon}`}
                      alt="Generated Icon"
                      className="max-w-[200px] max-h-[200px] object-contain"
                    />
                  ) : (
                    <div className="text-center">
                      <Grid className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">
                        Your icon will appear here
                      </p>
                      <p className="text-sm text-gray-400 mt-2">
                        Fill out the form and click "Generate Icon"
                      </p>
                    </div>
                  )}
                </div>

                {data && (
                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      Icon Variations
                    </h3>
                    <div className="grid grid-cols-4 gap-4">
                      {data.map((item, i) => (
                        <div
                          key={i}
                          onClick={() => setSelectedIcon(item)}
                          className="bg-white border border-gray-200 cursor-pointer rounded-lg p-3 flex items-center justify-center h-fit"
                        >
                          <motion.div
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.8 }}
                          >
                            <img
                              src={`data:image/png;base64,${item}`}
                              alt={`Icon variation ${i + 1}`}
                              className="max-w-full max-h-full object-contain"
                              style={{
                                filter:
                                  i === 0
                                    ? "none"
                                    : i === 1
                                    ? "hue-rotate(90deg)"
                                    : i === 2
                                    ? "hue-rotate(180deg)"
                                    : "hue-rotate(270deg)",
                              }}
                            />
                          </motion.div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex justify-end">
                      <a
                        href={`data:image/${selectedFormat.toLowerCase()};base64,${selectedIcon}`}
                        download={`generated-icon.png`}
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
                  </div>
                )}
              </div>
            </div>
          </form>
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
                  Describe Your Icon
                </h4>
                <p className="text-gray-600">
                  Enter a detailed description of the icon you need and select
                  your preferred style
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
                  Our AI creates a custom icon based on your description, with
                  multiple variations to choose from
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-blue-600 text-xl font-bold">3</span>
                </div>
                <h4 className="text-lg font-medium text-gray-800 mb-2">
                  Export & Use
                </h4>
                <p className="text-gray-600">
                  Download your icon. The downloaded icon is the one displayed
                  in the main picture, which is the icon you selected. It's
                  ready to be used in your applications, websites, or designs.
                </p>
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconGenerator;
