import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen -mt-16 px-4 md:px-6 text-center space-y-4">
      <Image
        width={"768"}
        height={"768"}
        sizes="(max-width: 768px) 100vw, 33vw"
        src={"/not-found.svg"}
        alt="Not Found"
      />
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">404 Not Found</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Oops! The page you are looking for does not exist.
        </p>
        <p className="text-gray-500 dark:text-gray-400">
          I wish I had more time and money to finish this page!
        </p>
        <p className="text-gray-500 dark:text-gray-400">
          Send incentives to <strong>01611160290</strong> on bKash to help
          me complete the website.
        </p>
        <Link href="/">
          <Button className="mt-4">Go back home</Button>
        </Link>
      </div>
    </div>
  );
}
