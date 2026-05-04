const projects = [
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
  return (
    <div className="stacked-panels">
      {projects.map((project) => (
        <section key={project.name} className="panel">
          <div className="panel-kicker">{project.meta}</div>
          <h2>{project.name}</h2>
          <p>{project.text}</p>
        </section>
      ))}
    </div>
  )
}

export default Projects
