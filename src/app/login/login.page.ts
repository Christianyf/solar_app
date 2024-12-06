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
  
  constructor(private remoteService: RemoteServicesService, private router: Router) { }

  login(){

    this.remoteService.login(this.username, this.password).subscribe(

      (response) => {
        console.log('Acceso correcto:',response);
        localStorage.setItem('authToken', response.token);//guarda el token, no se si es necesario
        this.router.navigate(['/tabs']);// redirige al área principal
      },
      (error) => {
        console.error('Acceso incorrecto:', error);
        this.errorMessage = 'Credenciales incorrectas. Intenta de nuevo';
      }

    );

  }

  ngOnInit() {
  }

}
