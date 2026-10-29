/**
 * PHIKRA — Content & i18n dictionary
 *
 * FR (default) / EN.
 * All UI strings, nav, services, projects, articles, method steps, pillars.
 */

import { siteConfig } from "@/lib/site-config";

/* ----------------------------------------------------------------------------
   Types
---------------------------------------------------------------------------- */
export type Lang = "fr" | "en";
export type Localized = Record<Lang, string>;

export type View =
  | "home"
  | "agency"
  | "services"
  | "portfolio"
  | "project"
  | "news"
  | "article"
  | "contact"
  | "legal"
  | "privacy";

export interface NavItem {
  key: string;
  label: Localized;
  view: View;
}

export interface Service {
  id: string;
  number: string;
  title: Localized;
  tagline: Localized;
  description: Localized;
  items: Localized[];
  image: string;
}

export interface Category {
  id: string;
  label: Localized;
}

export interface Project {
  slug: string;
  title: Localized;
  client: string;
  year: number;
  category: string;
  cover: string;
  gallery: string[];
  excerpt: Localized;
  context: Localized;
  objectives: Localized;
  concept: Localized;
  deliverables: Localized[];
  services: string[];
  isDemo: boolean;
}

export interface Article {
  slug: string;
  title: Localized;
  excerpt: Localized;
  category: Localized;
  date: string;
  readTime: number;
  cover: string;
  content: Localized;
}

/* ----------------------------------------------------------------------------
   Nav
---------------------------------------------------------------------------- */
export const navItems: NavItem[] = [
  { key: "home", label: { fr: "Accueil", en: "Home" }, view: "home" },
  { key: "agency", label: { fr: "Agence", en: "Agency" }, view: "agency" },
  { key: "services", label: { fr: "Expertise", en: "Expertise" }, view: "services" },
  { key: "portfolio", label: { fr: "Travaux", en: "Work" }, view: "portfolio" },
  { key: "news", label: { fr: "Notes", en: "Notes" }, view: "news" },
  { key: "contact", label: { fr: "Contact", en: "Contact" }, view: "contact" },
];

/* ----------------------------------------------------------------------------
   Services
---------------------------------------------------------------------------- */
export const services: Service[] = [
  {
    id: "strategy",
    number: "01",
    title: { fr: "Stratégie", en: "Strategy" },
    tagline: {
      fr: "On pense avant de produire.",
      en: "We think before we produce.",
    },
    description: {
      fr: "Diagnostic, positionnement, plateforme de marque. On définit le terrain avant de bâtir. Chaque décision remonte à une intention claire.",
      en: "Diagnostic, positioning, brand platform. We define the ground before building. Every decision traces back to a clear intent.",
    },
    items: [
      { fr: "Diagnostic de marque", en: "Brand audit" },
      { fr: "Plateforme de marque", en: "Brand platform" },
      { fr: "Positionnement", en: "Positioning" },
      { fr: "Architecture narrative", en: "Narrative architecture" },
      { fr: "Roadmap éditoriale", en: "Editorial roadmap" },
      { fr: "Plan de communication", en: "Communication plan" },
    ],
    image: "/images/project-branding.png",
  },
  {
    id: "branding",
    number: "02",
    title: { fr: "Branding", en: "Branding" },
    tagline: {
      fr: "Une identité qui se tient.",
      en: "An identity that holds.",
    },
    description: {
      fr: "Logotype, système visuel, charte, déclinaisons. Une marque reconnaissable sur tous les supports, sans perdre son souffle.",
      en: "Logotype, visual system, guidelines, declinations. A brand recognizable on every surface, without losing its breath.",
    },
    items: [
      { fr: "Logotype & monogramme", en: "Logotype & monogram" },
      { fr: "Système typographique", en: "Type system" },
      { fr: "Palette & terrain colorimétrique", en: "Palette & color field" },
      { fr: "Charte de marque", en: "Brand guidelines" },
      { fr: "Papeterie & vitrine", en: "Stationery & storefront" },
      { fr: "Templates éditoriaux", en: "Editorial templates" },
    ],
    image: "/images/project-branding.png",
  },
  {
    id: "audiovisual",
    number: "03",
    title: { fr: "Audiovisuel", en: "Audiovisual" },
    tagline: {
      fr: "L'image comme geste.",
      en: "Image as gesture.",
    },
    description: {
      fr: "Films de marque, photographie, motion design. On raconte avec la lumière, le cadre et le rythme. Du plan à la bande finale.",
      en: "Brand films, photography, motion design. We tell with light, frame, and rhythm. From shot to final cut.",
    },
    items: [
      { fr: "Films de marque", en: "Brand films" },
      { fr: "Photographie éditoriale", en: "Editorial photography" },
      { fr: "Motion design", en: "Motion design" },
      { fr: "Direction artistique image", en: "Image art direction" },
      { fr: "Captation événementielle", en: "Event coverage" },
      { fr: "Habillage & génériques", en: "Bumpers & title sequences" },
    ],
    image: "/images/project-photography.png",
  },
  {
    id: "digital",
    number: "04",
    title: { fr: "Digital", en: "Digital" },
    tagline: {
      fr: "Des interfaces qui durent.",
      en: "Interfaces that last.",
    },
    description: {
      fr: "Sites, plateformes, e-commerce. On conçoit des produits numériques sobres, rapides, qui ne se démodent pas au prochain framework.",
      en: "Websites, platforms, e-commerce. We design sober, fast digital products that don't age with the next framework.",
    },
    items: [
      { fr: "UX & architecture", en: "UX & architecture" },
      { fr: "UI design system", en: "UI design system" },
      { fr: "Développement Next.js", en: "Next.js development" },
      { fr: "Performance & SEO", en: "Performance & SEO" },
      { fr: "E-commerce headless", en: "Headless e-commerce" },
      { fr: "Maintenance & évolutions", en: "Maintenance & iterations" },
    ],
    image: "/images/project-digital.png",
  },
  {
    id: "social",
    number: "05",
    title: { fr: "Social", en: "Social" },
    tagline: {
      fr: "Le quotidien comme scène.",
      en: "Everyday as a stage.",
    },
    description: {
      fr: "Community management, contenu, campagnes. Une présence régulière, pas du bruit. On tient la scène jour après jour.",
      en: "Community management, content, campaigns. A regular presence, not noise. We hold the stage day after day.",
    },
    items: [
      { fr: "Stratégie éditoriale sociale", en: "Social editorial strategy" },
      { fr: "Community management", en: "Community management" },
      { fr: "Création de contenu", en: "Content creation" },
      { fr: "Campagnes payantes", en: "Paid campaigns" },
      { fr: "Influence & partenariats", en: "Influence & partnerships" },
      { fr: "Reporting & écoute", en: "Reporting & listening" },
    ],
    image: "/images/project-marketing.png",
  },
];

