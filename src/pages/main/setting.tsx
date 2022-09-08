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
  const [restNotice, setRestNotice] = createSignal(false)
  const [workTime, setWorkTime] = createSignal(45)
  const [restTime, setRestTime] = createSignal(10)

  return (
    <>
      <div class=" flex h-screen flex-col justify-center items-center">
        <div class="form-control w-2/3 ">
          <ToggleWrap
            title="开机启动"
            value={bootUp()}
            onchange={() => setBootUp(!bootUp())}
          />
          <RangeSliderWrap
            title="每"
            value={workTime()}
            onchange={event => {
              setWorkTime(parseInt(event.currentTarget.value))
            }}
          />
          <RangeSliderWrap
            title="休息时间"
            value={restTime()}
            max="99"
            onchange={event => {
              setRestTime(parseInt(event.currentTarget.value))
            }}
          />
          <ToggleWrap
            title="延后休息"
            value={deferred()}
            onchange={() => setDeferred(!deferred())}
          />
          <ToggleWrap
            title="休息前弹窗通知"
            value={restNotice()}
            onchange={() => setRestNotice(!restNotice())}
          />
        </div>
      </div>
    </>
  )
}

const RangeSliderWrap = props => {
  return (
    <>
      <label class="label cursor-pointer pb-6 grid grid-cols-6 gap-1">
        <span class="label-text">{props.title}</span>
        <input
          type="range"
          min={props.mix || '1'}
          max={props.max || '60'}
          value={props.value}
          onchange={props.onchange}
          class="range range-xs range-accent col-span-4"
        />
        <span>{props.value} 分钟</span>
      </label>
    </>
  )
}

// 开关包装
const ToggleWrap = props => {
  return (
    <>
      <label class="label cursor-pointer pb-6 pr-2 grid grid-cols-6 gap-1">
        <span class="label-text col-span-2">{props.title}</span>
        <input
          type="checkbox"
          class="toggle toggle-accent col-start-6"
          checked={props.value}
          onchange={props.onchange}
        />
      </label>
    </>
  )
}
