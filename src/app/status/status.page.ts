import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-estatus',
  templateUrl: './status.page.html',
  styleUrls: ['./status.page.scss'],
})
export class StatusPage implements OnInit {
  // Datos simulados (deben provenir del backend)
  estadosBooleanos = [
    { nombre: 'Conexión de batería', valor: true },
    { nombre: 'Conexión de inverter', valor: false },
    { nombre: 'Conexión ESP32', valor: true },
    { nombre: 'Estado conversor', valor: true },
    { nombre: 'Estado cargador', valor: true },
    { nombre: 'Timeout', valor: false },
  ];
  estadoGeneral = 'On Grid';

  // Datos para gráficos (simulados)
  irradiancia24h = Array(24).fill(0).map(() => Math.random() * 500);
  potencia24h = Array(24).fill(0).map(() => Math.random() * 450);
  temperaturasPanel1 = Array(24).fill(0).map(() => 25 + Math.random() * 10);
  temperaturasPanel2 = Array(24).fill(0).map(() => 23 + Math.random() * 10);
  temperaturasNodo = Array(24).fill(0).map(() => 20 + Math.random() * 5);

  constructor() {}

  ngOnInit() {
    this.crearGrafico('irradiancia24hChart', this.irradiancia24h, 'Irradiancia (W/m²)');
    this.crearGrafico('potencia24hChart', this.potencia24h, 'Potencia (W)');
    this.crearGrafico('tempPanel1Chart', this.temperaturasPanel1, 'Temperatura Panel 1 (°C)');
    this.crearGrafico('tempPanel2Chart', this.temperaturasPanel2, 'Temperatura Panel 2 (°C)');
    this.crearGrafico('tempNodoChart', this.temperaturasNodo, 'Temperatura Nodo (°C)');
  }

  crearGrafico(canvasId: string, data: number[], label: string) {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement | null;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: Array.from({ length: 24 }, (_, i) => `${i}h`), // Etiquetas de horas
            datasets: [
              {
                label,
                data,
                borderColor: 'blue',
                fill: false,
                cubicInterpolationMode: 'monotone',
                tension: 0.4,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: true },
              title: { display: true, text: label },
            },
            scales: {
              x: { title: { display: true, text: 'Hora' } },
              y: { title: { display: true, text: label }, beginAtZero: true },
            },
          },
        });
      }
    }
  }
}

