interface Props { className?: string; color?: "saffron" | "sand" | "white" }

function LotusSVG({ color = "saffron" }: { color?: string }) {
  const fill = color === "white" ? "#ffffff" : color === "sand" ? "#CDBFA3" : "#FF8C00";
  return (
    <svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 2 C14 2, 10 8, 6 8 C10 8, 14 16, 14 16 C14 16, 18 8, 22 8 C18 8, 14 2, 14 2Z"
        fill={fill} fillOpacity="0.8" />
      <path d="M14 5 C14 5, 11 9, 8 9 C11 9, 14 14, 14 14 C14 14, 17 9, 20 9 C17 9, 14 5, 14 5Z"
        fill={fill} />
      <circle cx="14" cy="10" r="1.5" fill={fill} />
    </svg>
  );
}

export default function LotusRule({ className = "", color = "saffron" }: Props) {
  const lineColor =
    color === "white"
      ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)"
      : color === "sand"
      ? "linear-gradient(90deg, transparent, rgba(205,191,163,0.6), transparent)"
      : "linear-gradient(90deg, transparent, rgba(255,140,0,0.4), transparent)";

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="flex-1 h-px" style={{ background: lineColor }} />
      <LotusSVG color={color} />
      <div className="flex-1 h-px" style={{ background: lineColor }} />
    </div>
  );
}
