import type { MouseEvent as ReactMouseEvent } from 'react'
import { motion } from 'framer-motion'
import { Rnd } from 'react-rnd'
import WindowsIcon from './WindowsIcon'
import WindowContent from './WindowContent'
import type { PortfolioEntry } from '../data/portfolioFileSystem'
import type { WindowId, WindowState } from '../types'

type WindowProps = {
  window: WindowState
  onFocus: (id: WindowId) => void
  onClose: (id: WindowId) => void
  onMinimize: (id: WindowId) => void
  onMove: (id: WindowId, x: number, y: number) => void
  onResize: (id: WindowId, x: number, y: number, width: number, height: number) => void
  entries: Record<string, PortfolioEntry>
  onOpenEntry: (id: WindowId) => void
  onFolderContextMenu: (
    event: ReactMouseEvent<HTMLElement>,
    folderId: WindowId,
    itemId?: WindowId,
  ) => void
}

function Window({
  window,
  onFocus,
  onClose,
  onMinimize,
  onMove,
  onResize,
  entries,
  onOpenEntry,
  onFolderContextMenu,
}: WindowProps) {
  return (
    <Rnd
      className="window-rnd"
      bounds="parent"
      dragHandleClassName="window-toolbar"
      minWidth={320}
      minHeight={240}
      size={{ width: window.width, height: window.height }}
      position={{ x: window.x, y: window.y }}
      style={{ zIndex: window.zIndex }}
      onDragStart={() => onFocus(window.id)}
      onResizeStart={() => onFocus(window.id)}
      onDragStop={(_, data) => onMove(window.id, data.x, data.y)}
      onResizeStop={(_, __, ref, ___, position) =>
        onResize(
          window.id,
          position.x,
          position.y,
          parseFloat(ref.style.width),
          parseFloat(ref.style.height),
        )
      }
    >
      <motion.article
        className="window-shell"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.18 }}
        onMouseDown={() => onFocus(window.id)}
      >
        <header className="window-toolbar">
          <div className="window-toolbar-title">
            <span className="window-app-icon">
              <WindowsIcon id={window.id} kind={window.kind} size="small" />
            </span>
            <span>{window.name}</span>
          </div>

          <nav className="window-controls" aria-label={`${window.name} window controls`}>
            <button
              type="button"
              className="window-control minimize"
              aria-label="Minimize"
              onClick={() => onMinimize(window.id)}
            />
            <button
              type="button"
              className="window-control maximize"
              aria-label="Maximize"
            />
            <button
              type="button"
              className="window-control close"
              aria-label="Close"
              onClick={() => onClose(window.id)}
            />
          </nav>
        </header>

        <div className="window-content">
          <WindowContent
            window={window}
            entries={entries}
            onOpenEntry={onOpenEntry}
            onFolderContextMenu={onFolderContextMenu}
          />
        </div>
      </motion.article>
    </Rnd>
  )
}

export default Window
