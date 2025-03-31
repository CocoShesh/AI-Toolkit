// "use client";

// import { useState } from "react";
// import Header from "../Header";
// import { motion } from "framer-motion";
// import useScrollToTop from "../../hooks/useScrollToTop";

// const ResumeBuilder = ({ onBack }: { onBack: () => void }) => {
//   useScrollToTop();
//   const [isGenerating, setIsGenerating] = useState(false);

//   const handleGenerateResume = () => {
//     setIsGenerating(true);
//     setTimeout(() => {
//       setIsGenerating(false);
//     }, 2000);
//   };

//   return (
//     <div className="bg-[#f8fafc] min-h-screen">
//       <div className=" mx-auto px-4 ">
//         <Header />
//         <div className="max-w-7xl mx-auto mt-5 pb-10">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3, delay: 2 * 0.05 }}
//           >
//             <div className="mb-6">
//               <button
//                 onClick={onBack}
//                 className="flex items-center cursor-pointer text-blue-600 hover:text-blue-800 transition-colors"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5 mr-1"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//                 Back to Tools
//               </button>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//               {/* Form Card */}
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden lg:col-span-2">
//                 <div className="p-6">
//                   <div className="flex items-center mb-4">
//                     <div className="bg-blue-100 p-2 rounded-lg mr-3">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-6 w-6 text-blue-600"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                         />
//                       </svg>
//                     </div>
//                     <h2 className="text-xl font-semibold text-gray-800">
//                       Personal Information
//                     </h2>
//                   </div>

//                   <div className="space-y-5">
//                     <div className="grid md:grid-cols-2 gap-4">
//                       <div>
//                         <label
//                           htmlFor="name"
//                           className="block mb-2 text-sm font-medium text-gray-700"
//                         >
//                           Full Name
//                         </label>
//                         <input
//                           type="text"
//                           id="name"
//                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                           placeholder="Enter your full name..."
//                         />
//                       </div>
//                       <div>
//                         <label
//                           htmlFor="title"
//                           className="block mb-2 text-sm font-medium text-gray-700"
//                         >
//                           Professional Title
//                         </label>
//                         <input
//                           type="text"
//                           id="title"
//                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                           placeholder="e.g. Software Engineer, Marketing Manager..."
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <label
//                         htmlFor="experience"
//                         className="block mb-2 text-sm font-medium text-gray-700"
//                       >
//                         Work Experience
//                       </label>
//                       <textarea
//                         id="experience"
//                         className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
//                         placeholder="Enter your work experience details..."
//                       ></textarea>
//                     </div>

//                     <div>
//                       <label
//                         htmlFor="education"
//                         className="block mb-2 text-sm font-medium text-gray-700"
//                       >
//                         Education
//                       </label>
//                       <textarea
//                         id="education"
//                         className="w-full h-24 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
//                         placeholder="Enter your education details..."
//                       ></textarea>
//                     </div>

//                     <div>
//                       <label
//                         htmlFor="skills"
//                         className="block mb-2 text-sm font-medium text-gray-700"
//                       >
//                         Skills (comma separated)
//                       </label>
//                       <input
//                         type="text"
//                         id="skills"
//                         className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="Enter your skills..."
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Options Card */}
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//                 <div className="p-6">
//                   <div className="flex items-center mb-4">
//                     <div className="bg-blue-100 p-2 rounded-lg mr-3">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-6 w-6 text-blue-600"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
//                         />
//                       </svg>
//                     </div>
//                     <h2 className="text-xl font-semibold text-gray-800">
//                       Resume Options
//                     </h2>
//                   </div>

//                   <div className="space-y-5">
//                     <div>
//                       <label
//                         htmlFor="template"
//                         className="block mb-2 text-sm font-medium text-gray-700"
//                       >
//                         Template Style
//                       </label>
//                       <select
//                         id="template"
//                         className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       >
//                         <option value="modern">Modern</option>
//                         <option value="classic">Classic</option>
//                         <option value="minimal">Minimal</option>
//                         <option value="creative">Creative</option>
//                       </select>
//                     </div>

