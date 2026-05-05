import type { DesktopItem, WindowKind } from '../types'

const assetBase = `${import.meta.env.BASE_URL}assets/`

export type PortfolioEntry = {
  id: string
  name: string
  kind: WindowKind
  icon: string
  openTargetId?: string
  folderId?: string
  parentId?: string
  markdown?: string
  imageUrl?: string
  placeholderTheme?: 'fallout' | 'dark'
  pdfUrl?: string
  appUrl?: string
  defaultWidth: number
  defaultHeight: number
}

export const portfolioEntries: Record<string, PortfolioEntry> = {
  computer: {
    id: 'computer',
    name: 'My Computer',
    kind: 'folder',
    icon: 'computer',
    folderId: 'desktop',
    defaultWidth: 700,
    defaultHeight: 480,
  },
  info: {
    id: 'info',
    name: 'Info',
    kind: 'document',
    icon: 'info',
    folderId: 'desktop',
    imageUrl: `${assetBase}profile2.jpg`,
    markdown: `# Eric J. Kim

I build analytics that are useful in real operating environments: clean SQL, sharper KPI definitions, and dashboards that help people make decisions.

Base: Walnut, CA

Focus: Data, systems, and practical business intelligence

Stack: SQL, Python, BI tools, Excel, and operational reporting`,
    defaultWidth: 650,
    defaultHeight: 520,
  },
  projects: {
    id: 'projects',
    name: 'Projects',
    kind: 'folder',
    icon: 'folder',
    folderId: 'desktop',
    defaultWidth: 620,
    defaultHeight: 430,
  },
  'work-history': {
    id: 'work-history',
    name: 'Work History',
    kind: 'folder',
    icon: 'briefcase',
    folderId: 'desktop',
    defaultWidth: 600,
    defaultHeight: 410,
  },
  contact: {
    id: 'contact',
    name: 'Contact',
    kind: 'folder',
    icon: 'folder',
    folderId: 'desktop',
    defaultWidth: 520,
    defaultHeight: 360,
  },
  resume: {
    id: 'resume',
    name: 'Eric-Kim-Resume.pdf',
    kind: 'pdf',
    icon: 'pdf',
    folderId: 'desktop',
    pdfUrl: `${assetBase}Eric-Kim-Resume.pdf`,
    defaultWidth: 980,
    defaultHeight: 720,
  },
  trash: {
    id: 'trash',
    name: 'Recycle Bin',
    kind: 'folder',
    icon: 'trash',
    folderId: 'desktop',
    defaultWidth: 560,
    defaultHeight: 400,
  },
  calculator: {
    id: 'calculator',
    name: 'Calculator',
    kind: 'calculator',
    icon: 'calculator',
    folderId: 'desktop',
    defaultWidth: 330,
    defaultHeight: 430,
  },
  fallout: {
    id: 'fallout',
    name: 'Fallout 3',
    kind: 'placeholder',
    icon: 'fallout',
    folderId: 'desktop',
    placeholderTheme: 'fallout',
    markdown: `# Fallout 3
Just one of my all-time favorite game`,
    defaultWidth: 560,
    defaultHeight: 390,
  },
  'dark-and-darker': {
    id: 'dark-and-darker',
    name: 'Dark And Darker',
    kind: 'placeholder',
    icon: 'dark',
    folderId: 'desktop',
    placeholderTheme: 'dark',
    markdown: `# Dark and Darker
What I'm playing these days...`,
    defaultWidth: 560,
    defaultHeight: 390,
  },
  'computer-projects': {
    id: 'computer-projects',
    name: 'Projects',
    kind: 'folder',
    icon: 'folder',
    openTargetId: 'projects',
    folderId: 'computer',
    defaultWidth: 620,
    defaultHeight: 430,
  },
  'computer-work-history': {
    id: 'computer-work-history',
    name: 'Work History',
    kind: 'folder',
    icon: 'briefcase',
    openTargetId: 'work-history',
    folderId: 'computer',
    defaultWidth: 600,
    defaultHeight: 410,
  },
  'computer-contact': {
    id: 'computer-contact',
    name: 'Contact',
    kind: 'folder',
    icon: 'folder',
    openTargetId: 'contact',
    folderId: 'computer',
    defaultWidth: 520,
    defaultHeight: 360,
  },
  'computer-info': {
    id: 'computer-info',
    name: 'Info',
    kind: 'document',
    icon: 'info',
    openTargetId: 'info',
    folderId: 'computer',
    defaultWidth: 650,
    defaultHeight: 520,
  },
  'computer-resume': {
    id: 'computer-resume',
    name: 'Eric-Kim-Resume.pdf',
    kind: 'pdf',
    icon: 'pdf',
    openTargetId: 'resume',
    folderId: 'computer',
    pdfUrl: `${assetBase}Eric-Kim-Resume.pdf`,
    defaultWidth: 980,
    defaultHeight: 720,
  },
  'projects-dashboard': {
    id: 'projects-dashboard',
    name: 'Beverage Outlier Dashboard.md',
    kind: 'markdown',
    icon: 'markdown',
    folderId: 'projects',
    markdown: `# Beverage Outlier Dashboard

SQL / Tableau / Statistics

A store-level monitoring tool using normalized rate-of-sale logic to separate meaningful changes from everyday reporting noise.`,
    defaultWidth: 580,
    defaultHeight: 390,
  },
  'projects-ops': {
    id: 'projects-ops',
    name: 'Operations Performance Views.md',
    kind: 'markdown',
    icon: 'markdown',
    folderId: 'projects',
    markdown: `# Operations Performance Views

Superset / Excel / Python

Weekly operational reporting that made KPI movement, anomalies, and category shifts easier to investigate quickly.`,
    defaultWidth: 580,
    defaultHeight: 390,
  },
  'projects-metrics': {
    id: 'projects-metrics',
    name: 'Metric Storytelling Framework.md',
    kind: 'markdown',
    icon: 'markdown',
    folderId: 'projects',
    markdown: `# Metric Storytelling Framework

Experimentation / BI / Analysis

A reporting structure built around the decisions leaders actually need to make, not just the charts they can look at.`,
    defaultWidth: 580,
    defaultHeight: 390,
  },
  'projects-viz-builder': {
    id: 'projects-viz-builder',
    name: 'Viz Builder.app',
    kind: 'webapp',
    icon: 'calculator',
    folderId: 'projects',
    appUrl: `${import.meta.env.BASE_URL}viz-builder/index.html`,
    defaultWidth: 1180,
    defaultHeight: 760,
  },
  'work-hofman': {
    id: 'work-hofman',
    name: 'Hofman Hospitality Group.md',
    kind: 'markdown',
    icon: 'markdown',
    folderId: 'work-history',
    markdown: `# Hofman Hospitality Group

2023 - Present

Data and Systems Analyst

Built reporting systems, outlier dashboards, and category performance views across multi-store operations.`,
    defaultWidth: 580,
    defaultHeight: 390,
  },
  'work-rivian': {
    id: 'work-rivian',
    name: 'Rivian.md',
    kind: 'markdown',
    icon: 'markdown',
    folderId: 'work-history',
    markdown: `# Rivian

2021 - 2023

Data Management Analyst

Supported KPI definitions, reporting workflows, and data quality checks across operational teams.`,
    defaultWidth: 580,
    defaultHeight: 390,
  },
  'work-sup-noodle': {
    id: 'work-sup-noodle',
    name: 'Sup Noodle Bar.md',
    kind: 'markdown',
    icon: 'markdown',
    folderId: 'work-history',
    markdown: `# Sup Noodle Bar

2019 - 2021

General Manager

Operational leadership experience that still informs how I design practical, decision-ready analytics.`,
    defaultWidth: 580,
    defaultHeight: 390,
  },
  'contact-card': {
    id: 'contact-card',
    name: 'Contact Card.md',
    kind: 'markdown',
    icon: 'markdown',
    folderId: 'contact',
    markdown: `# Contact

Email: kimeric717@gmail.com

LinkedIn: linkedin.com/in/jiwoo717

GitHub: github.com/Jiwoo717`,
    defaultWidth: 520,
    defaultHeight: 360,
  },
}

export const desktopItems: DesktopItem[] = [
  { ...portfolioEntries.computer, x: 18, y: 24 },
  { ...portfolioEntries.projects, x: 18, y: 108 },
  { ...portfolioEntries.info, x: 18, y: 192 },
  { ...portfolioEntries['work-history'], x: 18, y: 276 },
  { ...portfolioEntries.contact, x: 18, y: 360 },
  { ...portfolioEntries.resume, x: 18, y: 444 },
  { ...portfolioEntries.trash, x: 118, y: 24 },
  { ...portfolioEntries.calculator, x: 118, y: 108 },
  { ...portfolioEntries.fallout, x: 118, y: 192 },
  { ...portfolioEntries['dark-and-darker'], x: 118, y: 276 },
]

export function getFolderEntries(folderId: string) {
  return Object.values(portfolioEntries).filter((entry) => entry.folderId === folderId)
}

export function getEntry(id: string) {
  return portfolioEntries[id]
}
