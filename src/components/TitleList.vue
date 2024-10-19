<script setup lang="ts">
import { defineProps } from 'vue';
import Title from "@/types/title";
import TitleListItem from "@/components/TitleListItem.vue";

const { titles } = defineProps<{ titles: Array<Title> }>()
</script>

<template>
  <ul class="divide-y divide-gray-300 overflow-y-scroll h-full flex flex-col">
    <TitleListItem v-for="title in titles" :key="title.imdbID" :title="title"/>
  </ul>
</template>
