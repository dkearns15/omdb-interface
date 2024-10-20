<script setup lang="ts">
import {defineProps} from 'vue';
import Title from "@/types/title";
import TitleListItem from "@/components/TitleListItem.vue";
import {useTitleStore} from "@/stores/title";
import {storeToRefs} from "pinia";

const { loadNextPage } = useTitleStore()
const { pagination, hasFinishedPagination, searching } = storeToRefs(useTitleStore())

const { titles } = defineProps<{ titles: Array<Title> }>()
</script>

<template>
  <div class="relative overflow-hidden h-full">
    <ul v-if="titles && titles.length > 0" class="divide-y divide-gray-300 overflow-y-scroll h-full flex flex-col justify-start">
      <li class="sticky top-0 bg-white px-4">
        Loaded 1 to {{ pagination.total < (pagination.perPage * pagination.currentPage) ? pagination.total : pagination.currentPage * pagination.perPage }} of {{ pagination.total }}
        <span><br/>Showing {{ titles.length }} titles</span>
      </li>
      <TitleListItem v-for="title in titles" :key="title.imdbID" :title="title"/>
      <li v-if="hasFinishedPagination" class="text-center px-4 bg-white pt-2">End of results</li>
      <li v-else class="text-center px-4 bg-white py-2"><button @click="loadNextPage" class="underline">Load more results</button></li>
    </ul>
    <div v-else class="flex flex-row justify-center items-center overflow-y-scroll h-full w-full">
      No results
    </div>
    <div v-if="searching" class="absolute h-full w-full bg-gray-600/75 z-10 left-0 top-0 flex justify-center items-center">
      <span class="loader"></span>
    </div>
  </div>
</template>

<style scoped lang="css">
.loader {
  width: 24px;
  height: 24px;
  border: 3px solid #000;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
