const experience = [
  {
    years: '2023 - Present',
    role: 'Data and Systems Analyst',
    company: 'Hofman Hospitality Group',
    text: 'Built reporting systems, outlier dashboards, and category performance views across multi-store operations.',
  },
  {
    years: '2021 - 2023',
    role: 'Data Management Analyst',
    company: 'Rivian',
    text: 'Supported KPI definitions, reporting workflows, and data quality checks across operational teams.',
  },
  {
    years: '2019 - 2021',
    role: 'General Manager',
    company: 'Sup Noodle Bar',
    text: 'Operational leadership experience that still informs how I design practical, decision-ready analytics.',
  },
]

function Experience() {
  return (
    <div className="stacked-panels">
      {experience.map((item) => (
        <section key={`${item.role}-${item.years}`} className="panel">
          <div className="panel-kicker">{item.years}</div>
          <h2>{item.role}</h2>
          <h3>{item.company}</h3>
          <p>{item.text}</p>
        </section>
      ))}
    </div>
  )
}

export default Experience
