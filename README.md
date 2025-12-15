# 🛍️ ShopBrands Frontend ##################################################
- Frontend de **ShopBrands**, una aplicación de comercio electrónico desarrollada con **Angular**, **NgRx**, **RxJS** y **TypeScript**.  
- Implementa un flujo completo de compra con autenticación, carrito global, gestión de usuarios, pedidos, notificaciones en tiempo real y dashboard administrativo.

<br>
<br>

## 🚀 Tecnologías principales
- `Angular 17+`                         → Framework frontend principal  
- `NgRx`                                → Gestión de estado global (Store, Effects, Entity, Router Store)  
- `RxJS`                                → Programación reactiva y manipulación de streams de datos  
- `TypeScript`                          → Tipado estático para código más robusto  
- `SCSS / Tailwind`                     → Estilos modulares y diseño responsive  
- `Angular Router`                      → Navegación modular y lazy loading  
- `Cypress / Jasmine / Karma`           → Testing E2E y unitario  
- `i18n`                                → Internacionalización  
- `LocalStorage`                        → Persistencia de estado offline  

<br>
<br>

## 📁 Estructura del proyecto
```
shop-frontend/
    ├── src/
    │   ├── app/
    │   │   ├── core/                   → Servicios globales, guards, interceptores, modelos
    │   │   ├── shared/                 → Componentes reutilizables (UI, pipes, directives)
    │   │   ├── features/               → Módulos principales (auth, products, cart, orders, users, etc.)
    │   │   ├── store/                  → Configuración global del Store NgRx
    │   │   ├── app-routing.module.ts
    │   │   ├── app.component.ts
    │   │   └── app.module.ts
    │   │
    │   ├── assets/
    │   │   ├── images/
    │   │   ├── styles/
    │   │   └── i18n/
    │   │
    │   ├── testing/                    → Pruebas unitarias, integración y E2E
    │   ├── docs/                       → Documentación técnica del frontend
    │   ├── index.html
    │   ├── main.ts
    │   └── styles.scss
    │
    ├── angular.json
    ├── package.json
    ├── tsconfig.json
    ├── README.md
    └── LICENSE
```
<br>
<br>

## ⚙️ Instalación y configuración
1. Clonar el repositorio
- `git clone https://github.com/tu-usuario/shopbrands-frontend.git`
- `cd shopbrands-frontend`

2. Instalar dependencias
- `npm install`

3. Configurar entorno
>Crea o ajusta el archivo .env o los archivos de entorno Angular:
- `src/environments/environment.ts`
- `src/environments/environment.prod.ts`

Ejemplo:
```javascript
export const environment = {
    production: false,
    apiUrl: 'http://localhost:3000/api',
    stripePublicKey: 'tu_clave_publica_stripe'
};
```

4. Ejecutar el servidor de desarrollo
- `ng serve`

- Accede en tu navegador:
- `http://localhost:4200`

<br>
<br>

## 📦 Características principales
>Autenticación y roles
- Login, registro y control de sesión persistente con JWT.
- Guardas (`auth.guard.ts`, `role.guard.ts`) para rutas protegidas.

>Gestión de productos
- Listado y detalle de productos.
- Filtros por categoría, precio y stock.
- Paginación y lazy loading.

>Carrito de compras
- Store global con `cart.reducer.ts`, `cart.selectors.ts`.
- Persistencia del carrito en `localStorage`.
- Cálculo automático de totales y manejo de stock.

>Pedidos
- Creación y seguimiento de pedidos.
- Integración con backend para pagos y facturación.
- Generación de comprobante (PDF).

>Dashboard administrativo
- Visualización de métricas: ventas, usuarios, pedidos.
- Filtros dinámicos y gráficos reactivos.
- Gestión CRUD de usuarios y pedidos.

>Notificaciones en tiempo real
- Implementadas con `Subjects` de RxJS o WebSocket.
- Visualización mediante componente `notification.component.ts`.

>Testing
- Tests unitarios (servicios, reducers, effects, componentes).
- Tests de integración y E2E con Cypress.

>Optimización
- `takeUntil` para prevenir memory leaks.
- Selectors memoizados con NgRx para rendimiento óptimo.

<br>
<br>

