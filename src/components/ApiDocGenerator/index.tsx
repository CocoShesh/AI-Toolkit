"use client";

import { useState } from "react";
import {
  Play,
  Pause,
  RefreshCw,
  Download,
  Copy,
  CheckCircle2,
  Wand2,
  Layers,
} from "lucide-react";

const AnimationGenerator = () => {
  const [description, setDescription] = useState("");
  const [animationType, setAnimationType] = useState("transition");
  const [duration, setDuration] = useState(1.0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [previewActive, setPreviewActive] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    if (!description) return;

    setIsGenerating(true);

    // Simulate AI generation with a timeout
    setTimeout(() => {
      // In a real implementation, this would call an AI service
      let code = "";

      if (animationType === "transition") {
        code = `/* CSS Animation - ${description} */
.animated-element {
  transition: all ${duration}s cubic-bezier(0.4, 0, 0.2, 1);
}

.animated-element:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}

/* React implementation */
import { useState } from 'react';

const AnimatedComponent = () => {
  const [isActive, setIsActive] = useState(false);
  
  return (
    <div 
      className={\`animated-element \${isActive ? 'active' : ''}\`}
      onClick={() => setIsActive(!isActive)}
    >
      Your content here
    </div>
  );
};`;
      } else if (animationType === "keyframe") {
        code = `/* CSS Keyframe Animation - ${description} */
@keyframes custom-animation {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animated-element {
  animation: custom-animation ${duration}s ease-out forwards;
}

/* React implementation */
import { useState } from 'react';

const AnimatedComponent = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <>
      <button onClick={() => setIsVisible(!isVisible)}>
        Toggle Animation
      </button>
      
      {isVisible && (
        <div className="animated-element">
          Your content here
        </div>
      )}
    </>
  );
};`;
      } else if (animationType === "spring") {
        code = `/* Framer Motion Spring Animation - ${description} */
import { motion } from 'framer-motion';
import { useState } from 'react';

const AnimatedComponent = () => {
  const [isActive, setIsActive] = useState(false);
  
  const variants = {
    initial: { scale: 1, y: 0 },
    animate: { 
      scale: 1.05, 
      y: -10,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
        duration: ${duration}
      }
    }
  };
  
  return (
    <motion.div
      variants={variants}
      animate={isActive ? "animate" : "initial"}
      onClick={() => setIsActive(!isActive)}
      className="p-6 bg-white rounded-lg shadow cursor-pointer"
    >
      Your content here
    </motion.div>
  );
};`;
      }

      setGeneratedCode(code);
      setIsGenerating(false);
    }, 2000);
  };

  const copyToClipboard = () => {
    if (!generatedCode) return;

    navigator.clipboard.writeText(generatedCode);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-sm font-medium mb-3">
            <Wand2 className="h-3.5 w-3.5 inline mr-1" />
            AI-Powered Design Tool
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Animation Generator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Create beautiful, performant animations for your websites and
            applications
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls Panel */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Animation Settings
            </h2>

            <div className="space-y-6">
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Animation Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe the animation you want (e.g., 'Smooth fade-in and slide-up animation for page elements')"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Animation Type
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "transition", label: "CSS Transition" },
                    { id: "keyframe", label: "CSS Keyframes" },
                    { id: "spring", label: "Framer Motion" },
                  ].map(type => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setAnimationType(type.id)}
                      className={`py-2 px-3 rounded-lg border text-sm ${
                        animationType === type.id
                          ? "bg-blue-50 border-blue-300 text-blue-700"
                          : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="duration"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Animation Duration (seconds)
                </label>
                <div className="flex items-center">
                  <input
                    id="duration"
                    type="range"
                    min="0.1"
                    max="3"
                    step="0.1"
                    value={duration}
                    onChange={e =>
                      setDuration(Number.parseFloat(e.target.value))
                    }
                    className="w-full mr-3"
                  />
                  <span className="text-sm font-medium text-gray-700 w-12">
                    {duration}s
                  </span>
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={!description || isGenerating}
                className={`w-full py-3 px-4 rounded-lg text-white font-medium flex items-center justify-center gap-2 ${
                  !description || isGenerating
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    Generating Animation...
                  </>
                ) : (
                  <>Generate Animation</>
                )}
              </button>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Animation Preview
              </h2>

              {generatedCode && (
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
                        <span className="text-sm">Copy Code</span>
                      </>
                    )}
                  </button>

                  <button className="flex items-center gap-1 py-1.5 px-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Download className="h-4 w-4" />
                    <span className="text-sm">Download</span>
                  </button>
                </div>
              )}
            </div>

            {generatedCode && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-gray-700">
                    Live Preview
                  </h3>
                  <button
                    onClick={() => setPreviewActive(!previewActive)}
                    className="flex items-center gap-1 py-1 px-2 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                  >
                    {previewActive ? (
                      <>
                        <Pause className="h-3 w-3" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="h-3 w-3" />
                        <span>Play</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="bg-gray-100 rounded-lg border border-gray-200 h-[150px] flex items-center justify-center">
                  <div
                    className={`w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg flex items-center justify-center text-white font-medium ${
                      previewActive ? "animate-bounce" : ""
                    }`}
                    style={{
                      animationDuration: `${duration}s`,
                      animationIterationCount: "infinite",
                    }}
                  >
                    Preview
                  </div>
                </div>
              </div>
            )}

            <div className="bg-gray-100 rounded-lg border border-gray-200 h-[250px] overflow-auto">
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <RefreshCw className="h-10 w-10 text-blue-500 animate-spin mx-auto mb-4" />
                  <p className="text-gray-500">
                    Generating your animation code...
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    This may take a moment
                  </p>
                </div>
              ) : generatedCode ? (
                <pre className="p-4 text-sm font-mono whitespace-pre-wrap">
                  {generatedCode}
                </pre>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <Layers className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">
                    Your animation code will appear here
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    Describe the animation you want and click "Generate
                    Animation"
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-16 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            How Animation Generator Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <span className="text-blue-600 text-2xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Describe Your Animation
              </h3>
              <p className="text-gray-600">
                Explain the animation effect you want and select the animation
                type
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
                Our AI creates optimized animation code based on your
                description
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <span className="text-blue-600 text-2xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Preview & Implement
              </h3>
              <p className="text-gray-600">
                Test the animation in the preview area and copy the code for
                your project
              </p>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 rounded-lg p-4 border border-blue-100">
            <h4 className="font-medium text-blue-700 mb-2">Pro Tip</h4>
            <p className="text-blue-600">
              For the best results, be specific about the motion, timing, and
              feel you want in your animation. Terms like "smooth," "bouncy,"
              "subtle," or "dramatic" help our AI understand your desired
              effect.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimationGenerator;
