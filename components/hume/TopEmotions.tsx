import { cn } from "@/lib/utils";
import { Emotion } from "../../lib/data/emotion";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";

type TopEmotionsProps = {
  className?: string;
  emotions: Emotion[];
  numEmotions: number;
};

export function TopEmotions({
  className,
  emotions,
  numEmotions,
}: TopEmotionsProps) {
  className = className || "";

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
        {emotions
          .sort((a: Emotion, b: Emotion) => b.score - a.score)
          .slice(0, numEmotions)
          .map((emotion, i) => (
            <Badge key={i} variant={"outline"} className="flex items-center gap-2 text-lg">
              <span>{emotion.name}</span>
              <span>{emotion.score.toFixed(1)}</span>
            </Badge>
          ))}
    </div>
  );
}

TopEmotions.defaultProps = {
  numEmotions: 3,
};
