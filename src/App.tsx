import HeaderBar from "./components/HeaderBar.tsx";
import { Outlet } from "react-router-dom";

function App() {

  return (
    <div className="h-dvh flex flex-col overflow-hidden bg-background-light dark:bg-dark-background">
      <HeaderBar />

      <main className="flex-1 overflow-y-auto mt-10 dark:bg-dark-background bg-background-light">
        <Outlet />
      </main>
    </div>
  )
}

export default App
