import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const userRole = authService.getRole();
  const expectedRole = route.data['role'];

  console.log('Rôle utilisateur:', userRole);
  console.log('Rôle attendu:', expectedRole);

  if (authService.isLoggedIn()) {
    if (expectedRole && userRole !== expectedRole) {
      console.error("ALERTE : Les rôles ne correspondent pas !");
      return false;
    }
    return true;
  }
  return false;
};