/* ----------------------------------------------------------------------------
   Categories
---------------------------------------------------------------------------- */
export const categories: Category[] = [
  { id: "all", label: { fr: "Tout", en: "All" } },
  { id: "branding", label: { fr: "Branding", en: "Branding" } },
  { id: "audiovisual", label: { fr: "Audiovisuel", en: "Audiovisual" } },
  { id: "event", label: { fr: "Événementiel", en: "Event" } },
  { id: "digital", label: { fr: "Digital", en: "Digital" } },
  { id: "marketing", label: { fr: "Marketing", en: "Marketing" } },
];

/* ----------------------------------------------------------------------------
   Projects (demo)
---------------------------------------------------------------------------- */
export const projects: Project[] = [
  {
    slug: "noir-edition",
    title: { fr: "Noir Édition", en: "Noir Édition" },
    client: "Projet de démonstration",
    year: 2024,
    category: "branding",
    cover: "/images/project-branding.png",
    gallery: [
      "/images/project-branding.png",
      "/images/project-photography.png",
      "/images/project-digital.png",
    ],
    excerpt: {
      fr: "Une maison d'édition contemporaine. Identité sobre, typographie affirmée, déclinaisons papier et numérique.",
      en: "A contemporary publishing house. Sober identity, assertive typography, paper and digital declinations.",
    },
    context: {
      fr: "Une jeune maison d'édition souhaite exister entre la rigueur classique et la scène contemporaine. La contrainte : tenir sur un livre comme sur un écran, sans bruit.",
      en: "A young publishing house wants to exist between classical rigor and the contemporary scene. The constraint: hold on a book as on a screen, without noise.",
    },
    objectives: {
      fr: "Construire une identité reconnaissable, déclinable sur l'ensemble des supports éditoriaux et numériques, et qui respire le soin du livre.",
      en: "Build a recognizable identity, declinable across editorial and digital surfaces, that breathes the care of the book.",
    },
    concept: {
      fr: "Un logotype à empattement moderne, un noir profond comme seul terrain colorimétrique, et un système de mise en page calé sur la grille du livre.",
      en: "A modern serif logotype, a deep black as the only color field, and a layout system aligned to the book grid.",
    },
    deliverables: [
      { fr: "Logotype & système typographique", en: "Logotype & type system" },
      { fr: "Charte de marque 60 pages", en: "60-page brand guidelines" },
      { fr: "Templates de couvertures", en: "Cover templates" },
      { fr: "Site éditeur", en: "Publisher website" },
      { fr: "Papeterie & cartes", en: "Stationery & cards" },
    ],
    services: ["strategy", "branding", "digital"],
    isDemo: true,
  },
  {
    slug: "signal-portrait",
    title: { fr: "Signal — Portrait", en: "Signal — Portrait" },
    client: "Projet de démonstration",
    year: 2024,
    category: "audiovisual",
    cover: "/images/project-photography.png",
    gallery: [
      "/images/project-photography.png",
      "/images/project-audiovisual.png",
      "/images/project-event.png",
    ],
    excerpt: {
      fr: "Série de portraits éditoriaux et film de marque. Lumière dure, fond neutre, présence.",
      en: "Editorial portrait series and brand film. Hard light, neutral background, presence.",
    },
    context: {
      fr: "Une marque de prêt-à-porter souhaite recentrer son image sur les visages et les gestes. Pas de décors, pas d'effets : que la présence.",
      en: "A ready-to-wear brand wants to refocus its image on faces and gestures. No sets, no effects: only presence.",
    },
    objectives: {
      fr: "Produire une série de portraits et un court film qui tiennent la route en magazine comme en réseaux sociaux.",
      en: "Produce a portrait series and a short film that hold up in magazines as well as on social networks.",
    },
    concept: {
      fr: "Une lumière crue, un fond gris neutre, et une direction de regard frontale. Le geste devient signature.",
      en: "A raw light, a neutral grey background, and a frontal gaze. The gesture becomes signature.",
    },
    deliverables: [
      { fr: "Série de 12 portraits", en: "Series of 12 portraits" },
      { fr: "Court film 90 secondes", en: "90-second short film" },
      { fr: "Direction artistique image", en: "Image art direction" },
      { fr: "Retouche & étalonnage", en: "Retouch & color grading" },
      { fr: "Déclinaisons sociales", en: "Social declinations" },
    ],
    services: ["audiovisual", "strategy"],
    isDemo: true,
  },
  {
    slug: "stage-event",
    title: { fr: "Stage — Événement", en: "Stage — Event" },
    client: "Projet de démonstration",
    year: 2024,
    category: "event",
    cover: "/images/project-event.png",
    gallery: [
      "/images/project-event.png",
      "/images/project-audiovisual.png",
      "/images/project-photography.png",
    ],
    excerpt: {
      fr: "Conception et habillage d'un événement de marque. Scénographie, signalétique, captation.",
      en: "Design and dressing of a brand event. Scenography, signage, coverage.",
    },
    context: {
      fr: "Une marque lance un produit en organisant un événement éphémère. Le défi : transformer un lieu brut en scène de marque cohérente.",
      en: "A brand launches a product through a temporary event. The challenge: transform a raw venue into a coherent brand stage.",
    },
    objectives: {
      fr: "Concevoir une scénographie lisible, une signalétique signature, et produire la captation de l'événement.",
      en: "Design a legible scenography, a signature signage, and produce the event coverage.",
    },
    concept: {
      fr: "Un seul axe de circulation, une trame visuelle monochrome ponctuée d'un signal cramoisi, et un parcours initié par le son.",
      en: "A single circulation axis, a monochrome visual grid punctuated by a crimson signal, and a sound-initiated journey.",
    },
    deliverables: [
      { fr: "Scénographie & plans", en: "Scenography & plans" },
      { fr: "Signalétique événementielle", en: "Event signage" },
      { fr: "Habillage visuel du lieu", en: "Venue visual dressing" },
      { fr: "Captation photo & vidéo", en: "Photo & video coverage" },
      { fr: "Document de synthèse", en: "Summary document" },
    ],
    services: ["strategy", "audiovisual", "social"],
    isDemo: true,
  },
  {
    slug: "interface-platform",
    title: { fr: "Interface — Plateforme", en: "Interface — Platform" },
    client: "Projet de démonstration",
    year: 2024,
    category: "digital",
    cover: "/images/project-digital.png",
    gallery: [
      "/images/project-digital.png",
      "/images/project-branding.png",
      "/images/project-marketing.png",
    ],
    excerpt: {
      fr: "Plateforme digitale pour un service premium. UX rigoureuse, design system, performance.",
      en: "Digital platform for a premium service. Rigorous UX, design system, performance.",
    },
    context: {
      fr: "Une entreprise de services premium souhaite doter ses clients d'un espace digital à la hauteur de sa promesse.",
      en: "A premium services company wants to give its clients a digital space matching its promise.",
    },
    objectives: {
      fr: "Concevoir et développer une plateforme rapide, accessible et fidèle à l'identité de marque.",
      en: "Design and develop a fast, accessible platform faithful to the brand identity.",
    },
    concept: {
      fr: "Une grille asymétrique, une palette réduite, et un design system réutilisable. Aucun décor : la structure est l'expérience.",
      en: "An asymmetric grid, a reduced palette, and a reusable design system. No decoration: structure is the experience.",
    },
    deliverables: [
      { fr: "UX & architecture", en: "UX & architecture" },
      { fr: "UI design system", en: "UI design system" },
      { fr: "Développement Next.js", en: "Next.js development" },
      { fr: "Performance & SEO", en: "Performance & SEO" },
      { fr: "Documentation produit", en: "Product documentation" },
    ],
    services: ["digital", "strategy", "branding"],
    isDemo: true,
  },
  {
    slug: "campaign-launch",
    title: { fr: "Campaign — Lancement", en: "Campaign — Launch" },
    client: "Projet de démonstration",
    year: 2024,
    category: "marketing",
    cover: "/images/project-marketing.png",
    gallery: [
      "/images/project-marketing.png",
      "/images/project-event.png",
      "/images/project-photography.png",
    ],
    excerpt: {
      fr: "Campagne de lancement multi-canal. Concept, déclinaisons, activation sociale.",
      en: "Multi-channel launch campaign. Concept, declinations, social activation.",
    },
    context: {
      fr: "Une marque lance un nouveau produit sur un marché concurrentiel. L'enjeu : exister sans crier.",
      en: "A brand launches a new product in a competitive market. The challenge: exist without shouting.",
    },
    objectives: {
      fr: "Construire un concept de campagne, le décliner sur l'ensemble des canaux, et piloter l'activation sociale.",
      en: "Build a campaign concept, decline it across all channels, and pilot social activation.",
    },
    concept: {
      fr: "Une phrase, un geste, un signal. La campagne repose sur un seul acte répété, décliné en formats courts.",
      en: "One sentence, one gesture, one signal. The campaign rests on a single repeated act, declined in short formats.",
    },
    deliverables: [
      { fr: "Concept & plateforme de campagne", en: "Concept & campaign platform" },
      { fr: "Déclinaisons print & OOH", en: "Print & OOH declinations" },
      { fr: "Capsules vidéo courtes", en: "Short video capsules" },
      { fr: "Activation sociale", en: "Social activation" },
      { fr: "Plan média & reporting", en: "Media plan & reporting" },
    ],
    services: ["strategy", "social", "audiovisual"],
    isDemo: true,
  },
  {
    slug: "motion-film",
    title: { fr: "Motion — Film", en: "Motion — Film" },
    client: "Projet de démonstration",
    year: 2024,
    category: "audiovisual",
    cover: "/images/project-audiovisual.png",
    gallery: [
      "/images/project-audiovisual.png",
      "/images/project-photography.png",
      "/images/project-event.png",
    ],
    excerpt: {
      fr: "Film de marque et habillage motion. Direction artistique, animation, étalonnage.",
      en: "Brand film and motion dressing. Art direction, animation, color grading.",
    },
    context: {
      fr: "Une marque souhaite un film de marque qui puisse servir d'ouverture à toutes ses communications.",
      en: "A brand wants a brand film that can serve as the opener for all its communications.",
    },
    objectives: {
      fr: "Produire un film court, fort et déclinable, ainsi qu'un habillage motion cohérent.",
      en: "Produce a short, strong, declinable film, as well as a coherent motion dressing.",
    },
    concept: {
      fr: "Un seul mouvement de caméra, un seul mot, un seul signal. Le film tient en 30 secondes.",
      en: "A single camera move, a single word, a single signal. The film holds in 30 seconds.",
    },
    deliverables: [
      { fr: "Film de marque 30s", en: "30s brand film" },
      { fr: "Habillage motion", en: "Motion dressing" },
      { fr: "Étalonnage & mixage", en: "Color grading & mixing" },
      { fr: "Versions courtes & réseaux", en: "Short & social versions" },
      { fr: "Document de direction", en: "Direction document" },
    ],
    services: ["audiovisual", "strategy"],
    isDemo: true,
  },
];

