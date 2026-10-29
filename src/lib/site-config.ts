/**
 * PHIKRA — Site configuration
 *
 * Single source of truth for brand & contact info.
 * IMPORTANT: Tous les champs marqués [À CONFIGURER] doivent être renseignés
 * avant la mise en production.
 */

export const siteConfig = {
  name: "PHIKRA",
  tagline: "Creative Intelligence Studio",
  signature: {
    line1: "WE THINK.",
    line2: "YOU LEAD.",
    full: "WE THINK. YOU LEAD.",
    sub: "PHIKRA does the thinking. The client owns the moment.",
  },
  url: "https://phikra.studio",
  // [À CONFIGURER] — adresse e-mail principale
  contact: {
    email: "hello@phikra.studio",
    // [À CONFIGURER] — numéro de téléphone
    phone: "+212 6 00 00 00 00",
    // [À CONFIGURER] — WhatsApp (format international, sans + ni espaces)
    whatsapp: "+212600000000",
    address: {
      // [À CONFIGURER] — remplacez par l'adresse réelle avant publication
      line1: "Casablanca",
      city: "Casablanca",
      country: "Maroc",
    },
    // [À CONFIGURER] — adresse e-mail de notification (reçoit les soumissions)
    notifyEmail: "hello@phikra.studio",
  },
  social: {
    instagram: "https://instagram.com/phikra.studio",
    linkedin: "https://linkedin.com/company/phikra",
    behance: "https://behance.net/phikra",
    youtube: "",
    facebook: "",
  },
  /** Build a WhatsApp deep-link with a prefilled message. */
  whatsappLink(message = "Bonjour PHIKRA, je souhaite échanger sur un projet.") {
    const phone = (this.contact.whatsapp || "").replace(/[^\d]/g, "");
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  },
} as const;

export type SiteConfig = typeof siteConfig;
