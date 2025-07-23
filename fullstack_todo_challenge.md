# Reto Técnico Full-Stack - Lista de Tareas

## Descripción General
Desarrolla una aplicación web completa de lista de tareas utilizando React, Node.js y PostgreSQL. Este reto evalúa tu capacidad para crear una aplicación web completa con diseño de base de datos, desarrollo de API y prácticas modernas de frontend.

**Tiempo estimado:** 4-6 horas

## Esquema de Base de Datos (PostgreSQL)

Crea las siguientes tablas con las relaciones apropiadas:

```sql
-- Tabla de usuarios
CREATE TABLE usuarios (
...
);

-- Tabla de categorías
CREATE TABLE categorias (
...
);

-- Tabla de tareas
CREATE TABLE tareas (
...
);

-- Etiquetas para las tareas (relación muchos a muchos)
CREATE TABLE etiquetas (
...
);

CREATE TABLE tarea_etiquetas (
...
);
```

## Requisitos del Backend (Node.js + Express)

### 1. Endpoints de la API
Implementa los siguientes endpoints REST:

**Autenticación:**
- `POST /api/auth/registro` - Registro de usuario
- `POST /api/auth/login` - Inicio de sesión
- `GET /api/auth/perfil` - Obtener perfil del usuario actual (protegido)

**Tareas:**
- `GET /api/tareas` - Obtener todas las tareas del usuario autenticado
- `POST /api/tareas` - Crear nueva tarea
- `PUT /api/tareas/:id` - Actualizar tarea
- `DELETE /api/tareas/:id` - Eliminar tarea
- `PATCH /api/tareas/:id/completar` - Cambiar estado de completado

**Categorías:**
- `GET /api/categorias` - Obtener todas las categorías del usuario
- `POST /api/categorias` - Crear nueva categoría
- `PUT /api/categorias/:id` - Actualizar categoría
- `DELETE /api/categorias/:id` - Eliminar categoría

**Etiquetas:**
- `GET /api/etiquetas` - Obtener todas las etiquetas del usuario
- `POST /api/etiquetas` - Crear nueva etiqueta

### 2. Requisitos Técnicos del Backend
- Usar JWT para autenticación
- Implementar manejo adecuado de errores y validación
- Usar variables de entorno para configuración
- Incluir middleware de logging de requests
- Implementar rate limiting
- Usar consultas parametrizadas para prevenir inyección SQL
- Incluir códigos de estado HTTP apropiados

### 3. Funciones de Filtrado
Soportar los siguientes parámetros de consulta para GET /api/tareas:
- `completada` - Filtrar por estado de completado
- `categoria` - Filtrar por ID de categoría
- `prioridad` - Filtrar por nivel de prioridad
- `fecha_vencimiento` - Filtrar por rango de fecha de vencimiento
- `busqueda` - Buscar en título y descripción
- `etiquetas` - Filtrar por nombres de etiquetas
- `ordenar` - Ordenar por creado_en, fecha_vencimiento, prioridad, o titulo
- `direccion` - asc o desc

## Requisitos del Frontend (React)

### 1. Estructura de Componentes
Crea una jerarquía de componentes bien organizada:

```
src/
├── componentes/
│   ├── Auth/
│   │   ├── FormularioLogin.jsx
│   │   └── FormularioRegistro.jsx
│   ├── Tarea/
│   │   ├── ListaTareas.jsx
│   │   ├── ItemTarea.jsx
│   │   ├── FormularioTarea.jsx
│   │   └── FiltroTareas.jsx
│   ├── Categoria/
│   │   ├── ListaCategorias.jsx
│   │   └── FormularioCategoria.jsx
│   ├── Layout/
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   └── Layout.jsx
│   └── Comunes/
│       ├── Cargando.jsx
│       └── MensajeError.jsx
├── hooks/
│   ├── useAuth.js
│   ├── useTareas.js
│   └── useCategorias.js
├── servicios/
│   └── api.js
├── contexto/
│   └── ContextoAuth.jsx
└── utils/
    └── helpers.js
```

### 2. Funcionalidades a Implementar
- Autenticación de usuario (login/registro/logout)
- Crear, leer, actualizar, eliminar tareas
- Marcar tareas como completadas/incompletas
- Organizar tareas por categorías
- Agregar/quitar etiquetas a las tareas
- Filtrar tareas por estado de completado, categoría, prioridad, fecha de vencimiento
- Buscar tareas por título/descripción
- Ordenar tareas por diferentes criterios
- Diseño responsivo para móvil y desktop
- Estados de carga y manejo de errores
- Validación de formularios

