interface OrnamentalDividerProps {
  symbol?: "diamond" | "lotus" | "om" | "none";
  className?: string;
  tight?: boolean;
}

export default function OrnamentalDivider({
  symbol = "diamond",
  className = "",
  tight = false,
}: OrnamentalDividerProps) {
  const symbolMap = {
    diamond: "◆",
    lotus: "❀",
    om: "ॐ",
    none: "",
  };

  const mark = symbolMap[symbol];
  const spacing = tight ? "my-4" : "my-10";

  return (
    <div className={`flex items-center gap-5 px-8 ${spacing} ${className}`}>
      <div className="flex-1 ornamental-line" />
      {mark && (
        <span className="font-display text-temple-gold text-base leading-none select-none">
          {mark}
        </span>
      )}
      <div className="flex-1 ornamental-line" />
    </div>
  );
}
