import { RefreshCw, Check, X, Copy, FileText } from "lucide-react";
import useScrollToTop from "../../hooks/useScrollToTop";
import { formdata } from "../../utils/types";
import { useForm } from "react-hook-form";
import { useGenerateContent } from "../../utils/useGenerateContent";
import Header from "../Header";
import { motion } from "framer-motion";
import { useState } from "react";

const RegexGenerator = ({ onBack }: { onBack: () => void }) => {
  useScrollToTop();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<formdata>();

  const [testString, setTestString] = useState("");
  const [testResults, setTestResults] = useState<boolean | null>(null);
  const { mutate, status, data: regexData } = useGenerateContent();

  const onSubmit = handleSubmit(data => {
    const prompt = `
    You are a regex generator. Your task is to create a specific regular expression (regex) based on the following instructions:
    
    1. The description of what the regex should match: "${data.description}"
    2. The type of regex expression required: ${data.type} (Choose between validation, extraction, or replacement)
    3. You should only provide the regex pattern itself—no explanations, examples, or comments.
    
    Make sure the regex expression is precise, efficient, and tailored to the description provided.
    `;
    setTestString("");
    mutate({ userMessage: prompt });
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleTestRegex = () => {
    if (!testString.trim()) {
      setTestResults(null);
      return;
    }
    if (regexData) {
      try {
        const regex = new RegExp(regexData.trim());
        const matchResult = regex.test(testString);
        setTestResults(matchResult);
      } catch (error) {
        setTestResults(false);
      }
    }
  };

  const regexType = [
    { id: "validation", label: "Validation" },
    { id: "extraction", label: "Extraction" },
    { id: "replacement", label: "Replacement" },
  ];

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
                  Regex Settings
                </h2>

                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      What do you need a regex for?
                    </label>
                    <textarea
                      id="description"
                      {...register("description", {
                        required: "Description is required",
                      })}
                      className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Describe what you need (e.g., 'Validate email addresses', 'Extract URLs from text', 'Match dates in MM/DD/YYYY format')"
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  <form onSubmit={onSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Regex Type
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {regexType.map(style => (
                          <label
                            key={style.id}
                            className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-colors ${
                              watch("type") === style.id
                                ? "bg-blue-50 border-blue-300"
                                : "bg-white border-gray-200 hover:bg-gray-50"
                            }`}
                          >
                            <input
                              type="radio"
                              value={style.id}
                              {...register("type")}
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
                      className={`w-full py-3 px-4 rounded-lg text-white font-medium flex items-center justify-center gap-2 ${
                        status === "pending"
                          ? "bg-blue-400 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      {status === "pending" ? (
                        <>
                          <RefreshCw className="h-5 w-5 animate-spin" />
                          Generating Regex...
                        </>
                      ) : (
                        <>Generate Regular Expression</>
                      )}
                    </button>
                  </form>
                </div>
              </div>

              {/* Preview Panel */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Regex Preview
                </h2>

                <div className="space-y-6">
                  {status === "pending" ? (
                    <div className="flex flex-col items-center justify-center h-[200px]">
                      <RefreshCw className="h-10 w-10 text-blue-500 animate-spin mx-auto mb-4" />
                      <p className="text-gray-500">
                        Generating your regex pattern...
                      </p>
                      <p className="text-sm text-gray-400 mt-2">
                        This may take a moment
                      </p>
                    </div>
                  ) : regexData ? (
                    <>
                      <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-sm font-medium text-gray-700">
                            Generated Pattern
                          </h3>
                          <button
                            onClick={() => copyToClipboard(regexData)}
                            className="p-1 text-gray-500 hover:text-blue-600"
                            title="Copy to clipboard"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="font-mono text-sm bg-white p-3 rounded border border-gray-300 overflow-x-auto">
                          {regexData}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-2">
                          Test Your Regex
                        </h3>
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={testString}
                            onChange={e => {
                              setTestString(e.target.value);
                              setTestResults(null);
                            }}
                            className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter text to test..."
                          />
                          <button
                            onClick={handleTestRegex}
                            disabled={!testString}
                            className={`px-4 py-2 rounded-lg text-white ${
                              !testString
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                            }`}
                          >
                            Test
                          </button>
                        </div>

                        {testResults !== null && (
                          <div
                            className={`mt-3 p-3 rounded-lg flex items-center ${
                              testResults
                                ? "bg-green-50 text-green-700"
                                : "bg-red-50 text-red-700"
                            }`}
                          >
                            {testResults ? (
                              <>
                                <Check className="h-5 w-5 mr-2" />
                                <span>
                                  Match found! Your text matches the pattern.
                                </span>
                              </>
                            ) : (
                              <>
                                <X className="h-5 w-5 mr-2" />
                                <span>
                                  No match. Your text doesn't match the pattern.
                                </span>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[200px]">
                      <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">
                        Your regex pattern will appear here
                      </p>
                      <p className="text-sm text-gray-400 mt-2">
                        Describe what you need and click "Generate Regular
                        Expression"
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RegexGenerator;
