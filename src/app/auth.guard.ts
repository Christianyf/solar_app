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
    const token = localStorage.getItem('authToken'); // Verifica si el token está presente
    if (token) {
      return true; // Permite el acceso
    } else {
      this.router.navigate(['/login']); // Redirige a la página de login
      return false;
    }
  }
}


