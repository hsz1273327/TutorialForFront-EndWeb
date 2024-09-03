import { ref, computed } from "vue"
import { defineStore } from 'pinia'


export const useMenuStore = defineStore('menu', () => {
    const current_index = ref("/")
    const activeIndex = computed(() => current_index.value)
    function changeCurrrentIndex(_current_index: string) {
        current_index.value = _current_index
        sessionStorage.setItem("current_index", _current_index)
    }

    function loadCurrrentIndex() {
        const _current_index = sessionStorage.getItem("current_index")
        if (_current_index) {
            current_index.value = _current_index
        }
    }
    return { current_index, activeIndex, changeCurrrentIndex, loadCurrrentIndex }
})