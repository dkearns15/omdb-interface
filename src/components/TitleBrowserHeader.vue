<script setup lang="ts">
import {computed, ref, watch} from "vue";
import {useTitleStore} from "@/stores/title";
import RadioInput from "@/components/inputs/RadioInput.vue";
import {useIsMobile} from "@/utils/isMobile";
const { search } = useTitleStore()

const years = ref([1888, 2024])
const type = ref(null)
const searchModel = ref('')

const showFilters = ref(false)
function toggleShowFilters() {
  showFilters.value = !showFilters.value
}

const allFilters = computed(() => {
  return {
    minYears: years.value[0],
    maxYears: years.value[1],
    type: type.value,
    search: searchModel.value
  }
})

function callSearch() {
  // api will return 'too many results' when search term is not provided or is too short. Pretty disappointing if you really want to look up IT
  if (!allFilters.value.search || allFilters.value.search.length < 3) {
    return
  }
  search(allFilters.value)
}

const debounce = (callback: Function, wait: number) => {
  let timeoutId: null|number = null;
  return (...args: any[]) => {
    if (timeoutId !== null) {
      window.clearTimeout(timeoutId);
    }
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
}

watch(allFilters, debounce(callSearch, 300), { deep: true })

// removed episodes as it was in design, but not in brief, and is not supported by OMDBapi
const radioOptions = [
  { value: null, label: 'Any' },
  { value: 'movie', label: 'Movie' },
  { value: 'series', label: 'Series' },
]

const { isMobile } = useIsMobile()

</script>

<template>
  <div class="bg-gray-400 w-full h-24 flex flex-row rounded-t-lg justify-between px-4">
    <div class="flex flex-row justify-between w-full">
      <div class="flex flex-row justify-start items-center">
        <img src="@/assets/OMDB_Logo.png" class="my-4 mr-2 h-6 sm:h-12 md:h-3/4" alt="OMDB Logo" />
        <div class="flex flex-row items-center">
          <label for="search" class="mr-2 cursor-pointer">
            <img src="@/assets/search.svg" alt="Search icon"/>
          </label>
          <input
            v-model="searchModel"
            id="search"
            type="text"
            placeholder="Search"
            class="bg-gray-400 px-2 border-b border-b-1 border-black h-12 text-lg placeholder-gray-600 max-w-40 sm:max-w-3xl"
          >
        </div>
      </div>
      <div class="flex flex-row justify-end items-center">
        <button class="block lg:hidden w-10 h-10 flex-shrink-0" @click="toggleShowFilters"><img src="@/assets/filter.svg" class="h-6" alt="Filter icon"></button>
      </div>
    </div>

    <!--  filters    -->
    <Teleport defer :to="isMobile ? '#filter-drawer' : '#filter-header'">
      <div class="flex flex-col" :class="!isMobile ? 'mx-8' : ''">
        <label for="year" class="font-semibold mt-2">Year</label>
        <div class="flex flex-row items-center w-48">
          <span>{{ years[0] }}</span>
          <div class="w-48 flex-row items-center mx-3">
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
      <RadioInput
        :direction="isMobile ? 'col' : 'row'"
        :options="radioOptions"
        label="Type"
        v-model="type" />
    </Teleport>

    <div class="hidden lg:flex flex-row items-center flex-shrink-0" id="filter-header"/>

    <div class="flex flex-col lg:hidden fixed top-0 h-screen w-[70vw] bg-gray-100 transition-all duration-500 z-40 p-10" :class="showFilters ? 'right-0' : '-right-[70vw]'">
      <h2 class="text-2xl text-black font-bold">Filters</h2>
      <div id="filter-drawer"/>
    </div>
    <div class="absolute lg:hidden h-screen w-screen bg-gray-700/75 z-30 top-0 left-0" v-if="showFilters" @click="toggleShowFilters"/>

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
