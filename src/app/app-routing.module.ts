import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./features/landing/landing.module').then(m => m.LandingModule) },                 // Página de inicio
  { path: 'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) },                      // Autenticación
  { path: 'products', loadChildren: () => import('./features/products/products.module').then(m => m.ProductsModule) },      // Productos
  { path: 'cart', loadChildren: () => import('./features/cart/cart.module').then(m => m.CartModule) },                      // Carrito
  { path: 'orders', loadChildren: () => import('./features/orders/orders.module').then(m => m.OrdersModule) },              // Pedidos
  { path: 'users', loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule) },                  // Usuarios / perfil
  { path: 'contact', loadChildren: () => import('./features/contact/contact.module').then(m => m.ContactModule) },          // Contacto
  { path: 'info', loadChildren: () => import('./features/info/info.module').then(m => m.InfoModule) },                      // Información (privacy, terms, faq)
  { path: 'dashboard', loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule) },  // Dashboard (solo admins)
  { path: '**', loadChildren: () => import('./features/not-found/not-found.module').then(m => m.NotFoundModule) },          // Página 404 (Not Found)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
