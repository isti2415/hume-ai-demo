import { Github, Mail, Globe } from "lucide-react";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className="container mx-auto flex flex-col md:flex-row items-center justify-between py-4 h-16 gap-2 border-t">
      <div className="flex items-center space-x-4">
        <Link href="https://github.com/xo2415" target="_blank">
          <Github className="h-6 w-6" />
          <span className="sr-only">GitHub</span>
        </Link>
        <Link href="mailto:connect@istiaqahmed.me">
          <Mail className="h-6 w-6" />
          <span className="sr-only">Email</span>
        </Link>
        <Link href="https://istiaqahmed.me">
          <Globe className="h-6 w-6" />
          <span className="sr-only">Website</span>
        </Link>
      </div>
      <p className="text-sm">
        © {new Date().getFullYear()} Istiaq Ahmed. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
