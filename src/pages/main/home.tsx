import { os } from '@tauri-apps/api'
import { createEffect, createSignal } from 'solid-js'

export default function Home() {
  const [arch, setArch] = createSignal('')
  const [platform, setPlatform] = createSignal('')
  const [tempdir, setTempdir] = createSignal('')
  const [type, setType] = createSignal('')
  const [version, setVersion] = createSignal('')

  createEffect(() => {
    os.arch().then(setArch)
    os.platform().then(setPlatform)
    os.tempdir().then(setTempdir)
    os.type().then(setType)
    os.version().then(setVersion)
  }, [])

  return (
    <>
      <div class="p-10 text-sm text-green-500 leading-loose">
        <ul>
          <li>
            <span class="text-xs text-black pr-2">CPU 架构:</span> {arch}
          </li>
          <li>
            <span class="text-xs text-black pr-2">平台名称:</span> {platform}
          </li>
          <li>
            <span class="text-xs text-black pr-2">临时文件目录:</span> {tempdir}
          </li>
          <li>
            <span class="text-xs text-black pr-2">系统类型:</span> {type}
          </li>
          <li>
            <span class="text-xs text-black pr-2">系统版本:</span> {version}
          </li>
        </ul>
      </div>
    </>
  )
}
