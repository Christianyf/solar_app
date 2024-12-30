/* import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  return true;
}; */
//Actualmente no se está usando
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const role = localStorage.getItem('userRole'); // Verifica si el rol de usuario es correcto
    if (role == 'admin') {
      return true; // Permite el acceso
    } else {
      this.router.navigate(['/login']); // Redirige a la página de login
      return false;
    }
  }
}


