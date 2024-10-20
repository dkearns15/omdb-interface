<script setup lang="ts">
import { defineProps } from "vue";

interface Option {
  value: string,
  label: string
}
const { options, label, direction = 'row' } = defineProps<{ options: Array<Option>, label: string, direction: string }>()

const model = defineModel()
</script>

<template>
  <div class="flex flex-col">
    <span class="font-semibold mt-2">{{ label }}</span>
    <div class="flex" :class="direction === 'row' ? 'flex-row' : 'flex-col'">
      <div v-for="(option, index) in options" :key="index" :class="direction === 'row' ? 'first:ml-0 last:mr-0 mx-2' : ''">
        <input class="mr-1" type="radio" v-model="model" :value="option.value" :id="option.value">
        <label :for="option.value">{{ option.label }}</label>
      </div>
    </div>
  </div>
  <div>

  </div>
</template>
