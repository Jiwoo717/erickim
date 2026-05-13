import type { DesktopItem, WindowKind } from '../types'

const assetBase = `${import.meta.env.BASE_URL}assets/`
const nbaDashboardUrl = 'https://nba-app-dashboard-5jhhfy6uguvh3d8enyjf4u.streamlit.app/'

export type PortfolioEntry = {
  id: string
  name: string
  kind: WindowKind
  icon: string
  openTargetId?: string
  folderId?: string
  parentId?: string
  markdown?: string
  richTextHtml?: string
  richTextVersion?: string
  imageUrl?: string
  placeholderTheme?: 'fallout' | 'dark'
  pdfUrl?: string
  appUrl?: string
  linkUrl?: string
  liveUrl?: string
  codeUrl?: string
  screenshotUrl?: string
  screenshotUrls?: string[]
  summary?: string
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
    name: 'Info.tinymce',
    kind: 'richText',
    icon: 'info',
    folderId: 'desktop',
    richTextHtml: `<h1>Eric J. Kim</h1>
<p><img src="${assetBase}profile2.jpg" alt="Eric J. Kim" style="max-width: 180px; border-radius: 10px;" /></p>
<p>I build analytics that are useful in real operating environments: clean SQL, sharper KPI definitions, and dashboards that help people make decisions.</p>
<p><strong>Base:</strong> Walnut, CA</p>
<p><strong>Focus:</strong> Data, systems, and practical business intelligence</p>
<p><strong>Stack:</strong> SQL, Python, BI tools, Excel, and operational reporting</p>`,
    defaultWidth: 1230,
    defaultHeight: 805,
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
    name: 'Info.tinymce',
    kind: 'richText',
    icon: 'info',
    openTargetId: 'info',
    folderId: 'computer',
    defaultWidth: 1230,
    defaultHeight: 805,
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
  'projects-viz-builder-folder': {
    id: 'projects-viz-builder-folder',
    name: 'Viz Builder',
    kind: 'folder',
    icon: 'folder',
    folderId: 'projects',
    defaultWidth: 620,
    defaultHeight: 430,
  },
  'projects-viz-builder': {
    id: 'projects-viz-builder',
    name: 'Viz Builder.app',
    kind: 'webapp',
    icon: 'calculator',
    folderId: 'projects-viz-builder-folder',
    appUrl: `${import.meta.env.BASE_URL}viz-builder/index.html`,
    defaultWidth: 1180,
    defaultHeight: 760,
  },
  'projects-viz-builder-readme': {
    id: 'projects-viz-builder-readme',
    name: 'README.tinymce',
    kind: 'richText',
    icon: 'richText',
    folderId: 'projects-viz-builder-folder',
    richTextVersion: 'flow-svg-fixed-v4',
    richTextHtml: `<h1>Viz Builder</h1>
<p><img src="${assetBase}viz-builder-flow-fixed.svg" alt="Viz Builder flow diagram" /></p>
<h2>Tool Flow</h2>
<ol>
  <li>Local data defines the sample datasets and field metadata in <code>src/App.tsx</code>.</li>
  <li>React JS renders the interface for selecting datasets, dragging fields, and changing controls.</li>
  <li>React state stores the current chart setup: shelves, filters, transforms, chart type, and aggregations.</li>
  <li>Vega-Lite turns that state into a chart specification.</li>
  <li><code>vega-embed</code> renders the Vega-Lite spec into the browser.</li>
  <li>The chart updates whenever the user changes the configuration.</li>
</ol>
<p>TypeScript is used throughout the app to keep the data and chart configuration structured. Vite supports the local dev server and production build, while CSS and lucide-react support interface styling and icons.</p>
<h2>What I Built</h2>
<p>I built this project to show that I can create a simple data visualization tool from scratch using React JS, TypeScript, Vega-Lite, and local data.</p>
<p>The main idea is straightforward: a user can pick a dataset, drag fields into chart shelves, apply basic filters or transforms, and immediately see the visualization update.</p>
<h2>Why I Built It</h2>
<p>I wanted this to feel like a small BI-style builder instead of a static chart demo. The goal was not to recreate Tableau or Power BI, but to show that I understand the pieces behind a visual analytics interface:</p>
<ul>
  <li>how data fields are modeled</li>
  <li>how user choices become application state</li>
  <li>how chart configuration is created</li>
  <li>how a visualization library renders the final output</li>
</ul>
<h2>Tools Used</h2>
<ul>
  <li>React JS for the interface</li>
  <li>TypeScript for typed data, fields, shelves, and chart options</li>
  <li>Vega-Lite for the chart specification</li>
  <li>vega-embed for rendering the chart in the browser</li>
  <li>Vite for local development and production builds</li>
  <li>Local sample data stored directly in the app</li>
  <li>CSS for the dashboard-style layout</li>
</ul>
<h2>How The App Works</h2>
<p>The app starts with local datasets defined in <code>src/App.tsx</code>. Each dataset has rows of data and a list of fields. Each field includes a name, label, and type such as <code>quantitative</code>, <code>nominal</code>, or <code>temporal</code>.</p>
<p>The user interface is built around four main drop areas: Dimensions, Values, X Value, and Y Value. When a field is dragged into one of those areas, React stores that choice in state. Numeric fields can also receive an aggregation such as sum, average, mean, or count.</p>
<p>From there, the app builds a Vega-Lite spec. That spec defines the selected chart type, data source, encodings, aggregations, tooltips, color grouping, and chart styling. Vega-Lite then renders the chart live through <code>vega-embed</code>.</p>
<h2>Current Features</h2>
<ul>
  <li>Dataset switching</li>
  <li>Drag-and-drop fields</li>
  <li>X and Y encoding shelves</li>
  <li>Dimension and value shelves</li>
  <li>Aggregation controls for numeric values</li>
  <li>Chart types: bar, line, scatter, and area</li>
  <li>Numeric filters</li>
  <li>Simple derived metrics</li>
  <li>Live Vega-Lite rendering</li>
  <li>Export/editor actions from the Vega embed toolbar</li>
</ul>
<h2>Process</h2>
<p>I started by setting up a Vite React project with TypeScript. From there, I created a local data model that could support multiple datasets and field types.</p>
<p>Next, I built the layout as a working tool: dataset picker on the left, field shelves and controls in the middle, and the live visualization on the right.</p>
<p>After that, I connected drag-and-drop behavior to React state. This was the core interaction because the chart needed to respond to field placement, not hardcoded chart settings.</p>
<p>Then I wrote the logic that converts the current state into a Vega-Lite specification. This is the part that connects the custom UI to the visualization engine.</p>
<p>Finally, I embedded the project into my portfolio site as a standalone app window so viewers can interact with it directly.</p>
<h2>What I Learned</h2>
<p>This project helped me think through the difference between showing a chart and building a chart-building interface.</p>
<p>The most important pattern was the flow from user action to chart output: user chooses fields, React stores the configuration, the app transforms that configuration into a Vega-Lite spec, and Vega-Lite renders the visualization.</p>
<h2>Running Locally</h2>
<pre><code>npm install
npm run dev</code></pre>
<p>Build for production:</p>
<pre><code>npm run build</code></pre>
<h2>Status</h2>
<p>This is the first working iteration. The next improvements I would consider are CSV upload, saved chart configurations, more transform options, and a cleaner data profiling panel.</p>`,
    defaultWidth: 1230,
    defaultHeight: 805,
  },
  'projects-viz-builder-github': {
    id: 'projects-viz-builder-github',
    name: 'GitHub Repository.url',
    kind: 'externalLink',
    icon: 'link',
    folderId: 'projects-viz-builder-folder',
    linkUrl: 'https://github.com/Jiwoo717/data-viz-builder/tree/main',
    defaultWidth: 520,
    defaultHeight: 320,
  },
  'projects-bi-folder': {
    id: 'projects-bi-folder',
    name: 'Power BI x NeonDB',
    kind: 'folder',
    icon: 'folder',
    folderId: 'projects',
    defaultWidth: 620,
    defaultHeight: 430,
  },
  'projects-bi-readme': {
    id: 'projects-bi-readme',
    name: 'README.tinymce',
    kind: 'richText',
    icon: 'richText',
    folderId: 'projects-bi-folder',
    richTextHtml: `<h1>NYC Restaurant Inspections: Power BI + Neon PostgreSQL</h1>
<p><strong>GitHub:</strong> <a href="https://github.com/Jiwoo717/Power-Bi-x-NeonDB-x-PostgreSQL" target="_blank" rel="noreferrer">Power-Bi-x-NeonDB-x-PostgreSQL</a></p>
<p>This project is an end-to-end data engineering and BI build using public NYC restaurant inspection data, a cloud PostgreSQL database in Neon, and Power BI Desktop.</p>
<p>The goal was to show a realistic analytics workflow: pull data from an API, clean it with Python, load it into a database, model it with SQL, connect Power BI to the database, and build reporting pages from structured tables and views.</p>
<h2>Project Goals</h2>
<ul>
  <li>Extract public data from the NYC Open Data Socrata API.</li>
  <li>Clean and standardize the dataset with Python.</li>
  <li>Load the data into a live cloud PostgreSQL database.</li>
  <li>Create SQL views that are easier for Power BI to consume.</li>
  <li>Connect Power BI Desktop directly to Neon PostgreSQL.</li>
  <li>Build dashboard pages that explain restaurant inspection trends and risks.</li>
</ul>
<h2>Architecture</h2>
<p><strong>NYC Open Data API -> Python ETL -> Neon PostgreSQL -> SQL reporting views -> Power BI Desktop</strong></p>
<p>The first version loads 50,000 records from the DOHMH New York City Restaurant Inspection Results dataset. Lower inspection scores are better because the score represents violation points.</p>
<h2>Data Pipeline Evidence</h2>
<p>The screenshots below show the cloud database setup, the ETL run, row-count validation, and reporting-view validation.</p>
<p><img src="https://raw.githubusercontent.com/Jiwoo717/Power-Bi-x-NeonDB-x-PostgreSQL/main/assets/screenshots/01_neon_project_overview.png" alt="Neon project overview" /></p>
<p><img src="https://raw.githubusercontent.com/Jiwoo717/Power-Bi-x-NeonDB-x-PostgreSQL/main/assets/screenshots/03_python_etl_success.png" alt="Successful Python ETL run" /></p>
<p><img src="https://raw.githubusercontent.com/Jiwoo717/Power-Bi-x-NeonDB-x-PostgreSQL/main/assets/screenshots/04_neon_row_count_query.png" alt="Neon row count validation" /></p>
<p><img src="https://raw.githubusercontent.com/Jiwoo717/Power-Bi-x-NeonDB-x-PostgreSQL/main/assets/screenshots/05_neon_grade_summary_query.png" alt="Neon grade summary query" /></p>
<h2>Power BI Modeling Evidence</h2>
<p>The report imports PostgreSQL views from Neon and keeps the main restaurant dimension connected to the inspection fact table by the unique restaurant identifier.</p>
<p><img src="https://raw.githubusercontent.com/Jiwoo717/Power-Bi-x-NeonDB-x-PostgreSQL/main/assets/screenshots/06_powerbi_postgres_connector.png" alt="Power BI PostgreSQL connector" /></p>
<p><img src="https://raw.githubusercontent.com/Jiwoo717/Power-Bi-x-NeonDB-x-PostgreSQL/main/assets/screenshots/07_powerbi_navigator_views.png" alt="Power BI navigator views" /></p>
<p><img src="https://raw.githubusercontent.com/Jiwoo717/Power-Bi-x-NeonDB-x-PostgreSQL/main/assets/screenshots/08_powerbi_model_relationship.png" alt="Power BI model relationship" /></p>
<p><img src="https://raw.githubusercontent.com/Jiwoo717/Power-Bi-x-NeonDB-x-PostgreSQL/main/assets/screenshots/09_powerbi_dax_measures.png" alt="Power BI DAX measures" /></p>
<h2>Dashboard Pages</h2>
<p><strong>Executive Overview:</strong> KPI cards, records by month, grades, average score by borough, and top violation codes.</p>
<p><img src="https://raw.githubusercontent.com/Jiwoo717/Power-Bi-x-NeonDB-x-PostgreSQL/main/assets/screenshots/10_dashboard_executive_overview.png" alt="Executive overview dashboard" /></p>
<p><strong>Borough and Cuisine Analysis:</strong> compares inspection performance by location and cuisine type.</p>
<p><img src="https://raw.githubusercontent.com/Jiwoo717/Power-Bi-x-NeonDB-x-PostgreSQL/main/assets/screenshots/11_dashboard_borough_cuisine.png" alt="Borough and cuisine analysis dashboard" /></p>
<p><strong>Restaurant Drilldown:</strong> supports restaurant-level investigation with slicers and inspection history.</p>
<p><img src="https://raw.githubusercontent.com/Jiwoo717/Power-Bi-x-NeonDB-x-PostgreSQL/main/assets/screenshots/12_dashboard_restaurant_drilldown.png" alt="Restaurant drilldown dashboard" /></p>
<h2>Portfolio Summary</h2>
<p>Built a cloud-connected Power BI dashboard using Neon PostgreSQL and public NYC restaurant inspection data. Developed a Python ETL pipeline to extract, clean, and load inspection records into PostgreSQL, modeled the data with SQL reporting views, and connected Power BI Desktop directly to the cloud database for interactive reporting on restaurant grades, violations, borough trends, cuisine types, and inspection scores.</p>`,
    defaultWidth: 1230,
    defaultHeight: 805,
  },
  'projects-bi-github': {
    id: 'projects-bi-github',
    name: 'GitHub Repository.url',
    kind: 'externalLink',
    icon: 'link',
    folderId: 'projects-bi-folder',
    linkUrl: 'https://github.com/Jiwoo717/Power-Bi-x-NeonDB-x-PostgreSQL',
    defaultWidth: 520,
    defaultHeight: 320,
  },
  'projects-bi-executive-overview': {
    id: 'projects-bi-executive-overview',
    name: 'Executive Overview.png',
    kind: 'image',
    icon: 'image',
    folderId: 'projects-bi-folder',
    imageUrl:
      'https://raw.githubusercontent.com/Jiwoo717/Power-Bi-x-NeonDB-x-PostgreSQL/main/assets/screenshots/10_dashboard_executive_overview.png',
    defaultWidth: 1180,
    defaultHeight: 760,
  },
  'projects-bi-borough-cuisine': {
    id: 'projects-bi-borough-cuisine',
    name: 'Borough and Cuisine.png',
    kind: 'image',
    icon: 'image',
    folderId: 'projects-bi-folder',
    imageUrl:
      'https://raw.githubusercontent.com/Jiwoo717/Power-Bi-x-NeonDB-x-PostgreSQL/main/assets/screenshots/11_dashboard_borough_cuisine.png',
    defaultWidth: 1180,
    defaultHeight: 760,
  },
  'projects-bi-restaurant-drilldown': {
    id: 'projects-bi-restaurant-drilldown',
    name: 'Restaurant Drilldown.png',
    kind: 'image',
    icon: 'image',
    folderId: 'projects-bi-folder',
    imageUrl:
      'https://raw.githubusercontent.com/Jiwoo717/Power-Bi-x-NeonDB-x-PostgreSQL/main/assets/screenshots/12_dashboard_restaurant_drilldown.png',
    defaultWidth: 1180,
    defaultHeight: 760,
  },
  'projects-streamlit': {
    id: 'projects-streamlit',
    name: 'Streamlit',
    kind: 'folder',
    icon: 'folder',
    folderId: 'projects',
    defaultWidth: 620,
    defaultHeight: 430,
  },
  'projects-nba-dashboard': {
    id: 'projects-nba-dashboard',
    name: 'NBA Streamlit Dashboard.app',
    kind: 'externalProject',
    icon: 'calculator',
    folderId: 'projects-streamlit',
    liveUrl: nbaDashboardUrl,
    codeUrl: 'https://github.com/Jiwoo717/nba-streamlit-dashboard',
    screenshotUrl: `${assetBase}nba-streamlit-dashboard.png`,
    screenshotUrls: [
      `${assetBase}nba-streamlit-dashboard.png`,
      `${assetBase}nbachart1.png`,
      `${assetBase}nbachart2.png`,
      `${assetBase}nbachart3.png`,
      `${assetBase}nbachart4.png`,
    ],
    summary:
      'A Streamlit analytics dashboard that separates NBA team efficiency from hidden-value roster analysis. The app uses local CSV data, team/player impact metrics, Plotly visualizations, and a focused sidebar toggle for the two dashboard views.',
    defaultWidth: 1280,
    defaultHeight: 820,
  },
  'work-hofman': {
    id: 'work-hofman',
    name: 'Hofman Hospitality Group.tinymce',
    kind: 'richText',
    icon: 'richText',
    folderId: 'work-history',
    richTextHtml: `<h1>Hofman Hospitality Group</h1>
<p><strong>2023 - Present</strong></p>
<p><strong>Data and Systems Analyst</strong></p>
<p>Built reporting systems, outlier dashboards, and category performance views across multi-store operations.</p>`,
    defaultWidth: 1230,
    defaultHeight: 805,
  },
  'work-rivian': {
    id: 'work-rivian',
    name: 'Rivian.tinymce',
    kind: 'richText',
    icon: 'richText',
    folderId: 'work-history',
    richTextHtml: `<h1>Rivian</h1>
<p><strong>2021 - 2023</strong></p>
<p><strong>Data Management Analyst</strong></p>
<p>Supported KPI definitions, reporting workflows, and data quality checks across operational teams.</p>`,
    defaultWidth: 1230,
    defaultHeight: 805,
  },
  'work-sup-noodle': {
    id: 'work-sup-noodle',
    name: 'Sup Noodle Bar.tinymce',
    kind: 'richText',
    icon: 'richText',
    folderId: 'work-history',
    richTextHtml: `<h1>Sup Noodle Bar</h1>
<p><strong>2019 - 2021</strong></p>
<p><strong>General Manager</strong></p>
<p>Operational leadership experience that still informs how I design practical, decision-ready analytics.</p>`,
    defaultWidth: 1230,
    defaultHeight: 805,
  },
  'contact-card': {
    id: 'contact-card',
    name: 'Contact Card.tinymce',
    kind: 'richText',
    icon: 'richText',
    folderId: 'contact',
    richTextHtml: `<h1>Contact</h1>
<p><strong>Email:</strong> kimeric717@gmail.com</p>
<p><strong>LinkedIn:</strong> linkedin.com/in/jiwoo717</p>
<p><strong>GitHub:</strong> github.com/Jiwoo717</p>`,
    defaultWidth: 1230,
    defaultHeight: 805,
  },
}

export const desktopItems: DesktopItem[] = [
  { ...portfolioEntries.computer, x: 22, y: 24 },
  { ...portfolioEntries.projects, x: 22, y: 126 },
  { ...portfolioEntries.info, x: 22, y: 228 },
  { ...portfolioEntries['work-history'], x: 22, y: 330 },
  { ...portfolioEntries.contact, x: 22, y: 432 },
  { ...portfolioEntries.resume, x: 22, y: 534 },
  { ...portfolioEntries.calculator, x: 22, y: 636 },
  { ...portfolioEntries.trash, x: -110, y: 24 },
  { ...portfolioEntries.fallout, x: -110, y: 126 },
  { ...portfolioEntries['dark-and-darker'], x: -110, y: 228 },
]

export function getFolderEntries(folderId: string) {
  return Object.values(portfolioEntries).filter((entry) => entry.folderId === folderId)
}

export function getEntry(id: string) {
  return portfolioEntries[id]
}
