import Sqlite from "nativescript-sqlite";
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
const flicks: FlickDetail[] = init_data
const DB_NAME = "MyCoolApp.sqlite"
const TABLE_NAME = "flicks"
let DB = null

//Init 初始化数据模型和数据库
async function Init() {
  if (debug && Sqlite.exists(DB_NAME)) {
    console.log(`debug mode delete db ${DB_NAME}!`);
    Sqlite.deleteDatabase(DB_NAME);
  }
  if (Sqlite.exists(DB_NAME)) {
    console.log(`Load db ${DB_NAME} ok!`);
  } else {
    DB = await Sqlite(DB_NAME);
    if (DB.isOpen()) {
      console.log(`we open db ${DB_NAME} yet (Promise based)`);
      try {
        const CreateTableSQL = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME}(
            id INT  PRIMARY KEY,
            genre TEXT NOT NULL,
            title TEXT NOT NULL,
            image TEXT NOT NULL,
            url TEXT NOT NULL,
            description TEXT,
            details TEXT
        );`
        await DB.execSQL(CreateTableSQL);
        // let InsertDataSQL = `INSERT INTO  ${TABLE_NAME} (id,genre,title,image,url,description,details) VALUES`
        // let values = []
        for (let flick of flicks) {
          let InsertDataSQL = `INSERT INTO  ${TABLE_NAME} (id,genre,title,image,url,description,details) VALUES`
          // let values = []
          let detailjson = JSON.stringify(flick.details)
          let v = ` (${flick.id}, '${flick.genre}', '${flick.title}', '${flick.image}', '${flick.url}','${flick.description}','${detailjson}' )`
          InsertDataSQL +=  v
          InsertDataSQL += ";"
          try {
            console.log(` insert flick ${flick.id} into ${DB_NAME}`);
            // console.log(InsertDataSQL);
            await DB.execSQL(InsertDataSQL);
          } catch (err) {
            console.error(`insert flick ${flick.id} into ${DB_NAME} get error`);
            console.error(InsertDataSQL);
          }
        }
      } catch (err) {
        console.error(`create table get error ${err.message}`);
      }
    } else {
      console.error(`we can not open db ${DB_NAME} (Promise based)`);
    }
  }
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
  let rows = await DB.all(QueryListSQL)
  let res: FlickModel[] = []
  for (let row of rows) {
    let info = {
      id: row[0],
      title: row[1],
      image: row[2],
      description: row[3],
    }
    res.push(info)
  }
  console.log(`GetFlicks get result ${res}`)
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
  let row = await DB.get(QuerySQL)
  let res: FlickDetail = {
    id: row[0],
    genre: row[1],
    title: row[2],
    image: row[3],
    url: row[4],
    description: row[5],
    details: JSON.parse(row[6])
  }
  return res
}

export { FlickModel, FlickDetail, Init, Close, GetFlicks, GetFlickById }

