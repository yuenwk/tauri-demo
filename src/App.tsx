import { lazy } from "solid-js";
import { Route, Routes } from "@solidjs/router"

const os = lazy(() => import("./pages/os"));
const home = lazy(() => import("./pages/home"));
const rest = lazy(() => import("./pages/rest"));

export default function App() {
  return <>
    <Routes>
      <Route path="/" component={home} />
      <Route path="/os" component={os} />
      <Route path="/rest" component={rest} />
      <Route path="/about" element={<div>This site was made with Solid</div>} />
    </Routes>
  </>
}