/* ----------------------------------------------------------------------------
   Articles
---------------------------------------------------------------------------- */
export const articles: Article[] = [
  {
    slug: "penser-avant-de-creer",
    title: {
      fr: "Penser avant de créer",
      en: "Think before you create",
    },
    excerpt: {
      fr: "Pourquoi la stratégie n'est pas un luxe, mais la condition même de la création.",
      en: "Why strategy is not a luxury, but the very condition of creation.",
    },
    category: { fr: "Stratégie", en: "Strategy" },
    date: "2024-09-12",
    readTime: 6,
    cover: "/images/project-branding.png",
    content: {
      fr: `## Penser avant de créer

La création sans pensée est du décor. La stratégie sans création est un rapport. PHIKRA refuse l'un comme l'autre.

On commence toujours par le diagnostic. Pas par goût de la lenteur — par exigence de précision. Une marque qui ne sait pas ce qu'elle défend produit du bruit. Une marque qui le sait produit du silence dont on se souvient.

## La pensée comme terrain

La stratégie, chez nous, n'est pas un livrable. C'est un terrain. On y pose le positionnement, la plateforme, la narration. Tout ce qui suit — logo, film, site, campagne — s'y ancre.

Quand le terrain est solide, la création prend des risques. Quand il est mou, la création brille pour cacher qu'elle flotte.

## Le client possède le moment

PHIKRA pense. Le client possède le moment. Cette phrase n'est pas un slogan : c'est notre mode opératoire. On remet les fondations, le client habite la maison.`,
      en: `## Think before you create

Creation without thought is decoration. Strategy without creation is a report. PHIKRA refuses both.

We always start with the diagnostic. Not out of a taste for slowness — out of a demand for precision. A brand that doesn't know what it defends produces noise. A brand that does produces a silence you remember.

## Thought as ground

Strategy, for us, is not a deliverable. It is a ground. On it we lay positioning, platform, narrative. Everything that follows — logo, film, site, campaign — anchors there.

When the ground is solid, creation takes risks. When it is soft, creation shines to hide that it floats.

## The client owns the moment

PHIKRA thinks. The client owns the moment. This sentence is not a slogan: it is our mode of operation. We hand over the foundations, the client inhabits the house.`,
    },
  },
  {
    slug: "identite-comme-objet",
    title: {
      fr: "L'identité comme objet",
      en: "Identity as object",
    },
    excerpt: {
      fr: "Une marque n'est pas un logo. C'est un objet mental que l'on sculpte.",
      en: "A brand is not a logo. It is a mental object we sculpt.",
    },
    category: { fr: "Branding", en: "Branding" },
    date: "2024-07-30",
    readTime: 5,
    cover: "/images/project-branding.png",
    content: {
      fr: `## L'identité comme objet

Un logo seul ne fait pas une marque. Une marque est un objet mental : ce que les gens en pensent, en disent, en ressentent. Notre travail est de sculpter cet objet.

## Tenir sur tous les supports

Une identité se juge à sa tenue. Tient-elle sur un livre ? Sur un écran ? Sur un vêtement ? Sur un panneau ? Si elle ne tient que sur un support, ce n'est pas une identité, c'est un effet.

## La sobriété comme luxe

Le luxe n'est pas l'abondance. C'est la confiance dans peu d'éléments bien choisis. Une palette réduite, une typographie juste, un rythme tenu. Le reste est du bruit.`,
      en: `## Identity as object

A logo alone does not make a brand. A brand is a mental object: what people think, say, feel about it. Our work is to sculpt that object.

## Hold on every surface

An identity is judged by its hold. Does it hold on a book? On a screen? On clothing? On a billboard? If it holds only on one surface, it's not an identity, it's an effect.

## Sobriety as luxury

Luxury is not abundance. It is confidence in a few well-chosen elements. A reduced palette, a just typeface, a held rhythm. The rest is noise.`,
    },
  },
  {
    slug: "lumiere-cinema-marque",
    title: {
      fr: "La lumière du cinéma pour la marque",
      en: "Cinema light for the brand",
    },
    excerpt: {
      fr: "Ce que le cinéma enseigne à la marque : la lumière, le cadre, le rythme.",
      en: "What cinema teaches the brand: light, frame, rhythm.",
    },
    category: { fr: "Audiovisuel", en: "Audiovisual" },
    date: "2024-06-18",
    readTime: 7,
    cover: "/images/project-photography.png",
    content: {
      fr: `## La lumière du cinéma pour la marque

La marque a tout à apprendre du cinéma. Pas des effets : de la lumière. Pas des stories : du cadre. Pas du volume : du rythme.

## Le cadre avant l'effet

Un cadre juste vaut mieux que mille effets. Chez PHIKRA, on commence par le cadre : où place-t-on le sujet, où place-t-on le vide. Le reste suit.

## Le rythme tient le film

Un film ne tient pas par ses images mais par son rythme. Coupes, silences, respirations. Une marque qui ne respire pas épuise son public.`,
      en: `## Cinema light for the brand

The brand has everything to learn from cinema. Not from effects: from light. Not from stories: from frame. Not from volume: from rhythm.

## Frame before effect

A just frame is worth a thousand effects. At PHIKRA, we start with the frame: where to place the subject, where to place the void. The rest follows.

## Rhythm holds the film

A film doesn't hold by its images but by its rhythm. Cuts, silences, breaths. A brand that doesn't breathe exhausts its audience.`,
    },
  },
  {
    slug: "performance-web-luxe",
    title: {
      fr: "Performance web & luxe",
      en: "Web performance & luxury",
    },
    excerpt: {
      fr: "La rapidité est un signe de respect. Le luxe numérique commence par la performance.",
      en: "Speed is a sign of respect. Digital luxury starts with performance.",
    },
    category: { fr: "Digital", en: "Digital" },
    date: "2024-05-02",
    readTime: 6,
    cover: "/images/project-digital.png",
    content: {
      fr: `## Performance web & luxe

Un site lent n'est jamais luxueux. La performance est la première forme de respect que l'on offre à un visiteur. Tout le reste — typographie, animations, transitions — ne tient que si la base est rapide.

## Sobriété technique

Chez PHIKRA, on ne charge pas ce qui n'est pas nécessaire. On mesure, on optimise, on coupe. La sobriété technique est aussi une forme de design.

## Le détail est la marque

Un pixel de trop, une transition mal sentie, un texte mal calé : ce sont ces détails qui trahissent une marque. Notre travail est de les traquer.`,
      en: `## Web performance & luxury

A slow site is never luxurious. Performance is the first form of respect you offer a visitor. Everything else — typography, animations, transitions — only holds if the base is fast.

## Technical sobriety

At PHIKRA, we don't load what isn't necessary. We measure, we optimize, we cut. Technical sobriety is also a form of design.

## Detail is the brand

One pixel too many, a misfelt transition, an ill-aligned text: these are the details that betray a brand. Our work is to hunt them.`,
    },
  },
];