## 🧠 Estructura funcional (por módulos) 
|     Módulo    |                    Descripción                   |                               Store                               |
|:-------------:|:------------------------------------------------:|:-----------------------------------------------------------------:|
|    **Auth**   |       Login, registro y logout de usuarios.      |        `auth.actions.ts, auth.reducer.ts, auth.effects.ts`        |
|  **Products** |     Listado, detalle y filtros de productos.     | `products.actions.ts, products.reducer.ts, products.effects.ts` │ |
|    **Cart**   |         Carrito global, checkout y pagos.        |        `cart.actions.ts, cart.reducer.ts, cart.effects.ts`        |
|   **Orders**  |       Creación y visualización de pedidos.       |     `orders.actions.ts, orders.reducer.ts, orders.effects.ts`     |
|    **Users**  |    Perfil, edición y direcciones del usuario.    |       `users.actions.ts, users.reducer.ts, users.effects.ts`      |
| **Dashboard** | Administración de usuarios, pedidos y métricas.  |                   `Módulo exclusivo dashboard/`                   |
|    **Info**   |  Páginas estáticas (FAQ, privacidad, términos).  |                                 `—`                               |

<br>
<br>

## 🔁 Flujo de datos NgRx 
1. Componente dispara una acción →
2. Effect intercepta la acción y llama al servicio correspondiente →
3. Servicio realiza la petición HTTP al backend →
4. Reducer actualiza el estado global →
5. Selector expone los datos actualizados al componente.
- `this.store.dispatch(loadProducts());`
- `this.products$ = this.store.select(selectAllProducts);`

<br>
<br>

## 💾 Persistencia de estado 
- El estado de las secciones clave (cart, auth) se guarda en localStorage gracias al meta-reducer:
- `src/app/store/meta-reducers/hydration.meta-reducer.ts`
- Esto garantiza que los datos se conserven al recargar la página o cerrar sesión.

<br>
<br>

## 🎨 Diseño y UI 
- Componentes reutilizables en `shared/ui/` y `shared/components/`
- Tokens de diseño definidos en `docs/DESIGN_TOKENS.md`
- Diseño responsive con CSS Grid, Flexbox y media queries.
- Implementación atómica (atoms, molecules, organisms).

<br>
<br>

## 🌍 Internacionalización 
>Sistema de traducción con archivos JSON en:
- `src/assets/i18n/`

Ejemplo:
```json
    {
        "cart": {
            "title": "Tu carrito de compras",
            "empty": "No tienes productos en el carrito."
        }
    }
```

<br>
<br>

## 🧪 Testing 
>Estructura de pruebas:
```
testing/
    ├── unit/                       → Servicios, reducers, effects, componentes
    ├── integration/                → Integración entre módulos
    └── e2e/                        → Pruebas completas con Cypress
```

>Ejecutar tests unitarios:
- `npm run test`

>Ejecutar tests e2e (Cypress):
- `npm run e2e`

<br>
<br>

## ⚡ Optimización y buenas prácticas 
- `takeUntil` o `async pipe` para evitar memory leaks.
- Uso de Selectors memoizados (`createSelector`) para evitar renderizados innecesarios.
- Carga diferida (`lazy loading`) de módulos.
- `ChangeDetectionStrategy.OnPush` en componentes de alto rendimiento.
- Dividir servicios en capas (`services`, `store`, `core`) para mantener la escalabilidad.

<br>
<br>

## 🧩 Scripts disponibles 
|     Comando     |                  Descripción                  |
|:---------------:|:---------------------------------------------:|
|   `npm start`   |       Ejecuta la app en modo desarrollo       |
| `npm run build` |     Compila la aplicación para producción     |
|  `npm run test` |          Ejecuta los tests unitarios          |
|  `npm run e2e`  |          Ejecuta los tests end-to-end         |
|  `npm run lint` | Analiza y corrige errores de estilo de código |

<br>
<br>

## 🖥️ Integración con el backend 
>Este proyecto se conecta con el backend de **ShopBrands** en:  
  👉 [http://localhost:3000/api](http://localhost:3000/api)

>Consulta su documentación:  
  📄 [ShopBrands Backend README](../shop-backend/README.md)  
  📘 [Documentación de la API (Swagger)](http://localhost:3000/api-docs)

<br>
<br>

## 📄 Documentación adicional 
- [docs/API_CLIENT.md](./docs/API_CLIENT.md)            → Cómo consumir el backend con OpenAPI client.  
- [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)        → Explicación del flujo de datos, NgRx y estructura modular.  
- [docs/DESIGN_TOKENS.md](./docs/DESIGN_TOKENS.md)      → Guía de estilos y variables de diseño.

<br>
<br>

## 👨‍💻 Autor 

**Nathanruhe**  
>Desarrollador Web Full Stack
- 📧 [nathan.ruhe@hotmail.com](mailto:nathan.ruhe@hotmail.com)
- 💼 [LinkedIn](https://www.linkedin.com/in/nathanruhe/)
- 🐙 [GitHub](https://github.com/nathanruhe)

<br>
<br>

## 📜 Licencia 
- Este proyecto está bajo la licencia MIT — libre para uso, modificación y distribución con atribución al autor original.