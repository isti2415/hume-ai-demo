"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BurstWidgets } from "@/components/hume/BurstWidgets";
import { AudioPrediction } from "@/lib/data/audioPrediction";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vocal Burst"
}

export default function VocalBurst() {
  function onTimeline(newPredictions: AudioPrediction[]): void {}
  return (
    <div className="pt-16">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="sm:text-lg md:text-xl lg:text-2xl">Vocal Burst</h1>
        <Tabs defaultValue="top emotions" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="top emotions">Top Emotions</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>
          <TabsContent value="top emotions">
            <BurstWidgets />
          </TabsContent>
          <TabsContent value="timeline">
            <BurstWidgets onTimeline={onTimeline} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
