import type { MouseEvent } from 'react'
import { motion } from 'framer-motion'
import WindowsIcon from './WindowsIcon'
import type { DesktopItem, WindowId } from '../types'

type DesktopIconProps = {
  icon: DesktopItem
  index: number
  selected: boolean
  onMouseDown: (event: MouseEvent<HTMLButtonElement>, id: WindowId) => void
  onContextMenu: (event: MouseEvent<HTMLButtonElement>, id: WindowId) => void
  onClick: (id: WindowId) => void
  onDoubleClick: (id: WindowId) => void
}

function DesktopIcon({
  icon,
  index,
  selected,
  onMouseDown,
  onContextMenu,
  onClick,
  onDoubleClick,
}: DesktopIconProps) {
  return (
    <motion.button
      type="button"
      className={`desktop-icon ${selected ? 'is-selected' : ''}`}
      style={{ left: icon.x, top: icon.y }}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.04, duration: 0.18 }}
      onMouseDown={(event) => onMouseDown(event, icon.id)}
      onContextMenu={(event) => onContextMenu(event, icon.id)}
      onClick={() => onClick(icon.id)}
      onDoubleClick={() => onDoubleClick(icon.id)}
    >
      <span className="desktop-icon-art">
        <WindowsIcon id={icon.id} kind={icon.kind} />
      </span>
      <span className="desktop-icon-text">{icon.name}</span>
    </motion.button>
  )
}

export default DesktopIcon
