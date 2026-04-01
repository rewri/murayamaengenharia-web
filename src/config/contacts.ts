export interface ContactPhone {
  display: string;
  e164: string;
  telHref: string;
  whatsappHref?: string;
}

export interface ContactEmail {
  address: string;
  mailtoHref: string;
}

export interface ContactAddress {
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  displayShort: string;
}

export interface ContactSocial {
  label: string;
  handle: string;
  href: string;
}

const primaryPhoneE164 = "5514997754442";
const floatingWhatsappPhoneE164 = "5514996635051";
const floatingWhatsappMessage =
  "Olá Murayama Engenharia, eu gostaria de mais informações.";

export const contactsData = {
  phones: {
    primary: {
      display: "(14) 99775-4442",
      e164: primaryPhoneE164,
      telHref: `tel:+${primaryPhoneE164}`,
      whatsappHref: `https://wa.me/${primaryPhoneE164}`,
    } satisfies ContactPhone,
  },
  emails: {
    primary: {
      address: "contato@murayamaengenharia.com.br",
      mailtoHref: "mailto:contato@murayamaengenharia.com.br",
    } satisfies ContactEmail,
  },
  address: {
    street: "Largo São José",
    neighborhood: "Centro",
    city: "Botucatu",
    state: "SP",
    zipCode: "18602-113",
    displayShort: "Largo São José - Centro, Botucatu - SP",
  } satisfies ContactAddress,
  social: {
    instagram: {
      label: "Instagram",
      handle: "@murayamaengenharia",
      href: "https://instagram.com/murayamaengenharia",
    } satisfies ContactSocial,
    facebook: {
      label: "Facebook",
      handle: "Murayama Engenharia",
      href: "https://facebook.com/murayamaengenharia",
    } satisfies ContactSocial,
    linkedin: {
      label: "LinkedIn",
      handle: "Murayama Engenharia",
      href: "https://linkedin.com/company/murayama-engenharia",
    } satisfies ContactSocial,
  },
  whatsapp: {
    floatingButton: {
      phoneE164: floatingWhatsappPhoneE164,
      message: floatingWhatsappMessage,
      href: `https://wa.me/${floatingWhatsappPhoneE164}?text=${encodeURIComponent(
        floatingWhatsappMessage,
      )}`,
    },
  },
  external: {
    googleMapsEmbedHref:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1588.0502829665872!2d-48.446511593242015!3d-22.89418044388343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c6df7904c53613%3A0x61f06d34c501d51c!2sMurayama%20Engenharia!5e0!3m2!1spt-BR!2sbr!4v1768411445477!5m2!1spt-BR!2sbr",
    googleReviewsHref: "https://share.google/824IGaTABhdoDURS1",
  },
} as const;
