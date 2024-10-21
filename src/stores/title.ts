import {computed, ref} from 'vue'
import {defineStore} from 'pinia'
import type Title from "@/types/title";
import type OmdbTitle from "@/types/OmdbTitle";

type Filters = { search: string|null, type: string|null, page?: number, maxYears: number, minYears: number }

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
        return Number(title.StartYear) >= pagination.value.currentFilters.minYears
      })
      .filter((title) => {
        if (!pagination.value.currentFilters.maxYears) {
          return true
        }
        return Number(title.EndYear) <= pagination.value.currentFilters.maxYears
      })
  })

  const pagination = ref({
    currentPage: 1,
    total: 1,
    perPage: 10, // we could compute this, as it may change in the future
    currentFilters: {
      search: null,
      type: null,
      page: 1,
      maxYears: 2024,
      minYears: 1888
    } as Filters
  })

  const hasFinishedPagination = computed(() => {
    return (pagination.value.currentPage * pagination.value.perPage) > pagination.value.total;
  })

  function transformOmdbResponse(titles: Array<OmdbTitle>): Array<Title> {
    return titles.map(element => {
      if (element.Year.length === 4) {
        return {...element, StartYear: element.Year, EndYear: element.Year}
      }
      const years = element.Year.split('–')
      let startYear = years[0]
      let endYear = years.length > 1 ? years[1] : "3000" // handles ongoing series, sorry to the developer maintaining this in the year 3000
      return {...element, StartYear: startYear, EndYear: endYear}
    })
  }

  async function search(filters: Filters) {
    searching.value = true
    filters.search = filters.search?.trim() ?? null
    const result = await fetch(`${baseUrl}&s=${filters.search}&type=${filters.type}`)
      .catch((error) => {
        // capture error
        alert("Something went wrong, please try again later")
        searching.value = false
        return
      })
    const json = await result.json()
    if (json.Error) {
      searching.value = false
      return
    }

    pagination.value.total = json.totalResults
    pagination.value.currentPage = 1
    pagination.value.currentFilters = filters

    titles.value = transformOmdbResponse(json.Search)
    searching.value = false
  }

  const loadingNextPage = ref(false)
  async function loadNextPage() {
    if (loadingNextPage.value) {
      return
    }
    loadingNextPage.value = true
    ++pagination.value.currentPage
    const result = await fetch(`${baseUrl}&s=${pagination.value.currentFilters.search}&type=${pagination.value.currentFilters.type}&page=${pagination.value.currentPage}`)
      .catch((error) => {
        // capture error
        alert("Something went wrong, please try again later")
        loadingNextPage.value = false
        return
      })
    const json = await result.json()
    if (json.Error) {
      loadingNextPage.value = false
      return
    }

    titles.value.push(...transformOmdbResponse(json.Search))

    loadingNextPage.value = false
  }

  async function fetchTitleById(id: string, fallbackData: Title|null = null) {
    if (fallbackData) {
      selectedTitle.value = fallbackData
    }
    const result = await fetch(`${baseUrl}&i=${id}`)
      .catch((error) => {
        // capture error
        alert("Something went wrong, please try again later")
        return
      })
    const json = await result.json()
    if (json.Error) {
      return
    }
    selectedTitle.value = json
  }

  return { selectedTitle, pagination, hasFinishedPagination, titles, search, loadNextPage, fetchTitleById, filteredTitles, searching }
})