/* ----------------------------------------------------------------------------
   Method steps
---------------------------------------------------------------------------- */
export const methodSteps: { number: string; title: Localized; text: Localized }[] = [
  {
    number: "01",
    title: { fr: "Penser", en: "Think" },
    text: {
      fr: "Diagnostic, écoute, positionnement. On pose le terrain avant tout.",
      en: "Diagnostic, listening, positioning. We lay the ground before anything.",
    },
  },
  {
    number: "02",
    title: { fr: "Concevoir", en: "Design" },
    text: {
      fr: "Concept, identité, plateforme. On sculpte l'objet mental.",
      en: "Concept, identity, platform. We sculpt the mental object.",
    },
  },
  {
    number: "03",
    title: { fr: "Produire", en: "Produce" },
    text: {
      fr: "Image, film, code. On exécute sans perdre l'intention.",
      en: "Image, film, code. We execute without losing intent.",
    },
  },
  {
    number: "04",
    title: { fr: "Déployer", en: "Deploy" },
    text: {
      fr: "Lancement, suivi, ajustement. On tient la scène dans la durée.",
      en: "Launch, follow-up, adjustment. We hold the stage over time.",
    },
  },
];

/* ----------------------------------------------------------------------------
   Pillars
---------------------------------------------------------------------------- */
export const pillars: { title: Localized; text: Localized }[] = [
  {
    title: { fr: "La pensée d'abord", en: "Thought first" },
    text: {
      fr: "Rien n'est produit sans diagnostic. La stratégie précède toujours.",
      en: "Nothing is produced without diagnostic. Strategy always precedes.",
    },
  },
  {
    title: { fr: "L'exigence du détail", en: "Demand for detail" },
    text: {
      fr: "Un pixel, un mot, une coupe : tout compte. Le détail est la marque.",
      en: "A pixel, a word, a cut: everything counts. Detail is the brand.",
    },
  },
  {
    title: { fr: "La sobriété comme luxe", en: "Sobriety as luxury" },
    text: {
      fr: "Peu d'éléments, bien choisis. Le luxe n'est pas l'abondance.",
      en: "Few elements, well chosen. Luxury is not abundance.",
    },
  },
  {
    title: { fr: "La collaboration franche", en: "Frank collaboration" },
    text: {
      fr: "On dit ce qu'on pense. Le client possède le moment, on possède la pensée.",
      en: "We say what we think. The client owns the moment, we own the thought.",
    },
  },
  {
    title: { fr: "L'audace maîtrisée", en: "Measured boldness" },
    text: {
      fr: "Oser sans tomber dans l'effet. L'audace est une intention, pas un accident.",
      en: "Dare without falling into gimmick. Boldness is an intention, not an accident.",
    },
  },
  {
    title: { fr: "Le résultat d'abord", en: "Result first" },
    text: {
      fr: "La création sert l'impact. Ce qui compte, c'est ce qui reste après le déploiement.",
      en: "Creation serves impact. What matters is what remains after deployment.",
    },
  },
];

