import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'

type Track = {
  title: string
  artist?: string
  src: string
}

const emptyTracks: Track[] = []

function MyspaceMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const playerRef = useRef<HTMLElement | null>(null)
  const dragOffsetRef = useRef({ x: 0, y: 0 })
  const isDraggingRef = useRef(false)
  const [tracks, setTracks] = useState<Track[]>(emptyTracks)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.8)
  const [elapsed, setElapsed] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playlistOpen, setPlaylistOpen] = useState(true)
  const [playerPosition, setPlayerPosition] = useState<{ left: number; top: number } | null>(null)
  const [uniquePlayedTracks, setUniquePlayedTracks] = useState<Set<string>>(() => new Set())
  const [playsToday, setPlaysToday] = useState(0)

  const currentTrack = tracks[currentTrackIndex]
  const playerStyle = playerPosition
    ? {
        left: playerPosition.left,
        top: playerPosition.top,
        right: 'auto',
        bottom: 'auto',
      } as CSSProperties
    : undefined
  const trackSource = useMemo(() => {
    if (!currentTrack) return ''
    if (/^https?:\/\//.test(currentTrack.src)) return currentTrack.src
    return `${import.meta.env.BASE_URL}music/${currentTrack.src}`
  }, [currentTrack])

  useEffect(() => {
    let active = true

    fetch(`${import.meta.env.BASE_URL}music/tracks.json`)
      .then((response) => (response.ok ? response.json() : []))
      .then((data: unknown) => {
        if (!active || !Array.isArray(data)) return
        const nextTracks = data.filter(isTrack)
        setTracks(nextTracks)
        setCurrentTrackIndex(0)
      })
      .catch(() => {
        if (active) setTracks(emptyTracks)
      })

    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying && trackSource) {
      audio.play().catch(() => setIsPlaying(false))
    } else {
      audio.pause()
    }
  }, [isPlaying, trackSource])

  function togglePlayback() {
    if (!trackSource) return
    setIsPlaying((current) => {
      if (!current) markTrackPlayed(currentTrackIndex)
      return !current
    })
  }

  function selectTrack(index: number) {
    startTrack(index)
  }

  function playPrevious() {
    if (tracks.length === 0) return
    const previousIndex = currentTrackIndex === 0 ? tracks.length - 1 : currentTrackIndex - 1
    startTrack(previousIndex)
  }

  function playNext() {
    if (tracks.length === 0) return
    startTrack((currentTrackIndex + 1) % tracks.length)
  }

  function startTrack(index: number) {
    setCurrentTrackIndex(index)
    setElapsed(0)
    markTrackPlayed(index)
    setIsPlaying(true)
  }

  function handleTimeUpdate() {
    const audio = audioRef.current
    if (!audio) return
    setElapsed(audio.currentTime)
    setDuration(Number.isFinite(audio.duration) ? audio.duration : 0)
  }

  function seekTo(value: number) {
    const audio = audioRef.current
    if (!audio || !Number.isFinite(value)) return
    audio.currentTime = value
    setElapsed(value)
  }

  function markTrackPlayed(index: number) {
    const track = tracks[index]
    if (!track) return
    const trackKey = `${track.src}-${index}`

    setUniquePlayedTracks((current) => {
      if (current.has(trackKey)) return current
      const next = new Set(current)
      next.add(trackKey)
      return next
    })
    setPlaysToday((current) => current + 1)
  }

  function handlePlayerPointerDown(event: ReactPointerEvent<HTMLElement>) {
    const target = event.target as HTMLElement
    if (target.closest('button, input, .myspace-playlist')) return

    const player = playerRef.current
    if (!player) return

    const rect = player.getBoundingClientRect()
    dragOffsetRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }

    player.setPointerCapture(event.pointerId)
    isDraggingRef.current = true
    setPlayerPosition({ left: rect.left, top: rect.top })
  }

  function handlePlayerPointerMove(event: ReactPointerEvent<HTMLElement>) {
    if (!isDraggingRef.current) return

    const player = playerRef.current
    if (!player) return

    const rect = player.getBoundingClientRect()
    const reservedTaskbarHeight = 82
    const nextLeft = clamp(
      event.clientX - dragOffsetRef.current.x,
      8,
      window.innerWidth - rect.width - 8,
    )
    const nextTop = clamp(
      event.clientY - dragOffsetRef.current.y,
      8,
      window.innerHeight - reservedTaskbarHeight - rect.height,
    )

    setPlayerPosition({ left: nextLeft, top: nextTop })
  }

  function handlePlayerPointerUp(event: ReactPointerEvent<HTMLElement>) {
    isDraggingRef.current = false
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  return (
    <aside
      ref={playerRef}
      className="myspace-player"
      aria-label="Desktop music player"
      style={playerStyle}
      onMouseDown={(event) => event.stopPropagation()}
      onPointerDown={handlePlayerPointerDown}
      onPointerMove={handlePlayerPointerMove}
      onPointerUp={handlePlayerPointerUp}
      onPointerCancel={handlePlayerPointerUp}
      onClick={(event) => event.stopPropagation()}
      onContextMenu={(event) => event.stopPropagation()}
    >
      <audio
        ref={audioRef}
        src={trackSource}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={playNext}
      />

      <div className="myspace-player-chrome">
        <div className="myspace-player-buttons">
          <button type="button" aria-label="Stop" onClick={() => setIsPlaying(false)}>
            <span className="myspace-stop" />
          </button>
          <button type="button" aria-label="Previous track" onClick={playPrevious}>
            <span className="myspace-prev" />
          </button>
          <button type="button" aria-label={isPlaying ? 'Pause' : 'Play'} onClick={togglePlayback}>
            {isPlaying ? <span className="myspace-pause" /> : <span className="myspace-play" />}
          </button>
          <button type="button" aria-label="Next track" onClick={playNext}>
            <span className="myspace-next" />
          </button>
        </div>

        <div className="myspace-player-readout">
          <div>
            <strong>{currentTrack?.title ?? 'Add songs to /music'}</strong>
            <span>{currentTrack?.artist ?? 'Portfolio Radio'}</span>
            <em>{isPlaying ? 'playing' : trackSource ? 'ready' : 'no tracks'}</em>
          </div>
          <Equalizer active={isPlaying} />
        </div>
      </div>

      <div className="myspace-progress-row">
        <span>{formatTime(elapsed)}</span>
        <input
          aria-label="Song progress"
          type="range"
          min="0"
          max={duration || 0}
          step="0.1"
          value={Math.min(elapsed, duration || 0)}
          onChange={(event) => seekTo(Number(event.target.value))}
          disabled={!duration}
        />
        <span>{formatTime(duration)}</span>
      </div>

      <div className="myspace-volume-row">
        <span className="myspace-speaker" aria-hidden="true" />
        <input
          aria-label="Volume"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(event) => setVolume(Number(event.target.value))}
        />
        <span className="myspace-time">{formatTime(elapsed)} / {formatTime(duration)}</span>
      </div>

      <div className="myspace-stats">
        <span>Total Plays: {uniquePlayedTracks.size}</span>
        <button
          type="button"
          className="myspace-collapse-button"
          onClick={() => setPlaylistOpen((current) => !current)}
          aria-label={playlistOpen ? 'Collapse music list' : 'Expand music list'}
          aria-expanded={playlistOpen}
        >
          <span aria-hidden="true">{playlistOpen ? '▾' : '▴'}</span>
        </button>
        <span>Plays Today: {playsToday}</span>
      </div>

      <div className="myspace-playlist-shell">
        <button
          type="button"
          className="myspace-playlist-toggle"
          onClick={() => setPlaylistOpen((current) => !current)}
          aria-expanded={playlistOpen}
        >
          <span>Music List</span>
          <small>{tracks.length} track{tracks.length === 1 ? '' : 's'}</small>
        </button>

        {playlistOpen ? (
          <div className="myspace-playlist">
            {tracks.length > 0 ? tracks.map((track, index) => (
            <button
              key={`${track.src}-${index}`}
              type="button"
              className={index === currentTrackIndex ? 'is-active' : ''}
              onClick={() => selectTrack(index)}
            >
              <span>{track.title}</span>
              <small>{track.artist ?? 'Unknown Artist'}</small>
            </button>
            )) : (
              <p>Place audio files in `public/music` and list them in `tracks.json`.</p>
            )}
          </div>
        ) : null}
      </div>
    </aside>
  )
}

function Equalizer({ active }: { active: boolean }) {
  return (
    <div className={`myspace-eq ${active ? 'is-active' : ''}`} aria-hidden="true">
      {Array.from({ length: 11 }, (_, index) => {
        const levelStyle = { '--level': `${3 + ((index * 5) % 9)}` } as CSSProperties
        return <span key={index} style={levelStyle} />
      })}
    </div>
  )
}

function isTrack(value: unknown): value is Track {
  if (!value || typeof value !== 'object') return false
  const maybeTrack = value as Partial<Track>
  return typeof maybeTrack.title === 'string' && typeof maybeTrack.src === 'string'
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) return '00:00'
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), Math.max(min, max))
}

export default MyspaceMusicPlayer
