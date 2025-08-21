"use client";
import { motion } from "framer-motion";
import React from "react";

export default function Fade({
  children,
  routeKey,
}: React.PropsWithChildren<{ routeKey?: React.Key }>) {
  return (
    <motion.div
      key={routeKey}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative"
    >
      {children}
    </motion.div>
  );
}
