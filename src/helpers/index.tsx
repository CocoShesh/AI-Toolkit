import GrammarChecker from "../components/GrammarChecker";
import Paraphraser from "../components/Paraphraser";
import EssayCreator from "../components/EssayCreator";
import WordCounter from "../components/WordCounter";
import StoryWriter from "../components/StoryWriter";
import Summarizer from "../components/Summarizer";
import PlagiarismChecker from "../components/PlagiarismChecker";
import CitationGenerator from "../components/CitationGenerator";
import ContentTranslator from "../components/ContentTranslator";
import HeadlineGenerator from "../components/HeadlineGenerator";
import BlogWriter from "../components/BlogWriter";
import CoverLetterGenerator from "../components/CoverLetterGenerator";
import InterviewEmailTemplates from "../components/InterviewEmailTemplate";
import InterviewPrepAssistant from "../components/InterviewPrepAssistant";
import SkillGapAnalyzer from "../components/SkillGapAnalyzer";
import AIImageGenerator from "../components/AllImageGenerator";
import RecipeGenerator from "../components/RecipeGenerator";
import CodeRefactor from "../components/CodeRefactor";
import CodeCommentor from "../components/CodeCommentor";
import LogoMaker from "../components/LogoMaker";
import IconGenerator from "../components/IconGenerator";
import ColorPaletteGenerator from "../components/ColorPaletteGenerator";

interface ServiceRendererProps {
  selectedService: string | null;
  setSelectedService: (service: string | null) => void;
}

const ServiceRenderer = ({
  selectedService,
  setSelectedService,
}: ServiceRendererProps) => {
  switch (selectedService) {
    case "grammar":
      return <GrammarChecker onBack={() => setSelectedService(null)} />;
    case "paraphrase":
      return <Paraphraser onBack={() => setSelectedService(null)} />;
    case "essay":
      return <EssayCreator onBack={() => setSelectedService(null)} />;
    case "counter":
      return <WordCounter onBack={() => setSelectedService(null)} />;
    case "story":
      return <StoryWriter onBack={() => setSelectedService(null)} />;
    case "summarize":
      return <Summarizer onBack={() => setSelectedService(null)} />;
    case "plagiarism":
      return <PlagiarismChecker onBack={() => setSelectedService(null)} />;
    case "citation":
      return <CitationGenerator onBack={() => setSelectedService(null)} />;
    case "translate":
      return <ContentTranslator onBack={() => setSelectedService(null)} />;
    case "headline":
      return <HeadlineGenerator onBack={() => setSelectedService(null)} />;
    case "blog":
      return <BlogWriter onBack={() => setSelectedService(null)} />;
    case "letter":
      return <CoverLetterGenerator onBack={() => setSelectedService(null)} />;
    case "interview":
      return (
        <InterviewEmailTemplates onBack={() => setSelectedService(null)} />
      );
    case "prep":
      return <InterviewPrepAssistant onBack={() => setSelectedService(null)} />;
    case "skill":
      return <SkillGapAnalyzer onBack={() => setSelectedService(null)} />;
    case "image":
      return <AIImageGenerator onBack={() => setSelectedService(null)} />;
    case "recipe":
      return <RecipeGenerator onBack={() => setSelectedService(null)} />;
    case "refactor":
      return <CodeRefactor onBack={() => setSelectedService(null)} />;
    case "commentor":
      return <CodeCommentor onBack={() => setSelectedService(null)} />;
    case "logo":
      return <LogoMaker onBack={() => setSelectedService(null)} />;
    case "icon":
      return <IconGenerator onBack={() => setSelectedService(null)} />;
    case "color":
      return <ColorPaletteGenerator onBack={() => setSelectedService(null)} />;
    default:
      return null;
  }
};

export default ServiceRenderer;
