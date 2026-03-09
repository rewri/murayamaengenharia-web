# Murayama Engenharia - Web Workspace Instructions

## 🎯 Project Overview

**Murayama Engenharia - Website**
Corporate portfolio website showcasing architectural and engineering projects. This is a **React 18 + TypeScript** SPA (Single Page Application) with client-side routing, animations, and comprehensive SEO support.

- **Client**: Internal company website
- **Purpose**: Showcase portfolio projects, services, company background, and contact information
- **Status**: Active development and maintenance
- **Deployment**: Vercel

## 🛠️ Tech Stack

| Category            | Tools                                               |
| ------------------- | --------------------------------------------------- |
| **Framework**       | React 18, React Router 7                            |
| **Language**        | TypeScript 5.9 (strict mode)                        |
| **Build**           | Vite 7.2, ESBuild                                   |
| **Styling**         | Tailwind CSS 3.4                                    |
| **Animations**      | Framer Motion 12                                    |
| **SEO**             | React Helmet Async                                  |
| **Icons**           | Lucide React                                        |
| **Linting**         | ESLint 9 with TypeScript-ESLint, React Hooks plugin |
| **Package Manager** | npm                                                 |

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Shared utilities (SEO, buttons, cards)
│   ├── features/       # Feature-specific components (portfolio, services, etc.)
│   ├── layout/         # Layout components (Header, Footer, floating buttons)
│   └── sections/       # Full-page sections grouped by route
├── pages/              # Page components mapped to routes
│   ├── Home/
│   ├── About/
│   ├── Portfolio/
│   └── Contact/
├── config/             # Configuration & static data
│   ├── navigation.ts
│   ├── portfolio.ts
│   ├── services.ts
│   ├── partners.ts
│   └── testimonials.ts
├── hooks/              # Custom React hooks
│   ├── useCookieConsent.ts
│   └── usePageTracking.ts
├── lib/                # Utilities & integrations
│   └── analytics.ts
├── types/              # TypeScript type definitions
├── animations/         # Shared animation definitions
└── App.tsx & main.tsx
```

**Asset Organization**:

- Images: `public/static/images/` → organized by type and portfolio category
- Videos: `public/static/videos/`
- SEO metadata: `public/sitemap.xml`

## ✅ Key Development Commands

```bash
npm run dev       # Start Vite dev server (http://localhost:5173)
npm run build     # TypeScript check + Vite production build
npm run lint      # Run ESLint
npm run preview   # Preview production build locally
```

No test runner configured; use linting as primary validation.

## 🎨 Code Conventions

### Component Structure

**Functional Components & Hooks**

- All components are functional, using React hooks (never class components)
- Use `export default` for page components, named exports for reusable components
- Component files use PascalCase: `ComponentName.tsx`

**Props & Typing**

- Always define strict TypeScript interfaces for component props
- Example pattern:

  ```typescript
  interface PortfolioCardProps {
    id: string;
    title: string;
    location: string;
    image: string;
    category: string;
  }

  export default function PortfolioCard({ id, title, ...}: PortfolioCardProps) {
    // component logic
  }
  ```

**Component Organization**

- **Common**: Reusable button/card components with general purpose
- **Features**: Components tied to specific features (portfolio cards, testimonial cards, etc.)
- **Layout**: Navigation, footer, floating buttons—present across pages
- **Sections**: Full-width sections that compose pages (e.g., `HeroSection`, `PortfolioSection`)
- Each section typically has its own components nested inside

### Data & Configuration

- Static data (portfolio items, services, navigation menu) lives in `src/config/`
- Data files are TypeScript modules exporting arrays/objects
- **Example**: `portfolio.ts` exports `allConstructions` array with typed construction items
- Category mapping is centralized (e.g., `categoryMap` in `PortfolioCard.tsx`)

### Styling

- **Tailwind CSS** for all styling—no CSS modules or inline styles
- Use utility classes: `bg-white`, `text-neutral-dark`, `shadow-sm`, etc.
- Color system uses custom Tailwind theme (neutral, primary, etc.)
- Responsive design with Tailwind breakpoints (`md:`, `lg:`)

### Animations

- **Framer Motion** for all animations
- Animation presets stored in `src/animations/motion.ts`
- Use `motion` components from `framer-motion` with props like `initial`, `animate`, `transition`, `whileHover`
- Example:
  ```typescript
  <motion.header
    initial={{ y: -24, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
  >
  ```

### Routing

- Client-side routing via **React Router 7**
- Routes defined in `App.tsx` using `BrowserRouter`, `Routes`, `Route`
- Route structure:
  - `/` → Home
  - `/sobre` → About
  - `/obras` → Portfolio list
  - `/obras/:slug` → Portfolio detail (slug built from title + ID)
  - `/contato` → Contact
- Portfolio URL uses slug generation: lowercase, normalize unicode, replace spaces with hyphens

### SEO

- **React Helmet Async** manages `<head>` meta tags per page
- Used in pages for titles, descriptions, og: tags
- Component: `SEO.tsx` in `src/components/common/seo/`

### TypeScript Configuration

- **Strict Mode**: Enabled (`"strict": true`)
- **Unused Detection**: `noUnusedLocals: true`, `noUnusedParameters: true`
- **Target**: ES2022
- **Module Resolution**: Bundler mode with verbatim module syntax

## 🚀 Development Workflow

### Starting a Feature

1. Create the component file in the appropriate folder (`components/features/`, `components/sections/`, etc.)
2. Define strict TypeScript props interface
3. Use Tailwind for styling only
4. Add Framer Motion for interactions/animations
5. If it needs data, reference `src/config/` files
6. Use `npm run lint` to validate

### Making Changes

- **ESLint Rules Enforced**: React Hooks rules, React Refresh rules
- **No Unused Code**: Linter will flag unused variables, parameters
- **Import Organization**: Keep imports organized (React/library imports, then local imports)
- Test changes with `npm run dev` before building
- Run `npm run build` to validate TypeScript and production bundle

### Image & Asset Management

- Portfolio images stored: `public/static/images/porfolio/{CATEGORY}/{PROJECT_NAME}/`
- Categories: `COMERCIAIS`, `RESIDENCIAIS`, `INDUSTRIAIS`, `GOVERNAMENTAIS`, `MOMENTUM`, `PROJETOS_3D`
- Use relative paths in components: `/static/images/...`
- Image slugs referenced in `config/portfolio.ts` must match actual filenames

## ⚠️ Common Gotchas & Constraints

1. **No Test Runner**: ESLint is your primary feedback mechanism—fix linter issues before building
2. **Vercel Deployment**: Build must succeed via `npm run build`—TypeScript errors block deployment
3. **Image Handling**: Image paths in config files must exactly match directory structure (case-sensitive)
4. **Route Slugs**: Portfolio slugs auto-generate from title; avoid duplicate titles or unexpected slug collisions
5. **Strict TypeScript**: Don't use `any` types; properly type all props and variables
6. **CSS**: All styling via Tailwind—no inline styles or style blocks (except `App.css` for global styles)
7. **Float Buttons**: `FloatingBudgetButton` is currently commented out in `App.tsx`—uncomment with caution
8. **WhatsApp Button**: Integrated floating WhatsApp button on all pages

## 🔄 Common Tasks

### Add a New Portfolio Project

1. Add object to `allConstructions` in `src/config/portfolio.ts`
2. Create/organize images in `public/static/images/porfolio/{CATEGORY}`
3. Link image slug (without extension) in portfolio config
4. If new category, update `categoryMap` in `PortfolioCard.tsx`
5. Slug generation is automatic from title

### Add a New Page

1. Create page component in `src/pages/{PageName}/`
2. Add route to `App.tsx`
3. Add menu item to `src/config/navigation.ts` if needed
4. Use SEO component in page for meta tags
5. Compose page from section components

### Update Navigation

1. Edit `src/config/navigation.ts`
2. Add item to `navigationItems` array
3. Link in Header checks active route against `href`

### Add/Update Services

1. Edit `src/config/services.ts`
2. Services can be displayed in multiple sections

## 📊 Data Types Reference

**Portfolio Item** (`config/portfolio.ts`):

```typescript
{
  id: string;
  title: string;
  location: string;
  image: string;
  category: string;
  description: string;
  client: string;
  conclusion_year: number;
  area: string;
  services: string[];
  // ... additional fields
}
```

**Navigation Item** (`config/navigation.ts`):

```typescript
{
  label: string;
  href: string;
}
```

## 📝 Best Practices

- **Keep components small and focused**—a section component should delegate to feature components
- **Centralize repeated data**—if project info appears in multiple sections, store in `config/`
- **Use Tailwind hierarchy**—apply responsive classes at component level, not inline
- **Animation performance**—use Framer Motion's `layout` and `layoutId` for efficient animations
- **Accessibility**—ensure all interactive elements can be keyboard-navigated
- **Mobile-first styling**—define base styles, then override with `md:`, `lg:` breakpoints

## 🔗 Key Files to Know

| File                               | Purpose                                |
| ---------------------------------- | -------------------------------------- |
| `src/App.tsx`                      | Route definitions and top-level layout |
| `src/config/portfolio.ts`          | All portfolio projects data            |
| `src/components/layout/Header.tsx` | Navigation menu, branding              |
| `src/pages/Home/HomePage.tsx`      | Home page composition                  |
| `tailwind.config.js`               | Tailwind theme customization           |
| `vite.config.ts`                   | Build tool configuration               |
| `tsconfig.app.json`                | TypeScript compiler options            |
| `.github/copilot-instructions.md`  | This file                              |

## 💡 Tips for AI Assistants

- **When implementing features**: Strict TypeScript types first, then component logic, then styling
- **When debugging**: Check linter first (`npm run lint`)—often reveals the issue
- **Image imports**: Reference via public path strings, not ES imports
- **Navigation**: Always check if menu item needs adding to `config/navigation.ts`
- **Animations**: Reference existing motion patterns in Header/Heroes before creating new ones
- **Route params**: Portfolio detail uses slug pattern `{title}-{id}` for consistency

## 🤖 Agent Constraints

**DO NOT** create these without explicit request:

- **Code comments**: Write self-documenting code using clear naming; avoid inline comments unless absolutely necessary
- **Documentation files**: Do not create README, CHANGELOG, or similar files—only modify existing ones if explicitly instructed
- **Summary documents**: Do not generate markdown files summarizing work or changes unless specifically requested

Only implement what is requested. Keep artifacts to a minimum.

---

**Last Updated**: March 5, 2026
**Project Version**: 0.0.0
