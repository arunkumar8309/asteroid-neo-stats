<template>
  <div class="neo-chart-container p-4 bg-white shadow-lg rounded-lg mt-8">
    <canvas id="neoChart"></canvas>
  </div>
</template>

<script>
import { LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Chart } from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip);

export default {
  props: ['chartData', 'fastestAsteroid', 'closestAsteroid'],
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      const ctx = document.getElementById('neoChart').getContext('2d');
      new Chart(ctx, {
        type: 'line',  // Ensure this matches the controller you registered
        data: this.chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,  // Allow height and width control
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Number of Asteroids Per Day',
            },
            tooltip: {
              enabled: true, // This enables the tooltips
              mode: 'index', // Display all points on the same index
              intersect: false, // Display tooltips even if the mouse is not directly over a point
              callbacks: {
                label: (context) => {
                  const label = context.dataset.label || '';
                  const value = context.raw;
                  return `${label}: ${value}`;
                },
                afterBody: () => {
                  if (this.fastestAsteroid && this.closestAsteroid) {
                    return [
                      `Fastest Asteroid: ID ${this.fastestAsteroid.id} - ${this.fastestAsteroid.speed} km/h`,
                      `Closest Asteroid: ID ${this.closestAsteroid.id} - ${this.closestAsteroid.distance} km`
                    ];
                  }
                  return [];
                }
              }
            }
          },
          hover: {
            mode: 'nearest',
            intersect: true
          }
        },
      });
    }
  }
};
</script>

<style scoped>
.neo-chart-container {
  width: 100%; /* Full width by default */
  max-width: 500px; /* Fixed card width */
  height: 400px;
  margin: 0 auto;
  margin-top: 32px; /* Adds a top margin */
}
</style>
