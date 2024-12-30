import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  // Lista de usuarios
  users: { username: string; role: string }[] = [
    { username: 'admin', role: 'administrador' },
    { username: 'user1', role: 'usuario' },
  ];

  // Objeto para nuevo usuario
  newUser: { username: string; role: string } = { username: '', role: 'usuario' };

  // Datos históricos simulados
  historicalData: { date: string; data: string }[] = [
    { date: '2024-12-25 14:00', data: 'Irradiancia: 1234, Temperatura: 25°C' },
    { date: '2024-12-25 15:00', data: 'Irradiancia: 1200, Temperatura: 24°C' },
  ];

  constructor() {}

  ngOnInit() {}

  // Método para agregar un usuario
  addUser() {
    if (this.newUser.username.trim()) {
      this.users.push({ ...this.newUser });
      this.newUser = { username: '', role: 'usuario' }; // Resetear el formulario
    } else {
      console.error('El nombre de usuario no puede estar vacío.');
    }
  }

  // Método para eliminar un usuario
  removeUser(index: number) {
    this.users.splice(index, 1);
  }
}
