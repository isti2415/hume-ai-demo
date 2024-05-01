import { Emotion } from "../../lib/data/emotion";
import { None } from "../../lib/utilities/typeUtilities";
import { getEmotionDescriptor } from "../../lib/utilities/emotionUtilities";
import { useStableEmotions } from "../../lib/hooks/stability";
import { Badge } from "../ui/badge";

type DescriptorProps = {
  className?: string;
  emotions: Emotion[];
};

export function Descriptor({ className, emotions }: DescriptorProps) {
  const emotionDistThreshold = 0.1;
  const embeddingDistThreshold = 0.2;
  const stableEmotions = useStableEmotions(emotions, embeddingDistThreshold);

  className = className || "";

  function createDescription(emotions: Emotion[]): string {
    emotions.sort((a, b) => (a.score < b.score ? 1 : -1));
    if (emotions.length < 2) return "";

    const primaryEmotion = emotions[0];
    let secondaryEmotion = emotions[1];
    let secondaryDescriptor = "";
    for (let i = 1; i < emotions.length; i++) {
      const emotion = emotions[i];
      const descriptor = getEmotionDescriptor(emotion.name);
      if (descriptor !== None) {
        secondaryDescriptor = descriptor;
        secondaryEmotion = emotion;
        break;
      }
    }
    if (
      Math.abs(primaryEmotion.score - secondaryEmotion.score) >
      emotionDistThreshold
    ) {
      return primaryEmotion.name;
    }
    return `${secondaryDescriptor} ${primaryEmotion.name}`;
  }

  return (
    <div className={`${className} flex`}>
      {emotions.length > 0 && (
        <Badge variant={"outline"} className="text-xl p-2">{createDescription(stableEmotions)}</Badge>
      )}
    </div>
  );
}
