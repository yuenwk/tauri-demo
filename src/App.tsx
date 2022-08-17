import { lazy } from 'solid-js'
import { Route, Routes } from '@solidjs/router'

const os = lazy(() => import('./pages/os'))
const home = lazy(() => import('./pages/home'))
const rest = lazy(() => import('./pages/rest'))
const setting = lazy(() => import('./pages/setting'))

export default function App() {
  return (
    <div class="flex">
      <div class="flex-none text-center w-25 p-3 text-sm text-green-500 leading-loose">
        <ul class="divide-y divide-dashed">
          <li class="p-3">
            <a href="/">Home</a>
          </li>
          <li class="p-3">....</li>
          <li class="p-3">
            <a href="/setting">Setting</a>
          </li>
        </ul>
      </div>
      <div class="flex-1">
        <Routes>
          <Route path="/" component={home} />
          <Route path="/setting" component={setting} />
          <Route path="/os" component={os} />
          <Route path="/rest" component={rest} />
          <Route path="/about" element={<div>This site was made with Solid</div>} />
        </Routes>
      </div>
    </div>
  )
}
