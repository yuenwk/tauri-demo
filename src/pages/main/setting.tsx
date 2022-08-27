import {
  BaseDirectory,
  createDir,
  readDir,
  readTextFile,
  writeFile
} from '@tauri-apps/api/fs'
import { createSignal } from 'solid-js'

const createDataFolder = async () => {
  await createDir('config', {
    dir: BaseDirectory.App,
    recursive: true
  })
}

const createDataFile = async () => {
  try {
    await writeFile(
      {
        contents: '[]',
        path: `config/settings.json`
      },
      {
        dir: BaseDirectory.App
      }
    )
  } catch (e) {
    console.log(e)
  }
}

const readDataDir = async () => {
  try {
    const contents = await readDir('aaa', {
      dir: BaseDirectory.App
    })
    return contents
  } catch (e) {
    console.log(e)
  }
}

const readDataFile = async () => {
  try {
    const contents = await readTextFile('config/settings.json', {
      dir: BaseDirectory.App
    })
    return contents
  } catch (e) {
    console.log(e)
  }
}

export default function Setting() {
  // console.log(readDataDir())
  // createDataFolder()
  // createDataFile()

  const [bootUp, setBootUp] = createSignal(false)
  const [deferred, setDeferred] = createSignal(false)
  const [workTime, setWorkTime] = createSignal(45)
  const [restTime, setRestTime] = createSignal(10)
  return (
    <>
      <div class=" flex h-screen flex-col justify-center items-center">
        <div class="form-control w-80">
          <label class="label cursor-pointer pb-6 pr-2">
            <span class="label-text">开机启动</span>
            <input
              type="checkbox"
              class="toggle toggle-accent"
              checked={bootUp()}
              onchange={() => setBootUp(!bootUp())}
            />
          </label>
          <label class="label cursor-pointer pb-6">
            <span class="label-text">工作/学习时间</span>
            <input
              type="number"
              class="input input-success input-sm w-14 max-w-xs"
              value={restTime()}
              maxlength={3}
              onkeypress={numKeypress()}
              onchange={event => {
                if (typeof event.currentTarget.value === 'number')
                  setRestTime(event.currentTarget.value)
              }}
            />
          </label>
          <label class="label cursor-pointer pb-6">
            <span class="label-text">休息时间</span>
            <input
              type="number"
              class="input input-success input-sm w-14 max-w-xs"
              value={restTime()}
              maxlength={3}
              onkeypress={numKeypress()}
              onchange={event => {
                if (typeof event.currentTarget.value === 'number')
                  setRestTime(event.currentTarget.value)
              }}
            />
          </label>
          <label class="label cursor-pointer pb-6 pr-2">
            <span class="label-text">延后休息</span>
            <input
              type="checkbox"
              class="toggle toggle-accent"
              checked={deferred()}
              onchange={() => setDeferred(!deferred())}
            />
          </label>
        </div>
      </div>
    </>
  )
}
function numKeypress() {
  return evt => {
    if (['e', '+', '-'].includes(evt.key)) evt.preventDefault()
  }
}
