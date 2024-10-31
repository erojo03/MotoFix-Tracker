import { Routes } from "@angular/router"

export default [
  {
    path: 'home',
    title: 'Home',
    loadComponent: () =>
      import('./home/home.component').then(
        (m) => m.HomeComponent
      ),
  },
  {
    path: 'motorcycles',
    title: 'Motorcycles',
    loadComponent: () =>
      import('./motorcycles/motorcycles.component').then(
        (m) => m.MotorcyclesComponent
      ),
  },
  {
    path: 'notifications',
    title: 'Notifications',
    loadComponent: () =>
      import(
        './notifications/notifications.component'
      ).then((m) => m.NotificationsComponent),
  },
  {
    path: 'users',
    title: 'Users',
    loadComponent: () =>
      import('./users/users.component').then(
        (m) => m.UsersComponent
      ),
  },
 ] as Routes