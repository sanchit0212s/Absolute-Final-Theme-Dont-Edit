import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Props {
  label?: string;
  className?: string;
  symbol?: "diamond" | "lotus" | "dot";
}

export default function OrnamentalDivider({ label, className = "", symbol = "diamond" }: Props) {
  const sym = symbol === "lotus" ? "❋" : symbol === "dot" ? "·" : "◆";
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className={`flex items-center gap-4 ${className}`}>
      <motion.div
        className="flex-1 ornament-line"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ originX: 1 }}
      />
      {label ? (
        <motion.span
          className="section-label whitespace-nowrap"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          {label}
        </motion.span>
      ) : (
        <motion.span
          className="text-accent text-[8px] opacity-50"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 0.5, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          {sym}
        </motion.span>
      )}
      <motion.div
        className="flex-1 ornament-line"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ originX: 0 }}
      />
    </div>
  );
}
