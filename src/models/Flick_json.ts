import { knownFolders, File, path} from '@nativescript/core'
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

// const data_path = path.join(knownFolders.currentApp().path, "data")
const datafile_path = path.join(knownFolders.currentApp().path, "data/flick.json")
//Init 初始化数据模型和数据库
async function Init() {
  if (debug && File.exists(datafile_path)) {
    console.log(`debug mode delete datafile ${datafile_path}!`);
    await File.fromPath(datafile_path).remove()
  }
  if (File.exists(datafile_path)) {
    console.log(`check datafile ${datafile_path} ok!`);
  } else {
    let f = File.fromPath(datafile_path)
    await f.writeText(JSON.stringify(init_data))
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
  console.log(`JSON GetFlicks get result ${res}`)
  return res
}
//GetFlickById 通过id查找flick详情
async function GetFlickById(id: number): Promise<FlickDetail> {
  console.log(`JSON GetFlickById get id ${id}`)
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

