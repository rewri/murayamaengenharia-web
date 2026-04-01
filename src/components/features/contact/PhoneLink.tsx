import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { contactsData } from "../../../config/contacts";

interface PhoneLinkProps {
  displayText?: string;
  variant?: "button" | "text";
  className?: string;
}

export function PhoneLink({
  displayText = contactsData.phones.primary.display,
  variant = "button",
  className = "",
}: PhoneLinkProps) {
  const phoneNumber = contactsData.phones.primary.telHref;

  if (variant === "text") {
    return (
      <a
        href={phoneNumber}
        className={`flex items-center gap-2 text-accent hover:text-accent-300 transition-colors ${className}`}
      >
        <Phone className="w-4 h-4 text-accent flex-shrink-0" />
        <span>{displayText}</span>
      </a>
    );
  }

  return (
    <motion.a
      href={phoneNumber}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={`w-full sm:w-full md:w-80 text-white border-2 border-white/80 font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-body
                 backdrop-blur-sm bg-white/10 hover:bg-accent-400/15 hover:text-white hover:border-accent 
                 transition-all duration-300 ease-out flex items-center gap-2 justify-center
                 md:hover:scale-105 md:active:scale-95
                 sm:hover:shadow-lg sm:hover:shadow-accent/50
                 ${className}`}
    >
      <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
      {displayText}
    </motion.a>
  );
}
