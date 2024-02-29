import { createConnection, Connection } from '@nativescript-community/typeorm/browser';
import { knownFolders, path } from '@nativescript/core'
import init_data from '../data/flick.json'
import { Flick } from './entity/Flick'


const debug = process.env.NODE_ENV !== 'production'
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
const flicks: FlickDetail[] = init_data
const DB_NAME = "MyCoolApp.sqlite"
const TABLE_NAME = "flicks"
const db_path = path.join(knownFolders.currentApp().path, DB_NAME)
let AppDataSource: Connection = null
// let connection = null
let inited = false

//Init 初始化数据模型和数据库
async function Init() {
  if (inited) {
    return AppDataSource
  }
  let options = {
    type: 'nativescript' as any,
    database: db_path,
    synchronize: true,
    entities: [Flick],
  }
  AppDataSource = await createConnection(options)
  await AppDataSource.synchronize(false);
  console.log("********************Init conn ok")
  if (debug) {
    await Flick.clear()
  }
  let contained = await Flick.count()
  console.log(`********************Init count ok ${contained}`)
  if (contained == 0) {
    for (let flick of flicks) {
      let row = new Flick()
      row.id = flick.id
      row.genre = flick.genre
      row.title = flick.title
      row.image = flick.image
      row.url = flick.url
      row.description = flick.description
      row.details = JSON.stringify(flick.details)
      try {
        await row.save()
        console.log(`********************save ${row.id} ok`)
      } catch (e) {
        console.log(`save row get error ${e}`)
      }
    }
  }
  inited = true
  console.log(`********************Init ok`)
  return AppDataSource
}
//Close 关闭数据库
async function Close() {
  if (AppDataSource) {
    await AppDataSource.close()
    console.log("db Closed")
  }
}

function delay(ms: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

//GetFlicks 获取flicks库存列表
async function GetFlicks(): Promise<FlickModel[]> {
  while (!inited) {
    await delay(1000)
  }
  let rows = await Flick.find({})
  console.log(`***************GetFlicks get ${rows.length}`)
  let res: FlickModel[] = rows.map((row) => {
    return {
      id: row.id,
      title: row.title,
      image: row.image,
      description: row.description,
    }
  })
  return res
}
//GetFlickById 通过id查找flick详情
async function GetFlickById(id: number): Promise<FlickDetail> {
  while (!inited) {
    await delay(1000)
  }
  let row = await Flick.findOneOrFail({
    where: {
      id
    },
  })
  let res: FlickDetail = {
    id: row.id,
    genre: row.genre,
    title: row.title,
    image: row.image,
    url: row.url,
    description: row.description,
    details: JSON.parse(row.details)
  }
  return res
}

export { FlickModel, FlickDetail, Init, Close, GetFlicks, GetFlickById }

