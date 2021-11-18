import Ajv from "ajv"
import { ActionContext } from "vuex"
import { HeroInterface, DefaultHeros } from "../../const"
//heroSchema hero对象的schema
const heroSchema = {
    "type": "object",
    "required": ["name", "quality", "score"],
    "properties": {
        "id": {
            "type": "integer"
        },
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

const Counter = () => {
    let count = 0
    return () => {
        count += 1
        return count
    }
}
let counter = Counter()

interface StatusInterface {
    heros: HeroInterface[],
}

const state: StatusInterface = {
    heros: Object.assign([], DefaultHeros)
}

// getters
const getters = {
    getHero: (state: StatusInterface) => (heroId: number): HeroInterface | null => {
        if (typeof (heroId) === "number") {
            let hero_list = state.heros.filter(hero => hero.id === heroId)
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
    },
    allHeros: (state: StatusInterface): HeroInterface[] => {
        return [...state.heros]
    },
    top4Heros: (state: StatusInterface): HeroInterface[] => {
        if (state.heros.length > 0) {
            let heros_copy = [...state.heros]
            return heros_copy.sort((a: HeroInterface, b: HeroInterface) => b.score - a.score).slice(0, 4)
        } else {
            return []
        }
    }
}

interface AppendHeroPayloadInterface {
    heroObj: HeroInterface
}
interface DeleteHeroPayloadInterface {
    heroID: number
}

interface UpdateHeroPayloadInterface {
    heroID: number,
    source: HeroInterface
}

// mutations 定义对数据状态的操作
const mutations = {
    appendHero(state: StatusInterface, payload: AppendHeroPayloadInterface) {
        let id = counter()
        let hero = Object.assign(payload.heroObj, { id })
        state.heros.push(hero)
    },
    updateHero(state: StatusInterface, payload: UpdateHeroPayloadInterface) {
        let heros_copy = [...state.heros];
        let hero_list = heros_copy.filter(hero => hero.id === payload.heroID)
        if (hero_list.length !== 0) {
            let hero = hero_list[0]
            Object.assign(hero, payload.source)
            state.heros = heros_copy
        }
    },
    deleteHero(state: StatusInterface, payload: DeleteHeroPayloadInterface) {
        state.heros = state.heros.filter((i) => i.id !== payload.heroID)
    },
}


// actions 定义业务逻辑
const actions = {
    AppendHero(context: ActionContext<StatusInterface, any>, payload: AppendHeroPayloadInterface) {
        let heroObj = payload.heroObj
        let validated = heroValidate(heroObj)
        if (validated) {
            context.commit('appendHero', payload)
        } else {
            console.error(`添加hero失败,验证错误`)
        }
    },
    UpdateHero(context: ActionContext<StatusInterface, any>, payload: UpdateHeroPayloadInterface) {
        context.commit('updateHero', payload)
    },
    DeleteHero(context: ActionContext<StatusInterface, any>, payload: DeleteHeroPayloadInterface) {
        context.commit('deleteHero', payload)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
