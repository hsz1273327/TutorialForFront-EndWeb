import { knownFolders, File, path } from '@nativescript/core'

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

const data_path = path.join(knownFolders.currentApp().path, "data/flick.json")

//GetFlicks 获取flicks库存列表
async function GetFlicks(): Promise<FlickModel[]> {

  let f = File.fromPath(data_path)
  let content = await f.readText()
  let rows = JSON.parse(content)
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

