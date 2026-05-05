function AboutMe() {
  const profileImageUrl = `${import.meta.env.BASE_URL}assets/profile2.jpg`

  return (
    <div className="about-layout">
      <img src={profileImageUrl} alt="Eric Kim portrait" className="about-photo" />

      <div className="panel">
        <div className="panel-kicker">Profile</div>
        <h2>Eric J. Kim</h2>
        <p>
          I build analytics that are useful in real operating environments:
          clean SQL, sharper KPI definitions, and dashboards that help people
          make decisions.
        </p>

        <div className="fact-grid">
          <div className="fact-card">
            <span>Base</span>
            <strong>Walnut, CA</strong>
          </div>
          <div className="fact-card">
            <span>Focus</span>
            <strong>Data + systems</strong>
          </div>
          <div className="fact-card">
            <span>Strength</span>
            <strong>Operator mindset</strong>
          </div>
          <div className="fact-card">
            <span>Stack</span>
            <strong>SQL / Python / BI</strong>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutMe
