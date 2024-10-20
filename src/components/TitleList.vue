<script setup lang="ts">
import {defineProps, watch} from 'vue';
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
    return;
  }

  if (scrollBottom >= scrollHeight - 200) {
    // If the bottom is reached, load more items
    loadNextPage()
  }
}

watch(titles.length, (oldValue, newValue) => {
  console.log(oldValue, newValue)
  if (oldValue < newValue) {
    checkForLoadMore()
  }
})

</script>

<template>
  <ul v-if="titles && titles.length > 0" class="divide-y divide-gray-300 overflow-y-scroll h-full flex flex-col justify-start"
      @scroll="checkForLoadMore"
      @resize="checkForLoadMore">
    <li class="sticky top-0 bg-white px-4">
      Showing 1 to {{ pagination.total < (pagination.perPage * pagination.currentPage) ? pagination.total : pagination.currentPage * pagination.perPage }} of {{ pagination.total }}
    </li>
    <TitleListItem v-for="title in titles" :key="title.imdbID" :title="title"/>
    <li v-if="hasFinishedPagination" class="text-center px-4 bg-white pt-2">End of results</li>
    <li v-else class="text-center px-4 bg-white pt-2"><span class="loader"></span></li>
  </ul>
  <div v-else class="flex flex-row justify-center items-center overflow-y-scroll">
    No results
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
