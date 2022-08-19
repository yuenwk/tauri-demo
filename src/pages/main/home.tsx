import { createMemo, createSignal } from 'solid-js'
import createTemporaryWindow from '../../lib/window'

export default function Home() {
  function onclick() {
    createTemporaryWindow('rest', '/main/rest', 3000)
  }

  const [count, setCount] = createSignal(0)
  // count 的平方派生自 count，在依赖改变的时候自动更新
  const countPow2 = createMemo(() => count() ** 2)

  return (
    <>
      <h1>home</h1>
      <button onClick={onclick}>open window</button>
      <button onClick={() => setCount(count() + 1)}>
        {count()} | {countPow2()}
      </button>
      <button onClick={() => setCount(count() + 1)}>{count()}</button>
    </>
  )
}