/* ----------------------------------------------------------------------------
   Process steps
---------------------------------------------------------------------------- */
export const processSteps: { number: string; title: Localized; text: Localized }[] = [
  {
    number: "01",
    title: { fr: "Écoute & diagnostic", en: "Listen & diagnose" },
    text: {
      fr: "On commence par écouter. Le brief, le marché, la contrainte. On dresse un diagnostic clair, sans détour.",
      en: "We start by listening. The brief, the market, the constraint. We draw a clear diagnostic, without detour.",
    },
  },
  {
    number: "02",
    title: { fr: "Stratégie & concept", en: "Strategy & concept" },
    text: {
      fr: "On définit le terrain : positionnement, plateforme, concept directeur. Tout ce qui suit s'y ancre.",
      en: "We define the ground: positioning, platform, directing concept. Everything that follows anchors there.",
    },
  },
  {
    number: "03",
    title: { fr: "Création & production", en: "Creation & production" },
    text: {
      fr: "On exécute. Image, film, site, campagne. Avec la même intention du début à la fin.",
      en: "We execute. Image, film, site, campaign. With the same intent from start to finish.",
    },
  },
  {
    number: "04",
    title: { fr: "Déploiement & suivi", en: "Deployment & follow-up" },
    text: {
      fr: "On lance, on mesure, on ajuste. La marque est vivante : on la tient dans la durée.",
      en: "We launch, we measure, we adjust. The brand is alive: we hold it over time.",
    },
  },
];

