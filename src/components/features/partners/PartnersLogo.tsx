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
      className="flex-shrink-0 h-20 flex items-center justify-center"
    >
      <img
        src={partner.src}
        alt={partner.name}
        className="h-full w-auto grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
      />
    </div>
  );
}
