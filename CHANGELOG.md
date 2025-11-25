# Changelog
Todos los cambios notables de este proyecto serán documentados en este archivo.

Este formato sigue el estándar Semantic Versioning (SemVer)
y la estructura de Keep a Changelog.

## [Unreleased]
### Added
- Nueva pantalla de finalización cuando el usuario termina de estudiar un set.

### Changed
- *(Sin cambios definidos por ahora.)*

### Fixed
- *(Sin bugs corregidos por ahora.)*

---

## [1.1.2]
### Added
- Modal de advertencia al intentar eliminar una card, para evitar eliminaciones accidentales.
- Implementación de Dark Mode en toda la aplicación.
- Loader al iniciar o recargar la aplicacion.

### Changed
- Diseño del scrolll-bar adaptado al diseño de la aplicación.

### Fixed
- Porcentaje de estudio del set parseado.
- Pantallazo blanco al abrir o recargar la aplicación.
- Pantalla de estudio corregida en pantallas más pequeñas.

---

## [1.0.1] - 2025-11-22
### Fixed
- Los formularios de creación/edición de cards ahora reinician correctamente su estado al cambiar de pantalla.
- Solucionado el error donde al crear una nueva card el campo mantenía el texto de la card anterior.
- Corregido que el formulario de creación de cards permanecía abierto incluso después de completar la acción.
- El botón “Crear nuevo set” en la Home Page ya no queda desactivado cuando no corresponde.
- Ajustados varios estados globales que no se reiniciaban adecuadamente al crear o guardar un set.

---

## [1.0.0] - 2025-11-01
### Added
- Primera versión funcional de la aplicación.
- Sistema de sets y cards.
- Pantalla de estudio.
- Estructura inicial de navegación y contexto global.