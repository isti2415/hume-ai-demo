"use client";
import { FaceWidgets } from "@/components/hume/FaceWidgets";

export default function FacialExpression() {

  return (
    <div className="pt-16">
      <div className="flex flex-col items-center justify-center gap-4 w-[400px]">
        <h1 className="sm:text-lg md:text-xl lg:text-2xl">Facial Expression</h1>
        <FaceWidgets />
      </div>
    </div>
  );
}
