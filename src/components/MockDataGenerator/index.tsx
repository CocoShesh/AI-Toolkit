"use client";

import { useMemo, useState } from "react";
import {
  RefreshCw,
  Download,
  Copy,
  CheckCircle2,
  FileJson,
  Info,
} from "lucide-react";
import type { formdata } from "../../utils/types";
import { useForm } from "react-hook-form";
import useScrollToTop from "../../hooks/useScrollToTop";
import { useGenerateContent } from "../../utils/useGenerateContent";
import Header from "../Header";
import { motion } from "framer-motion";

const MockDataGenerator = ({ onBack }: { onBack: () => void }) => {
  useScrollToTop();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<formdata>({
    defaultValues: {
      number: 10,
    },
  });

  const { mutate, status, data: generatedData } = useGenerateContent();
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {};

  const onSubmit = handleSubmit(data => {
    const prompt = `You are a random data generator. Your task is to generate realistic random data based on the following instructions:

    1. Number of data entries: ${data.number}
    2. Output format: ${
      mockFormat.find(f => f.id === data.format)?.label || "json"
    } 
    3. Fields to include: ${data.userInput}

    Instructions:
    - The data must look authentic, avoiding placeholder values like "example.com" or "test123".
    - Only return the generated data in the specified format.
    - Do not include any formatting markers (example., \`\`\`json, \`\`\`sql).
    - No explanations, headers, or comments—just the raw data.


`;

    mutate({ userMessage: prompt });
  });
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedData || "");
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const mockFormat = [
    { id: "json", label: "json" },
    { id: "csv", label: "csv" },
    { id: "sql", label: "sql" },
  ];

  const downloadUrl = useMemo(() => {
    if (!generatedData) return "";

    let mimeType = "application/json";
    if (watch("format") === "csv") {
      mimeType = "text/csv";
    } else if (watch("format") === "sql") {
      mimeType = "application/sql";
    }

    return `data:${mimeType};charset=utf-8,${encodeURIComponent(
      generatedData
    )}`;
  }, [generatedData, watch]);

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <div className=" mx-auto px-4 ">
        <Header toolName="Development" />
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
              {/* Controls Panel */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Data Settings
                </h2>

                <form onSubmit={onSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="recordCount"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Number of Records
                    </label>
                    <input
                      id="recordCount"
                      type="number"
                      min="1"
                      max="1000"
                      {...register("number", {
                        required: "Number of data is required",
                      })}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.number && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.number.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Output Format
                    </label>
                    <div className="flex space-x-4">
                      {mockFormat.map(formatOption => (
                        <label
                          key={formatOption.id}
                          className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-colors ${
                            watch("format") === formatOption.id
                              ? "bg-blue-50 border-blue-300"
                              : "bg-white border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          <input
                            type="radio"
                            value={formatOption.id}
                            {...register("format", {
                              required: "Format is required",
                            })}
                            className="sr-only"
                          />
                          <span className="text-sm font-medium">
                            {formatOption.label}
                          </span>
                        </label>
                      ))}
                    </div>
                    {errors.format && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.format.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor="fieldsInput"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Fields (comma separated)
                      </label>
                      <div className="flex items-center text-xs text-blue-600">
                        <Info className="h-3 w-3 mr-1" />
                        <span>Add any fields you need</span>
                      </div>
                    </div>
                    <textarea
                      id="fieldsInput"
                      {...register("userInput", {
                        required: "Fields Input is required",
                      })}
                      className="w-full h-20 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                      placeholder="id, name, email, custom_field1, custom_field2, ..."
                    />
                    {errors.userInput && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.userInput.message}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={handleGenerate}
                    disabled={status === "pending"}
                    className={`w-full py-3 px-4 rounded-lg text-white font-medium flex items-center justify-center gap-2 ${
                      status === "pending"
                        ? "bg-blue-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {status === "pending" ? (
                      <>
                        <RefreshCw className="h-5 w-5 animate-spin" />
                        Generating Data...
                      </>
                    ) : (
                      <>Generate Mock Data</>
                    )}
                  </button>
                </form>
              </div>

              {/* Preview Panel */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Generated Data
                  </h2>

                  {generatedData && (
                    <div className="flex space-x-2">
                      <button
                        onClick={copyToClipboard}
                        className="flex items-center gap-1 py-1.5 px-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        {copied ? (
                          <>
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            <span className="text-sm">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            <span className="text-sm">Copy</span>
                          </>
                        )}
                      </button>

                      {downloadUrl && (
                        <a
                          href={downloadUrl}
                          download={`mock-data.${watch("format")}`}
                          className="flex items-center gap-1 py-1.5 px-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Download className="h-4 w-4" />
                          <span className="text-sm">Download</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>

                <div className="bg-gray-100 rounded-lg border border-gray-200 h-[400px] overflow-auto">
                  {status === "pending" ? (
                    <div className="flex flex-col items-center justify-center h-full">
                      <RefreshCw className="h-10 w-10 text-blue-500 animate-spin mx-auto mb-4" />
                      <p className="text-gray-500">
                        Generating your mock data...
                      </p>
                      <p className="text-sm text-gray-400 mt-2">
                        This may take a moment
                      </p>
                    </div>
                  ) : generatedData ? (
                    <pre className="p-4 text-sm font-mono whitespace-pre-wrap">
                      {generatedData}
                    </pre>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                      <FileJson className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">
                        Your generated data will appear here
                      </p>
                      <p className="text-sm text-gray-400 mt-2">
                        Configure your settings and click "Generate Mock Data"
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* How It Works Section */}
            <div className="mt-16 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                How Mock Data Generator Works
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <span className="text-blue-600 text-2xl font-bold">1</span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    Specify Your Data
                  </h3>
                  <p className="text-gray-600">
                    Choose data type and enter the fields you need, separated by
                    commas
                  </p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <span className="text-blue-600 text-2xl font-bold">2</span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    AI Generation
                  </h3>
                  <p className="text-gray-600">
                    Our AI creates realistic, contextually appropriate data for
                    all your fields
                  </p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <span className="text-blue-600 text-2xl font-bold">3</span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    Export & Use
                  </h3>
                  <p className="text-gray-600">
                    Download your data in JSON, CSV, or SQL format for immediate
                    use in your applications
                  </p>
                </div>
              </div>

              <div className="mt-8 bg-blue-50 rounded-lg p-4 border border-blue-100">
                <h4 className="font-medium text-blue-700 mb-2">Pro Tip</h4>
                <p className="text-blue-600">
                  You can add any custom fields you need - just include them in
                  the comma-separated list. The AI will generate appropriate
                  values for standard fields and placeholder values for custom
                  fields.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MockDataGenerator;
