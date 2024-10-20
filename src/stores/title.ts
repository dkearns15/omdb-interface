import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type Title from "@/types/title";

export const useTitleStore = defineStore('title', () => {
  const selectedTitle = ref<Title|null>(null)

  const titles = ref<Array<Title>>([])

  const filteredTitles = computed(() => {
    if (!titles.value) {
      return []
    }
    return titles.value
      .filter((title) => {
        if (pagination.value.currentFilters.minYears) {
          return title.Year >= pagination.value.currentFilters.minYears
        }
        return true
      })
      .filter((title) => {
        if (pagination.value.currentFilters.maxYears) {
          return title.Year <= pagination.value.currentFilters.maxYears
        }
        return true
      })
  })

  function init() {
    pagination.value.currentPage = 1
    pagination.value.currentFilters = {
      "search": "Star",
      "type": null
    }
  }

  const pagination = ref({
    currentPage: 1,
    total: 1,
    perPage: 10, // we could compute this, as it may change in the future
    currentFilters: {}
  })

  const hasFinishedPagination = computed(() => {
    return (pagination.value.currentPage * pagination.value.perPage) > pagination.value.total;
  })

  async function search(filters: any) {
    const result = await fetch(`https://www.omdbapi.com/?apikey={apiKeyHere}&s=${filters.search}&type=${filters.type}`)
    if (filters.page) {
      pagination.value.currentPage = filters.page
    }
    const json = await result.json()
    pagination.value.total = json.totalResults
    pagination.value.currentPage = 1
    pagination.value.currentFilters = filters
    titles.value = json.Search
  }

  const loadingNextPage = ref(false)
  async function loadNextPage() {
    if (loadingNextPage.value) {
      return
    }
    loadingNextPage.value = true
    const result = await fetch(`https://www.omdbapi.com/?apikey={apiKeyHere}&s=${pagination.value.currentFilters.search}&type=${pagination.value.currentFilters.type}&page=${++pagination.value.currentPage}`)
    const json = await result.json()
    pagination.value.total = json.totalResults
    titles.value.push(...json.Search)
    loadingNextPage.value = false
  }

  async function fetchTitleById(id: string, fallbackData: Title|null = null) {
    if (fallbackData) {
      selectedTitle.value = fallbackData
    }
    const result = await fetch("https://www.omdbapi.com/?apikey={apiKeyHere}&i=" + id)
    const json = await result.json()
    selectedTitle.value = json
  }

  return { selectedTitle, pagination, hasFinishedPagination, titles, init, search, loadNextPage, fetchTitleById, filteredTitles }
})
