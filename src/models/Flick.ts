import Sqlite from "nativescript-sqlite";

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

const flicks: FlickDetail[] = [
  {
    id: 1,
    genre: 'Musical',
    title: 'Book of Mormon',
    image: '~/assets/bookofmormon.png',
    url: 'https://nativescript.org/images/ngconf/book-of-mormon.mov',
    description: `A satirical examination of the beliefs and practices of The Church of Jesus Christ of Latter-day Saints.`,
    details: [
      {
        title: 'Music, Lyrics and Book by',
        body: 'Trey Parker, Robert Lopez, and Matt Stone'
      },
      {
        title: 'First showing on Broadway',
        body: 'March 2011 after nearly seven years of development.'
      },
      {
        title: 'Revenue',
        body:
          'Grossed over $500 million, making it one of the most successful musicals of all time.'
      },
      {
        title: 'History',
        body:
          `The Book of Mormon was conceived by Trey Parker, Matt Stone and Robert Lopez. Parker and Stone grew up in Colorado, and were familiar with The Church of Jesus Christ of Latter-day Saints and its members. They became friends at the University of Colorado Boulder and collaborated on a musical film, Cannibal! The Musical (1993), their first experience with movie musicals. In 1997, they created the TV series South Park for Comedy Central and in 1999, the musical film South Park: Bigger, Longer & Uncut. The two had first thought of a fictionalized Joseph Smith, religious leader and founder of the Latter Day Saint movement, while working on an aborted Fox series about historical characters. Their 1997 film, Orgazmo, and a 2003 episode of South Park, "All About Mormons", both gave comic treatment to Mormonism. Smith was also included as one of South Parks "Super Best Friends", a Justice League parody team of religious figures like Jesus and Buddha.`
      },
      {
        title: 'Development',
        body: `During the summer of 2003, Parker and Stone flew to New York City to discuss the script of their new film, Team America: World Police, with friend and producer Scott Rudin (who also produced South Park: Bigger, Longer & Uncut). Rudin advised the duo to see the musical Avenue Q on Broadway, finding the cast of marionettes in Team America similar to the puppets of Avenue Q. Parker and Stone went to see the production during that summer and the writer-composers of Avenue Q, Lopez and Jeff Marx, noticed them in the audience and introduced themselves. Lopez revealed that South Park: Bigger, Longer & Uncut was highly influential in the creation of Avenue Q. The quartet went for drinks afterwards, and soon found that each camp wanted to write something involving Joseph Smith. The four began working out details nearly immediately, with the idea to create a modern story formulated early on. For research purposes, the quartet took a road trip to Salt Lake City where they "interviewed a bunch of missionaries—or ex-missionaries." They had to work around Parker and Stones South Park schedule. In 2006, Parker and Stone flew to London where they spent three weeks with Lopez, who was working on the West End production of Avenue Q. There, the three wrote "four or five songs" and came up with the basic idea of the story. After an argument between Parker and Marx, who felt he was not getting enough creative control, Marx was separated from the project.[10] For the next few years, the remaining trio met frequently to develop what they initially called The Book of Mormon: The Musical of the Church of Jesus Christ of Latter-day Saints. "There was a lot of hopping back and forth between L.A. and New York," Parker recalled.`
      }
    ]
  },
  {
    id: 2,
    genre: 'Musical',
    title: 'Beetlejuice',
    image: '~/assets/beetlejuicemusical.png',
    url: 'https://nativescript.org/images/ngconf/beetlejuice.mov',
    description: `A deceased couple looks for help from a devious bio-exorcist to handle their haunted house.`,
    details: [
      {
        title: 'Music and Lyrics',
        body: 'Eddie Perfect'
      },
      {
        title: 'Book by',
        body: 'Scott Brown and Anthony King'
      },
      {
        title: 'Based on',
        body: 'A 1988 film of the same name.'
      },
      {
        title: 'First showing on Broadway',
        body: 'April 25, 2019'
      },
      {
        title: 'Background',
        body: `In 2016, a musical adaptation of the 1988 film Beetlejuice (directed by Tim Burton and starring Geena Davis as Barbara Maitland, Alec Baldwin as Adam Maitland, Winona Ryder as Lydia Deetz and Michael Keaton as Betelgeuse) was reported to be in the works, directed by Alex Timbers and produced by Warner Bros., following a reading with Christopher Fitzgerald in the title role. In March 2017, it was reported that Australian musical comedian Eddie Perfect would be writing the music and lyrics and Scott Brown and Anthony King would be writing the book of the musical, and that another reading would take place in May, featuring Kris Kukul as musical director. The musical has had three readings and two laboratory workshops with Alex Brightman in the title role, Sophia Anne Caruso as Lydia Deetz, Kerry Butler and Rob McClure as Barbara and Adam Maitland.`
      }
    ]
  },
  {
    id: 3,
    genre: 'Musical',
    title: 'Anastasia',
    image: '~/assets/anastasia.png',
    url: 'https://nativescript.org/images/ngconf/anastasia.mov',
    description: `The legend of Grand Duchess Anastasia Nikolaevna of Russia.`,
    details: [
      { title: 'Music and Lyrics', body: 'Lynn Ahrens and Stephen Flaherty' },
      {
        title: 'Book by',
        body: 'Terrence McNally'
      },
      {
        title: 'Based on',
        body: 'A 1997 film of the same name.'
      },
      {
        title: 'Background',
        body: `A reading was held in 2012, featuring Kelli Barret as Anya (Anastasia), Aaron Tveit as Dmitry, Patrick Page as Vladimir, and Angela Lansbury as the Empress Maria. A workshop was held on June 12, 2015, in New York City, and included Elena Shaddow as Anya, Ramin Karimloo as Gleb Vaganov, a new role, and Douglas Sills as Vlad.The original stage production of Anastasia premiered at the Hartford Stage in Hartford, Connecticut on May 13, 2016 (previews). The show was directed by Darko Tresnjak and choreography by Peggy Hickey, with Christy Altomare and Derek Klena starring as Anya and Dmitry, respectively.Director Tresnjak explained: "Weve kept, I think, six songs from the movie, but there are 16 new numbers. Weve kept the best parts of the animated movie, but it really is a new musical." The musical also adds characters not in the film. Additionally, Act 1 is set in Russia and Act 2 in Paris, "which was everything modern Soviet Russia was not: free, expressive, creative, no barriers" according to McNally.The musical also omits the supernatural elements from the original film, including the character of Rasputin and his musical number "In the Dark of the Night", although that songs melody is repurposed in the new number "Stay, I Pray You", and introduces instead a new villain called Gleb, a general for the Bolsheviks who receives orders to kill Anya.`
      }
    ]
  }
]

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

