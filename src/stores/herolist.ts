import { ref, computed } from "vue"
import { defineStore } from 'pinia'
import { RemoteURL } from "./utils"
import ReconnectingEventSource from "reconnecting-eventsource"


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
    const sseInited = ref(false)
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

    // async function SyncHeros() {
    //     try {
    //         const res = await fetch(`${RemoteURL}/api/hero`, {
    //             method: 'GET',
    //             mode: 'cors'
    //         })
    //         if (!res.ok) {
    //             if (res.status === 403) {
    //                 const resjson = await res.json()
    //                 console.error(resjson.Message)
    //                 throw resjson.Message
    //             } else {
    //                 const restext = await res.text()
    //                 console.error(restext)
    //                 throw restext
    //             }
    //         }
    //         const herosinfo = await res.json()
    //         heros.value = herosinfo.result
    //         console.log(`SyncHeros ok ${JSON.stringify(herosinfo)}`)
    //     } catch (error) {
    //         throw "连接失败"
    //     }
    // }

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
        // await SyncHeros()
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
        // await SyncHeros()
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
        // await SyncHeros()
    }

    function SyncHerosBySSE() {
        function initEventSource() {
            const url = `${RemoteURL}/stream`
            const evtSource = new ReconnectingEventSource(url, { withCredentials: true, max_retry_time: 5000, })
            evtSource.addEventListener("sync", (e: any) => {
                console.log(JSON.parse(e.data))
                heros.value = JSON.parse(e.data)
            })
            evtSource.addEventListener("create", (e: any) => {
                const newhero = JSON.parse(e.data)
                const heroset = new Set(allHeros.value)
                heroset.add(newhero)
                heros.value = [...heroset]
            })
            evtSource.addEventListener("update", (e: any) => {
                const updatehero = JSON.parse(e.data) as HeroInterface
                const _heroset = new Set(allHeros.value)
                const heroset = new Set<HeroInterface>()
                for (const h of _heroset) {
                    if (h.id == updatehero.id) {
                        heroset.add(Object.assign({}, updatehero))
                    } else {
                        heroset.add(Object.assign({}, h))
                    }
                }
                heros.value = [...heroset]
            })
            evtSource.addEventListener("delete", (e: any) => {
                const updatehero = JSON.parse(e.data)
                const heroset = new Set(allHeros.value)
                let needtodel = null
                for (const h of heroset) {
                    if (h.id == updatehero.id) {
                        needtodel = h
                        break
                    }
                }
                if (needtodel) {
                    heroset.delete(needtodel)
                }
                heros.value = [...heroset]
            })
            evtSource.addEventListener("error", (e: any) => {
                console.log(JSON.parse(e.data))
            })
            evtSource.onerror = function (e: any) {
                if (e.readyState == EventSource.CLOSED) {
                    console.log("Connection lost. reconnect...")
                    networkOK.value = false
                } else {
                    console.log("Connection get error lost. reconnect...")
                    networkOK.value = false
                    console.log('error', e);
                    // evtSource.close();
                }
            }
            evtSource.onopen = function (e: any) {
                networkOK.value = true
                console.log('sse reconnected', e);
            }
            return evtSource
        }
        let es: ReconnectingEventSource | null = null
        if (!sseInited.value) {
            es = initEventSource()
            sseInited.value = true
            console.log("sse init ok")
        }
        return es
    }

    return {
        heros, networkOK,
        allHeros, top4Heros, isOnline,
        SwitchNetworkStatus, GetHero, AppendHero, UpdateHero, DeleteHero,
        //SyncHeros, 
        sseInited, SyncHerosBySSE
    }
})