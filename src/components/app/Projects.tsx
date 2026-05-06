type Project = {
  name: string
  meta: string
  text: string
  demoUrl?: string
  codeUrl?: string
}

const projects: Project[] = [
  {
    name: 'NBA Streamlit Dashboard',
    meta: 'Python / Streamlit / Analytics',
    text: 'Interactive NBA analytics dashboard with separate views for team efficiency and hidden-value roster contributors.',
    demoUrl: 'https://nba-streamlit-dashboard.streamlit.app',
    codeUrl: 'https://github.com/Jiwoo717/nba-streamlit-dashboard',
  },
  {
    name: 'Beverage Outlier Dashboard',
    meta: 'SQL / Tableau / Statistics',
    text: 'A store-level monitoring tool using normalized rate-of-sale logic to separate meaningful changes from everyday reporting noise.',
  },
  {
    name: 'Operations Performance Views',
    meta: 'Superset / Excel / Python',
    text: 'Weekly operational reporting that made KPI movement, anomalies, and category shifts easier to investigate quickly.',
  },
  {
    name: 'Metric Storytelling Framework',
    meta: 'Experimentation / BI / Analysis',
    text: 'A reporting structure built around the decisions leaders actually need to make, not just the charts they can look at.',
  },
]

function Projects() {
  const openExternal = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="stacked-panels">
      {projects.map((project) => (
        <section key={project.name} className="panel">
          <div className="panel-kicker">{project.meta}</div>
          <h2>{project.name}</h2>
          <p>{project.text}</p>
          {project.demoUrl || project.codeUrl ? (
            <div className="project-action-row">
              {project.demoUrl ? (
                <button type="button" onClick={() => openExternal(project.demoUrl!)}>
                  Launch dashboard
                </button>
              ) : null}
              {project.codeUrl ? (
                <button type="button" onClick={() => openExternal(project.codeUrl!)}>
                  View code
                </button>
              ) : null}
            </div>
          ) : null}
        </section>
      ))}
    </div>
  )
}

export default Projects
