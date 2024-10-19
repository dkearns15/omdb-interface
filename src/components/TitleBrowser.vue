<script setup lang="ts">
import { onMounted } from "vue";
import TitleDetails from "@/components/TitleDetails.vue";
import { useTitleStore } from "@/stores/title";
import TitleList from "@/components/TitleList.vue";
import {storeToRefs} from "pinia";
import TitleBrowserHeader from "@/components/TitleBrowserHeader.vue";
const { titles, selectedTitle } = storeToRefs(useTitleStore())

</script>
<template>
  <div class="grid grid-cols-3 w-full bg-white rounded-lg h-[95vh] overflow-hidden grid-rows-[min-content_auto]">
    <TitleBrowserHeader class="col-span-3 row-span-0" />
    <TitleList class="col-span-1" :titles="titles" />
    <div class="col-span-2" v-if="selectedTitle">
      <TitleDetails v-if="selectedTitle" :title="selectedTitle" />
    </div>
    <div class="col-span-2 flex flex-col justify-center items-center" v-else>
      <div class="max-w-80 text-center">
        <button class="underline">Search</button> for your new favourite movie. Select a movie in the sidebar to view more details.
      </div>
    </div>
  </div>
</template>
