import Ajv from "ajv"
import { ActionContext } from "vuex"
import { HeroInterface, HeroDescInterface, NewHeroQueryInterface } from "../../const"
import { ElNotification } from "element-plus";
import { RemoteURL } from "../utils"
import ReconnectingEventSource from "reconnecting-eventsource"
//heroSchema hero对象的schema
const heroSchema = {
    "type": "object",
    "required": ["name", "quality", "score"],
    "properties": {
        "name": {
            "type": "string"
        },
        "score": {
            "type": "integer",
            "maximum": 200,
            "exclusiveMinimum": 0,
        },
        "quality": {
            "type": "object",
            "required": ["速度", "成长性", "持久力", "破坏力", "精密度", "射程距离"],
            "properties": {
                "速度": {
                    "type": "integer",
                    "maximum": 100,
                    "exclusiveMinimum": 0,
                },
                "成长性": {
                    "type": "integer",
                    "maximum": 100,
                    "exclusiveMinimum": 0,
                },
                "持久力": {
                    "type": "integer",
                    "maximum": 100,
                    "exclusiveMinimum": 0,
                },
                "破坏力": {
                    "type": "integer",
                    "maximum": 100,
                    "exclusiveMinimum": 0,
                },
                "精密度": {
                    "type": "integer",
                    "maximum": 100,
                    "exclusiveMinimum": 0,
                },
                "射程距离": {
                    "type": "integer",
                    "maximum": 100,
                    "exclusiveMinimum": 0,
                }
            }
        }
    }
}
const ajv = new Ajv()

//heroValidate hero的schema校验器
const heroValidate = ajv.compile(heroSchema)


interface StatusInterface {
    heros: HeroDescInterface[],
    currentHero: HeroInterface | null,
    networkOK: boolean
}

const state: StatusInterface = {
    heros: [],
    currentHero: null,
    networkOK: true
}

// getters
const getters = {

    getCurrentHero: (state: StatusInterface): HeroInterface | null => {
        return state.currentHero
    },
    allHeros: (state: StatusInterface): HeroDescInterface[] => {
        return [...state.heros]
    },
    top4Heros: (state: StatusInterface): HeroDescInterface[] => {
        if (state.heros.length > 0) {
            let heros_copy = [...state.heros]
            return heros_copy.sort((a: HeroDescInterface, b: HeroDescInterface) => b.score - a.score).slice(0, 4)
        } else {
            return []
        }
    },
    networkStatus: (state: StatusInterface) => {
        return state.networkOK
    }
}
interface SyncHerosPayloadInterface {
    heros: HeroInterface[]
}
interface CacheCurrentHeroInterface {
    currentHero: HeroInterface
}

// mutations 定义对数据状态的操作
const mutations = {
    syncHeros(state: StatusInterface, payload: SyncHerosPayloadInterface) {
        state.heros = payload.heros
    },
    cacheCurrentHero(state: StatusInterface, payload: CacheCurrentHeroInterface) {
        state.currentHero = payload.currentHero
    },
    uncacheCurrentHero(state: StatusInterface) {
        state.currentHero = null
    },
    switchNetworkStatus(state: StatusInterface) {
        state.networkOK = !state.networkOK
    },
    updateNetworkStatus(state: StatusInterface, payload: boolean) {
        state.networkOK = payload
    }
}
interface QueryCurrentHeroInterface {
    heroID: number
}
interface AppendHeroPayloadInterface {
    heroObj: NewHeroQueryInterface
}

