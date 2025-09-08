# Jake Blankenship | Business Analytics Portfolio

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS to showcase Jake Blankenship's business analytics projects and expertise.

## 🎯 NetID Tracking System
JakesWorld includes comprehensive student activity tracking with UTK NetID authentication - perfect for educational research and analytics.

### ✅ Live Features:
- Immediate NetID login prompts for all students
- Real-time page visit tracking and analytics
- Admin dashboards for monitoring student engagement
- Secure database storage with Prisma + PostgreSQL

## Features

- 🎨 Modern and clean design
- 📱 Fully responsive layout
- 🚀 Fast performance with Next.js
- 🎯 SEO optimized
- 📊 Interactive project showcases
- 📝 Blog section for sharing insights
- 📬 Contact form for easy communication

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Images**: Next.js Image Optimization
- **Icons**: Heroicons

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn package manager

### Installation

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

2. Generate placeholder images (optional):
   ```bash
   node scripts/generate-placeholders.js
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
├── public/
│   └── images/          # Static images and placeholders
├── src/
│   ├── app/            # Next.js app directory
│   │   ├── about/      # About page
│   │   ├── blog/       # Blog section
│   │   ├── contact/    # Contact page
│   │   ├── projects/   # Projects showcase
│   │   ├── skills/     # Skills & expertise
│   │   ├── layout.tsx  # Root layout
│   │   └── page.tsx    # Home page
│   └── components/     # Reusable components
├── scripts/           # Utility scripts
├── tailwind.config.ts # Tailwind configuration
└── package.json      # Project dependencies
```

## Customization

### Content

1. Update personal information:
   - Edit text content in each page component
   - Replace placeholder images with actual images
   - Update social media links in the footer

2. Projects:
   - Add new projects in `src/app/projects/page.tsx`
   - Include project images in `public/images/`
   - Update project descriptions and technologies

3. Blog:
   - Add blog posts in `src/app/blog/page.tsx`
   - Create individual blog post pages in `src/app/blog/[slug]/`
   - Update blog post content and images

### Styling

1. Colors:
   - Modify the color scheme in `tailwind.config.ts`
   - Update gradient colors in component classes

2. Typography:
   - Change fonts in `tailwind.config.ts`
   - Update text styles in `globals.css`

3. Layout:
   - Modify component layouts in individual page files
   - Adjust responsive breakpoints in Tailwind classes

## Deployment

Alternative deployment options:
- Netlify
- AWS Amplify
- Traditional hosting with `npm run build`

## Maintenance

### Regular Updates

1. Keep dependencies up to date:
   ```bash
   npm outdated
   npm update
   ```

2. Check for security vulnerabilities:
   ```bash
   npm audit
   ```

3. Run tests and build before deploying:
   ```bash
   npm run build
   ```

### Content Updates

1. Blog posts:
   - Add new posts regularly
   - Update existing content
   - Monitor engagement

2. Projects:
   - Add new projects as completed
   - Update project results and metrics
   - Keep technologies current

3. Skills:
   - Update skills and proficiency levels
   - Add new certifications
   - Remove outdated technologies

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Jake Blankenship - [jblank24@vols.utk.edu](mailto:jblank24@vols.utk.edu)
