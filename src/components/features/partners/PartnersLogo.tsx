interface PartnersLogoProps {
  partner: {
    name: string;
    src: string;
  };
  index: number;
}

export default function PartnersLogo({ partner, index }: PartnersLogoProps) {
  return (
    <div
      key={`${partner.name}-${index}`}
      className="flex-shrink-0 h-20 flex items-center justify-center relative group"
    >
      <img
        src={partner.src}
        alt={partner.name}
        className="h-full w-auto grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
        title={partner.name}
      />
      {/* Tooltip */}
      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <div className="bg-gray-900 text-white text-xs font-medium px-3 py-1 rounded whitespace-nowrap">
          {partner.name}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
        </div>
      </div>
    </div>
  );
}
