import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Link from "next/link";

type LoginProps = {
  authenticate: (key: string) => void;
};

export function Login({ authenticate }: LoginProps) {
  const [key, setKey] = useState("");

  if (key.length === 48) {
    authenticate(key);
  }

  return (
    <div className="container mx-auto max-w-md py-8">
      <Card>
        <CardHeader>
          <CardTitle>Hume AI Demo</CardTitle>
          <CardDescription>Enter your Hume API Key below to get started.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="api-key">API Key</Label>
            <Input
              placeholder="Hume API Key"
              id="api-key"
              type="password"
              onChange={(e) => setKey(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <Link href="https://beta.hume.ai/settings/keys">
            <Button variant={"link"}>Get your Hume API Key</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
