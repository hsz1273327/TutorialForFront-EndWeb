import { ref, computed } from "vue"
import { defineStore } from 'pinia'

export interface QualityInterface {
    "破坏力": number,
    "速度": number,
    "射程距离": number,
    "持久力": number,
    "精密度": number,
    "成长性": number,
}
export interface HeroInterface {
    id?: number,
    name: string,
    score: number,
    quality: QualityInterface,
}
// 6项均值+10~100的能力评分
export const DefaultHeros: HeroInterface[] = [
    {
        id: 1,
        name: "隐者之紫",
        score: 50,//30+20
        quality: {
            "破坏力": 20,
            "速度": 20,
            "射程距离": 20,
            "持久力": 80,
            "精密度": 20,
            "成长性": 20,
        }
    },
    {
        id: 2,
        name: "红色魔术师",
        score: 75,//43+32
        quality: {
            "破坏力": 60,
            "速度": 40,
            "射程距离": 40,
            "持久力": 40,
            "精密度": 40,
            "成长性": 40,
        }
    },
    {
        id: 3,
        name: "白金之星",
        score: 160,//77+83
        quality: {
            "破坏力": 100,
            "速度": 100,
            "射程距离": 20,
            "持久力": 80,
            "精密度": 100,
            "成长性": 60,
        }
    },
    {
        id: 4,
        name: "法皇",
        score: 75,//53+32
        quality: {
            "破坏力": 60,
            "速度": 60,
            "射程距离": 40,
            "持久力": 80,
            "精密度": 40,
            "成长性": 40,
        }
    },
    {
        id: 5,
        name: "银色战场",
        score: 70,//60+10
        quality: {
            "破坏力": 60,
            "速度": 80,
            "射程距离": 20,
            "持久力": 80,
            "精密度": 60,
            "成长性": 60,
        }
    },
]

const Counter = () => {
    let count = 0
    return () => {
        count += 1
        return count
    }
}
const counter = Counter()

export const useHeroStore = defineStore('hero', () => {
    const heros = ref(DefaultHeros)
    const allHeros = computed(() => [...heros.value])
    const top4Heros = computed(() => {
        if (heros.value.length > 0) {
            const heros_copy = [...heros.value]
            return heros_copy.sort((a: HeroInterface, b: HeroInterface) => b.score - a.score).slice(0, 4)
        } else {
            return []
        }
    })
    function GetHero(heroId: number): HeroInterface | null {
        if (typeof (heroId) === "number") {
            const hero_list = heros.value.filter(hero => hero.id === heroId)
            if (hero_list.length === 0) {
                return null
            } else {
                let hero = hero_list[0]
                hero = { ...hero }
                return hero
            }
        } else {
            return null
        }
    }
    function AppendHero(heroObj: HeroInterface) {
        const id = counter()
        const hero = Object.assign(heroObj, { id })
        heros.value.push(hero)
    }
    function UpdateHero(heroID: number, source: HeroInterface) {
        const heros_copy = [...heros.value];
        const hero_list = heros_copy.filter(hero => hero.id === heroID)
        if (hero_list.length !== 0) {
            const hero = hero_list[0]
            Object.assign(hero, source)
            heros.value = heros_copy
        }
    }
    function DeleteHero(heroID: number) {
        heros.value = heros.value.filter((i) => i.id !== heroID)
    }

    return { heros, allHeros, top4Heros, GetHero, AppendHero, UpdateHero, DeleteHero }
})

