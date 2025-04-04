import {
  FileText,
  FileSearch,
  PenTool,
  BookOpen,
  Calculator,
  Book,
  Globe,
  Type,
  Edit,
  UserCheck,
  Mail,
  BarChart,
  Palette,
  MessageSquare,
  Code,
  Image,
  Utensils,
  Sliders,
  Database,
} from "lucide-react";

export const services = [
  {
    id: "grammar",
    name: "Grammar Checker",
    icon: <FileSearch className="h-6 w-6" />,
    description: "Check your text for grammatical errors and get suggestions",
    category: "analysis",
  },
  {
    id: "paraphrase",
    name: "Paraphraser",
    icon: <FileText className="h-6 w-6" />,
    description: "Rewrite your content while maintaining the original meaning",
    category: "transformation",
  },
  {
    id: "essay",
    name: "Essay Creator",
    icon: <PenTool className="h-6 w-6" />,
    description: "Generate well-structured essays on any topic",
    category: "writing",
  },
  {
    id: "counter",
    name: "Word Counter",
    icon: <Calculator className="h-6 w-6" />,
    description: "Count words, characters, and paragraphs in your text",
    category: "analysis",
  },
  {
    id: "story",
    name: "Story Writer",
    icon: <BookOpen className="h-6 w-6" />,
    description:
      "Create engaging stories with customizable plots and characters",
    category: "writing",
  },
  {
    id: "summarize",
    name: "Summarizer",
    icon: <Book className="h-6 w-6" />,
    description: "Condense long texts into concise summaries",
    category: "transformation",
  },
  {
    id: "plagiarism",
    name: "Plagiarism Checker",
    icon: <FileSearch className="h-6 w-6" />,
    description: "Verify the originality of your content",
    category: "analysis",
  },
  {
    id: "citation",
    name: "Citation Generator",
    icon: <FileText className="h-6 w-6" />,
    description: "Create properly formatted citations in various styles",
    category: "transformation",
  },
  {
    id: "translate",
    name: "Content Translator",
    icon: <Globe className="h-6 w-6" />,
    description: "Translate your text into multiple languages",
    category: "transformation",
  },
  {
    id: "headline",
    name: "Headline Generator",
    icon: <Type className="h-6 w-6" />,
    description: "Create attention-grabbing headlines for your content",
    category: "transformation",
  },
  {
    id: "blog",
    name: "Blog Writer",
    icon: <Edit className="h-6 w-6" />,
    description: "Generate engaging blog posts on any topic",
    category: "writing",
  },
  {
    id: "letter",
    name: "Cover Letter Generator",
    icon: <FileText className="h-6 w-6" />,
    description:
      "Create a customized cover letter that complements your resume",
    category: "writing",
  },
  {
    id: "interview",
    name: "Interview Email Templates",
    icon: <Mail className="h-6 w-6" />,
    description:
      "Access professionally written email templates for interview communication",
    category: "communication",
  },
  {
    id: "prep",
    name: "Interview Prep Assistant",
    icon: <UserCheck className="h-6 w-6" />,
    description:
      "Practice answering common interview questions with AI feedback",
    category: "career",
  },
  {
    id: "skill",
    name: "Skill Gap Analyzer",
    icon: <BarChart className="h-6 w-6" />,
    description:
      "Analyze your skills and identify areas for improvement based on career trends",
    category: "career",
  },
  {
    id: "image",
    name: "Image Generator",
    icon: <Image className="h-6 w-6" />,
    description: "Create custom images and graphics based on your descriptions",
    category: "creation",
  },
  {
    id: "recipe",
    name: "Recipe Generator",
    icon: <Utensils className="h-6 w-6" />,
    description:
      "Generate delicious recipes based on ingredients or dietary preferences",
    category: "lifestyle",
  },
  {
    id: "refactor",
    name: "Code Refactor",
    icon: <Code className="h-6 w-6" />,
    description:
      "Improve and optimize your code structure while maintaining functionality",
    category: "development",
  },
  {
    id: "commentor",
    name: "Code Commentor",
    icon: <MessageSquare className="h-6 w-6" />,
    description:
      "Automatically generate clear and helpful comments for your code",
    category: "development",
  },
  {
    id: "logo",
    name: "Logo Maker",
    icon: <Palette className="h-6 w-6" />,
    description:
      "Create custom, professional logos for your brand or business.",
    category: "design",
  },
  {
    id: "icon",
    name: "Icon Generator",
    icon: <Image className="h-6 w-6" />,
    description: "Design unique icons that represent your brand or project.",
    category: "design",
  },
  {
    id: "color",
    name: "Color Palette Generator",
    icon: <Sliders className="h-6 w-6" />,
    description: "Design unique icons that represent your brand or project.",
    category: "design",
  },
  {
    id: "regex",
    name: "Regex Generator",
    icon: <Code className="h-6 w-6" />,
    description: "Design unique icons that represent your brand or project.",
    category: "development",
  },
  {
    id: "mock",
    name: "Mock Data Generator",
    icon: <Database className="h-6 w-6" />,
    description: "Design unique icons that represent your brand or project.",
    category: "development",
  },
];
