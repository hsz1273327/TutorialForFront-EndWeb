import { defineStore } from 'pinia'
import { ref, computed } from 'nativescript-vue';

export const useCounterStore = defineStore('counter', () => {
    const count = ref(0)
    const doubleCount = computed(() => count.value * 2)
    function increment() {
        count.value++
    }
    return { count, doubleCount, increment }
})