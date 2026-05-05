import type { MouseEvent as ReactMouseEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import DesktopIcon from './DesktopIcon'
import StartMenu from './StartMenu'
import Taskbar from './Taskbar'
import Window from './Window'
import { desktopItems, portfolioEntries } from '../data/portfolioFileSystem'
import type { PortfolioEntry } from '../data/portfolioFileSystem'
import type { WindowId, WindowState } from '../types'

const initialWindows: WindowState[] = []
const wallpaperUrl = `${import.meta.env.BASE_URL}assets/waterfall.png`

type ContextMenuState = {
  x: number
  y: number
  scope: 'desktop' | 'folder' | 'entry'
  folderId: WindowId
  itemId?: WindowId
} | null

function HeroSection() {
  const desktopSceneRef = useRef<HTMLElement | null>(null)
  const [entries, setEntries] = useState<Record<string, PortfolioEntry>>(portfolioEntries)
  const [icons, setIcons] = useState(desktopItems)
  const [windows, setWindows] = useState(initialWindows)
  const [selectedIcons, setSelectedIcons] = useState<WindowId[]>([])
  const [startMenuOpen, setStartMenuOpen] = useState(false)
  const [contextMenu, setContextMenu] = useState<ContextMenuState>(null)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [clock, setClock] = useState(formatClock)
  const [selectionBox, setSelectionBox] = useState<{
    startX: number
    startY: number
    currentX: number
    currentY: number
  } | null>(null)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentTime(new Date())
      setClock(formatClock())
    }, 30000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const closeMenus = () => {
      setStartMenuOpen(false)
      setContextMenu(null)
    }
    window.addEventListener('click', closeMenus)
    return () => window.removeEventListener('click', closeMenus)
  }, [])

  function focusWindow(id: WindowId) {
    setWindows((current) => {
      const maxZ = current.reduce((max, item) => Math.max(max, item.zIndex), 1)
      return current.map((item) =>
        item.id === id ? { ...item, open: true, minimized: false, zIndex: maxZ + 1 } : item,
      )
    })
  }

  function openWindow(id: WindowId) {
    const entry = entries[id]
    if (!entry) return

    const targetId = entry.openTargetId ?? id
    const targetEntry = entries[targetId]
    if (!targetEntry) return

    const existingWindow = windows.find((item) => item.id === targetId)

    if (!existingWindow) {
      setWindows((current) => {
        const maxZ = current.reduce((max, item) => Math.max(max, item.zIndex), 1)
        const offset = current.filter((item) => item.open).length * 24

        return [
          ...current,
          {
            id: targetEntry.id,
            name: targetEntry.name,
            icon: targetEntry.icon,
            kind: targetEntry.kind,
            open: true,
            minimized: false,
            x: 240 + offset,
            y: 116 + offset,
            width: targetEntry.defaultWidth,
            height: targetEntry.defaultHeight,
            defaultWidth: targetEntry.defaultWidth,
            defaultHeight: targetEntry.defaultHeight,
            zIndex: maxZ + 1,
          },
        ]
      })
    } else {
      focusWindow(targetId)
    }

    setSelectedIcons([id, targetId].filter((value, index, array) => array.indexOf(value) === index))
    setStartMenuOpen(false)
    setContextMenu(null)
  }

  function closeWindow(id: WindowId) {
    setWindows((current) =>
      current.map((item) => (item.id === id ? { ...item, open: false, minimized: false } : item)),
    )
  }

  function closeWindowsForEntry(id: WindowId) {
    setWindows((current) =>
      current.map((item) => (item.id === id ? { ...item, open: false, minimized: false } : item)),
    )
  }

  function getUniqueFolderName(folderId: WindowId) {
    const names = new Set(
      Object.values(entries)
        .filter((entry) => entry.folderId === folderId)
        .map((entry) => entry.name),
    )

    if (!names.has('New Folder')) return 'New Folder'

    let index = 2
    while (names.has(`New Folder (${index})`)) index += 1
    return `New Folder (${index})`
  }

  function createFolder(folderId: WindowId) {
    const id = `folder-${Date.now()}`
    const name = getUniqueFolderName(folderId)
    const nextEntry: PortfolioEntry = {
      id,
      name,
      kind: 'folder',
      icon: 'folder',
      folderId,
      defaultWidth: 560,
      defaultHeight: 400,
    }

    setEntries((current) => ({ ...current, [id]: nextEntry }))

    if (folderId === 'desktop') {
      const scene = desktopSceneRef.current
      const nextIndex = icons.length
      const x = 218 + Math.floor(nextIndex / 5) * 100
      const y = 24 + (nextIndex % 5) * 84

      setIcons((current) => [...current, { ...nextEntry, x, y }])

      if (scene) {
        const maxX = Math.max(0, scene.clientWidth - 100)
        setIcons((current) =>
          current.map((item) =>
            item.id === id ? { ...item, x: Math.min(x, maxX), y } : item,
          ),
        )
      }
    }

    setContextMenu(null)
  }

  function deleteEntry(id: WindowId) {
    if (id === 'trash') return

    const entry = entries[id]
    if (!entry) return

    if (entry.folderId === 'trash') {
      setEntries((current) => {
        const next = { ...current }
        delete next[id]
        return next
      })
      setIcons((current) => current.filter((item) => item.id !== id))
      closeWindowsForEntry(id)
      setContextMenu(null)
      return
    }

    setEntries((current) => ({
      ...current,
      [id]: {
        ...entry,
        folderId: 'trash',
        parentId: entry.folderId,
      },
    }))
    setIcons((current) => current.filter((item) => item.id !== id))
    setSelectedIcons((current) => current.filter((itemId) => itemId !== id))
    closeWindowsForEntry(id)
    setContextMenu(null)
  }

  function emptyTrash() {
    const trashIds = Object.values(entries)
      .filter((entry) => entry.folderId === 'trash')
      .map((entry) => entry.id)

    setEntries((current) => {
      const next = { ...current }
      trashIds.forEach((id) => delete next[id])
      return next
    })
    setWindows((current) =>
      current.map((item) =>
        trashIds.includes(item.id) ? { ...item, open: false, minimized: false } : item,
      ),
    )
    setContextMenu(null)
  }

  function minimizeWindow(id: WindowId) {
    setWindows((current) =>
      current.map((item) => (item.id === id ? { ...item, minimized: true } : item)),
    )
  }

  function moveWindow(id: WindowId, x: number, y: number) {
    setWindows((current) =>
      current.map((item) => (item.id === id ? { ...item, x, y } : item)),
    )
  }

  function resizeWindow(id: WindowId, x: number, y: number, width: number, height: number) {
    setWindows((current) =>
      current.map((item) =>
        item.id === id ? { ...item, x, y, width, height } : item,
      ),
    )
  }

  function handleTaskbarClick(id: WindowId) {
    const target = windows.find((item) => item.id === id)
    if (!target) return

    if (!target.open || target.minimized) {
      openWindow(id)
      return
    }

    minimizeWindow(id)
  }

  function openContextMenu(
    event: ReactMouseEvent<HTMLElement>,
    folderId: WindowId,
    itemId?: WindowId,
  ) {
    event.preventDefault()
    event.stopPropagation()
    setStartMenuOpen(false)
    setContextMenu({
      x: event.clientX,
      y: event.clientY,
      scope: itemId ? 'entry' : folderId === 'desktop' ? 'desktop' : 'folder',
      folderId,
      itemId,
    })

    if (itemId && folderId === 'desktop') {
      setSelectedIcons([itemId])
    }
  }

  function deleteSelectedDesktopItems() {
    const ids = selectedIcons.filter((id) => id !== 'trash' && entries[id])
    ids.forEach(deleteEntry)
  }

  function handleIconMouseDown(
    event: ReactMouseEvent<HTMLButtonElement>,
    id: WindowId,
  ) {
    event.preventDefault()
    event.stopPropagation()

    const scene = desktopSceneRef.current
    if (!scene) return

    const rect = scene.getBoundingClientRect()
    const icon = icons.find((item) => item.id === id)
    if (!icon) return

    setSelectedIcons([id])
    const offset = {
      x: event.clientX - rect.left - icon.x,
      y: event.clientY - rect.top - icon.y,
    }

    function handleMouseMove(moveEvent: MouseEvent) {
      const nextX = Math.max(0, moveEvent.clientX - rect.left - offset.x)
      const nextY = Math.max(0, moveEvent.clientY - rect.top - offset.y)

      setIcons((current) =>
        current.map((item) => (item.id === id ? { ...item, x: nextX, y: nextY } : item)),
      )
    }

    function handleMouseUp() {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }

  function handleIconContextMenu(
    event: ReactMouseEvent<HTMLButtonElement>,
    id: WindowId,
  ) {
    openContextMenu(event, 'desktop', id)
  }

  function handleDesktopMouseDown(event: ReactMouseEvent<HTMLElement>) {
    if (event.button !== 0) return

    const target = event.target as HTMLElement

    if (
      target.closest('.desktop-icon') ||
      target.closest('.window-shell') ||
      target.closest('.taskbar') ||
      target.closest('.start-menu')
    ) {
      return
    }

    const scene = desktopSceneRef.current
    if (!scene) return

    const rect = scene.getBoundingClientRect()
    const startX = event.clientX - rect.left
    const startY = event.clientY - rect.top

    setSelectedIcons([])
    const initialSelection = {
      startX,
      startY,
      currentX: startX,
      currentY: startY,
    }
    setSelectionBox(initialSelection)

    function handleMouseMove(moveEvent: MouseEvent) {
      const currentX = Math.max(0, Math.min(moveEvent.clientX - rect.left, rect.width))
      const currentY = Math.max(0, Math.min(moveEvent.clientY - rect.top, rect.height))

      setSelectionBox({
        ...initialSelection,
        currentX,
        currentY,
      })

      const minX = Math.min(initialSelection.startX, currentX)
      const maxX = Math.max(initialSelection.startX, currentX)
      const minY = Math.min(initialSelection.startY, currentY)
      const maxY = Math.max(initialSelection.startY, currentY)

      setSelectedIcons(
        icons
          .filter((item) => {
            const iconLeft = item.x
            const iconRight = item.x + 70
            const iconTop = item.y
            const iconBottom = item.y + 82

            return (
              iconRight >= minX &&
              iconLeft <= maxX &&
              iconBottom >= minY &&
              iconTop <= maxY
            )
          })
          .map((item) => item.id),
      )
    }

    function handleMouseUp() {
      setSelectionBox(null)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }

  function handleDesktopContextMenu(event: ReactMouseEvent<HTMLElement>) {
    const target = event.target as HTMLElement

    if (
      target.closest('.desktop-icon') ||
      target.closest('.window-shell') ||
      target.closest('.taskbar') ||
      target.closest('.start-menu')
    ) {
      return
    }

    openContextMenu(event, 'desktop')
  }

  return (
    <div className="desktop-app">
        <div
          className="desktop-wallpaper"
          aria-hidden="true"
          style={{
            backgroundImage:
              `linear-gradient(rgba(15, 23, 42, 0.18), rgba(15, 23, 42, 0.28)), url("${wallpaperUrl}")`,
          }}
        />
      <div className="desktop-grid" aria-hidden="true" />

      <main
        ref={desktopSceneRef}
        className="desktop-scene"
        onMouseDown={handleDesktopMouseDown}
        onContextMenu={handleDesktopContextMenu}
      >
        <section className="desktop-icons" aria-label="Desktop shortcuts">
          {icons.map((item, index) => (
            <DesktopIcon
              key={item.id}
              icon={item}
              index={index}
              selected={selectedIcons.includes(item.id)}
              onMouseDown={handleIconMouseDown}
              onContextMenu={handleIconContextMenu}
              onClick={(id) => setSelectedIcons([id])}
              onDoubleClick={openWindow}
            />
          ))}
        </section>

        {selectionBox ? (
          <div
            className="selection-box"
            style={{
              left: Math.min(selectionBox.startX, selectionBox.currentX),
              top: Math.min(selectionBox.startY, selectionBox.currentY),
              width: Math.abs(selectionBox.currentX - selectionBox.startX),
              height: Math.abs(selectionBox.currentY - selectionBox.startY),
            }}
          />
        ) : null}

        <section className="window-space" aria-label="Desktop windows">
          <AnimatePresence>
            {windows
              .filter((item) => item.open && !item.minimized)
              .map((item) => (
                <Window
                  key={item.id}
                  window={item}
                  onFocus={focusWindow}
                  onClose={closeWindow}
                  onMinimize={minimizeWindow}
                  onMove={moveWindow}
                  onResize={resizeWindow}
                  entries={entries}
                  onOpenEntry={openWindow}
                  onFolderContextMenu={openContextMenu}
                />
              ))}
          </AnimatePresence>
        </section>
      </main>

      {contextMenu ? (
        <DesktopContextMenu
          menu={contextMenu}
          selectedCount={selectedIcons.filter((id) => id !== 'trash').length}
          trashCount={Object.values(entries).filter((entry) => entry.folderId === 'trash').length}
          onCreateFolder={createFolder}
          onDeleteEntry={deleteEntry}
          onDeleteSelected={deleteSelectedDesktopItems}
          onEmptyTrash={emptyTrash}
          onOpenEntry={openWindow}
        />
      ) : null}

      {startMenuOpen ? (
        <div onClick={(event) => event.stopPropagation()}>
          <StartMenu items={icons} onOpen={openWindow} />
        </div>
      ) : null}

      <div onClick={(event) => event.stopPropagation()}>
        <Taskbar
          startMenuOpen={startMenuOpen}
          onToggleStart={() => setStartMenuOpen((value) => !value)}
          windows={windows}
          onTaskbarClick={handleTaskbarClick}
          currentTime={currentTime}
          clock={clock}
        />
      </div>
    </div>
  )
}

function formatClock() {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date())
}

