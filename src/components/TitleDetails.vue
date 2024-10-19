<script setup lang="ts">
import { defineProps } from 'vue';
import Title from "@/types/title";

const { title } = defineProps<{ title: Title }>()
</script>

<template>
  <div class="flex flex-col divide-y divide-gray-300 p-8">
    <div class="pb-4 flex flex-row">
      <div>
        <img v-if="title.Poster" :src="title.Poster" class="rounded-lg max-h-96 flex-shrink-0"/>
      </div>
      <div class="flex flex-col justify-between w-full pl-4">
        <div class="flex flex-row justify-end w-full">
          <button>Watchlist</button>
        </div>
        <div class="flex flex-col w-full">
          <h2 class="text-3xl font-bold mb-2">{{ title.Title }}</h2>
          <p class="mb-2 text-gray-700"><span class="rounded-md border border-black px-2 text-sm text-black">{{ title.Rated }}</span> {{ title.Year }} · {{ title.Genre }} · {{ title.Runtime }}</p>
          <p class="flex flex-row line-clamp-2">{{ title.Actors }}</p>
        </div>
      </div>
    </div>
    <div class="py-4">{{ title.Plot }}</div>
    <div class="py-4 w-full divide-x divide-gray-300 flex flex-row justify-between items-center">
      <div v-for="(rating, index) in title.Ratings" :key="index"
           class="flex flex-col justify-center items-center flex-grow basis-0">
        <span>{{ rating.Value }}</span>
        <span>{{ rating.Source }}</span>
      </div>
    </div>
  </div>
</template>
