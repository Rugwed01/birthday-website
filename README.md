# Birthday Website for Tunnu Babyyy ❤️

A beautiful, romantic, single-page birthday website built with Next.js, TypeScript, and Framer Motion.

## Features

- **Animated Hero Section** with floating hearts
- **Interactive Timeline** showcasing your relationship journey
- **Photo Gallery** with modal view
- **Love Letter Section** with elegant staggered animations
- **Surprise Section** with confetti effect
- **Smooth Navigation** with scroll-based active states
- **Fully Responsive** - looks great on mobile and desktop
- **Romantic Design** with soft pinks, purples, and warm neutrals

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Customizing Content

All the text content is centralized in the `content.ts` file. Simply edit this file to personalize:

### 1. Hero Section
- Change the title and subtitle

### 2. Timeline
- Update the 6 relationship milestones with your own dates and stories

### 3. Gallery
- The gallery currently shows placeholder gradients
- To add real photos, you can:
  - Place images in the `public` folder
  - Update the gallery items in `content.ts` to include image URLs
  - Modify the Gallery component to display actual images

### 4. Love Letter
- Customize all the paragraphs in the love letter section

### 5. Final Surprise
- Edit the surprise message that appears with confetti

## Adding Real Photos

To replace the placeholder gradients with real photos:

1. Create a `public/images` folder in the project root
2. Add your photos there
3. In `components/Gallery.tsx`, replace the placeholder div with:

```tsx
<Image
  src={`/images/${item.id}.jpg`}
  alt={item.caption}
  fill
  className="object-cover"
/>
```

4. Import Next.js Image component at the top:
```tsx
import Image from "next/image";
```

## Color Scheme

The romantic color palette uses:
- Soft pinks
- Lavender purples
- Warm peaches
- Cream tones

All colors are defined in `tailwind.config.ts` and can be customized to your preference.

## Animations

The site features:
- Framer Motion for smooth page transitions
- Scroll-based animations that trigger as you scroll
- Hover effects on interactive elements
- Confetti explosion on the surprise button
- Floating hearts in the hero section

## Build for Production

To create an optimized production build:

```bash
npm run build
```

To run the production server:

```bash
npm start
```

## Project Structure

```
birthday-website/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Layout/
│   │   └── NavBar.tsx
│   ├── Hero.tsx
│   ├── Timeline.tsx
│   ├── Gallery.tsx
│   ├── LoveLetter.tsx
│   └── FinalSurprise.tsx
├── content.ts
└── tailwind.config.ts
```

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **canvas-confetti** - Confetti effects
- **Lucide React** - Beautiful icons

## Tips for Deployment

This site can be easily deployed to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **GitHub Pages** (requires static export)

For Vercel deployment:
1. Push your code to GitHub
2. Import the repository in Vercel
3. Deploy with one click

---

Made with ❤️ for Tunnu Babyyy
