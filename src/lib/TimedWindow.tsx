import { WebviewWindow } from '@tauri-apps/api/window'

export default function createTemporaryWindow(options: TimedWindows) {
  const webview = new WebviewWindow(options.label, {
    resizable: false,
    center: true,
    decorations: options.decorations,
    fullscreen: options.fullscreen,
    alwaysOnTop: true,
    url: options.url
  })

  // since the webview window.tsx is created asynchronously,
  // Tauri emits the `tauri://created` and `tauri://error` to notify you of the creation response
  webview.once('tauri://created', function () {
    // webview window.tsx successfully created
    console.log('open ')
    // setInterval(() => webview.close(), time)
  })

  webview.once('tauri://error', function (e) {
    // an error happened creating the webview window.tsx
  })
}

interface TimedWindows {
  label: string
  url: string
  hours?: number
  minutes?: number
  seconds?: number
  decorations?: boolean
  fullscreen?: boolean
}