//                     <div>
//                       <label
//                         htmlFor="format"
//                         className="block mb-2 text-sm font-medium text-gray-700"
//                       >
//                         Output Format
//                       </label>
//                       <select
//                         id="format"
//                         className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       >
//                         <option value="pdf">PDF</option>
//                         <option value="docx">Word (DOCX)</option>
//                         <option value="txt">Plain Text</option>
//                       </select>
//                     </div>

//                     <div>
//                       <label className="block mb-2 text-sm font-medium text-gray-700">
//                         Color Scheme
//                       </label>
//                       <div className="flex gap-2">
//                         <button className="w-8 h-8 rounded-full bg-blue-600 border-2 border-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"></button>
//                         <button className="w-8 h-8 rounded-full bg-green-600 border-2 border-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"></button>
//                         <button className="w-8 h-8 rounded-full bg-purple-600 border-2 border-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"></button>
//                         <button className="w-8 h-8 rounded-full bg-gray-800 border-2 border-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"></button>
//                         <button className="w-8 h-8 rounded-full bg-red-600 border-2 border-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"></button>
//                       </div>
//                     </div>

//                     <button
//                       onClick={handleGenerateResume}
//                       className={`w-full px-5 py-3 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition-colors ${
//                         isGenerating
//                           ? "bg-blue-400 cursor-not-allowed"
//                           : "bg-blue-600 hover:bg-blue-700"
//                       }`}
//                     >
//                       {isGenerating ? (
//                         <>
//                           <svg
//                             className="animate-spin h-5 w-5 text-white"
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                           >
//                             <circle
//                               className="opacity-25"
//                               cx="12"
//                               cy="12"
//                               r="10"
//                               stroke="currentColor"
//                               strokeWidth="4"
//                             ></circle>
//                             <path
//                               className="opacity-75"
//                               fill="currentColor"
//                               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                             ></path>
//                           </svg>
//                           Generating...
//                         </>
//                       ) : (
//                         <>Generate Resume</>
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Preview Card */}
//             <div className="mt-6">
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//                 <div className="p-6">
//                   <div className="flex items-center mb-4">
//                     <div className="bg-blue-100 p-2 rounded-lg mr-3">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-6 w-6 text-blue-600"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                         />
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                         />
//                       </svg>
//                     </div>
//                     <h2 className="text-xl font-semibold text-gray-800">
//                       Resume Preview
//                     </h2>
//                   </div>

//                   <div className="min-h-[300px] bg-gray-50 rounded-lg border border-gray-200 p-4 flex items-center justify-center">
//                     <div className="text-center">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-16 w-16 text-gray-300 mx-auto mb-4"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                         />
//                       </svg>
//                       <p className="text-gray-500">
//                         Your generated resume will appear here
//                       </p>
//                       <p className="text-sm text-gray-400 mt-2">
//                         Fill out the form and click "Generate Resume"
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Features Section */}
//             <div className="mt-12">
//               <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
//                 How It Works
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//                   <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
//                     <span className="text-blue-600 text-xl font-bold">1</span>
//                   </div>
//                   <h4 className="text-lg font-medium text-gray-800 mb-2">
//                     Enter Details
//                   </h4>
//                   <p className="text-gray-600">
//                     Fill in your personal information, experience, and skills
//                   </p>
//                 </div>
//                 <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//                   <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
//                     <span className="text-blue-600 text-xl font-bold">2</span>
//                   </div>
//                   <h4 className="text-lg font-medium text-gray-800 mb-2">
//                     Choose Style
//                   </h4>
//                   <p className="text-gray-600">
//                     Select your preferred template, format, and color scheme
//                   </p>
//                 </div>
//                 <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//                   <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
//                     <span className="text-blue-600 text-xl font-bold">3</span>
//                   </div>
//                   <h4 className="text-lg font-medium text-gray-800 mb-2">
//                     Download Resume
//                   </h4>
//                   <p className="text-gray-600">
//                     Generate and download your professional resume
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResumeBuilder;
