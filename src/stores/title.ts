import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type Title from "@/types/title";
import {useFetch} from "@/utils/fetch";

export const useTitleStore = defineStore('title', () => {
  const selectedTitle = ref<Title|null>(null)

  const titles = ref<Array<Title>>([])

  function init() {
    const result = {
      "Search": [
        {
          "Title": "Star Wars: Episode IV - A New Hope",
          "Year": "1977",
          "imdbID": "tt0076759",
          "Type": "movie",
          "Poster": "https://m.media-amazon.com/images/M/MV5BOGUwMDk0Y2MtNjBlNi00NmRiLTk2MWYtMGMyMDlhYmI4ZDBjXkEyXkFqcGc@._V1_SX300.jpg"
        },
        {
          "Title": "Star Wars: Episode V - The Empire Strikes Back",
          "Year": "1980",
          "imdbID": "tt0080684",
          "Type": "movie",
          "Poster": "https://m.media-amazon.com/images/M/MV5BMTkxNGFlNDktZmJkNC00MDdhLTg0MTEtZjZiYWI3MGE5NWIwXkEyXkFqcGc@._V1_SX300.jpg"
        },
        {
          "Title": "Star Wars: Episode VI - Return of the Jedi",
          "Year": "1983",
          "imdbID": "tt0086190",
          "Type": "movie",
          "Poster": "https://m.media-amazon.com/images/M/MV5BNWEwOTI0MmUtMGNmNy00ODViLTlkZDQtZTg1YmQ3MDgyNTUzXkEyXkFqcGc@._V1_SX300.jpg"
        },
        {
          "Title": "Star Wars: Episode VII - The Force Awakens",
          "Year": "2015",
          "imdbID": "tt2488496",
          "Type": "movie",
          "Poster": "https://m.media-amazon.com/images/M/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE@._V1_SX300.jpg"
        },
        {
          "Title": "Star Wars: Episode I - The Phantom Menace",
          "Year": "1999",
          "imdbID": "tt0120915",
          "Type": "movie",
          "Poster": "https://m.media-amazon.com/images/M/MV5BODVhNGIxOGItYWNlMi00YTA0LWI3NTctZmQxZGUwZDEyZWI4XkEyXkFqcGc@._V1_SX300.jpg"
        },
        {
          "Title": "Star Wars: Episode III - Revenge of the Sith",
          "Year": "2005",
          "imdbID": "tt0121766",
          "Type": "movie",
          "Poster": "https://m.media-amazon.com/images/M/MV5BNTc4MTc3NTQ5OF5BMl5BanBnXkFtZTcwOTg0NjI4NA@@._V1_SX300.jpg"
        },
        {
          "Title": "Star Wars: Episode II - Attack of the Clones",
          "Year": "2002",
          "imdbID": "tt0121765",
          "Type": "movie",
          "Poster": "https://m.media-amazon.com/images/M/MV5BNTgxMjY2YzUtZmVmNC00YjAwLWJlODMtNDBhNzllNzIzMjgxXkEyXkFqcGc@._V1_SX300.jpg"
        },
        {
          "Title": "Rogue One: A Star Wars Story",
          "Year": "2016",
          "imdbID": "tt3748528",
          "Type": "movie",
          "Poster": "https://m.media-amazon.com/images/M/MV5BMjEwMzMxODIzOV5BMl5BanBnXkFtZTgwNzg3OTAzMDI@._V1_SX300.jpg"
        },
        {
          "Title": "Star Wars: Episode VIII - The Last Jedi",
          "Year": "2017",
          "imdbID": "tt2527336",
          "Type": "movie",
          "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ1MzcxNjg4N15BMl5BanBnXkFtZTgwNzgwMjY4MzI@._V1_SX300.jpg"
        },
        {
          "Title": "Star Trek",
          "Year": "2009",
          "imdbID": "tt0796366",
          "Type": "movie",
          "Poster": "https://m.media-amazon.com/images/M/MV5BMjE5NDQ5OTE4Ml5BMl5BanBnXkFtZTcwOTE3NDIzMw@@._V1_SX300.jpg"
        }
      ],
      "totalResults": "4648",
      "Response": "True"
    }
    titles.value = result.Search
    pagination.value.total = 4648
    pagination.value.currentPage = 1
    pagination.value.currentFilters = {
      "search": "Star",
      "type": "any"
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
    const result = await fetch(`https://www.omdbapi.com/?apikey={apiKeyHere}&s=${filters.search}&t=${filters.type}`)
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
    const result = await fetch(`https://www.omdbapi.com/?apikey={apiKeyHere}&s=${pagination.value.currentFilters.search}&t=${pagination.value.currentFilters.type}&page=${++pagination.value.currentPage}`)
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

  return { selectedTitle, pagination, hasFinishedPagination, titles, init, search, loadNextPage, fetchTitleById }
})
