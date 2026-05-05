export type WindowId = string

export type WindowKind =
  | 'folder'
  | 'markdown'
  | 'document'
  | 'pdf'
  | 'calculator'
  | 'placeholder'
  | 'webapp'

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
