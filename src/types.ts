export type WindowId = string

export type WindowKind =
  | 'folder'
  | 'markdown'
  | 'richText'
  | 'document'
  | 'image'
  | 'pdf'
  | 'calculator'
  | 'webapp'
  | 'externalProject'
  | 'externalLink'

export type DesktopItem = {
  id: WindowId
  name: string
  icon: string
  kind: WindowKind
  x: number
  y: number
  defaultWidth: number
  defaultHeight: number
}

export type WindowState = DesktopItem & {
  open: boolean
  minimized: boolean
  zIndex: number
  width: number
  height: number
}
