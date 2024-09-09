<template>
  <div class="w-full max-w-lg mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Asteroid Stats</h2>
    <div class="space-y-2">
      <p><strong>Fastest Asteroid:</strong> ID {{ stats.fastestAsteroid.id }} - {{ stats.fastestAsteroid.speed }} km/h</p>
      <p><strong>Closest Asteroid:</strong> ID {{ stats.closestAsteroid.id }} - {{ stats.closestAsteroid.distance }} km</p>
      <p><strong>Average Size:</strong> {{ stats.averageSize }} km</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    stats: {
      type: Object,
      required: true
    }
  }
};
</script>
