<template>
  <div id="app" class="min-h-screen bg-gray-100 flex flex-col items-center p-4">
    <h1 class="text-4xl font-bold text-gray-800 mb-8">Asteroid Neo Stats</h1>
    <NeoStatsForm @fetch-stats="getNeoStats" />
    <NeoStatsDisplay :stats="neoStats" v-if="neoStats" />
    <NeoChart :chartData="chartData" :key="chartKey" v-if="chartData" />
  </div>
</template>

<script>
import NeoStatsForm from './components/NeoStatsForm.vue';
import NeoStatsDisplay from './components/NeoStatsDisplay.vue';
import NeoChart from './components/NeoChart.vue';
import axios from 'axios';

export default {
  components: {
    NeoStatsForm,
    NeoStatsDisplay,
    NeoChart
  },
  data() {
    return {
      neoStats: null,
      chartData: null,
      chartKey: 0 // key property to force chart re-render
    };
  },
  methods: {
    async getNeoStats({ startDate, endDate }) {
      const apiKey = '1NDYCuhrp3xrBfhyQQaY5HgeiOyaQQ46AYYOl7vY'; // Replace with your NASA API key
      const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;
      
      try {
        const response = await axios.get(url);
        const neoData = response.data.near_earth_objects;
        this.processNeoData(neoData);
        this.chartKey += 1; // Increment the key to force re-rendering of the chart
      } catch (error) {
        console.error('Error fetching Neo data:', error);
      }
    },
    processNeoData(neoData) {
      let fastestAsteroid = { speed: 0 };
      let closestAsteroid = { distance: Infinity };
      let totalSize = 0;
      let totalCount = 0;
      let dailyCount = {};

      for (let date in neoData) {
        const asteroids = neoData[date];
        dailyCount[date] = asteroids.length;

        asteroids.forEach(asteroid => {
          const speed = parseFloat(asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour);
          const distance = parseFloat(asteroid.close_approach_data[0].miss_distance.kilometers);
          const size = (parseFloat(asteroid.estimated_diameter.kilometers.estimated_diameter_min) +
                        parseFloat(asteroid.estimated_diameter.kilometers.estimated_diameter_max)) / 2;

          if (speed > fastestAsteroid.speed) {
            fastestAsteroid = { id: asteroid.id, speed };
          }

          if (distance < closestAsteroid.distance) {
            closestAsteroid = { id: asteroid.id, distance };
          }

          totalSize += size;
          totalCount++;
        });
      }

      this.neoStats = {
        fastestAsteroid,
        closestAsteroid,
        averageSize: (totalSize / totalCount).toFixed(2)
      };

      this.chartData = {
        labels: Object.keys(dailyCount),
        datasets: [
          {
            label: 'Number of Asteroids',
            backgroundColor: '#f87979',
            data: Object.values(dailyCount)
          }
        ]
      };
    }
  }
};
</script>

<style>
#app {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
