function Resume() {
  const resumeUrl = `${import.meta.env.BASE_URL}assets/Eric-Kim-Resume.pdf`

  return (
    <div className="stacked-panels">
      <section className="panel">
        <div className="panel-kicker">Resume</div>
        <h2>Document access</h2>
        <p>
          The live portfolio exposes the current PDF directly from the desktop
          interface.
        </p>
        <a
          className="panel-link"
          href={resumeUrl}
          target="_blank"
          rel="noreferrer"
        >
          Open Resume PDF
        </a>
      </section>
    </div>
  )
}

export default Resume
