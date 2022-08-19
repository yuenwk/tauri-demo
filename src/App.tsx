import { Route, Routes, useLocation } from '@solidjs/router'
import { lazy, Show } from 'solid-js'
import createTemporaryWindow from './lib/window'

const os = lazy(() => import('./pages/main/os'))
const home = lazy(() => import('./pages/main/home'))
const rest = lazy(() => import('./pages/main/rest'))
const setting = lazy(() => import('./pages/main/setting'))

export default function App() {
  const pathname = useLocation().pathname
  return (
    <>
      <div class="flex">
        <Show when={pathname.startsWith('/main') || pathname === '/'}>
          <div class=" text-center w-25 text-sm text-green-500 leading-loose ">
            <ul class=" flex-col h-screen border-r-2 border-r-indigo-500">
              <li class="p-3">
                <a href="/">Home</a>
              </li>
              <li class="p-3">....</li>
              <li class="p-3 ">
                <a href="/main/setting">Setting</a>
              </li>
              <li class="p-3 ">
                <a href="/main/os">os</a>
              </li>
              <li class="p-3 ">
                <a href="/main/about">about</a>
              </li>
              <li class="p-3 ">
                <button onclick={() => createTemporaryWindow('rest', '/rest', 3000)}>
                  openWindow
                </button>
              </li>
            </ul>
          </div>
        </Show>
        <div class="flex-1">
          <Routes>
            <Route path="/" component={home} />
            <Route path="/main/os" component={os} />
            <Route path="/main/setting" component={setting} />
            <Route path="/main/os" component={os} />
            <Route path="/rest" component={rest} />
            <Route
              path="/main/about"
              element={<div>This site was made with Solid</div>}
            />
          </Routes>
        </div>
      </div>
    </>
  )
}
