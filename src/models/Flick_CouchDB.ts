import { knownFolders, File, path } from '@nativescript/core'
import init_data from '../data/flick.json'
import { CouchBase, ConcurrencyMode } from '@triniwiz/nativescript-couchbase';

const debug = process.env.NODE_ENV !== 'production';

//FlickModel flick列表中的信息样式
interface FlickModel {
  id: number | string
  title: string
  image: string
  description: string
}

//FlickDetail flick详情信息样式
interface FlickDetail {
  id: number | string
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
const DB_NAME = "MyCoolApp"
let database = new CouchBase(DB_NAME);

//Init 初始化数据模型和数据库
function Init() {
  let rows = database.query({
    select: [], // Leave empty to query for all
    from: DB_NAME, // Omit or set null to use current db
  })
  
  if (debug && rows.length > 0) {
    console.log(`debug mode delete database ${DB_NAME}!`);
    let keys = Object.keys(rows[0])
    console.log(`************get rows keys ${keys} id ${rows[0].id}`)
    for (let row of rows){
      database.deleteDocument(row.id)
    }
    // database.destroyDatabase()
  }
  if (rows.length > 0) {
    console.log(`check database ${DB_NAME} ok!`);
  } else {
    const flicks: FlickDetail[] = init_data
    for (let flick of flicks) {
      // let id = flick.id
      let documentId = database.createDocument(flick);
      console.log(`********** init documentId ${documentId}`)
    }
  }
}

//GetFlicks 获取flicks库存列表
function GetFlicks(): FlickModel[] {
  let rows: FlickDetail[] = database.query({
    select: [], // Leave empty to query for all
    from: DB_NAME, // Omit or set null to use current db
  })
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
  console.log(`CouchDB GetFlicks get result ${res}`)
  return res
}
//GetFlickById 通过id查找flick详情
function GetFlickById(id: string): FlickDetail {
  console.log(`CouchDB GetFlickById get id ${id}`)
  let res = database.getDocument(id)
  return res
}

function Close() {
  database.close()
}

export { Init, Close, FlickModel, FlickDetail, GetFlicks, GetFlickById }

