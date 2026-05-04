import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import WindowsIcon from './WindowsIcon'
import type { WindowState, WindowId } from '../types'

type TaskbarProps = {
  startMenuOpen: boolean
  onToggleStart: () => void
  windows: WindowState[]
  onTaskbarClick: (id: WindowId) => void
  currentTime: Date
  clock: string
}

function Taskbar({
  startMenuOpen,
  onToggleStart,
  windows,
  onTaskbarClick,
  currentTime,
  clock,
}: TaskbarProps) {
  const date = currentTime.toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <motion.footer
      className="taskbar"
      initial={{ y: 70 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
    >
      <button
        type="button"
        className={`start-button ${startMenuOpen ? 'is-open' : ''}`}
        onClick={onToggleStart}
      >
        <span className="start-orb" aria-hidden="true">
          <span className="start-logo-pane red" />
          <span className="start-logo-pane green" />
          <span className="start-logo-pane blue" />
          <span className="start-logo-pane yellow" />
        </span>
      </button>

      <div className="taskbar-apps">
        {windows
          .filter((item) => item.open)
          .map((item) => (
            <button
              key={item.id}
              type="button"
              className={`taskbar-app ${!item.minimized ? 'is-open' : ''}`}
              onClick={() => onTaskbarClick(item.id)}
            >
              <span className="taskbar-app-icon">
                <WindowsIcon id={item.id} kind={item.kind} size="small" />
              </span>
              <span>{item.name}</span>
            </button>
          ))}
      </div>

      <div className="system-tray">
        <div className="tray-icons" aria-hidden="true">
          <Icon icon="fluent:wifi-1-24-filled" width="16" height="16" />
          <Icon icon="fluent:speaker-2-24-filled" width="16" height="16" />
          <Icon icon="fluent:battery-3-24-filled" width="16" height="16" />
        </div>
        <div className="tray-datetime">
          <strong>{clock}</strong>
          <span>{date}</span>
        </div>
      </div>
    </motion.footer>
  )
}

export default Taskbar
