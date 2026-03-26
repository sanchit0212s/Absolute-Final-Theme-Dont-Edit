const items = [
  "Free consecration on orders above ₹18,000",
  "Sacred craftsmanship from Haridwar",
  "Ships worldwide with secure packaging",
  "100% solid brass — authenticity certified",
  "Artisan-cast by master craftsmen",
  "Prana Pratishtha available for every murti",
];

export default function AnnouncementBar() {
  const repeated = [...items, ...items];

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-9 bg-saffron/12 border-b border-saffron/25 overflow-hidden flex items-center">
      <div className="flex animate-marquee whitespace-nowrap">
        {repeated.map((item, i) => (
          <span key={i} className="inline-flex items-center font-body text-xs text-saffron tracking-wide">
            {item}
            <span className="mx-5 text-temple-gold/50">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
