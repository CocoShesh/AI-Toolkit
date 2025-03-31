import { useState } from "react";
import { useGenerateContent } from "../../utils/useGenerateContent";
import { ParaphraseMode } from "../../utils/types";
import Header from "../Header";
import { motion } from "framer-motion";
import useScrollToTop from "../../hooks/useScrollToTop";

const Paraphraser = ({ onBack }: { onBack: () => void }) => {
  useScrollToTop();
  const { mutate, status, data } = useGenerateContent();
  const [userInput, setUserInput] = useState<string>("");
  const [mode, setMode] = useState<ParaphraseMode>("standard");

  const handleParaphraseContent = () => {
    const modeInstructions = {
      standard: "Paraphrase this text while maintaining the original meaning",
      fluency: "Paraphrase this text to improve flow and readability",
      humanize:
        "Paraphrase this text to sound more conversational and human-like",
      academic: "Paraphrase this text to use more formal, academic language",
      simple:
        "Paraphrase this text to use simpler language and be easier to understand",
    };

    const formattedInput = `${modeInstructions[mode]}: ${userInput}`;
    mutate({ userMessage: formattedInput });
  };

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

            {/* Paraphrasing Mode Selector */}
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
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Paraphrasing Mode
                </h2>
              </div>

              <div className="flex flex-wrap w-full rounded-lg overflow-hidden border border-gray-200">
                {(
                  [
                    "standard",
                    "fluency",
                    "humanize",
                    "academic",
                    "simple",
                  ] as ParaphraseMode[]
                ).map(modeOption => (
                  <button
                    key={modeOption}
                    onClick={() => setMode(modeOption)}
                    className={`py-3 px-4 text-sm font-medium transition-colors cursor-pointer flex-1 min-w-[120px] ${
                      mode === modeOption
                        ? "bg-blue-600 text-white"
                        : "bg-white hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    {modeOption.charAt(0).toUpperCase() + modeOption.slice(1)}
                  </button>
                ))}
              </div>

              <div className="mt-4 text-sm text-gray-600">
                <strong className="font-medium">Current Mode:</strong>{" "}
                {mode.charAt(0).toUpperCase() + mode.slice(1)} -
                {mode === "standard" &&
                  " Maintains original meaning with new wording"}
                {mode === "fluency" && " Improves flow and readability"}
                {mode === "humanize" && " Makes text sound more conversational"}
                {mode === "academic" && " Uses formal, academic language"}
                {mode === "simple" &&
                  " Simplifies language for easier understanding"}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Original Text Card */}
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
                      Original Text
                    </h2>
                  </div>

                  <textarea
                    id="original"
                    value={userInput}
                    onChange={e => setUserInput(e.target.value)}
                    className="w-full min-h-[300px] p-4 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    placeholder="Enter text to paraphrase..."
                  ></textarea>
                </div>
              </div>

              {/* Paraphrased Text Card */}
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
                          d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                        />
                      </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Paraphrased Text ({mode})
                    </h2>
                  </div>

                  <div className="min-h-[300px] bg-gray-50 rounded-lg border border-gray-200 p-4 overflow-auto">
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
                          Paraphrasing your text...
                        </p>
                      </div>
                    ) : data ? (
                      <p className="text-gray-700">{data}</p>
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
                            d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                          />
                        </svg>
                        <p className="text-gray-500">
                          Your paraphrased text will appear here
                        </p>
                        <p className="text-sm text-gray-400 mt-2">
                          Enter text and click "Paraphrase"
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Paraphrase Button */}
            <div className="flex justify-center mt-6">
              <button
                onClick={handleParaphraseContent}
                disabled={status === "pending" || !userInput.trim()}
                className={`px-6 py-3 rounded-lg text-white font-medium flex items-center gap-2 transition-colors ${
                  status === "pending" || !userInput.trim()
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {status === "pending" ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
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
                    Paraphrasing...
                  </>
                ) : (
                  <>Paraphrase</>
                )}
              </button>
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
                    Paste or type your content that you want to paraphrase
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-blue-600 text-xl font-bold">2</span>
                  </div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">
                    Select Mode
                  </h4>
                  <p className="text-gray-600">
                    Choose the paraphrasing style that best fits your needs
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
                    Receive your paraphrased text with the same meaning but
                    different wording
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

export default Paraphraser;
