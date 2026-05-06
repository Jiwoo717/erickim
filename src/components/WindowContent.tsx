import type { MouseEvent as ReactMouseEvent } from 'react'
import { useState } from 'react'
import WindowsIcon from './WindowsIcon'
import type { PortfolioEntry } from '../data/portfolioFileSystem'
import type { WindowId, WindowState } from '../types'

type WindowContentProps = {
  window: WindowState
  entries: Record<string, PortfolioEntry>
  onOpenEntry: (id: WindowId) => void
  onFolderContextMenu: (
    event: ReactMouseEvent<HTMLElement>,
    folderId: WindowId,
    itemId?: WindowId,
  ) => void
}

function WindowContent({
  window,
  entries,
  onOpenEntry,
  onFolderContextMenu,
}: WindowContentProps) {
  const entry = entries[window.id]

  if (!entry) {
    return <div className="file-document">This item could not be found.</div>
  }

  if (entry.kind === 'folder') {
    return (
      <FileExplorer
        entries={entries}
        folderId={entry.id}
        onOpenEntry={onOpenEntry}
        onFolderContextMenu={onFolderContextMenu}
      />
    )
  }

  if (entry.kind === 'calculator') {
    return <CalculatorApp />
  }

  if (entry.kind === 'pdf') {
    return (
      <div className="pdf-viewer">
        <iframe title={entry.name} src={`${entry.pdfUrl}#zoom=100`} />
      </div>
    )
  }

  if (entry.kind === 'webapp') {
    return (
      <div className="webapp-viewer">
        <iframe title={entry.name} src={entry.appUrl} />
      </div>
    )
  }

  if (entry.kind === 'externalProject') {
    return <ExternalProjectApp entry={entry} />
  }

  if (entry.kind === 'placeholder') {
    return (
      <PlaceholderApp
        markdown={entry.markdown ?? ''}
        theme={entry.placeholderTheme ?? 'fallout'}
      />
    )
  }

  return <MarkdownDocument markdown={entry.markdown ?? ''} imageUrl={entry.imageUrl} />
}

type FileExplorerProps = {
  entries: Record<string, PortfolioEntry>
  folderId: string
  onOpenEntry: (id: WindowId) => void
  onFolderContextMenu: (
    event: ReactMouseEvent<HTMLElement>,
    folderId: WindowId,
    itemId?: WindowId,
  ) => void
}

function FileExplorer({
  entries,
  folderId,
  onOpenEntry,
  onFolderContextMenu,
}: FileExplorerProps) {
  const folder = entries[folderId]
  const folderEntries = Object.values(entries).filter((entry) => entry.folderId === folderId)

  return (
    <div
      className="file-explorer"
      onContextMenu={(event) => onFolderContextMenu(event, folderId)}
    >
      <div className="explorer-command-bar">
        <button type="button" className="explorer-nav-button" aria-label="Back">
          <span className="explorer-arrow left" />
        </button>
        <button type="button" className="explorer-nav-button" aria-label="Forward">
          <span className="explorer-arrow right" />
        </button>
        <button type="button" className="explorer-nav-button" aria-label="Up">
          <span className="explorer-arrow up" />
        </button>

        <div className="explorer-address">
          <WindowsIcon id={folderId} kind="folder" size="small" />
          <span>{folder?.name ?? 'Folder'}</span>
        </div>

        <label className="explorer-search">
          <span>Search</span>
          <input aria-label={`Search ${folder?.name ?? 'folder'}`} />
        </label>
      </div>

      <div className="explorer-file-grid" role="list" aria-label={`${folder?.name} files`}>
        {folderEntries.map((item) => (
          <button
            key={item.id}
            type="button"
            className="explorer-file"
            onContextMenu={(event) => onFolderContextMenu(event, folderId, item.id)}
            onDoubleClick={() => onOpenEntry(item.id)}
          >
            <WindowsIcon id={item.id} kind={item.kind} />
            <span>{item.name}</span>
          </button>
        ))}
      </div>

      <div className="explorer-status-bar">
        <span>{folderEntries.length} item{folderEntries.length === 1 ? '' : 's'}</span>
        <span className="explorer-status-view" aria-hidden="true" />
      </div>
    </div>
  )
}