interface UpdateHeroPayloadInterface extends QueryCurrentHeroInterface {
    source: HeroInterface
}
// actions 定义业务逻辑
const actions = {
    SyncHerosBySSE(context: ActionContext<StatusInterface, any>) {
        function initEventSource(url = "http://localhost:5000/stream") {
            let evtSource = new ReconnectingEventSource(url, { withCredentials: true, max_retry_time: 5000, })
            evtSource.addEventListener("sync", (e: any) => {
                console.log(JSON.parse(e.data))
                context.commit('syncHeros', { heros: JSON.parse(e.data) })
            })
            evtSource.addEventListener("create", (e: any) => {
                let newhero = JSON.parse(e.data)
                let heros = context.getters["allHeros"]
                let heroset = new Set(heros)
                heroset.add(newhero)
                context.commit('syncHeros', { heros: [...heroset] })
            })
            evtSource.addEventListener("update", (e: any) => {
                let updatehero: HeroDescInterface = JSON.parse(e.data)
                let heros: HeroDescInterface[] = context.getters["allHeros"]
                let heroset = new Set(heros)
                for (let h of heroset) {
                    if (h.id == updatehero.id) {
                        h.name = updatehero.name
                        h.score = updatehero.score
                        break
                    }
                }
                context.commit('syncHeros', { heros: [...heroset] })
            })
            evtSource.addEventListener("delete", (e: any) => {
                let updatehero = JSON.parse(e.data)
                let heros: HeroDescInterface[] = context.getters["allHeros"]
                let heroset = new Set(heros)
                let needtodel: HeroDescInterface | null = null
                for (let h of heroset) {
                    if (h.id == updatehero.id) {
                        needtodel = h
                        break
                    }
                }
                if (needtodel) {
                    heroset.delete(needtodel)
                }
                context.commit('syncHeros', { heros: [...heroset] })
            })
            evtSource.addEventListener("error", (e: any) => {
                console.log(JSON.parse(e.data))
            })
            evtSource.onerror = function (e: any) {
                if (e.readyState == EventSource.CLOSED) {
                    console.log("Connection lost. reconnect...")
                    context.commit("updateNetworkStatus", false)

                    // evtSource.close();
                    // initEventSource()
                } else {
                    console.log("Connection get error lost. reconnect...")
                    context.commit("updateNetworkStatus", false)
                    console.log('error', e);
                    // evtSource.close();
                }
            }
            evtSource.onopen = function (e: any) {
                context.commit("updateNetworkStatus", true)
                console.log('sse reconnected', e);
            }
        }
        initEventSource()
    },
    async SyncHeros(context: ActionContext<StatusInterface, any>) {
        let res = await fetch(`${RemoteURL}/api/hero`, {
            method: 'GET'
        })
        if (!res.ok) {
            if (res.status === 403) {
                let resjson = await res.json()
                throw resjson.Message
            } else {
                let restext = await res.text()
                throw restext
            }
            return
        }
        let herosinfo = await res.json()
        let heros = herosinfo.result
        context.commit('syncHeros', { heros })
    },
    async GetCurrentHero(context: ActionContext<StatusInterface, any>, payload: QueryCurrentHeroInterface) {
        if (context.state.networkOK) {
            let res = await fetch(`${RemoteURL}/api/hero/${payload.heroID}`, {
                method: 'GET'
            })
            if (!res.ok) {
                if (res.status === 403) {
                    let resjson = await res.json()
                    throw resjson.Message
                } else {
                    let restext = await res.text()
                    throw restext
                }
                return
            }
            let herosinfo = await res.json()
            let currentHero = herosinfo.result
            context.commit('cacheCurrentHero', { currentHero })
        } else {
            throw "无法连接到服务器"
        }
    },
    UncacheCurrentHero(context: ActionContext<StatusInterface, any>) {
        context.commit('uncacheCurrentHero')
    },
    async AppendHero(context: ActionContext<StatusInterface, any>, payload: AppendHeroPayloadInterface) {
        if (context.state.networkOK) {
            let heroObj = payload.heroObj
            let validated = heroValidate(heroObj)
            if (validated) {
                let res = await fetch(`${RemoteURL}/api/hero`,
                    {
                        method: 'POST',
                        body: JSON.stringify(heroObj),
                        headers: new Headers({
                            'Content-Type': 'application/json'
                        })
                    })
                if (!res.ok) {
                    if (res.status === 403) {
                        let resjson = await res.json()
                        throw resjson.Message
                    } else {
                        let restext = await res.text()
                        throw restext
                    }
                    return
                }
                context.dispatch("SyncHeros")
            } else {
                console.error(`添加hero失败,验证错误`)
            }
        } else {
            throw "无法连接到服务器"
        }
    },
    async UpdateHero(context: ActionContext<StatusInterface, any>, payload: UpdateHeroPayloadInterface) {
        if (context.state.networkOK) {
            let res = await fetch(`${RemoteURL}/api/hero/${payload.heroID}`,
                {
                    method: 'PUT',
                    body: JSON.stringify(payload.source),
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                })
            if (!res.ok) {
                if (res.status === 403) {
                    let resjson = await res.json()
                    throw resjson.Message
                } else {
                    let restext = await res.text()
                    throw restext
                }
                return
            }
            await context.dispatch("GetCurrentHero", { heroID: payload.heroID })
            context.dispatch("SyncHeros")
        } else {
            throw "无法连接到服务器"
        }
    },
    async DeleteHero(context: ActionContext<StatusInterface, any>, payload: QueryCurrentHeroInterface) {
        if (context.state.networkOK) {
            let res = await fetch(`${RemoteURL}/api/hero/${payload.heroID}`,
                {
                    method: 'DELETE',
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                })
            if (!res.ok) {
                if (res.status === 403) {
                    let resjson = await res.json()
                    throw resjson.Message
                } else {
                    let restext = await res.text()
                    throw restext
                }
                return
            }
            context.dispatch("SyncHeros")
        } else {
            throw "无法连接到服务器"
        }

    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
