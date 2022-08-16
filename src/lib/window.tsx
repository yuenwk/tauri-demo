import { WebviewWindow } from "@tauri-apps/api/window";

export default function createTemporaryWindow(label: string, url: string, time: number) {
  const webview = new WebviewWindow(label, {
    resizable: false,
    center: true,
    decorations: false,
    alwaysOnTop: true,
    url: url,
  })

  // since the webview window.tsx is created asynchronously,
  // Tauri emits the `tauri://created` and `tauri://error` to notify you of the creation response
  webview.once('tauri://created', function () {
    // webview window.tsx successfully created

    setInterval(() => webview.close(), time);
  })

  webview.once('tauri://error', function (e) {
    // an error happened creating the webview window.tsx
  })

}
