# 📱 ¿Quién no me sigue? - Instagram Analyzer

Una aplicación web **100% privada** y local para analizar tus seguidores de Instagram y descubrir quién no te sigue de vuelta.

## 🌟 Características

- ✅ **100% Privado**: Todo se procesa localmente en tu navegador
- ✅ **Carga ZIP o JSONs**: Soporta el export completo o archivos individuales
- ✅ **Tres listas útiles**: No te siguen, Mutuos, y Fans
- ✅ **Búsqueda rápida**: Encuentra usuarios específicos al instante
- ✅ **Exportación**: Descarga listas en CSV o ZIP completo
- ✅ **Interfaz moderna**: Diseño responsive y accesible
- ✅ **Sin servidor**: No hay backend ni bases de datos

## 🚀 Cómo usar

### Paso 1: Obtén tus datos de Instagram

1. Entra a **Instagram** (app o web)
2. Ve a **Configuración → Centro de cuentas**
3. Selecciona **"Tu información y permisos"**
4. Toca **"Exportar tu información"**
5. Elige **"Crear exportación"**
6. Selecciona **"Exportar al dispositivo"**
7. En **"Personalizar información"**: Deselecciona todo y deja solo **"Seguidores y seguidos"**
8. En **"Intervalo de fechas"**: **"Desde el principio"**
9. En **"Formato"**: Selecciona **JSON**
10. Toca **"Iniciar exportación"**
11. **Espera** a que te llegue el correo (15 minutos a 48 horas)
12. Descarga el ZIP del enlace del correo

### Paso 2: Carga tus datos

- **Opción 1**: Arrastra y suelta todo el ZIP de Instagram
- **Opción 2**: Selecciona los archivos JSON individuales
- **Opción 3**: Usa los botones "Cargar ZIP" o "Cargar JSONs"

### Paso 3: Analiza tus resultados

La app te mostrará tres listas:

- **No me siguen** (⚠️): Usuarios que sigues pero no te siguen
- **Mutuos** (💚): Seguidores mutuos
- **Fans** (⭐): Te siguen pero tú no los sigues

### Paso 4: Exporta o copia

- Busca usuarios específicos
- Exporta listas individuales o todas juntas
- Copia al portapapeles para uso inmediato

## 🛠️ Desarrollo

### Requisitos

- Node.js 18+
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone [url-del-repo]
cd who-to-unfollow

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview
```

### Scripts disponibles

```bash
npm run dev       # Servidor de desarrollo
npm run build     # Build para producción
npm run preview   # Preview del build
npm run lint      # Linter ESLint
npm run test      # Ejecutar tests con Vitest
npm run test:ui   # Tests con interfaz
```

### Estructura del proyecto

```
who-to-unfollow/
├─ src/
│  ├─ main.ts      # Aplicación principal
│  ├─ ui.ts        # Gestión de interfaz
│  ├─ parse.ts     # Parseo de archivos
│  ├─ logic.ts     # Lógica de negocio
│  ├─ export.ts    # Funciones de exportación
│  ├─ validate.ts  # Validación de archivos
│  ├─ types.ts     # Definiciones de tipos
│  └─ styles.css   # Estilos CSS
├─ index.html      # HTML principal
├─ vite.config.ts  # Configuración Vite
└─ README.md       # Este archivo
```

## 🔒 Privacidad y seguridad

- **Sin servidor**: Todo corre en tu navegador
- **Sin tracking**: No hay analytics ni cookies de terceros
- **Sin almacenamiento**: Los datos no se guardan permanentemente
- **Código abierto**: Puedes auditar todo el código
- **Local first**: Nunca enviamos datos a servidores externos

## 📊 Formatos soportados

### Estructura de archivos Instagram

```
connections/followers_and_following/
├─ following.json       # Usuarios que sigues
├─ followers_1.json     # Tus seguidores (parte 1)
├─ followers_2.json     # Tus seguidores (parte 2)
└─ ...                  # Más archivos followers si tienes muchos
```

### Estructura JSON esperada

```json
[
  {
    "title": "username",
    "string_list_data": [
      {
        "value": "username (en exportaciones antiguas)",
        "href": "https://instagram.com/username",
        "timestamp": 1234567890
      }
    ]
  }
]
```

## 🧪 Testing

```bash
# Ejecutar tests
npm run test

# Tests con interfaz
npm run test:ui

# Tests con cobertura
npm run test:coverage
```

## 🚨 Casos Edge detectados

- Archivos followers paginados (`_1`, `_2`, etc.)
- Solo `followers.json` (formato antiguo)
- Rutas en otros idiomas
- ZIP con archivos extra
- JSON malformado
- Usernames con caracteres especiales
- Cuentas eliminadas/cambiadas

## 🛡️ Limitaciones conocidas

- Solo funciona con exports oficiales de Instagram
- Requiere archivos JSON (no HTML)
- No funciona con datos de otras redes sociales
- Máximo ~50k registros para rendimiento óptimo

## 📈 Roadmap

- [ ] PWA para instalación
- [ ] Soporte para etiquetas personalizadas
- [ ] Import/export de configuraciones
- [ ] Modo dark mejorado
- [ ] Soporte para más idiomas
- [ ] Análisis temporal de cambios

## 🤝 Contribuir

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

### Checklist para PRs

- [ ] Tests pasan (`npm run test`)
- [ ] Código linterado (`npm run lint`)
- [ ] Build exitoso (`npm run build`)
- [ ] Documentación actualizada
- [ ] Mantiene privacidad (sin tracking)

## 📄 Licencia

MIT License - ve [LICENSE](LICENSE) para más detalles.

## ⚠️ Disclaimer

Esta aplicación:

- **NO** hace scraping de Instagram
- **NO** usa APIs privadas o no autorizadas
- **NO** almacena datos permanentemente
- **NO** rompe términos de servicio de Instagram
- Solo procesa datos que **TÚ** descargas oficialmente

Úsala responsablemente y respeta la privacidad de otros usuarios.

---

**Hecho con ❤️ para la privacidad digital**
