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
  let f = File.fromPath(data_path)
  let content = await f.readText()
  let rows: FlickDetail[] = JSON.parse(content)
  let _row = rows.filter((x) => x.id === id)
  if (_row.length === 0) {
    throw "not found"
  }
  let res = _row[0]
  return res
}

export { FlickModel, FlickDetail, GetFlicks, GetFlickById }

