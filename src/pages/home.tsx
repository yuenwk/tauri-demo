import createTemporaryWindow from "../lib/window";

export default function Home() {

  function onclick() {
    createTemporaryWindow('rest', 'rest', 3000);
  }

  return <>
    <h1>home</h1>
    <button onClick={onclick}>open window</button>
  </>
}
