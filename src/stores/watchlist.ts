import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useWatchlistStore = defineStore('watchlist', () => {
  const watchlist = ref<Array<string>>([])

  const titleIsInWatchlist = computed(() => (id: string) => {
    return watchlist.value.findIndex((element) => element === id) !== -1
  })

  function addToWatchlist(id: string) {
    const index = watchlist.value.findIndex((element) => element === id)
    if (index === -1) {
      watchlist.value.push(id)
    }
  }

  function removeFromWatchlist(id: string) {
    const index = watchlist.value.findIndex((element) => element === id)
    if (index !== -1) {
      Object.assign(watchlist, watchlist.value.splice(index, 1))
    }
  }

  return { watchlist, addToWatchlist, removeFromWatchlist, titleIsInWatchlist }
}, { persist: true })
