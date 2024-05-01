import { useEffect, useState } from "react";

import { AudioPrediction } from "../../lib/data/audioPrediction";
import { TimeRange } from "../../lib/data/timeRange";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

type DiscreteTimelineProps = {
  className?: string;
  predictions: AudioPrediction[];
};

export function DiscreteTimeline({
  className,
  predictions,
}: DiscreteTimelineProps) {
  const [predictionsHistory, setPredictionsHistory] = useState<
    AudioPrediction[][]
  >([]);
  const detectionProximityThreshold = 0.6;

  className = className || "";

  useEffect(() => {
    setPredictionsHistory((old) => [...old, predictions]);
  }, [predictions]);

  function flattenDetections(history: AudioPrediction[][]): AudioPrediction[] {
    const results: AudioPrediction[] = [];
    history.forEach((predictions) => {
      predictions.forEach((detection) => {
        if (results.length == 0) {
          results.push(detection);
        } else {
          const lastDetection = results[results.length - 1];
          updateWithTimeout(lastDetection, detection);
          if (shouldMerge(lastDetection, detection)) {
            results[results.length - 1] = mergeDetections(
              results[results.length - 1],
              detection
            );
          } else {
            results.push(detection);
          }
        }
      });
    });
    results.reverse();
    return results;
  }

  function mergeDetections(
    detectionA: AudioPrediction,
    detectionB: AudioPrediction
  ): AudioPrediction {
    const rangeA = detectionA.time;
    const rangeB = detectionB.time;
    const shouldReplaceEmotions = rangeSize(rangeB) < rangeSize(rangeA);

    return {
      time: mergeRanges(detectionA.time, detectionB.time),
      emotions: shouldReplaceEmotions
        ? detectionB.emotions
        : detectionA.emotions,
    };
  }

  function mergeRanges(rangeA: TimeRange, rangeB: TimeRange): TimeRange {
    return {
      begin: rangeA.begin,
      end: rangeB.end,
    };
  }

  function updateWithTimeout(
    detectionA: AudioPrediction,
    detectionB: AudioPrediction
  ): void {
    const timeoutTime = 60;
    const rangeA = detectionA.time;
    const rangeB = detectionB.time;
    if (rangeB.begin < rangeA.begin) {
      rangeB.begin += timeoutTime;
      rangeB.end += timeoutTime;
    }
  }

  function shouldMerge(
    detectionA: AudioPrediction,
    detectionB: AudioPrediction
  ): boolean {
    const rangeA = detectionA.time;
    const rangeB = detectionB.time;
    return rangesOverlap(rangeA, rangeB) || rangesClose(rangeA, rangeB);
  }

  function rangeSize(range: TimeRange): number {
    return range.end - range.begin;
  }

  function rangesClose(rangeA: TimeRange, rangeB: TimeRange): boolean {
    return rangeB.begin < rangeA.end + detectionProximityThreshold;
  }

  function rangesOverlap(rangeA: TimeRange, rangeB: TimeRange): boolean {
    return rangeB.begin < rangeA.end;
  }

  return (
    <div className={`${className}`}>
      {flattenDetections(predictionsHistory).map((detection, i) => (
        <div key={i}>
          <Detection detection={detection} />
        </div>
      ))}
    </div>
  );
}

type DetectionProps = {
  className?: string;
  detection: AudioPrediction;
};

export function Detection({ className, detection }: DetectionProps) {
  const sorted = detection.emotions.sort((a, b) =>
    a.score < b.score ? 1 : -1
  );
  const topEmotion = sorted[0];

  let time = (detection.time.end - detection.time.begin).toFixed(1);
  if (detection.time.end < detection.time.begin) {
    const timeoutTime = 60;
    time = (detection.time.end + timeoutTime - detection.time.begin).toFixed(1);
  }

  className = className || "";

  return (
    <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
      <Badge
        variant={"outline"}
        className="flex items-center gap-2 text-lg p-2"
      >
        <span>{topEmotion.name}</span>
        <span>{time}s</span>
      </Badge>
    </div>
  );
}
