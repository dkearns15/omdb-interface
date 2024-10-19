<script setup lang="ts">
import { onMounted, ref} from "vue";
import {useTitleStore} from "@/stores/title";
const { search } = useTitleStore()

const years = ref([1888, 2024])
const type = ref('any')


onMounted(() => {
  search()
})

</script>

<template>
  <div class="bg-gray-400 w-full h-24 flex flex-row rounded-lg justify-between">
    <div class="flex flex-row">
      <img src="@/assets/OMDB_Logo.png" class="my-4 mx-2" />
      <!--   search   -->
      <div>
        <label for="search"><img src="@/assets/search.svg"/></label>
        <input id="search" type="text" placeholder="Search for a movie">
      </div>
    </div>

    <!--  filters    -->
    <div class="flex flex-row">
      <!--   year slider     -->
      <div class="w-48">
        <!-- apparently the first movie was made in 1888, I could fact check this beyond a quick google search, but... -->
        <vue-slider v-model="years" class="w-48"
                    :min="1888"
                    :max="2024"
        />
      </div>
      <!-- radio -->
      <div>
        <input type="radio" v-model="type" value="any" id="any">
        <label for="any">Any</label>
        <input type="radio" v-model="type" value="movie" id="movie">
        <label for="movie">Movie</label>
        <input type="radio" v-model="type" value="series" id="series">
        <label for="series">Series</label>
        <input type="radio" v-model="type" value="episodes" id="episodes">
        <label for="episodes">Episodes</label>
      </div>
    </div>
  </div>
</template>
