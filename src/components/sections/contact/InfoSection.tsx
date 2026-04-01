import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  AtSign,
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
} from "lucide-react";
import { type ReactNode } from "react";
import { fadeUp, stagger } from "../../../animations/motion";
import { contactsData } from "../../../config/contacts";

interface ContactItemProps {
  icon: LucideIcon;
  title: string;
  content: ReactNode;
  href?: string;
  className?: string;
}

function ContactItem({
  icon: Icon,
  title,
  content,
  href,
  className,
}: ContactItemProps) {
  const itemContent = (
    <motion.div
      variants={fadeUp}
      className={`flex items-center gap-3 sm:gap-4 ${className || ""}`}
    >
      <div className="flex-shrink-0 size-11 sm:size-14 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary flex items-center justify-center transition-all duration-300">
        <Icon className="size-5 sm:size-6" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-base text-gray-500 sm:text-lg leading-snug font-body">
          {title}
        </h3>
        <p className="font-semibold text-sm sm:text-base text-neutral-dark/90 leading-snug font-body break-words">
          {content}
        </p>
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block hover:opacity-80 transition-all duration-300"
        aria-label={title}
      >
        {itemContent}
      </a>
    );
  }

  return itemContent;
}

export default function InfoSection() {
  const { address, emails, phones, social } = contactsData;

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="h-full"
    >
      <div className="bg-white dark:bg-background-dark p-4 sm:p-6 md:p-8 rounded-xl shadow-sm border border-gray-200/80 dark:border-gray-700/80 h-full flex flex-col justify-between hover:shadow-md transition-all duration-300">
        <div>
          <div>
            <ContactItem
              icon={Phone}
              title="Telefone"
              content={phones.primary.display}
              href={phones.primary.whatsappHref}
              className="mb-10"
            />

            <ContactItem
              icon={AtSign}
              title="E-mail"
              content={emails.primary.address}
              href={emails.primary.mailtoHref}
              className="mb-10"
            />

            <ContactItem
              icon={MapPin}
              title="Endereço"
              content={address.displayShort}
              className="mb-10"
            />

            <ContactItem
              icon={Instagram}
              title="Instagram"
              content={social.instagram.handle}
              href={social.instagram.href}
              className="mb-10"
            />

            <ContactItem
              icon={Facebook}
              title="Facebook"
              content={social.facebook.handle}
              href={social.facebook.href}
              className="mb-10"
            />

            <ContactItem
              icon={Linkedin}
              title="LinkedIn"
              content={social.linkedin.handle}
              href={social.linkedin.href}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
