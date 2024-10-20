<script setup lang="ts">
import TitleDetails from "@/components/TitleDetails.vue";
import { useTitleStore } from "@/stores/title";
import TitleList from "@/components/TitleList.vue";
import {storeToRefs} from "pinia";
import TitleBrowserHeader from "@/components/TitleBrowserHeader.vue";
const { filteredTitles, selectedTitle } = storeToRefs(useTitleStore())

</script>
<template>
  <div class="grid grid-cols-5 w-full bg-white rounded-lg h-[95vh] overflow-hidden grid-rows-[min-content_auto]">
    <TitleBrowserHeader class="col-span-5 row-span-0" />
    <TitleList class="col-span-5 md:col-span-2" :titles="filteredTitles" />
    <div class="hidden md:block md:col-span-3" v-if="selectedTitle">
      <TitleDetails v-if="selectedTitle" :title="selectedTitle" />
    </div>
    <div class="hidden col-span-3 md:flex flex-col justify-center items-center" v-else>
      <div class="max-w-80 text-center">
        Search for your new favourite title. Select a title in the sidebar to view more details.
      </div>
    </div>
    <div class="block md:hidden fixed top-0 h-screen w-[80vw] bg-gray-100 transition-all duration-500 z-40" :class="selectedTitle ? 'right-0' : '-right-[80vw]'">
      <TitleDetails v-if="selectedTitle" :title="selectedTitle"/>
    </div>
    <div class="absolute md:hidden h-screen w-screen bg-gray-700/75 z-30 top-0 left-0" v-if="selectedTitle" @click="() => { selectedTitle = null}">
    </div>
  </div>
</template>
