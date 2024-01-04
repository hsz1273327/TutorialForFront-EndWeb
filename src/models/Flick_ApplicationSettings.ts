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

const FLICKS_KEY = "flicks"
//Init 初始化数据模型和数据库
function Init() {
  if (debug && ApplicationSettings.getAllKeys().includes(FLICKS_KEY)) {
    console.log(`debug mode delete key ${FLICKS_KEY}!`);
    ApplicationSettings.remove(FLICKS_KEY)
  }
  if (ApplicationSettings.getAllKeys().includes(FLICKS_KEY)) {
    console.log(`check key ${FLICKS_KEY} ok!`);
  } else {
    ApplicationSettings.setString(FLICKS_KEY, JSON.stringify(init_data))
  }
}

//GetFlicks 获取flicks库存列表
function GetFlicks(): FlickModel[] {
  if (!ApplicationSettings.getAllKeys().includes(FLICKS_KEY)) {
    throw "FLICKS_KEY not found"
  }
  let content = ApplicationSettings.getString(FLICKS_KEY)
  let rows: FlickDetail[] = JSON.parse(content)
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
  console.log(`GetFlicks get result ${res}`)
  return res
}
//GetFlickById 通过id查找flick详情
function GetFlickById(id: number): FlickDetail {
  console.log(`GetFlickById get id ${id}`)
  if (!ApplicationSettings.getAllKeys().includes(FLICKS_KEY)) {
    throw "FLICKS_KEY not found"
  }
  let content = ApplicationSettings.getString(FLICKS_KEY)
  let rows: FlickDetail[] = JSON.parse(content)
  let _row = rows.filter((x) => x.id === id)
  if (_row.length === 0) {
    throw "not found"
  }
  let res = _row[0]
  return res
}

export { Init, FlickModel, FlickDetail, GetFlicks, GetFlickById }

