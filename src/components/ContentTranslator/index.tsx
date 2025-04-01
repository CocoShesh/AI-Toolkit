import { useState } from "react";
import Header from "../Header";
import { motion } from "framer-motion";
import useScrollToTop from "../../hooks/useScrollToTop";
import { languages } from "../../utils/types/data";
// import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { formdata } from "../../utils/types";
import { useForm } from "react-hook-form";
import { useGenerateContent } from "../../utils/useGenerateContent";
const ContentTranslator = ({ onBack }: { onBack: () => void }) => {
  useScrollToTop();
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<formdata>();

  const { mutate, status, data } = useGenerateContent();

  const isValid = !watch("userInput") || !selectedLanguage;
  const onSubmit = handleSubmit(data => {
    const formattedInput = `You are an expert translator fluent in multiple languages. Your task is to accurately translate the given text while preserving its original meaning, tone, and context.

    First, identify the language of the original text:
    Original Text: ${data.userInput}

    Then, translate it into the selected language:
    Translated Text into ${selectedLanguage}:

    Ensure that the translation is grammatically correct, fluent, and culturally appropriate. If there are multiple possible interpretations, choose the most contextually appropriate translation and provide alternatives if necessary.

    Output only the formatted translation without additional explanations, labels, or commentary.`;

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

            <form onSubmit={onSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
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
                              d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                            />
                          </svg>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800">
                          Source Text
                        </h2>
                      </div>
                    </div>

                    <textarea
                      {...register("userInput")}
                      className="w-full min-h-[300px] p-4 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                      placeholder="Enter text to translate..."
                    />

                    {errors.userInput && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.userInput.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
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
                          Translated Text
                        </h2>
                      </div>
                      <div className="w-[200px]">
                        <Select
                          isSearchable
                          options={languages.map(item => ({
                            label: item.languageName,
                            value: item.languageName,
                          }))}
                          onChange={selectedOption =>
                            setSelectedLanguage(selectedOption?.value ?? "")
                          }
                        />
                      </div>
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
                            Translating your text...
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
                              d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                            />
                          </svg>
                          <p className="text-gray-500">
                            Your translated text will appear here
                          </p>
                          <p className="text-sm text-gray-400 mt-2">
                            Enter text and click "Translate"
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  disabled={status === "pending" || isValid}
                  className={`px-6 py-3 rounded-lg text-white font-medium flex items-center gap-2 transition-colors ${
                    status === "pending" || isValid
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
                      Translating...
                    </>
                  ) : (
                    <>Translate</>
                  )}
                </button>
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
                    Enter Text
                  </h4>
                  <p className="text-gray-600">
                    Paste or type your content, and the AI will automatically
                    recognize the language you inputted.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-blue-600 text-xl font-bold">2</span>
                  </div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">
                    Choose Language
                  </h4>
                  <p className="text-gray-600">
                    Select the target language you want to translate your
                    content into
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-blue-600 text-xl font-bold">3</span>
                  </div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">
                    Get Translation
                  </h4>
                  <p className="text-gray-600">
                    Receive your translated text with preserved meaning and
                    context
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

export default ContentTranslator;
