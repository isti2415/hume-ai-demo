import CanvasRevealCard from "@/components/canvas-reveal-card";
import { CanvasRevealEffect } from "@/components/canvas-reveal-effect";
import { AudioLines, NotebookPen, ScanFace, Speech } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const models = [
    {
      title: "Facial Expression",
      href: "/facial-expression",
      icon: <ScanFace className="h-16 w-16" />,
      description:
        "Analyze subtle facial cues to understand emotions, allowing AI to detect joy, sadness, anger, surprise, fear, and other nuanced expressions.",
    },
    {
      title: "Speech Prosody",
      href: "/speech-prosody",
      icon: <Speech className="h-16 w-16" />,
      description:
        "Assess the tune, rhythm, and timbre of speech to gauge sentiment and emotional state, enabling AI to recognize variations in speech patterns.",
    },
    {
      title: "Vocal Burst",
      href: "/vocal-burst",
      icon: <AudioLines className="h-16 w-16" />,
      description:
        "Identify short, non-verbal vocal expressions such as laughter, sighs, gasps, or cries, providing additional emotional context in AI interactions.",
    },
    {
      title: "Written Language",
      href: "/written-language",
      icon: <NotebookPen className="h-16 w-16" />,
      description:
        "Examine the tone, style, and sentiment of written text to understand user intent, enabling AI to generate empathetic responses in text-based interactions.",
    },
  ];

  return (
    <div className="flex items-center justify-center mt-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full scale-60 lg:scale-100 p-16">
        {models.map((model, index) => (
          <Link key={index} href={model.href}>
            <CanvasRevealCard
              title={model.title}
              icon={model.icon}
              description={model.description}
            >
              <CanvasRevealEffect animationSpeed={3} dotSize={1} />
            </CanvasRevealCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
