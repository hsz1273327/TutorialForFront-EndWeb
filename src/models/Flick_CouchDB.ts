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
const database = new CouchBase(DB_NAME);
const IDS = []

//Init 初始化数据模型和数据库
function Init() {
  const rows = database.query({
    select: [], // Leave empty to query for all
    from: 'DB_NAME', // Omit or set null to use current db
  })
  if (debug && rows.length > 0) {
    console.log(`debug mode delete database ${DB_NAME}!`);
    database.destroyDatabase()
  }
  if (rows.length > 0) {
    console.log(`check database ${DB_NAME} ok!`);
  } else {
    const flicks: FlickDetail[] = init_data
    for (let flick of flicks) {
      let documentId = database.createDocument(flick);
      database.updateDocument(documentId, {
        id: documentId,
      });
    }
  }
}

//GetFlicks 获取flicks库存列表
async function GetFlicks(): Promise<FlickModel[]> {
  if (!File.exists(datafile_path)) {
    throw "datafile_path not found"
  }

  let f = File.fromPath(datafile_path)
  let content = await f.readText()
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
async function GetFlickById(id: number): Promise<FlickDetail> {
  console.log(`GetFlickById get id ${id}`)
  if (!File.exists(datafile_path)) {
    throw "datafile_path not found"
  }
  let f = File.fromPath(datafile_path)
  let content = await f.readText()
  let rows: FlickDetail[] = JSON.parse(content)
  let _row = rows.filter((x) => x.id === id)
  if (_row.length === 0) {
    throw "not found"
  }
  let res = _row[0]
  return res
}

export { Init, FlickModel, FlickDetail, GetFlicks, GetFlickById }

