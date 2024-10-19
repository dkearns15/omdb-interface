<script setup lang="ts">
import { defineProps } from 'vue';
import Title from "@/types/title";

const { title } = defineProps<{ title: Title }>()
</script>

<template>
  <div class="flex flex-row">
    <div>
      <img v-if="title.Poster" :src="title.Poster"/>
    </div>
    <div class="flex flex-col">
      <div class="flex flex-row justify-end">
        <button>Watchlist</button>
      </div>
      <h2>{{ title.Title }}</h2>
      <div class="flex flex-row">Rating etc</div>
      <div class="flex flex-row line-clamp-2">{{ title.Actors }}</div>
      <hr>
    </div>
  </div>
</template>
