# Flashcards App

Aplicación de estudio basada en tarjetas (flashcards) que permite crear, editar y eliminar conjuntos de estudio.  
Funciona como una app de escritorio usando **Electron**, y guarda los datos en un archivo JSON dentro del sistema del usuario.

---

## 🚀 Características

- Crear sets de estudio con título, descripción y tarjetas.
- Editar sets sin modificar su ID ni fecha de creación.
- Eliminar sets.
- Guardado persistente en archivo JSON mediante IPC.
- Interfaz rápida y responsive.

---

## 🧠 Tecnologías utilizadas

- Electron
- React
- Vite
- TypeScript
- TailwindCSS

---

## 🗃️ Persistencia de datos

La aplicación guarda los sets en un archivo JSON utilizando IPC:
```bash
/userData/sets.json
```

El archivo contiene una lista de objetos:
```json
[
  {
    "id": "uuid",
    "title": "Título",
    "subtitle": "Descripción",
    "cards": [],
    "createdAt": "10/11/2025"
  }
]
```

## 📡 Comunicación entre procesos

La app utiliza varios handlers IPC:

- save-json — Guarda un nuevo set.
- edit-json — Edita un set existente.
- delete-json — Elimina un set.
- load-json — Devuelve todos los sets.

Cada handler lee el JSON, modifica los datos y vuelve a guardarlos.

---
## ⚙️ Instalación y ejecución

1. Descarga el instalador desde la sección **Releases** (`.exe`).
2. Ejecuta el archivo para comenzar la instalación.

> **Nota:** La aplicación **no está firmada**, por lo que Windows SmartScreen puede mostrar una advertencia al abrir el instalador.
> Solo pulsa **“Más información” → “Ejecutar de todas formas”** para continuar.

Compatible con **Windows 10 y Windows 11**.

---
> Este es un proyecto en crecimiento y en constante actualizaciones y cambios. La aplicaion todavia se encuentra en su estado inicial (MVP), no posee todas las funcionalidades y se iran agregando poco a poco. La version mobile llegara pronto.