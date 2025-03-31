// "use client";

// import type React from "react";

// import { useState, useRef } from "react";
// import { useGenerateAudio } from "../utils/useGenerateAudio";

// export default function AudioDescription() {
//   const [file, setFile] = useState<File | null>(null);
//   const [description, setDescription] = useState<string | null>(null);
//   //   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const { mutate } = useGenerateAudio();

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setFile(e.target.files[0]);
//       setError(null);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!file) {
//       setError("Please select an audio file");
//       return;
//     }

//     setError(null);

//     try {
//       // Create a FormData object to handle the file
//       // const formData = new FormData()
//       // formData.append("audio", file)

//       // Pass the file to the generateAudio function
//       // const result = await generateAudio(file)
//       // setDescription(result)

//       // if (!result) {
//       //   setError("No description was generated. Please try a different audio file.")
//       // }
//       mutate(
//         { audioFile: file },
//         {
//           onSuccess: data => {
//             setDescription(data);
//           },
//           onError: (err: any) => {
//             setError(
//               err.message ||
//                 "An error occurred while generating the description"
//             );
//           },
//         }
//       );
//     } catch (err: any) {
//       setError(
//         err.message || "An error occurred while generating the description"
//       );
//       console.error(err);
//     }
//     // finally {
//     //   setIsLoading(false);
//     // }
//   };

//   //   const resetForm = () => {
//   //     setFile(null);
//   //     setDescription(null);
//   //     setError(null);
//   //     if (fileInputRef.current) {
//   //       fileInputRef.current.value = "";
//   //     }
//   //   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">
//         Audio Description Generator
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="space-y-2">
//           <label
//             htmlFor="audioFile"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Upload Audio File
//           </label>

//           <div className="flex items-center justify-center w-full">
//             <label className="flex flex-col w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
//               <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                 {file ? (
//                   <div className="text-center">
//                     <p className="mb-1 text-sm text-gray-700 truncate max-w-xs">
//                       {file.name}
//                     </p>
//                     <p className="text-xs text-gray-500">
//                       {(file.size / 1024 / 1024).toFixed(2)} MB
//                     </p>
//                   </div>
//                 ) : (
//                   <>
//                     <svg
//                       className="w-8 h-8 mb-2 text-gray-500"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
//                       ></path>
//                     </svg>
//                     <p className="mb-1 text-sm text-gray-500">
//                       <span className="font-semibold">Click to upload</span> or
//                       drag and drop
//                     </p>
//                     <p className="text-xs text-gray-500">
//                       MP3, WAV, or other audio files
//                     </p>
//                   </>
//                 )}
//               </div>
//               <input
//                 id="audioFile"
//                 type="file"
//                 className="hidden"
//                 accept="audio/*"
//                 onChange={handleFileChange}
//                 ref={fileInputRef}
//               />
//             </label>
//           </div>
//         </div>

//         <div className="flex space-x-2">
//           <button
//             className={`flex-1 py-2 px-4 rounded-md text-white font-medium
//                 bg-blue-400

//              transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
//           >
//             Generate Description
//           </button>

//           {/* {file && (
//             <button
//               type="button"
//               onClick={resetForm}
//               className="py-2 px-4 rounded-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
//             >
//               Reset
//             </button>
//           )} */}
//         </div>
//       </form>

//       {error && (
//         <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
//           {error}
//         </div>
//       )}

//       {description && !error && (
//         <div className="mt-6">
//           <h3 className="text-lg font-semibold mb-2 text-gray-800">
//             Description:
//           </h3>
//           <div className="p-4 bg-gray-100 rounded-md">
//             <p className="text-gray-700">{description}</p>
//           </div>
//         </div>
//       )}

//       <div className="mt-6 text-xs text-gray-500">
//         <p>
//           This component uses the Gemini API to generate descriptions of audio
//           files.
//         </p>
//       </div>
//     </div>
//   );
// }
