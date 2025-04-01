import { useState } from "react";
import Header from "../Header";
import { motion } from "framer-motion";
import useScrollToTop from "../../hooks/useScrollToTop";

const WordCounter = ({ onBack }: { onBack: () => void }) => {
  useScrollToTop();
  const [text, setText] = useState("");
  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const charCount = text.length;
  const sentenceCount =
    text.trim() === "" ? 0 : text.split(/[.!?]+/).filter(Boolean).length;
  const paragraphCount =
    text.trim() === ""
      ? 0
      : text.split(/\n+/).filter(s => s.trim().length > 0).length;

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <div className="mx-auto px-4 ">
        <Header toolName="Analysis" />
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden lg:col-span-2">
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
                      Your Text
                    </h2>
                  </div>

                  <textarea
                    value={text}
                    onChange={e => setText(e.target.value)}
                    className="w-full min-h-[300px] p-4 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    placeholder="Type or paste your text here..."
                  ></textarea>

                  <div className="mt-4 flex justify-between text-sm text-gray-500">
                    {text && (
                      <button
                        onClick={() => setText("")}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        Clear Text
                      </button>
                    )}
                    <span>{charCount} characters</span>
                  </div>
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
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Text Statistics
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 text-center">
                      <div className="text-4xl font-bold text-blue-600 mb-1">
                        {wordCount}
                      </div>
                      <div className="text-sm text-gray-600">Words</div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
                      <div className="text-3xl font-bold text-gray-700 mb-1">
                        {charCount}
                      </div>
                      <div className="text-sm text-gray-600">Characters</div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
                      <div className="text-3xl font-bold text-gray-700 mb-1">
                        {sentenceCount}
                      </div>
                      <div className="text-sm text-gray-600">Sentences</div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
                      <div className="text-3xl font-bold text-gray-700 mb-1">
                        {paragraphCount}
                      </div>
                      <div className="text-sm text-gray-600">Paragraphs</div>
                    </div>
                  </div>

                  <div className="mt-6 text-sm text-gray-600">
                    <p className="mb-2">
                      <strong>Reading Time:</strong>{" "}
                      {Math.ceil(wordCount / 200)} min
                    </p>
                    <p>
                      <strong>Speaking Time:</strong>{" "}
                      {Math.ceil(wordCount / 130)} min
                    </p>
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
                    Enter Text
                  </h4>
                  <p className="text-gray-600">
                    Paste or type your content into the text area
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-blue-600 text-xl font-bold">2</span>
                  </div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">
                    Instant Analysis
                  </h4>
                  <p className="text-gray-600">
                    Get real-time statistics as you type or paste content
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-blue-600 text-xl font-bold">3</span>
                  </div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">
                    View Statistics
                  </h4>
                  <p className="text-gray-600">
                    See detailed word, character, sentence, and paragraph counts
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

export default WordCounter;
