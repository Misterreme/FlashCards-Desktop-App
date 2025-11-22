import HeaderBar from "./components/HeaderBar.tsx";
import { Outlet } from "react-router-dom";

function App() {

  return (
    <div className="h-dvh flex flex-col overflow-hidden">
      <HeaderBar />

      <main className="flex-1 overflow-y-auto mt-10">
        <Outlet />
      </main>
    </div>
  )
}

export default App
