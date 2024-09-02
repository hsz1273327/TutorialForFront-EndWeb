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
    quality?: QualityInterface,
}

export const useHeroStore = defineStore('hero', () => {
    const heros = ref<HeroInterface[]>([])
    const networkOK = ref(true)
    const allHeros = computed(() => [...heros.value])
    const isOnline = computed(() => networkOK.value)

    const top4Heros = computed(() => {
        if (heros.value.length > 0) {
            const heros_copy = [...heros.value]
            return heros_copy.sort((a: HeroInterface, b: HeroInterface) => b.score - a.score).slice(0, 4)
        } else {
            return []
        }
    })
    function SwitchNetworkStatus() {
        networkOK.value = !networkOK.value
    }

    async function SyncHeros() {
        try {
            const res = await fetch(`${RemoteURL}/api/hero`, {
                method: 'GET',
                mode: 'cors'
            })
            if (!res.ok) {
                if (res.status === 403) {
                    const resjson = await res.json()
                    console.error(resjson.Message)
                    throw resjson.Message
                } else {
                    const restext = await res.text()
                    console.error(restext)
                    throw restext
                }
            }
            const herosinfo = await res.json()
            heros.value = herosinfo.result
            console.log(`SyncHeros ok ${JSON.stringify(herosinfo)}`)
        } catch (error) {
            throw "连接失败"
        }
    }

    async function GetHero(heroId: number): Promise<HeroInterface | null> {
        if (!networkOK.value) {
            throw "无法连接到服务器"
        }
        if (typeof (heroId) === "number") {
            try {
                const res = await fetch(`${RemoteURL}/api/hero/${heroId}`, {
                    method: 'GET',
                    mode: 'cors'
                })
                if (!res.ok) {
                    if (res.status === 403) {
                        const resjson = await res.json()
                        console.error(resjson.Message)
                        throw resjson.Message
                    } else {
                        const restext = await res.text()
                        console.error(restext)
                        throw restext
                    }
                }
                const herosinfo = await res.json()
                const currentHero = herosinfo.result as HeroInterface
                return currentHero
            } catch (error) {
                throw "连接失败"
            }
        } else {
            return null
        }
    }
    async function AppendHero(heroObj: HeroInterface) {
        if (!networkOK.value) {
            throw "无法连接到服务器"
        }
        try {
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
                    throw resjson.Message
                } else {
                    const restext = await res.text()
                    console.error(restext)
                    throw restext
                }
            }
        } catch (error) {
            throw "连接失败"
        }
        await SyncHeros()
    }
    async function UpdateHero(heroId: number, source: HeroInterface) {
        if (!networkOK.value) {
            throw "无法连接到服务器"
        }
        try {


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
                    throw resjson.Message
                } else {
                    const restext = await res.text()
                    console.error(restext)
                    throw restext
                }
            }
        } catch (error) {
            throw "连接失败"
        }
        await SyncHeros()
    }
    async function DeleteHero(heroId: number) {
        if (!networkOK.value) {
            throw "无法连接到服务器"
        }
        try {
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
                    throw resjson.Message
                } else {
                    const restext = await res.text()
                    console.error(restext)
                    throw restext
                }
            }
        } catch (error) {
            throw "连接失败"
        }
        await SyncHeros()
    }
    return {
        heros, networkOK,
        allHeros, top4Heros, isOnline,
        SwitchNetworkStatus, SyncHeros, GetHero, AppendHero, UpdateHero, DeleteHero
    }
})