type DesktopContextMenuProps = {
  menu: NonNullable<ContextMenuState>
  selectedCount: number
  trashCount: number
  onCreateFolder: (folderId: WindowId) => void
  onDeleteEntry: (id: WindowId) => void
  onDeleteSelected: () => void
  onEmptyTrash: () => void
  onOpenEntry: (id: WindowId) => void
}

function DesktopContextMenu({
  menu,
  selectedCount,
  trashCount,
  onCreateFolder,
  onDeleteEntry,
  onDeleteSelected,
  onEmptyTrash,
  onOpenEntry,
}: DesktopContextMenuProps) {
  const canDelete = Boolean(menu.itemId && menu.itemId !== 'trash')
  const isTrash = menu.itemId === 'trash' || menu.folderId === 'trash'

  return (
    <div
      className="desktop-context-menu"
      style={{ left: menu.x, top: menu.y }}
      onClick={(event) => event.stopPropagation()}
      onContextMenu={(event) => event.preventDefault()}
    >
      {menu.itemId ? (
        <button type="button" onClick={() => onOpenEntry(menu.itemId ?? '')}>
          Open
        </button>
      ) : null}

      {menu.scope !== 'entry' ? (
        <button type="button" onClick={() => onCreateFolder(menu.folderId)}>
          New Folder
        </button>
      ) : null}

      {menu.scope === 'desktop' && selectedCount > 0 ? (
        <button type="button" onClick={onDeleteSelected}>
          Delete Selection
        </button>
      ) : null}

      {canDelete ? (
        <button type="button" onClick={() => onDeleteEntry(menu.itemId ?? '')}>
          {menu.folderId === 'trash' ? 'Delete Permanently' : 'Delete'}
        </button>
      ) : null}

      {isTrash ? (
        <button type="button" disabled={trashCount === 0} onClick={onEmptyTrash}>
          Empty Recycle Bin
        </button>
      ) : null}
    </div>
  )
}

export default HeroSection
