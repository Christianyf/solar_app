import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { RemoteServicesService } from '../remote-services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  temperaturaPanel1!: number;
  temperaturaPanel2!: number;
  temperaturaNodo!: number;
  bateriaNivel!: number;
  rssiValor!: number;
  estadosBooleanos!: any[];
  estadoGeneral!: string;
  irradianciaData!: number[];
  potenciaData!: number[];

  constructor(private remoteService: RemoteServicesService) {}

  ngOnInit() {
    this.remoteService.getHomeData().subscribe((data) => {
      this.temperaturaPanel1 = data.temperaturaPanel1;
      this.temperaturaPanel2 = data.temperaturaPanel2;
      this.temperaturaNodo = data.temperaturaNodo;
      this.bateriaNivel = data.bateriaNivel;
      this.rssiValor = data.rssiValor;
      this.estadosBooleanos = data.estadosBooleanos;
      this.estadoGeneral = data.estadoGeneral;
      this.irradianciaData = data.irradianciaData;
      this.potenciaData = data.potenciaData;
      this.crearGrafico();
    });
  }

  getRssiStyle(rssi: number) {
    if (rssi > -50) {
      return { backgroundColor: 'green' }; // Señal fuerte
    } else if (rssi > -70) {
      return { backgroundColor: 'yellow' }; // Señal media
    } else {
      return { backgroundColor: 'red' }; // Señal débil
    }
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