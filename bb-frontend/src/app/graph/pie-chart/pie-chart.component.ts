import { Component, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
})
export class PieChartComponent {
  constructor() {}

  ngOnInit(): void {
    Chart.register(...registerables);
  }

  public chartData: any[] = [];
  public chart: any;

  public updateChart(newData: any[]) {
    this.chartData = newData;
    this.createChart(); // Call createChart after updating chartData
  }

  createChart() {
    if (this.chart) {
      // Destroy the existing chart to release the canvas
      this.chart.destroy();
    }
    if (this.chartData.length === 0) {
      // Handle the case where chartData is empty
      console.log('No data to create the chart.');
      return;
    }

    // Extract labels and data from chartData
    const labels = this.chartData.map((item) => item.label);
    const data = this.chartData.map((item) => item.data);

    this.chart = new Chart('MyChart', {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Expenses',
            data: data,
            backgroundColor: this.generateColors(labels.length),
          },
        ],
      },
      options: { aspectRatio: 0.5 },
    });
  }

  generateColors(numColors: number) {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      // Generate a random color
      const color =
        `rgb(` +
        Math.floor(Math.random() * 256) +
        `, ` +
        Math.floor(Math.random() * 256) +
        `, ` +
        Math.floor(Math.random() * 256) +
        `)`;
      colors.push(color);
    }
    return colors;
  }
}
