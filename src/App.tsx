import { Link, Route, Routes, useLocation } from '@solidjs/router'
import { createSignal, For, lazy, Show } from 'solid-js'
import { IAbout, IHome, ISetting } from './lib/icon'
import createTemporaryWindow from './lib/TimedWindow'

const os = lazy(() => import('./pages/main/os'))
const home = lazy(() => import('./pages/main/home'))
const Rest = lazy(() => import('./pages/main/rest'))
const setting = lazy(() => import('./pages/main/setting'))

const menu = [
  { path: '/', icon: <IHome /> },
  { path: '/main/setting', icon: <ISetting /> },
  { path: '/main/about', icon: <IAbout /> }
]

export default function App() {
  const [current, setCurrent] = createSignal(0)
  const pathname = useLocation().pathname
  return (
    <>
      <div class="flex">
        <Show when={pathname.startsWith('/main') || pathname === '/'}>
          <div class=" text-center w-25 text-sm text-green-500 leading-loose ">
            <ul class=" flex-col h-screen border-r-2 border-r-green-500">
              <For each={menu} fallback={<div>Loading...</div>}>
                {(item, index) => (
                  <li class="p-3">
                    <Link
                      href={item.path}
                      onclick={() => setCurrent(index())}
                      class={
                        current() === index()
                          ? 'fill-blue-500 inline-flex flex-row'
                          : 'inline-flex flex-row'
                      }
                    >
                      {item.icon}
                    </Link>
                  </li>
                )}
              </For>
              <li class="p-3 ">
                <button
                  onclick={() => createTemporaryWindow({ label: 'rest', url: '/rest' })}
                >
                  OW
                </button>
              </li>
            </ul>
          </div>
        </Show>
        <div class="flex-1">
          <Routes>
            <Route path="/" component={home} />
            <Route path="/main/setting" component={setting} />
            <Route path="/main/os" component={os} />
            <Route path="/rest" element={<Rest seconds={100} />} />
            <Route
              path="/main/about"
              element={<div class="text-center">This site was made with Solid</div>}
            />
          </Routes>
        </div>
      </div>
    </>
  )
}
