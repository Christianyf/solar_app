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
  temperaturaNodo = 10;
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
            labels: ['-60 min', '-45 min', '-30 min', '-15 min', 'Ahora'], // Etiquetas del eje X
            datasets: [
              {
                label: 'Irradiancia',
                data: [100, 200, 300, 400, 500], // Datos de irradiancia (eje Y)
                borderColor: 'blue',
                fill: false,
                cubicInterpolationMode: 'monotone',
                tension: 0.4
              },
              {
                label: 'Potencia',
                data: [50, 150, 250, 350, 450], // Datos de potencia (eje Y)
                borderColor: 'green',
                fill: false,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false, // Permite adaptar el gráfico al contenedor
            plugins: {
              legend: {
                display: true,
              },
              title: {
                display: true,
                text: 'Irradiancia vs Potencia'
              },
            },
            interaction: {
              intersect: false,
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Tiempo',
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Valor',
                },
                beginAtZero: true, // Asegura que el gráfico comience desde 0
                suggestedMin: 0,
                suggestedMax: 600, // Ajustado al rango máximo esperado
              }
            }
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