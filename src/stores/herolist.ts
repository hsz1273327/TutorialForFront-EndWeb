import { ref, computed } from "vue"
import { defineStore } from 'pinia'
import { RemoteURL } from "./utils"

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

export const useHeroStore = defineStore('hero', () => {
    const heros = ref<HeroInterface[]>([])
    const allHeros = computed(() => [...heros.value])
    const top4Heros = computed(() => {
        if (heros.value.length > 0) {
            const heros_copy = [...heros.value]
            return heros_copy.sort((a: HeroInterface, b: HeroInterface) => b.score - a.score).slice(0, 4)
        } else {
            return []
        }
    })
    async function SyncHeros() {
        const res = await fetch(`${RemoteURL}/api/hero`, {
            method: 'GET',
            mode: 'cors'
        })
        if (!res.ok) {
            if (res.status === 403) {
                const resjson = await res.json()
                console.error(resjson.Message)
            } else {
                const restext = await res.text()
                console.error(restext)
            }
            return
        }
        const herosinfo = await res.json()
        heros.value = herosinfo.result
        console.log(`SyncHeros ok ${JSON.stringify(herosinfo)}`)
    }

    async function GetHero(heroId: number): Promise<HeroInterface | null> {
        if (typeof (heroId) === "number") {
            const res = await fetch(`${RemoteURL}/api/hero/${heroId}`, {
                method: 'GET',
                mode: 'cors'
            })
            if (!res.ok) {
                if (res.status === 403) {
                    const resjson = await res.json()
                    console.error(resjson.Message)
                } else {
                    const restext = await res.text()
                    console.error(restext)
                }
                return null
            }
            const herosinfo = await res.json()
            const currentHero = herosinfo.result as HeroInterface
            return currentHero
        } else {
            return null
        }
    }
    async function AppendHero(heroObj: HeroInterface) {
        // const id = counter()
        // const hero = Object.assign(heroObj, { id })
        // heros.value.push(hero)
        const res = await fetch(`${RemoteURL}/api/hero`,
            {
                method: 'POST',
                body: JSON.stringify(heroObj),
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                mode: 'cors'
            })
        if (!res.ok) {
            if (res.status === 403) {
                const resjson = await res.json()
                console.error(resjson.Message)
            } else {
                const restext = await res.text()
                console.error(restext)
            }
            return
        }
        await SyncHeros()
        // context.dispatch("SyncHeros")
    }
    async function UpdateHero(heroId: number, source: HeroInterface) {
        const res = await fetch(`${RemoteURL}/api/hero/${heroId}`,
            {
                method: 'PUT',
                body: JSON.stringify(source),
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                mode: 'cors'
            })
        if (!res.ok) {
            if (res.status === 403) {
                const resjson = await res.json()
                console.error(resjson.Message)
            } else {
                const restext = await res.text()
                console.error(restext)
            }
            return
        }
        await SyncHeros()
    }
    async function DeleteHero(heroId: number) {
        const res = await fetch(`${RemoteURL}/api/hero/${heroId}`,
            {
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                mode: 'cors'
            })
        if (!res.ok) {
            if (res.status === 403) {
                const resjson = await res.json()
                console.error(resjson.Message)
            } else {
                const restext = await res.text()
                console.error(restext)
            }
            return
        }
        await SyncHeros()
    }
    return { heros, allHeros, top4Heros, SyncHeros, GetHero, AppendHero, UpdateHero, DeleteHero }
})