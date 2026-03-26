interface Props { className?: string; label?: string }

export default function CopperRule({ className = "", label }: Props) {
  return (
    <div className={`flex items-center gap-5 ${className}`}>
      <div className="flex-1 copper-rule" />
      {label && (
        <span className="section-label whitespace-nowrap">{label}</span>
      )}
      {!label && <span className="text-copper/40 text-xs">✦</span>}
      <div className="flex-1 copper-rule" />
    </div>
  );
}
