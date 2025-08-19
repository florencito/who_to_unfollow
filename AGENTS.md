# AGENTS — “Who to unfollow” (mini web app 100% local)

## 0) Contexto del producto
- **Problema:** mostrar “a quién sigues que no te sigue de vuelta” en Instagram.
- **Límites técnicos/legales:** no scraping, no API privada. Usamos **export oficial** de Instagram (JSON/ZIP).
- **Solución:** app front-only que procesa localmente los archivos de **Download Your Information**:
  - `connections/followers_and_following/followers_1.json`, `followers_2.json`, …
  - `connections/followers_and_following/following.json`
- **Privacidad:** todo corre en el navegador. No hay backend, ni tracking por defecto.

## 1) Objetivos y criterios de éxito
- ✅ Cargar **ZIP** o **JSONs sueltos**.
- ✅ Parsear y **normalizar** followers/following (con paginación `_1`, `_2`, …).
- ✅ Calcular 3 listas:  
  1) **No me siguen de vuelta** = following − followers  
  2) **Mutuos** = intersección  
  3) **Fans** = followers − following
- ✅ UI mínima con: búsqueda, conteos, tabs, exportar CSV, copiar lista.
- ✅ Errores claros (archivos faltantes, estructura inválida, ZIP sin rutas, etc.).
- ✅ Performance fluida con 50k registros combinados.
- ✅ Sin salir del navegador. Zero-server.

**Hecho =** Todas las listas correctas, UX clara, exportación funcional, y manejo robusto de variantes de JSON.

## 2) Roles de agentes (para Claude)
- **PM/Arquitecto**: mantenedor del alcance, edge cases, decisiones de diseño, criterios de aceptación.
- **Dev Front**: UI/UX, estados de carga/errores, accesibilidad.
- **Dev Data**: parseo ZIP/JSON, normalización, conjuntos y operaciones.
- **QA**: pruebas con datasets artificiales y reales (anonimizados), pruebas de rendimiento.
- **Legal/Privacidad** (ligero): copy de privacidad y verificación no-tracking.

## 3) Alcance funcional (MVP)
- **Carga de archivos**
  - Botón “Cargar ZIP de Instagram” (usa JSZip).
  - Botón “Cargar JSONs” (múltiples).
  - Validación automática de nombres/ubicaciones.
- **Parsing & Normalización**
  - Estructuras esperadas: con `string_list_data[0].value`.
  - Merge de `followers_1.json + followers_2.json + …`.
- **Resultados**
  - Resumen: `Sigues: N`, `Te siguen: M`.
  - Tabs: **No me siguen**, **Mutuos**, **Fans**.
  - Búsqueda, orden alfabético, exportar CSV, copiar lista.
- **Estados/Errores**
  - Vacío, incompleto, malformado, ZIP inválido.

## 4) No-funcional
- **Stack:** HTML/TS/CSS (sin framework) o Vite + TS.
- **Librerías:** `jszip`, `file-saver`.
- **Rendimiento:** uso de `Set`, paginación si >1k.
- **Accesibilidad:** contraste, foco visible.
- **Privacidad:** banner.

## 5) Estructura de proyecto
```
ig-nome-sigue/
├─ public/
├─ src/
│  ├─ main.ts
│  ├─ ui.ts
│  ├─ parse.ts
│  ├─ logic.ts
│  ├─ export.ts
│  ├─ types.ts
│  ├─ validate.ts
│  └─ styles.css
├─ index.html
├─ vite.config.ts
└─ README.md
```

## 6) Contratos de datos
```ts
export type IGRow = {
  string_list_data?: Array<{ value: string; href?: string; timestamp?: number }>;
};
export type IGList = IGRow[];
export type Normalized = { followers: Set<string>; following: Set<string>; };
export type Results = { notFollowingBack: string[]; mutuals: string[]; fans: string[]; };
```

## 7) Edge cases
- followers paginados (`_1`, `_2`).
- sólo `followers.json` (antiguo).
- rutas en otros idiomas.
- ZIP con archivos extra.
- JSON malformado.
- usernames con `@`, mayúsculas, unicode.
- cuentas eliminadas/cambiadas.

## 8) Criterios de aceptación
- Carga correcta de ZIP/JSON.
- Listas correctas.
- Export CSV correcto.
- Errores claros.

## 9) Pruebas
- Unitarias: normalización, merge, computeResults, detectFiles.
- Integración: carga ZIP válido, JSONs sueltos, faltantes.
- Rendimiento: 50k registros <200ms.

## 10) Seguridad & legal
- Sin scraping, sin API privada, sin login.
- No persistir datos salvo toggle.
- README con aviso de orígenes.

## 11) Plan de releases
- v0.1 JSONs sueltos.
- v0.2 ZIP con JSZip.
- v0.3 UI optimizada.
- v0.4 PWA.
- v0.5 Etiquetas.

## 12) Tareas (checklist)
Infra, Core, UI, QA, Docs.

## 13) Comandos Warp
```bash
npm create vite@latest ig-nome-sigue -- --template vanilla-ts
cd ig-nome-sigue
npm i jszip file-saver
npm i -D vitest @vitest/ui @types/jszip @types/file-saver eslint prettier typescript vite-plugin-checker
npm run dev
```

## 14) Prompts listos para Claude
Roles y tareas detalladas (PM, Dev Data, Dev Front, QA, Docs).

## 15) Mensajes de error sugeridos
- No encontré following.json
- No encontré followers_*.json
- Estructura inesperada
- ZIP sin rutas esperadas

## 16) Copys de UI
- Título, subtítulo, botones, tabs, resumen, privacidad.

## 17) Export CSV
- Cabecera: username
- Nombre archivo: `no-me-siguen-YYYYMMDD.csv`

## 18) Definition of Done
- ZIP+JSON soportados, listas correctas, exportar/buscar, errores claros, README listo.

## 19) Roadmap post-MVP
- PWA, etiquetas, import/export, soporte localizaciones raras.

## 20) Plantilla de PR
Checklist: core, sets, UI, tests, README.
