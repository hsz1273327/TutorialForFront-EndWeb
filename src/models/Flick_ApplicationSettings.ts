import { ApplicationSettings } from '@nativescript/core'
import init_data from '../data/flick.json'

const debug = process.env.NODE_ENV !== 'production';

//FlickModel flick列表中的信息样式
interface FlickModel {
  id: number
  title: string
  image: string
  description: string
}

//FlickDetail flick详情信息样式
interface FlickDetail {
  id: number
  genre: string
  title: string
  image: string
  url: string
  description: string
  details: {
    title: string
    body: string
  }[]
}

const FLICKS_KEY_PREFIX = "flicks_"
//Init 初始化数据模型和数据库
function Init() {
  let all_keys = ApplicationSettings.getAllKeys().filter((key: string) => key.startsWith(FLICKS_KEY_PREFIX))

  if (debug && all_keys.length > 0) {
    console.log(`debug mode delete ${FLICKS_KEY_PREFIX} keys!`);
    for (let key of all_keys) {
      ApplicationSettings.remove(key)
    }
  }
  if (all_keys.length > 0) {
    console.log(`check key ${FLICKS_KEY_PREFIX} ok!`);
  } else {
    let flicks: FlickDetail[] = init_data
    for (let flick of flicks) {
      let key = `${FLICKS_KEY_PREFIX}${flick.id}`
      ApplicationSettings.setString(key, JSON.stringify(flick))
    }
  }
}

//GetFlicks 获取flicks库存列表
function GetFlicks(): FlickModel[] {
  let all_keys = ApplicationSettings.getAllKeys().filter((key: string) => key.startsWith(FLICKS_KEY_PREFIX))
  if (all_keys.length == 0) {
    throw "FLICKS_KEY not found"
  }

  let rows: FlickDetail[] = all_keys.map((key) => JSON.parse(ApplicationSettings.getString(key)))
  let res: FlickModel[] = []
  for (let row of rows) {
    let info = {
      id: row.id,
      title: row.title,
      image: row.image,
      description: row.description,
    }
    res.push(info)
  }
  console.log(`ApplicationSettings GetFlicks get result ${res}`)
  return res
}
//GetFlickById 通过id查找flick详情
function GetFlickById(id: number): FlickDetail {
  console.log(`ApplicationSettings GetFlickById get id ${id}`)
  let key = `${FLICKS_KEY_PREFIX}${id}`

  let content = ApplicationSettings.getString(key)
  if (!content) {
    throw "not found"
  }
  let row: FlickDetail = JSON.parse(content)
  return row
}

export { Init, FlickModel, FlickDetail, GetFlicks, GetFlickById }

