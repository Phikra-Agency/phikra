# PHIKRA — Guide d'installation et déploiement

## Prérequis

- **Node.js 18+** ou **Bun** installé sur le serveur
- **Git** pour cloner le projet
- Un hébergeur supportant **Node.js** (Vercel, Netlify, OVH, Hostinger, ou VPS)

---

## Étape 1 — Récupérer le projet

```bash
# Cloner ou copier le projet sur votre serveur
git clone <votre-repo> phikra
cd phikra

# Ou si vous avez un zip :
unzip phikra.zip
cd phikra
```

---

## Étape 2 — Installer les dépendances

```bash
# Avec Bun (recommandé)
bun install

# Ou avec npm
npm install

# Ou avec yarn
yarn install
```

---

## Étape 3 — Configurer les variables d'environnement

Créer un fichier `.env` à la racine du projet :

```env
DATABASE_URL="file:./db/custom.db"
NODE_ENV="production"
```

---

## Étape 4 — Configurer les coordonnées de l'agence

Éditer le fichier `src/lib/site-config.ts` :

```typescript
contact: {
  email: "contact@phikra.studio",        // ← votre vrai email
  phone: "+212 6 XX XX XX XX",            // ← votre vrai téléphone
  whatsapp: "+2126XXXXXXXX",              // ← votre WhatsApp (sans + ni espaces)
  address: {
    line1: "123 Rue Example",             // ← votre vraie adresse
    city: "Casablanca",                   // ← votre ville
    country: "Maroc",
  },
  notifyEmail: "contact@phikra.studio",   // ← email qui reçoit les demandes
},
social: {
  instagram: "https://instagram.com/phikra",
  linkedin: "https://linkedin.com/company/phikra",
  behance: "https://behance.net/phikra",
  youtube: "",
  facebook: "",
},
url: "https://phikra.studio",             // ← votre vrai nom de domaine
```

---

## Étape 5 — Initialiser la base de données

```bash
# Générer le client Prisma
bun run db:generate

# Créer les tables dans la base SQLite
bun run db:push
```

---

## Étape 6 — Construire le site pour la production

```bash
bun run build
```

Le dossier `.next/standalone/` contient le serveur prêt à démarrer.

---

## Étape 7 — Lancer le serveur

### Option A : Vercel (le plus simple)

1. Pusher le projet sur GitHub
2. Aller sur [vercel.com](https://vercel.com)
3. « Import Project » → sélectionner le repo
4. Vercel détecte Next.js automatiquement
5. Déployer — c'est tout

### Option B : VPS / Serveur dédié

```bash
# Démarrer le serveur de production
bun run start

# Ou avec PM2 (recommandé pour la production)
npm install -g pm2
pm2 start "bun run start" --name phikra
pm2 save
pm2 startup
```

### Option C : Hébergeur classique (OVH, Hostinger)

```bash
# Build statique
bun run build

# Le dossier .next/standalone/ contient tout
# Copier sur l'hébergeur via FTP/SSH
```

---

## Étape 8 — Configurer le nom de domaine

1. Acheter un nom de domaine (ex: phikra.studio)
2. Pointer le DNS vers votre hébergeur :
   - **Vercel** : ajouter le domaine dans le dashboard Vercel
   - **VPS** : configurer les enregistrements A/CNAME chez le registrar
3. Activer le SSL/HTTPS (Let's Encrypt gratuit ou fourni par l'hébergeur)

---

## Étape 9 — Vérifier le déploiement

Tester ces points après déploiement :

- [ ] Le site s'affiche sur le nom de domaine
- [ ] Le loading screen se joue au premier chargement
- [ ] La navigation entre les pages fonctionne
- [ ] Le formulaire de contact envoie et enregistre (vérifier la DB)
- [ ] Le switch FR/EN fonctionne
- [ ] La vidéo hero se charge
- [ ] Les images du portfolio s'affichent
- [ ] Le HTTPS est actif (cadenas dans le navigateur)
- [ ] Les security headers sont présents (tester sur securityheaders.com)

---

## Structure des dossiers

```
phikra/
├── public/
│   ├── images/          # Vidéos, images hero et projets
│   ├── logo.svg         # Logo PHIKRA
│   └── robots.txt       # (généré automatiquement)
├── src/
│   ├── app/
│   │   ├── api/contact/  # API formulaire (backend sécurisé)
│   │   ├── globals.css   # Design system complet
│   │   ├── layout.tsx    # Layout racine + metadata SEO
│   │   ├── page.tsx      # Page unique (SPA hash-routing)
│   │   ├── sitemap.ts    # Sitemap XML auto
│   │   └── robots.ts     # Robots.txt auto
│   ├── components/
│   │   ├── pages/        # 9 pages (home, agency, services, etc.)
│   │   └── site/         # Composants (header, footer, cursor, etc.)
│   ├── lib/
│   │   ├── content.ts    # Tout le contenu (FR/EN, services, projets)
│   │   ├── site-config.ts # Vos coordonnées (À CONFIGURER)
│   │   └── db.ts          # Client Prisma
│   ├── stores/
│   │   └── use-app.ts     # Store Zustand (navigation + langue)
│   └── proxy.ts          # Security headers middleware
├── prisma/
│   └── schema.prisma     # Schéma base de données
├── .env                  # Variables d'environnement
├── package.json
└── next.config.ts
```

---

## Commandes utiles

| Commande | Description |
|----------|-------------|
| `bun run dev` | Démarrer en développement (port 3000) |
| `bun run build` | Construire pour la production |
| `bun run start` | Lancer le serveur de production |
| `bun run lint` | Vérifier la qualité du code |
| `bun run db:push` | Synchroniser la base de données |
| `bun run db:generate` | Régénérer le client Prisma |

---

## Sécurité déjà configurée

| Protection | Statut |
|------------|--------|
| Rate limiting (3 req/min/IP) | ✅ |
| Content-Security-Policy | ✅ |
| X-Frame-Options (DENY) | ✅ |
| X-Content-Type-Options (nosniff) | ✅ |
| Referrer-Policy | ✅ |
| HSTS (force HTTPS) | ✅ |
| Permissions-Policy | ✅ |
| Honeypot anti-bot | ✅ |
| Zod validation serveur | ✅ |
| XSS sanitization | ✅ |
| Body size limit (10KB) | ✅ |

---

## Support

Pour toute question : consultez le fichier `worklog.md` qui contient l'historique complet de développement.

**PHIKRA — WE THINK. YOU LEAD.**
