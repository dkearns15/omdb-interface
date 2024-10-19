<script setup lang="ts">
import { defineProps } from 'vue';
import Title from "@/types/title";
import TitleListItem from "@/components/TitleListItem.vue";
import {useTitleStore} from "@/stores/title";
import {storeToRefs} from "pinia";

const { loadNextPage } = useTitleStore()
const { pagination, hasFinishedPagination } = storeToRefs(useTitleStore())

const { titles } = defineProps<{ titles: Array<Title> }>()

function checkForLoadMore(event) {
  const scrollContainer = event.target;

  // Calculate if the user has scrolled to the bottom
  const scrollBottom = scrollContainer.scrollTop + scrollContainer.clientHeight;
  const scrollHeight = scrollContainer.scrollHeight;

  if (hasFinishedPagination.value) {
    console.log('abandon ship', hasFinishedPagination.value)
    return;
  }

  if (scrollBottom >= scrollHeight - 200) {
    // If the bottom is reached, load more items
    loadNextPage()
  }
}

</script>

<template>
  <ul class="divide-y divide-gray-300 overflow-y-scroll h-full flex flex-col justify-start"
      @scroll="checkForLoadMore">
    <li class="sticky top-0 bg-white px-4">
      Showing 1 to {{ pagination.total < (pagination.perPage * pagination.currentPage) ? pagination.total : pagination.currentPage * pagination.perPage }} of {{ pagination.total }}
    </li>
    <TitleListItem v-for="title in titles" :key="title.imdbID" :title="title"/>
    <li class="text-center px-4 bg-white pt-2">End of results</li>
  </ul>
</template>
