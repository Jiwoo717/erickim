import type { WindowId, WindowKind } from '../types'

const assetBase = `${import.meta.env.BASE_URL}assets/`

type WindowsIconProps = {
  id?: WindowId
  kind?: WindowKind
  size?: 'desktop' | 'small'
}

const iconClassById: Partial<Record<WindowId, string>> = {
  about: 'windows-icon-user',
  computer: 'windows-icon-folder',
  info: 'windows-icon-document',
  projects: 'windows-icon-folder',
  experience: 'windows-icon-document',
  'work-history': 'windows-icon-folder',
  contact: 'windows-icon-mail',
  resume: 'windows-icon-pdf',
  trash: 'windows-icon-trash',
  calculator: 'windows-icon-calculator',
  'projects-viz-builder': 'windows-icon-calculator',
  fallout: 'windows-icon-fallout',
  'dark-and-darker': 'windows-icon-dark',
}

const iconClassByKind: Record<WindowKind, string> = {
  folder: 'windows-icon-folder',
  markdown: 'windows-icon-document',
  document: 'windows-icon-document',
  pdf: 'windows-icon-pdf',
  calculator: 'windows-icon-calculator',
  placeholder: 'windows-icon-folder',
  webapp: 'windows-icon-calculator',
}

const imageIconById: Partial<Record<WindowId, string>> = {
  computer: `${assetBase}computer.png`,
  info: `${assetBase}info.png`,
  'work-history': `${assetBase}briefcase.png`,
  trash: `${assetBase}recycle_bin.png`,
  calculator: `${assetBase}calculator.png`,
  fallout: `${assetBase}fallout-icon.png`,
  'dark-and-darker': `${assetBase}blacksmith-icon.png`,
}

const imageIconByKind: Partial<Record<WindowKind, string>> = {
  folder: `${assetBase}file.png`,
  markdown: `${assetBase}notepad.png`,
  document: `${assetBase}notepad.png`,
}

function WindowsIcon({ id, kind = 'folder', size = 'desktop' }: WindowsIconProps) {
  const iconClass = id ? iconClassById[id] : undefined
  const imageIcon =
    (id?.startsWith('folder-') ? `${assetBase}folder.png` : undefined) ??
    (id ? imageIconById[id] : undefined) ??
    imageIconByKind[kind]

  if (imageIcon) {
    return (
      <span className={`windows-icon windows-icon-${size} windows-icon-image`} aria-hidden="true">
        <img src={imageIcon} alt="" />
      </span>
    )
  }

  return (
    <span
      className={`windows-icon windows-icon-${size} ${iconClass ?? iconClassByKind[kind]}`}
      aria-hidden="true"
    >
      <span className="windows-icon-back" />
      <span className="windows-icon-front" />
      <span className="windows-icon-glyph" />
    </span>
  )
}

export default WindowsIcon
