<script setup lang="ts">
import {computed, onMounted, ref, watch} from "vue";
import {useTitleStore} from "@/stores/title";
import RadioInput from "@/components/inputs/RadioInput.vue";
const { search, init } = useTitleStore()

const years = ref([1888, 2024])
const type = ref('any')
const searchModel = ref('')

const allFilters = computed(() => {
  return {
    minYears: years.value[0],
    maxYears: years.value[1],
    type: type.value,
    search: searchModel.value
  }
})

function callSearch() {
  console.log('calling')
  search(allFilters.value)
}

const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
}

watch(allFilters, debounce(callSearch, 300))


onMounted(() => {
  init()
})

</script>

<template>
  <div class="bg-gray-400 w-full h-24 flex flex-row rounded-t-lg justify-between px-4">
    <div class="flex flex-row grow">
      <img src="@/assets/OMDB_Logo.png" class="my-4 mr-2" />
      <div class="flex flex-row grow items-center">
        <label for="search" class="mr-2 cursor-pointer">
          <img src="@/assets/search.svg"/>
        </label>
        <input
          v-model="searchModel"
          id="search"
          type="text"
          placeholder="Search for a movie"
          class="bg-gray-400 px-2 grow border-b border-b-1 border-black h-12 text-lg placeholder-gray-600"
        >
      </div>
    </div>

    <!--  filters    -->
    <div class="flex flex-row items-center flex-shrink-0">
      <!--   year slider     -->
      <div class="flex flex-col mx-8">
        <label for="year">Year</label>
        <div class="flex flex-row items-center w-48">
          <span>{{ years[0] }}</span>
          <div class="w-48 flex-row items-center ml-2 mr-3">
            <!-- apparently the first movie was made in 1888, I could fact check this beyond a quick google search, but... -->

            <vue-slider v-model="years"
                        id="year"
                        class="w-48"
                        tooltip="none"
                        :min="1888"
                        :max="2024"
            />
          </div>
          <span>{{ years[1] }}</span>

        </div>
      </div>

      <RadioInput :options="[
        { value: 'any', label: 'Any' },
        { value: 'movie', label: 'Movie' },
        { value: 'series', label: 'Series' },
        { value: 'episodes', label: 'Episodes' },
      ]" label="Type" v-model="type" />
    </div>
  </div>
</template>

<style>
.vue-slider-rail {
  @apply bg-gray-200
}
.vue-slider-process {
  @apply bg-gray-500
}
</style>
