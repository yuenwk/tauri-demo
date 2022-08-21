import { createEffect, createSignal, splitProps } from 'solid-js'
import { WebviewWindow } from '@tauri-apps/api/window'
import './index.css'

export default function Rest({ seconds = 0 }) {
  const [paused, setPaused] = createSignal(false)
  const [over, setOver] = createSignal(false)
  // time 默认值是一个 object
  const [time, setTime] = createSignal(seconds)

  const tick = () => {
    // 暂停，或已结束
    if (paused() || over()) return

    if (time() === 0) {
      setOver(true)

      const restWindow = WebviewWindow.getByLabel('rest')
      restWindow.close()
    }

    setTime(time() - 1)
  }

  // 重置
  const reset = () => {
    setTime(seconds)
    setPaused(false)
    setOver(false)
  }

  createEffect(() => {
    //   // 执行定时
    let timerID = setInterval(() => tick(), 1000)
    //   // 卸载组件时进行清理
    return () => clearInterval(timerID)
  })

  return (
    <div class="rest-body h-screen  bg-light-blue-600">
      <WinUpdate seconds={seconds} time={time()}></WinUpdate>
    </div>
  )
}

const WinUpdate = props => {
  const [local] = splitProps(props, ['seconds', 'time'])
  return (
    <>
      <div class="bg-blue-500 flex h-screen flex-col justify-center items-center text-white">
        <div class="loader p-14">
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
        </div>
        <div class="pt-4">
          正在进行更新 {Math.floor((1 - local.time / local.seconds) * 100)}%
        </div>
        <div class="pt-1">请不要关闭电脑。执行此任务需要一定的时间。</div>
        <div class="mb-8">你的电脑将重启几次。</div>
      </div>
    </>
  )
}

{
  /* <svg width="32" height="32" viewBox="0 0 50 50">
          <g fill="#FFFFFF">
            <circle cx="25" cy="5" r="5" />
            <circle cx="39.1" cy="10.9" r="5" style="opacity:0.9;" />
            <circle cx="45" cy="25" r="5" style="opacity:0.8;" />
            <circle cx="39.1" cy="39.1" r="5" style="opacity:0.7;" />
            <circle cx="25" cy="45" r="5" style="opacity:0.6;" />
            <circle cx="10.9" cy="39.1" r="5" style="opacity:0.5;" />
            <circle cx="5" cy="25" r="5" style="opacity:0.4;" />
            <circle cx="10.9" cy="10.9" r="5" style="opacity:0.3;" />
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 25 25"
              to="360 25 25"
              dur="2s"
              fill="remove"
              repeatCount="indefinite"
            />
          </g>
        </svg> */
}
