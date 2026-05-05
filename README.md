# Eric Kim Desktop Portfolio

A personal portfolio site built to feel like a desktop operating system instead of a standard scrolling webpage.

This project started as a simple portfolio and was rebuilt into an interactive desktop-style experience using React and TypeScript. The goal was to make the portfolio itself feel like a project worth showcasing: part personal site, part front-end experiment, part interface design exercise.

## What I Was Trying To Build

I wanted a portfolio that:

- felt like a real desktop instead of a traditional landing page
- presented my background, projects, resume, and work history as windows, folders, and files
- could double as a portfolio piece on its own
- showed that I can think about interaction design, state management, and front-end architecture, not just static visuals

I also wanted it to be playful and personal. This was very much a vibecoded project, but with the intention of still producing something structured, shippable, and expandable.

## Current Stack

- React
- TypeScript
- Vite
- Framer Motion
- React RND
- Iconify

## Current Features

- Desktop-style background and taskbar
- Clickable desktop shortcuts
- Drag-and-drop desktop icons
- Click-drag multi-select box for icons
- Draggable and resizable windows
- Start menu
- File-explorer style folder windows
- Resume PDF access
- Info window for personal background
- Work History folder with individual markdown-based job entries
- My Computer hub that acts as a central access point

## Project Structure

- `src/components`
  Desktop UI pieces like windows, taskbar, start menu, icons, and content rendering
- `src/components/app`
  App-specific content modules
- `src/data/portfolioFileSystem.ts`
  The content and desktop file-system model for folders, entries, files, and window metadata
- `public/assets`
  Portfolio media, icons, and static assets

## Why This Exists

This site is meant to do two jobs at once:

1. Act as my portfolio and communicate who I am, what I do, and what I have worked on.
2. Act as a demonstrable front-end project that shows interaction patterns, interface thinking, and implementation detail.

## Local Development

```bash
npm install
npm run dev
```

Then open:

```bash
http://127.0.0.1:4173
```

## Build

```bash
npm run build
```

## Deployment

The repo includes a GitHub Pages workflow under:

- `.github/workflows/deploy.yml`

Once pushed to GitHub and Pages is enabled for GitHub Actions, the site can be deployed as a static build.

## Notes

This project went through a full rewrite from an older static portfolio into the current desktop-app model. Some of the design and interaction choices are still evolving, but the core idea is stable:

turn a personal portfolio into something that feels like software.
