// src/routes/routes.tsx
import { createHashRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import SetsPage from "../pages/NewSetPage";
import StudyPage from "../pages/StudyPage";

export const router = createHashRouter([
  {
    path: "/",
    element: <App />, // Layout principal
    children: [
      {
        index: true, // Ruta raíz "/"
        element: <HomePage />,
      },
      {
        path: "sets/new",
        element: <SetsPage />,
      },
      {
        path: "sets/edit/:id",
        element: <SetsPage />
      },
      {
        path: "sets/study/:id",
        element: <StudyPage />
      }
    ],
  },
]);
