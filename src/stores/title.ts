import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type Title from "@/types/title";

export const useTitleStore = defineStore('title', () => {
  const baseUrl = `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}`

  const selectedTitle = ref<Title|null>(null)

  const searching = ref(false)

  const titles = ref<Array<Title>>([])

  const filteredTitles = computed(() => {
    if (!titles.value) {
      return []
    }
    return titles.value
      .filter((title) => {
        if (!pagination.value.currentFilters.minYears) {
          return true
        }
        return title.StartYear >= pagination.value.currentFilters.minYears
      })
      .filter((title) => {
        if (!pagination.value.currentFilters.maxYears) {
          return true
        }
        return title.EndYear <= pagination.value.currentFilters.maxYears
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
    searching.value = true
    const result = await fetch(`${baseUrl}&s=${filters.search}&type=${filters.type}`)
    if (filters.page) {
      pagination.value.currentPage = filters.page
    }
    const json = await result.json()
    pagination.value.total = json.totalResults
    pagination.value.currentPage = 1
    pagination.value.currentFilters = filters
    titles.value = json.Search.map(element => {
      if (element.Year.length === 4) {
        element.StartYear = element.Year
        element.EndYear = element.Year
        return element
      }
      const years = element.Year.split('–')
      element.StartYear = years[0]
      element.EndYear = years.length > 1 ? years[1] : "3000" // handles ongoing series, sorry to the developer maintaining this in the year 3000
      return element
    })
    searching.value = false
  }

  const loadingNextPage = ref(false)
  async function loadNextPage() {
    if (loadingNextPage.value) {
      return
    }
    loadingNextPage.value = true
    const result = await fetch(`${baseUrl}&s=${pagination.value.currentFilters.search}&type=${pagination.value.currentFilters.type}&page=${++pagination.value.currentPage}`)
    const json = await result.json()
    pagination.value.total = json.totalResults
    titles.value.push(...json.Search.map(element => {
      if (element.Year.length === 4) {
        element.StartYear = element.Year
        element.EndYear = element.Year
        return element
      }
      const years = element.Year.split('–')
      element.StartYear = years[0]
      element.EndYear = years.length > 1 ? years[1] : "3000" // handles ongoing series, sorry to the developer maintaining this in the year 3000
      return element
    }))
    loadingNextPage.value = false
  }

  async function fetchTitleById(id: string, fallbackData: Title|null = null) {
    if (fallbackData) {
      selectedTitle.value = fallbackData
    }
    const result = await fetch(`${baseUrl}&i=${id}`)
    const json = await result.json()
    selectedTitle.value = json
  }

  return { selectedTitle, pagination, hasFinishedPagination, titles, init, search, loadNextPage, fetchTitleById, filteredTitles, searching }
})