function MarkdownDocument({
  markdown,
  imageUrl,
}: {
  markdown: string
  imageUrl?: string
}) {
  const lines = markdown.split('\n')

  return (
    <article className="file-document markdown-document">
      {imageUrl ? (
        <img className="document-profile-photo" src={imageUrl} alt="Eric Kim" />
      ) : null}
      {lines.map((line, index) => {
        const key = `${index}-${line}`

        if (line.startsWith('# ')) {
          return <h1 key={key}>{line.replace('# ', '')}</h1>
        }

        if (!line.trim()) {
          return <br key={key} />
        }

        return <p key={key}>{line}</p>
      })}
    </article>
  )
}

function ExternalProjectApp({ entry }: { entry: PortfolioEntry }) {
  function openExternal(url?: string) {
    if (!url) return
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <article className="external-project-app">
      <div className="external-project-hero">
        {entry.screenshotUrl ? (
          <img src={entry.screenshotUrl} alt={`${entry.name} screenshot`} />
        ) : null}
      </div>

      <div className="external-project-body">
        <div>
          <span className="external-project-kicker">Streamlit Project</span>
          <h1>{entry.name.replace('.app', '')}</h1>
          <p>{entry.summary}</p>
        </div>

        <div className="external-project-actions">
          <button type="button" onClick={() => openExternal(entry.liveUrl)}>
            Open live dashboard
          </button>
          <button type="button" onClick={() => openExternal(entry.codeUrl)}>
            View GitHub repo
          </button>
        </div>
      </div>
    </article>
  )
}

function CalculatorApp() {
  const [display, setDisplay] = useState('0')
  const [storedValue, setStoredValue] = useState<number | null>(null)
  const [operator, setOperator] = useState<string | null>(null)
  const [waitingForValue, setWaitingForValue] = useState(false)

  function inputDigit(digit: string) {
    setDisplay((current) => {
      if (waitingForValue) {
        setWaitingForValue(false)
        return digit
      }

      return current === '0' ? digit : `${current}${digit}`
    })
  }

  function inputDecimal() {
    setDisplay((current) => {
      if (waitingForValue) {
        setWaitingForValue(false)
        return '0.'
      }

      return current.includes('.') ? current : `${current}.`
    })
  }

  function clear() {
    setDisplay('0')
    setStoredValue(null)
    setOperator(null)
    setWaitingForValue(false)
  }

  function applyOperator(nextOperator: string) {
    const inputValue = Number(display)

    if (storedValue === null) {
      setStoredValue(inputValue)
    } else if (operator) {
      const result = calculate(storedValue, inputValue, operator)
      setDisplay(formatCalculatorValue(result))
      setStoredValue(result)
    }

    setOperator(nextOperator === '=' ? null : nextOperator)
    setWaitingForValue(true)
  }

  const buttons = [
    'C',
    '/',
    '*',
    '-',
    '7',
    '8',
    '9',
    '+',
    '4',
    '5',
    '6',
    '=',
    '1',
    '2',
    '3',
    '0',
    '.',
  ]

  return (
    <div className="calculator-app">
      <div className="calculator-display">{display}</div>
      <div className="calculator-keys">
        {buttons.map((button) => (
          <button
            key={button}
            type="button"
            className={`calculator-key ${button === '=' ? 'equals' : ''}`}
            onClick={() => {
              if (button === 'C') clear()
              else if (['/', '*', '-', '+', '='].includes(button)) applyOperator(button)
              else if (button === '.') inputDecimal()
              else inputDigit(button)
            }}
          >
            {button}
          </button>
        ))}
      </div>
    </div>
  )
}

function PlaceholderApp({
  markdown,
  theme,
}: {
  markdown: string
  theme: 'fallout' | 'dark'
}) {
  const lines = markdown.split('\n').filter(Boolean)
  const title = lines[0]?.replace('# ', '') ?? 'Placeholder'
  const body = lines.slice(1)

  return (
    <article className={`placeholder-app placeholder-${theme}`}>
      <div className="placeholder-emblem" aria-hidden="true" />
      <h1>{title}</h1>
      {body.map((line) => (
        <p key={line}>{line}</p>
      ))}
    </article>
  )
}

function calculate(left: number, right: number, selectedOperator: string) {
  switch (selectedOperator) {
    case '+':
      return left + right
    case '-':
      return left - right
    case '*':
      return left * right
    case '/':
      return right === 0 ? 0 : left / right
    default:
      return right
  }
}

function formatCalculatorValue(value: number) {
  return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(8)))
}

export default WindowContent
