import { Component, OnInit } from '@angular/core';
import { RemoteServicesService } from '../remote-services.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;
  
  constructor(private remoteService: RemoteServicesService, private router: Router) { }

  login(event:Event){

  event.preventDefault();//Evitar la recarga de la página
  this.errorMessage = '';//Reinicia el mensaje de error

  // Verificar que los campos no estén vacíos
  if (!this.username || !this.password) {
    this.errorMessage = 'Por favor, completa todos los campos.';
    return;
  }

  // Reiniciar mensaje de error y mostrar indicador de carga
  this.errorMessage = '';
  this.isLoading = true;

    this.remoteService.login(this.username, this.password).subscribe({
      next: (response) =>{
        localStorage.setItem('authToken', response.token);
        this.router.navigate(['/tabs']);
      },
      error: (error) =>{
        this.errorMessage = 'Credenciales incorrectas';
      },
      complete: () =>{
        console.log('Proceso de autenticación completado')
      },
      
    });

  }

  ngOnInit() {
  }

}
