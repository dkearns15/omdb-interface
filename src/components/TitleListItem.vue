<script setup lang="ts">
import { defineProps } from 'vue';
import Title from "@/types/title";
import {useTitleStore} from "@/stores/title";
const { fetchTitleById } = useTitleStore()

const { title } = defineProps<{ title: Title }>()
</script>

<template>
  <li
    @click="() => { fetchTitleById(title.imdbID, title) }"
    class="flex flex-row h-24 p-4 cursor-pointer">
    <img :src="title.Poster" class="h-16 w-16 min-w-16 min-h-16 object-cover rounded-lg mr-4" :alt="`${title.Title} poster`"/>
    <div class="flex flex-col">
      <span class="line-clamp-2 flex-shrink-0 text-ellipsis">{{ title.Title }}</span>
      <span>{{ title.Year }}</span>
    </div>
  </li>
</template>
