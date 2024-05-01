"use client";
import React, { useContext } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";
import { Home, LogOut } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import Image from "next/image";
import { AuthContext } from "./hume/Auth";

function Nav() {
  const authContext = useContext(AuthContext);

  const models = [
    {
      title: "Facial Expression",
      href: "/facial-expression",
      description:
        "Analyze subtle facial cues to understand emotions. Detect joy, sadness, anger, surprise, fear, and other nuanced expressions",
    },
    {
      title: "Speech Prosody",
      href: "/speech-prosody",
      description:
        "Assess the tune, rhythm, and timbre of speech to gauge sentiment and emotional state.",
    },
    {
      title: "Vocal Burst",
      href: "/vocal-burst",
      description:
        "Identify short, non-verbal vocal expressions such as laughter, sighs, gasps, or cries.",
    },
    {
      title: "Written Language",
      href: "/written-language",
      description:
        "Examine the tone, style, and sentiment of written text to understand user intent and emotional underpinnings.",
    },
  ];

  return (
    <div className="bg-card container fixed border-b h-16 grid grid-cols-3 items-center justify-between z-50 w-screen">
      <Link href={"/"}>
        <div className="flex items-center gap-2 justify-self-start">
          <Image
            width={"32"}
            height={"32"}
            sizes="(max-width: 768px) 100vw, 33vw"
            src={"/logo.png"}
            alt="Hume AI Demo Logo"
          />
          <h1 className="font-bold text-lg md:text-xl lg:text-2xl hidden lg:block">
            Hume AI Demo
          </h1>
        </div>
      </Link>
      <NavigationMenu className="justify-self-center">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              Expression Measurement
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[280px] gap-3 p-4 md:w-[400px] md:grid-cols-2 lg:w-[550px]">
                {models.map((model) => (
                  <ListItem
                    key={model.title}
                    title={model.title}
                    href={model.href}
                  >
                    {model.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex items-center gap-2 justify-self-end">
        <ModeToggle />
        <Button
          variant={"destructive"}
          size={"icon"}
          onClick={authContext.unauthenticate}
        >
          <LogOut />
          <span className="sr-only">Logout</span>
        </Button>
      </div>
    </div>
  );
}

export default Nav;

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
