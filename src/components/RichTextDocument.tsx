import { useMemo, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import 'tinymce/tinymce'
import 'tinymce/icons/default'
import 'tinymce/themes/silver'
import 'tinymce/models/dom'
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/code'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/media'
import 'tinymce/plugins/table'
import 'tinymce/plugins/wordcount'
import 'tinymce/skins/ui/oxide-dark/skin.css'
import 'tinymce/skins/content/default/content.css'

type RichTextDocumentProps = {
  id: string
  name: string
  initialHtml: string
}

function RichTextDocument({ id, name, initialHtml }: RichTextDocumentProps) {
  const storageKey = `portfolio-rich-text:${id}`
  const savedHtml = window.localStorage.getItem(storageKey)
  const [html, setHtml] = useState(savedHtml ?? initialHtml)
  const [status, setStatus] = useState(savedHtml ? 'Loaded saved draft' : 'Ready')

  const editorInit = useMemo(
    () => ({
      height: '100%',
      menubar: false,
      branding: false,
      promotion: false,
      skin: false,
      content_css: false,
      plugins: 'advlist autolink code image link lists media table wordcount',
      toolbar:
        'undo redo | blocks | bold italic underline | bullist numlist | link image media table | code',
      automatic_uploads: false,
      paste_data_images: true,
      file_picker_types: 'image',
      file_picker_callback: (
        callback: (value: string, meta?: Record<string, string>) => void,
      ) => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        input.onchange = () => {
          const file = input.files?.[0]
          if (!file) return

          const reader = new FileReader()
          reader.onload = () => {
            callback(String(reader.result), { title: file.name })
          }
          reader.readAsDataURL(file)
        }
        input.click()
      },
      content_style: `
        body {
          background: #111827;
          color: #e5edf8;
          font-family: "Segoe UI", Tahoma, Arial, sans-serif;
          font-size: 15px;
          line-height: 1.6;
          padding: 16px 18px;
        }
        h1, h2, h3 { color: #f8fafc; line-height: 1.2; }
        a { color: #93c5fd; }
        img { max-width: 100%; height: auto; border-radius: 6px; }
        table { border-color: #334155; }
      `,
    }),
    [],
  )

  function saveDocument() {
    window.localStorage.setItem(storageKey, html)
    setStatus('Saved in this browser')
  }

  function resetDocument() {
    window.localStorage.removeItem(storageKey)
    setHtml(initialHtml)
    setStatus('Reset to portfolio default')
  }

  return (
    <section className="rich-text-document">
      <header className="rich-text-toolbar">
        <div>
          <span className="rich-text-kicker">TinyMCE Document</span>
          <strong>{name}</strong>
        </div>
        <div className="rich-text-actions">
          <span>{status}</span>
          <button type="button" onClick={saveDocument}>
            Save
          </button>
          <button type="button" onClick={resetDocument}>
            Reset
          </button>
        </div>
      </header>

      <div className="rich-text-editor-shell">
        <Editor
          licenseKey="gpl"
          value={html}
          onEditorChange={(nextHtml: string) => {
            setHtml(nextHtml)
            setStatus('Unsaved changes')
          }}
          init={editorInit}
        />
      </div>
    </section>
  )
}

export default RichTextDocument