### 3. Requisitos Técnicos del Frontend
- Usar React hooks (useState, useEffect, useContext)
- Implementar hooks personalizados para llamadas a la API
- Usar Context API para el estado de autenticación
- Implementar error boundaries apropiados
- Usar CSS modules o styled-components para estilos
- Incluir indicadores de carga
- Manejar validación de formularios
- Implementar actualizaciones optimistas cuando sea apropiado

## Características Bonus (Opcionales)
- Reordenamiento de tareas con drag and drop
- Toggle de tema oscuro/claro
- Dashboard de estadísticas de tareas
- Exportar tareas a CSV/JSON
- Atajos de teclado
- Actualizaciones en tiempo real usando WebSockets
- Operaciones en lote (seleccionar múltiples tareas)

## Criterios de Evaluación

### Calidad del Código (25%)
- Código limpio, legible y bien organizado
- Manejo adecuado de errores
- Convenciones de nomenclatura consistentes
- Reutilización y modularidad del código

### Funcionalidad (25%)
- Todas las características requeridas funcionan correctamente
- Operaciones CRUD apropiadas
- Flujo de autenticación funciona
- Funcionalidad de filtrado y búsqueda

### Diseño de Base de Datos (20%)
- Relaciones de tablas apropiadas
- Consultas eficientes
- Restricciones de integridad de datos

### Diseño de API (15%)
- Principios de API RESTful
- Métodos HTTP y códigos de estado apropiados
- Validación de request/response
- Consideraciones de seguridad

### Implementación del Frontend (15%)
- Estructura y reutilización de componentes
- Manejo del estado
- Experiencia e interfaz de usuario
- Diseño responsivo

---

## Preguntas de Inteligencia de Negocio

Después de completar la implementación técnica, proporciona consultas SQL para las siguientes preguntas de negocio. Cada consulta debe estar optimizada y devolver resultados significativos:

### 1. Análisis de Participación de Usuarios
**Pregunta:** ¿Cuál es el promedio de tareas creadas por usuario en los últimos 30 días, y cómo se compara con los 30 días anteriores?

### 2. Tendencias de Tasa de Completado
**Pregunta:** ¿Cuál es la tasa de completado diaria de tareas en los últimos 90 días, agrupada por nivel de prioridad?

### 3. Rendimiento por Categoría
**Pregunta:** ¿Qué categorías tienen las tasas de completado más altas y más bajas, y cuál es el tiempo promedio de completado para cada categoría?

### 4. Patrones de Productividad del Usuario
**Pregunta:** ¿Cuáles son las horas pico y días de la semana cuando los usuarios crean más tareas, y cuándo las completan?

### 5. Análisis de Tareas Vencidas
**Pregunta:** ¿Cuántas tareas están actualmente vencidas, agrupadas por usuario y categoría, y cuál es el promedio de días que están vencidas?

### 6. Estadísticas de Uso de Etiquetas
**Pregunta:** ¿Cuáles son las etiquetas más frecuentemente utilizadas, y qué etiquetas están asociadas con las tasas de completado más altas?

### 7. Métricas de Retención de Usuarios
**Pregunta:** ¿Cuántos usuarios han creado al menos una tarea en cada una de las últimas 4 semanas, y cuál es la tasa de retención semana a semana?

### 8. Análisis de Distribución de Prioridad
**Pregunta:** ¿Cuál es la distribución de tareas a través de los niveles de prioridad para usuarios activos (usuarios que han iniciado sesión en los últimos 7 días)?

### 9. Tendencias Estacionales
**Pregunta:** ¿Cómo varía la creación y completado de tareas por mes en el último año, y hay algún patrón estacional?

### 10. Benchmarking de Rendimiento
**Pregunta:** ¿Qué usuarios están en el 10% superior por tasa de completado de tareas, y cuál es el número promedio de tareas que manejan simultáneamente?

---

## Instrucciones de Entrega

1. **Repositorio de Código:** Proporciona un repositorio de GitHub con historial de commits claro
2. **Documentación:** Incluye un README completo con instrucciones de configuración
3. **Scripts de Base de Datos:** Incluye scripts de creación de esquema e inserción de datos de ejemplo
4. **Documentación de API:** Documenta todos los endpoints con ejemplos de request/response
5. **Consultas SQL:** Proporciona las 10 consultas de inteligencia de negocio con formato de salida esperado

**Tiempo de entrega:** 2-3 días calendario desde la recepción del reto

**Nota:** Enfócate en la calidad del código, manejo adecuado de errores y experiencia de usuario. La aplicación debe estar lista para producción con medidas de seguridad apropiadas y consideraciones de rendimiento.