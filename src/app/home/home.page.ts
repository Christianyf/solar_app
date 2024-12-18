import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  // Datos simulados (estos deben venir del backend)
  temperaturaPanel1 = 30;
  temperaturaPanel2 = 28;
  temperaturaNodo = 35;
  bateriaNivel = 75; // En porcentaje
  rssiValor = -60; // En dBm
  estadosBooleanos = [
    { nombre: 'Estado 1', valor: true },
    { nombre: 'Estado 2', valor: false },
    { nombre: 'Estado 3', valor: true },
    { nombre: 'Estado 4', valor: true },
    { nombre: 'Estado 5', valor: false },
    { nombre: 'Estado 6', valor: true },
  ];
  estadoGeneral = 'On Grid';

  // Datos para el gráfico
  irradianciaData = [100, 200, 300, 400, 500];
  potenciaData = [50, 150, 250, 350, 450];

  constructor() {}

  ngOnInit() {
    this.crearGrafico();
  }

  crearGrafico() {
    const canvas = document.getElementById('irradianciaPotenciaChart') as HTMLCanvasElement | null;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['-60 min', '-45 min', '-30 min', '-15 min', 'Ahora'],
            datasets: [
              {
                label: 'Irradiancia',
                data: this.irradianciaData,
                borderColor: 'blue',
                fill: false,
              },
              {
                label: 'Potencia',
                data: this.potenciaData,
                borderColor: 'green',
                fill: false,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: true,
              },
            },
          },
        });
      } else {
        console.error('No se pudo obtener el contexto del canvas.');
      }
    } else {
      console.error('No se encontró el elemento canvas con el ID "irradianciaPotenciaChart".');
    }
  }
}
