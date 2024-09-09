<template>
  <div class="w-full max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
    <form @submit.prevent="submitForm" class="space-y-4">
      <div>
        <label for="startDate" class="block text-sm font-medium text-gray-700">Start Date</label>
        <input type="date" v-model="startDate" id="startDate" required
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          @change="updateEndDateConstraints">
      </div>
      <div>
        <label for="endDate" class="block text-sm font-medium text-gray-700">End Date</label>
        <input type="date" v-model="endDate" id="endDate" required
          :min="minEndDate"
          :max="maxEndDate"
          :disabled="!startDate"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          @change="validateEndDate">
        <p v-if="endDateError" class="text-red-500 text-sm mt-1">{{ endDateError }}</p>
      </div>
      <button type="submit" :disabled="isSubmitDisabled"
        class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-focus-ring">
        Submit
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      startDate: '',
      endDate: '',
      endDateError: ''
    };
  },
  computed: {
    minEndDate() {
      if (!this.startDate) return '';
      const start = new Date(this.startDate);
      return start.toISOString().split('T')[0];
    },
    maxEndDate() {
      if (!this.startDate) return '';
      const start = new Date(this.startDate);
      const maxEnd = new Date(start);
      maxEnd.setDate(start.getDate() + 7);
      return maxEnd.toISOString().split('T')[0];
    },
    isSubmitDisabled() {
      return !!this.endDateError;
    }
  },
  methods: {
    updateEndDateConstraints() {
      // This will update min and max end date constraints based on the selected start date
      this.$nextTick(() => {
        this.validateEndDate();
      });
    },
    validateEndDate() {
      if (this.endDate && this.startDate) {
        const start = new Date(this.startDate);
        const end = new Date(this.endDate);
        const maxEnd = new Date(start);
        maxEnd.setDate(start.getDate() + 7);

        if (end < start) {
          this.endDateError = `End date must be greater than or equal to the start date.`;
        } else if (end > maxEnd) {
          this.endDateError = `End date cannot be more than 7 days after the start date.`;
        } else {
          this.endDateError = '';
        }
      }
    },
    submitForm() {
      if (!this.endDateError) {
        this.$emit('fetch-stats', {
          startDate: this.startDate,
          endDate: this.endDate
        });
      }
    }
  }
};
</script>

<style scoped>
/* Tailwind CSS */
button {
  outline: none; /* Removes the outline */
  border: none; /* Removes border */
}

/* Tailwind focus ring */
button:focus {
  outline: none; /* Ensures outline is removed on focus */
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5); /* Adds a custom focus ring */
}
</style>
