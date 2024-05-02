"use client";
import { AudioWidgets } from "@/components/hume/AudioWidgets";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Speech Prosody"
}

export default function SpeechProsody() {
  return (
    <div className="pt-16">
      <div className="flex flex-col items-center justify-center gap-4 w-[400px]">
        <h1 className="sm:text-lg md:text-xl lg:text-2xl">Speech Prosody</h1>
        <AudioWidgets
          modelName="prosody"
          recordingLengthMs={500}
          streamWindowLengthMs={5000}
        />
      </div>
    </div>
  );
}
