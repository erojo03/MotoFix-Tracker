import { Routes } from '@angular/router';
import { usersGuard } from '../../core/guards/users.guard';

export default [
  {
    path: 'home',
    title: 'Home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
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
      import('./notifications/notifications.component').then(
        (m) => m.NotificationsComponent
      ),
  },
  {
    path: 'users',
    title: 'Users',
    canActivate: [usersGuard],
    loadComponent: () =>
      import('./users/users.component').then((m) => m.UsersComponent),
  },
] as Routes;