/* ----------------------------------------------------------------------------
   UI dictionary
---------------------------------------------------------------------------- */
export const ui = {
  nav: {
    cta: { fr: "Parlons de votre projet", en: "Let's talk about your project" },
  },
  hero: {
    eyebrow: { fr: "Creative Intelligence Studio", en: "Creative Intelligence Studio" },
    title1: { fr: "Des idées qui font", en: "Ideas that make" },
    titleAccent: { fr: "LA DIFFÉRENCE.", en: "THE DIFFERENCE." },
    paragraph: {
      fr: "PHIKRA est un studio de création qui pense avant de produire. Stratégie, branding, image, digital. On construit des marques qui se tiennent.",
      en: "PHIKRA is a creative studio that thinks before producing. Strategy, branding, image, digital. We build brands that hold.",
    },
    cta1: { fr: "Parlons de votre projet", en: "Let's talk about your project" },
    cta2: { fr: "Voir les travaux", en: "See the work" },
    scroll: { fr: "Défiler", en: "Scroll" },
  },
  intro: {
    label: { fr: "Le studio", en: "The studio" },
    title: {
      fr: "On pense la marque comme on pense un film : avec une intention, un rythme, et une signature.",
      en: "We think the brand as we think a film: with an intent, a rhythm, and a signature.",
    },
    body: {
      fr: "PHIKRA accompagne les marques exigeantes — éditeurs, institutions, labels, maisons — dans la construction d'une présence cohérente. De la stratégie au déploiement, on tient la scène sans bruit.",
      en: "PHIKRA supports demanding brands — publishers, institutions, labels, houses — in building a coherent presence. From strategy to deployment, we hold the stage without noise.",
    },
  },
  expertise: {
    label: { fr: "Expertise", en: "Expertise" },
    title: { fr: "Cinq gestes, une exigence.", en: "Five gestures, one demand." },
    subtitle: {
      fr: "Du diagnostic au déploiement, on couvre l'ensemble de la chaîne.",
      en: "From diagnostic to deployment, we cover the whole chain.",
    },
    discover: { fr: "Découvrir", en: "Discover" },
  },
  work: {
    label: { fr: "Travaux", en: "Work" },
    title: { fr: "Sélection.", en: "Selection." },
    subtitle: {
      fr: "Projets de démonstration. La production réelle est confidentielle.",
      en: "Demonstration projects. Real production is confidential.",
    },
    view: { fr: "Voir le projet", en: "View project" },
    all: { fr: "Tous les projets", en: "All projects" },
  },
  method: {
    label: { fr: "Méthode", en: "Method" },
    title: { fr: "Penser. Concevoir. Produire. Déployer.", en: "Think. Design. Produce. Deploy." },
    subtitle: {
      fr: "Une méthode en quatre temps, du diagnostic au suivi.",
      en: "A four-step method, from diagnostic to follow-up.",
    },
  },
  cta: {
    title: { fr: "Un projet en tête ?", en: "A project in mind?" },
    subtitle: {
      fr: "On en parle. Le premier rendez-vous est sans engagement.",
      en: "Let's talk. The first meeting is without commitment.",
    },
    button: { fr: "Parlons de votre projet", en: "Let's talk about your project" },
  },
  agency: {
    label: { fr: "Agence", en: "Agency" },
    coverTitle: { fr: "WE THINK. YOU LEAD.", en: "WE THINK. YOU LEAD." },
    coverSub: {
      fr: "PHIKRA fait la pensée. Le client possède le moment.",
      en: "PHIKRA does the thinking. The client owns the moment.",
    },
    manifestoLabel: { fr: "Manifeste", en: "Manifesto" },
    manifesto: {
      fr: "On croit aux marques qui se tiennent. Pas aux marques qui crient. On croit au détail, à la sobriété, à la patience. On croit que la pensée précède la création, et que la création sans pensée n'est que décor. On construit des marques comme on construit des objets : avec une intention, un matériau, et un soin.",
      en: "We believe in brands that hold. Not in brands that shout. We believe in detail, sobriety, patience. We believe that thought precedes creation, and that creation without thought is only decoration. We build brands as we build objects: with an intent, a material, and a care.",
    },
    pillarsLabel: { fr: "Piliers", en: "Pillars" },
    pillarsTitle: { fr: "Ce qui nous tient.", en: "What holds us." },
    signatureLabel: { fr: "Signature", en: "Signature" },
    processLabel: { fr: "Processus", en: "Process" },
    processTitle: { fr: "Quatre temps, du brief au suivi.", en: "Four steps, from brief to follow-up." },
  },
  services: {
    label: { fr: "Expertise", en: "Expertise" },
    title: { fr: "Cinq gestes, une exigence.", en: "Five gestures, one demand." },
    subtitle: {
      fr: "Du diagnostic au déploiement, on couvre l'ensemble de la chaîne.",
      en: "From diagnostic to deployment, we cover the whole chain.",
    },
    items: { fr: "Inclus dans ce geste", en: "Included in this gesture" },
    contact: { fr: "Demander ce service", en: "Request this service" },
  },
  portfolio: {
    label: { fr: "Travaux", en: "Work" },
    title: { fr: "Sélection.", en: "Selection." },
    subtitle: {
      fr: "Une sélection de projets récents.",
      en: "A selection of recent work.",
    },
    demoNote: {
      fr: "Sélection de démonstration",
      en: "Demonstration selection",
    },
    filterAll: { fr: "Tout", en: "All" },
    empty: { fr: "Aucun projet dans cette catégorie.", en: "No projects in this category." },
  },
  project: {
    back: { fr: "Retour aux travaux", en: "Back to work" },
    demo: { fr: "Projet de démonstration", en: "Demonstration project" },
    client: { fr: "Client", en: "Client" },
    year: { fr: "Année", en: "Year" },
    category: { fr: "Catégorie", en: "Category" },
    services: { fr: "Services", en: "Services" },
    context: { fr: "Contexte", en: "Context" },
    objectives: { fr: "Objectifs", en: "Objectives" },
    concept: { fr: "Concept", en: "Concept" },
    gallery: { fr: "Galerie", en: "Gallery" },
    deliverables: { fr: "Livrables", en: "Deliverables" },
    next: { fr: "Projet suivant", en: "Next project" },
    similar: { fr: "Projets similaires", en: "Similar projects" },
    aside: { fr: "Sommaire", en: "Outline" },
  },
  news: {
    label: { fr: "Notes", en: "Notes" },
    title: { fr: "Penser, écrit.", en: "Thinking, written." },
    subtitle: {
      fr: "Des notes sur la marque, l'image et le métier.",
      en: "Notes on brand, image, and the craft.",
    },
    featured: { fr: "À la une", en: "Featured" },
    latest: { fr: "Dernières notes", en: "Latest notes" },
    read: { fr: "Lire la note", en: "Read the note" },
  },
  article: {
    back: { fr: "Retour aux notes", en: "Back to notes" },
    date: { fr: "Publié le", en: "Published on" },
    readTime: { fr: "min de lecture", en: "min read" },
    share: { fr: "Partager", en: "Share" },
    next: { fr: "Lire ensuite", en: "Read next" },
  },
  contact: {
    label: { fr: "Contact", en: "Contact" },
    title: { fr: "Parlons de votre projet.", en: "Let's talk about your project." },
    subtitle: {
      fr: "Quelques informations, et on revient vers vous sous 48h.",
      en: "A few details, and we'll get back to you within 48h.",
    },
    aside: { fr: "Autrement", en: "Otherwise" },
    email: { fr: "Écrire à", en: "Email" },
    phone: { fr: "Téléphone", en: "Phone" },
    whatsapp: { fr: "WhatsApp", en: "WhatsApp" },
    address: { fr: "Adresse", en: "Address" },
    social: { fr: "Réseaux", en: "Social" },
    configNote: {
      fr: "Les coordonnées de contact seront configurées à la mise en production.",
      en: "Contact details will be configured at production launch.",
    },
  },
  form: {
    name: { fr: "Nom complet", en: "Full name" },
    namePh: { fr: "Votre nom", en: "Your name" },
    company: { fr: "Société (optionnel)", en: "Company (optional)" },
    companyPh: { fr: "Nom de la société", en: "Company name" },
    email: { fr: "E-mail", en: "Email" },
    emailPh: { fr: "vous@exemple.com", en: "you@example.com" },
    phone: { fr: "Téléphone (optionnel)", en: "Phone (optional)" },
    phonePh: { fr: "+212 ...", en: "+212 ..." },
    serviceType: { fr: "Type de prestation", en: "Service type" },
    serviceTypePh: { fr: "Choisir un geste", en: "Choose a gesture" },
    budget: { fr: "Budget (optionnel)", en: "Budget (optional)" },
    budgetPh: { fr: "Fourchette", en: "Range" },
    deadline: { fr: "Délai souhaité", en: "Desired deadline" },
    deadlinePh: { fr: "Choisir un délai", en: "Choose a deadline" },
    message: { fr: "Votre projet", en: "Your project" },
    messagePh: {
      fr: "Parlez-nous du projet, des objectifs, du contexte...",
      en: "Tell us about the project, goals, context...",
    },
    consent: {
      fr: "J'accepte que PHIKRA traite mes données pour répondre à ma demande.",
      en: "I agree that PHIKRA processes my data to answer my request.",
    },
    submit: { fr: "Envoyer la demande", en: "Send request" },
    sending: { fr: "Envoi...", en: "Sending..." },
    success: {
      fr: "Demande reçue. On revient vers vous sous 48h.",
      en: "Request received. We'll get back to you within 48h.",
    },
    error: {
      fr: "Une erreur est survenue. Réessayez ou écrivez-nous directement.",
      en: "An error occurred. Try again or write to us directly.",
    },
    website: { fr: "Site web", en: "Website" },
    websitePh: { fr: "Laisser vide", en: "Leave empty" },
    errors: {
      name: { fr: "Nom trop court.", en: "Name too short." },
      email: { fr: "E-mail invalide.", en: "Invalid email." },
      serviceType: { fr: "Sélectionnez une prestation.", en: "Select a service." },
      deadline: { fr: "Sélectionnez un délai.", en: "Select a deadline." },
      message: { fr: "Décrivez votre projet (10 caractères min).", en: "Describe your project (10 chars min)." },
      consent: { fr: "Vous devez accepter le traitement.", en: "You must accept processing." },
    },
    budgets: [
      { fr: "< 5 000 €", en: "< €5,000" },
      { fr: "5 000 – 15 000 €", en: "€5,000 – €15,000" },
      { fr: "15 000 – 30 000 €", en: "€15,000 – €30,000" },
      { fr: "30 000 – 60 000 €", en: "€30,000 – €60,000" },
      { fr: "> 60 000 €", en: "> €60,000" },
    ],
    deadlines: [
      { fr: "Dans le mois", en: "Within a month" },
      { fr: "Sous 3 mois", en: "Within 3 months" },
      { fr: "Sous 6 mois", en: "Within 6 months" },
      { fr: "Pas de date fixée", en: "No fixed date" },
    ],
  },
  footer: {
    signature1: { fr: "WE THINK.", en: "WE THINK." },
    signature2: { fr: "YOU LEAD.", en: "YOU LEAD." },
    signatureSub: {
      fr: "Une conversation ouverte. On commence par écouter.",
      en: "An open conversation. We start by listening.",
    },
    cta: { fr: "Parlons de votre projet", en: "Let's talk about your project" },
    about: { fr: "À propos", en: "About" },
    aboutText: {
      fr: "PHIKRA — Creative Intelligence Studio. Stratégie, branding, image, digital.",
      en: "PHIKRA — Creative Intelligence Studio. Strategy, branding, image, digital.",
    },
    navigation: { fr: "Navigation", en: "Navigation" },
    expertise: { fr: "Expertise", en: "Expertise" },
    contact: { fr: "Contact", en: "Contact" },
    rights: { fr: "Tous droits réservés.", en: "All rights reserved." },
    legal: { fr: "Mentions légales", en: "Legal notice" },
    privacy: { fr: "Confidentialité", en: "Privacy" },
    configNote: {
      fr: "Site de démonstration — coordonnées à configurer.",
      en: "Demonstration site — details to be configured.",
    },
  },
  common: {
    loading: { fr: "Chargement", en: "Loading" },
    close: { fr: "Fermer", en: "Close" },
    menu: { fr: "Menu", en: "Menu" },
    back: { fr: "Retour", en: "Back" },
    next: { fr: "Suivant", en: "Next" },
    previous: { fr: "Précédent", en: "Previous" },
  },
  legal: {
    title: { fr: "Mentions légales", en: "Legal notice" },
    privacyTitle: { fr: "Politique de confidentialité", en: "Privacy policy" },
    updated: { fr: "Dernière mise à jour", en: "Last updated" },
    sections: {
      editor: { fr: "Éditeur", en: "Publisher" },
      editorBody: {
        fr: "Le présent site est édité par PHIKRA, Creative Intelligence Studio. [À configurer — forme juridique, capital, RCS, adresse complète].",
        en: "This site is published by PHIKRA, Creative Intelligence Studio. [To be configured — legal form, capital, RCS, full address].",
      },
      director: { fr: "Directeur de la publication", en: "Publication director" },
      directorBody: {
        fr: "[À configurer — nom du directeur de la publication].",
        en: "[To be configured — name of the publication director].",
      },
      host: { fr: "Hébergement", en: "Hosting" },
      hostBody: {
        fr: "Le site est hébergé par [À configurer — nom de l'hébergeur, adresse].",
        en: "The site is hosted by [To be configured — host name, address].",
      },
      ip: { fr: "Propriété intellectuelle", en: "Intellectual property" },
      ipBody: {
        fr: "L'ensemble des contenus présents sur ce site (textes, images, vidéos, logos) est la propriété de PHIKRA ou de ses partenaires. Toute reproduction sans autorisation est interdite.",
        en: "All content on this site (texts, images, videos, logos) is the property of PHIKRA or its partners. Any reproduction without authorization is prohibited.",
      },
      data: { fr: "Données personnelles", en: "Personal data" },
      dataBody: {
        fr: "Les données collectées via le formulaire de contact sont utilisées uniquement pour répondre à votre demande. Elles ne sont pas cédées à des tiers. Vous pouvez exercer vos droits d'accès, de rectification et de suppression à l'adresse hello@phikra.studio.",
        en: "Data collected via the contact form is used only to answer your request. It is not transferred to third parties. You can exercise your rights of access, rectification and deletion at hello@phikra.studio.",
      },
      cookies: { fr: "Cookies", en: "Cookies" },
      cookiesBody: {
        fr: "Ce site ne dépose pas de cookies publicitaires. Des cookies techniques peuvent être utilisés pour assurer le fonctionnement du site.",
        en: "This site does not place advertising cookies. Technical cookies may be used to ensure site operation.",
      },
    },
  },
} as const;

/* ----------------------------------------------------------------------------
   Helpers
---------------------------------------------------------------------------- */
export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getService(id: string): Service | undefined {
  return services.find((s) => s.id === id);
}

export { siteConfig };
