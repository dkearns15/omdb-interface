<script setup lang="ts">
import { defineProps } from 'vue';
import Title from "@/types/title";
import {useWatchlistStore} from "@/stores/watchlist";
import {storeToRefs} from "pinia";
const { titleIsInWatchlist } = storeToRefs(useWatchlistStore())
const { addToWatchlist, removeFromWatchlist } = useWatchlistStore()

const { title } = defineProps<{ title: Title }>()
</script>

<template>
  <div class="flex flex-col divide-y divide-gray-300 p-8">
    <div class="flex flex-col pb-4">
      <div class="flex flex-row">
        <div>
          <img v-if="title.Poster" :src="title.Poster" class="rounded-lg max-h-96 flex-shrink-0" :alt="`${title.Title} poster`"/>
        </div>
        <div class="flex flex-col justify-between w-full pl-4">
          <div class="flex flex-row justify-end w-full">
            <button
              v-if="titleIsInWatchlist(title.imdbID)"
              class="border border-black rounded-md px-2"
              @click="() => { removeFromWatchlist(title.imdbID)}">
              <div class="flex flex-row items-center">Watchlisted <img class="h-5 w-5" src="@/assets/checkmark.svg" alt="Checkmark icon"></div>
            </button>
            <button
              v-else
              class="border border-black rounded-md px-2"
              @click="() => { addToWatchlist(title.imdbID)}">
              <div class="flex flex-row items-center">Watchlist <img class="h-5 w-5" src="@/assets/bookmark.svg" alt="Bookmark icon"></div>
            </button>
          </div>
          <div class="flex flex-col w-full">
            <h2 class="text-lg md:text-3xl font-bold mb-2">{{ title.Title }}</h2>
            <p class="hidden md:block mb-2 text-gray-700"><span class="rounded-md border border-black px-2 text-sm text-black">{{ title.Rated }}</span> {{ title.Year }} · {{ title.Genre }} · {{ title.Runtime }}</p>
            <p class="hidden md:flex flex-row line-clamp-2">{{ title.Actors }}</p>
          </div>
        </div>
      </div>
      <div class="flex flex-col w-full md:hidden mt-2">
        <p class="mb-2 text-gray-700"><span class="rounded-md border border-black px-2 text-sm text-black">{{ title.Rated }}</span> {{ title.Year }} · {{ title.Genre }} · {{ title.Runtime }}</p>
        <p class="flex flex-row line-clamp-2">{{ title.Actors }}</p>
      </div>
    </div>

    <div class="py-4">{{ title.Plot }}</div>
    <div class="py-4 w-full divide-x divide-gray-300 flex flex-row justify-between items-center">
      <div v-for="(rating, index) in title.Ratings" :key="index"
           class="flex flex-col justify-center items-center flex-grow basis-0 text-center">
        <span>{{ rating.Value }}</span>
        <span>{{ rating.Source }}</span>
      </div>
    </div>
  </div>
</template>
