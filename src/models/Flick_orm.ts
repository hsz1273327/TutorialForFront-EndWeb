import { deleteDatabase } from "@nativescript-community/sqlite"
import { DataSource } from 'typeorm/browser';
import { installMixins } from '@nativescript-community/sqlite/typeorm';
import { knownFolders, path } from '@nativescript/core'
import init_data from '../data/flick.json'
import { Flick } from './entity/Flick'

installMixins();

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
let AppDataSource: DataSource = null
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
    entities: [Flick]
  }
  AppDataSource = new DataSource(options)
  await AppDataSource.initialize()
  Flick.useDataSource(AppDataSource)
  if (debug) {
    await Flick.clear()
  }
  let contained = await Flick.count()
  if (contained == 0) {
    AppDataSource.transaction(async (transactionalEntityManager) => {
      for (let flick of flicks) {
        let row = new Flick()
        row.id = flick.id
        row.genre = flick.genre
        row.title = flick.title
        row.image = flick.image
        row.url = flick.url
        row.description = flick.description
        row.details = JSON.stringify(flick.details)
        await transactionalEntityManager.save(row)
      }
    })
  }
  inited = true
  return AppDataSource
}
//Close 关闭数据库
async function Close() {
  if (AppDataSource) {
    await AppDataSource.destroy()
    console.log("db Closed")
  }
}



//GetFlicks 获取flicks库存列表
async function GetFlicks(): Promise<FlickModel[]> {

  let rows = await Flick.find({
    order: {
      id: 'DESC',
    },
  })
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

