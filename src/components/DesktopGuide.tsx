import { useCallback, useEffect, useRef, useState } from 'react'

type GuideStep = 'present' | 'thumbs' | 'idle'

const guideAssetBase = `${import.meta.env.BASE_URL}assets/desktop-guide/`

const guideSteps: Record<GuideStep, { image: string; alt: string; message?: string }> = {
  present: {
    image: 'guide-present-left.png',
    alt: 'Desktop guide presenting the icons on the left',
    message: 'To the left are my projects, work history, contact info, and a little more about me.',
  },
  thumbs: {
    image: 'guide-thumbs-up.png',
    alt: 'Desktop guide giving a thumbs up',
    message: 'Start with Projects or Info. You are good to explore.',
  },
  idle: {
    image: 'guide-idle-tablet.png',
    alt: 'Desktop guide holding a tablet',
  },
}

function DesktopGuide() {
  const [step, setStep] = useState<GuideStep>('present')
  const timersRef = useRef<number[]>([])
  const currentStep = guideSteps[step]

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer))
    timersRef.current = []
  }, [])

  const scheduleIntro = useCallback(() => {
    clearTimers()
    timersRef.current = [
      window.setTimeout(() => setStep('thumbs'), 5200),
      window.setTimeout(() => setStep('idle'), 8200),
    ]
  }, [clearTimers])

  useEffect(() => {
    scheduleIntro()
    return clearTimers
  }, [clearTimers, scheduleIntro])

  function replayIntro() {
    if (step !== 'idle') return
    setStep('present')
    scheduleIntro()
  }

  return (
    <aside
      className={`desktop-guide desktop-guide-${step}`}
      aria-label="Portfolio guide"
      onMouseDown={(event) => event.stopPropagation()}
      onClick={(event) => {
        event.stopPropagation()
        replayIntro()
      }}
    >
      {currentStep.message ? (
        <div className="desktop-guide-bubble" role="status">
          {currentStep.message}
        </div>
      ) : null}
      <div className="desktop-guide-stage" aria-hidden="true">
        {(Object.entries(guideSteps) as Array<[GuideStep, (typeof guideSteps)[GuideStep]]>).map(
          ([guideStep, guide]) => (
            <img
              key={guideStep}
              className={`desktop-guide-character ${guideStep === step ? 'is-active' : ''}`}
              src={`${guideAssetBase}${guide.image}`}
              alt=""
              draggable="false"
            />
          ),
        )}
      </div>
      <span className="sr-only">{currentStep.alt}</span>
    </aside>
  )
}

export default DesktopGuide
