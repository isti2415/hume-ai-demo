"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const CanvasRevealCard = ({
  title,
  icon,
  description, // New prop for description
  children,
}: {
  title: string;
  icon: React.ReactNode;
  description: string; // Added description as a required prop
  children?: React.ReactNode;
}) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border border-border/[0.2] group/canvas-card flex items-center justify-center max-w-sm w-full mx-auto p-4 relative h-[20rem]"
    >
      {/* Corners with icons */}
      <Icon className="absolute h-6 w-6 -top-3 -left-3" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3" />

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full absolute inset-0"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 text-center">
        {/* Icon */}
        <div className="group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-200 flex flex-col items-center justify-center gap-4">
          {icon}
          <h2 className=" text-xl relative z-10 mt-4 font-bold">{title}</h2>
        </div>
        {/* Title */}
        <h2 className=" text-xl opacity-0 group-hover/canvas-card:opacity-100 relative z-10  mt-4 font-bold group-hover/canvas-card:-translate-y-2 transition duration-200">
          {title}
        </h2>
        {/* Description */}
        <p className=" text-sm opacity-0 group-hover/canvas-card:opacity-100 relative z-10 group-hover/canvas-card:-translate-y-1 transition duration-200">
          {description}
        </p>
      </div>
    </div>
  );
};

export default CanvasRevealCard;

export const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};
