import { openOrCreate, deleteDatabase } from "@nativescript-community/sqlite"
import { knownFolders, File, path } from '@nativescript/core'
import init_data from '../data/flick.json'
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
let DB = null
const db_path = path.join(knownFolders.currentApp().path, DB_NAME)

//Init 初始化数据模型和数据库
async function Init() {
  if (debug) {
    let ok = deleteDatabase(db_path)
    console.log(`*****************debug mode delete db ${DB_NAME} ${ok}!`);
  }
  const sqlite = openOrCreate(db_path);
  const CreateTableSQL = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME}(
      id INT  PRIMARY KEY,
      genre TEXT NOT NULL,
      title TEXT NOT NULL,
      image TEXT NOT NULL,
      url TEXT NOT NULL,
      description TEXT,
      details TEXT
  );`
  await sqlite.execute(CreateTableSQL)
  console.log(`***************** CreateTable ${TABLE_NAME}!`);
  const CountSQL = `SELECT count(*) as count FROM ${TABLE_NAME};`
  let res = await sqlite.select(CountSQL)
  console.log(`*************** count ${Object.keys(res[0])}`)
  for (let flick of flicks) {
    let InsertDataSQL = `INSERT INTO ${TABLE_NAME} (id,genre,title,image,url,description,details) VALUES`
    // let values = []
    let detailjson = JSON.stringify(flick.details)
    let v = ` (${flick.id}, '${flick.genre}', '${flick.title}', '${flick.image}', '${flick.url}','${flick.description}','${detailjson}')`
    InsertDataSQL += v
    InsertDataSQL += ";"
    try {
      console.log(` insert flick ${flick.id} into ${DB_NAME}`);
      // console.log(InsertDataSQL);
      await sqlite.execute(InsertDataSQL);
    } catch (err) {
      console.error(`insert flick ${flick.id} into ${DB_NAME} get error`);
      console.error(err);
    }
  }
  DB = sqlite
}
//Close 关闭数据库
async function Close() {
  if (DB) {
    await DB.close()
    console.log("db Closed")
  }
}



//GetFlicks 获取flicks库存列表
async function GetFlicks(): Promise<FlickModel[]> {
  const QueryListSQL = `
  SELECT id,title,image,description
  FROM ${TABLE_NAME}
  `
  console.log(`GetFlicks query sql ${QueryListSQL}`)
  let rows: FlickDetail[] = await DB.select(QueryListSQL)
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
  console.log(`GetFlickById get id ${id}`)
  const QuerySQL = `
  SELECT 
    id,
    genre,
    title,
    image,
    url,
    description,
    details
  FROM ${TABLE_NAME}
  WHERE id = ${id}
  `
  let rows = await DB.select(QuerySQL)
  if (rows.length == 0) {
    throw "Source Not Found"
  }
  let res: FlickDetail = {
    id: rows[0].id,
    genre: rows[0].genre,
    title: rows[0].title,
    image: rows[0].image,
    url: rows[0].url,
    description: rows[0].description,
    details: JSON.parse(rows[0].details)
  }
  return res
}

export { FlickModel, FlickDetail, Init, Close, GetFlicks, GetFlickById }

