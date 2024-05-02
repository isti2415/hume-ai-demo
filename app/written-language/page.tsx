import LanguageWidgets from "@/components/hume/LanguageWidgets";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Written Language"
}

export default function WrittenLanguage() {
  return (
    <div className="pt-16">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="sm:text-lg md:text-xl lg:text-2xl">Written Language</h1>
        <LanguageWidgets />
      </div>
    </div>
  );
}
