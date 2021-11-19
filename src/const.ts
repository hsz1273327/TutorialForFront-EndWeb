export interface QualityInterface {
    "破坏力": number,
    "速度": number,
    "射程距离": number,
    "持久力": number,
    "精密度": number,
    "成长性": number,
}
interface HeroBaseInterface {
    name: string,
    score: number,
}
export interface HeroDescInterface extends HeroBaseInterface{
    id: number,
}
export interface HeroInterface extends HeroDescInterface {
    quality: QualityInterface,
}

export interface NewHeroQueryInterface extends HeroBaseInterface {
    quality: QualityInterface,
}
// 6项均值+10~100的能力评分
export const DefaultHeros = [
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
