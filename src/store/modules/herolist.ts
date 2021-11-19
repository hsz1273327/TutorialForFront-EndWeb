import Ajv from "ajv"
import { ActionContext } from "vuex"
import { HeroInterface, HeroDescInterface, NewHeroQueryInterface } from "../../const"
import { RemoteURL } from "../utils"
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

// const Counter = () => {
//     let count = 0
//     return () => {
//         count += 1
//         return count
//     }
// }
// let counter = Counter()


interface StatusInterface {
    heros: HeroDescInterface[],
    currentHero: HeroInterface | null
}

const state: StatusInterface = {
    heros: [],
    currentHero: null
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
    async SyncHeros(context: ActionContext<StatusInterface, any>) {
        let res = await fetch(`${RemoteURL}/api/hero`, {
            method: 'GET'
        })
        if (!res.ok) {
            if (res.status === 403) {
                let resjson = await res.json()
                console.error(resjson.Message)
            } else {
                let restext = await res.text()
                console.error(restext)
            }
            return
        }
        let herosinfo = await res.json()
        let heros = herosinfo.result
        context.commit('syncHeros', { heros })
    },
    async GetCurrentHero(context: ActionContext<StatusInterface, any>, payload: QueryCurrentHeroInterface) {
        let res = await fetch(`${RemoteURL}/api/hero/${payload.heroID}`, {
            method: 'GET'
        })
        if (!res.ok) {
            if (res.status === 403) {
                let resjson = await res.json()
                console.error(resjson.Message)
            } else {
                let restext = await res.text()
                console.error(restext)
            }
            return
        }
        let herosinfo = await res.json()
        let currentHero = herosinfo.result
        context.commit('cacheCurrentHero', { currentHero })
    },
    async AppendHero(context: ActionContext<StatusInterface, any>, payload: AppendHeroPayloadInterface) {
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
                    console.error(resjson.Message)
                } else {
                    let restext = await res.text()
                    console.error(restext)
                }
                return
            }
            context.dispatch("SyncHeros")
        } else {
            console.error(`添加hero失败,验证错误`)
        }
    },
    async UpdateHero(context: ActionContext<StatusInterface, any>, payload: UpdateHeroPayloadInterface) {
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
                console.error(resjson.Message)
            } else {
                let restext = await res.text()
                console.error(restext)
            }
            return
        }
        await context.dispatch("GetCurrentHero", { heroID: payload.heroID })
        context.dispatch("SyncHeros")
    },
    async DeleteHero(context: ActionContext<StatusInterface, any>, payload: QueryCurrentHeroInterface) {
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
                console.error(resjson.Message)
            } else {
                let restext = await res.text()
                console.error(restext)
            }
            return
        }
        context.dispatch("SyncHeros")
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
