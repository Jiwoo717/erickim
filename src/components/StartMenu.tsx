import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import WindowsIcon from './WindowsIcon'
import type { DesktopItem, WindowId } from '../types'

type StartMenuProps = {
  items: DesktopItem[]
  onOpen: (id: WindowId) => void
}

function StartMenu({ items, onOpen }: StartMenuProps) {
  const [query, setQuery] = useState('')

  const filteredItems = useMemo(
    () =>
      items.filter((item) => item.name.toLowerCase().includes(query.toLowerCase())),
    [items, query],
  )

  return (
    <motion.div
      className="start-menu"
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.18 }}
    >
      <div className="start-menu-shell">
        <aside className="start-menu-rail" aria-hidden="true">
          <span className="start-rail-button" />
          <span className="start-rail-button is-active" />
          <span className="start-rail-spacer" />
          <span className="start-rail-button" />
        </aside>

        <section className="start-menu-apps" aria-label="Start menu applications">
          <div className="start-menu-title">Programs</div>

          <div className="start-app-list">
            {filteredItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className="start-app"
                onClick={() => onOpen(item.id)}
              >
                <span className="start-app-icon">
                  <WindowsIcon id={item.id} kind={item.kind} size="small" />
                </span>
                <span>{item.name}</span>
              </button>
            ))}
          </div>

          <label className="start-search">
            <Icon icon="mdi:magnify" width="15" height="15" />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search programs and files"
            />
          </label>
        </section>

        <aside className="start-menu-profile" aria-label="Profile shortcuts">
          <div className="start-avatar">EK</div>
          <strong>Eric J. Kim</strong>
          <button type="button" onClick={() => onOpen('about')}>
            About Me
          </button>
          <button type="button" onClick={() => onOpen('projects')}>
            Projects
          </button>
          <button type="button" onClick={() => onOpen('resume')}>
            Resume
          </button>
          <button type="button" onClick={() => onOpen('contact')}>
            Contact
          </button>
          <div className="start-profile-footer">Data Analyst / Builder</div>
        </aside>
      </div>
    </motion.div>
  )
}

export default StartMenu
