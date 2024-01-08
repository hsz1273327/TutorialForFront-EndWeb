# 使用typeorm连接数据库

[typeorm](https://typeorm.io/)恐怕是这部分中最值得学一下的工具,几乎所有场景下的关系数据库都可以用它做orm.而在前端工程化的今天,关系数据库实在是太重要了.

我们使用`npm install typeorm --save`安装它的本体,使用`npm install reflect-metadata --save`安装`reflect-metadata`并在入口处写上`import "reflect-metadata"`以让typeorm可以使用,再然后安装`npm install @types/node --save-dev`提供类型提示,最后安装需要的数据库驱动即可.在node中常用的驱动包括

+ `MySQL`/`MariaDB`

    ```bash
    npm install mysql --save (you can install mysql2 instead as well)
    ```

+ `PostgreSQL`/`CockroachDB`

    ```bash
    npm install pg --save
    ```

+ `SQLite`

    ```bash
    npm install sqlite3 --save
    ```

+ `Microsoft SQL Server`

    ```bash
    npm install mssql --save
    ```

+ `Oracle`

    ```bash
    npm install oracledb --save
    ```

和多数orm一样,`typeorm`的使用也分为3块

+ 连接管理
+ 映射对象声明
+ 请求处理

如果你用的tyepscript.需要在`tsconfig.json`中启动如下设置

```json

"emitDecoratorMetadata": true,
"experimentalDecorators": true,
```

## 连接管理

typeorm使用`DataSource`类管理与数据库的连接.

```js
import {DataSource} from 'typeorm'

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "test",
    password: "test",
    database: "test",
    synchronize: true,
    logging: true,
    entities: [Post, Category]
})
```

这个`DataSource`中:

+ `type`是必填的,可选范围为"mysql", "postgres", "cockroachdb", "sap", "spanner", "mariadb", "sqlite", "cordova", "react-native", "nativescript", "sqljs", "oracle", "mssql", "mongodb", "aurora-mysql", "aurora-postgres", "expo", "better-sqlite3", "capacitor".

+ `entities`,必填,用来注册声明好的映射的对象,可以指定类名或者声明文件的路径等.只有被注册的`entity`才会有用

+ `poolSize`用来设置连接池大小,DataSource也是支持连接池的.

+ `synchronize`指示是否应在每次启动应用程序时自动创建数据库架构.通常不要在生产中使用此选项否则可能会丢失生产数据.

剩下的就要根据不同的数据库填写不同的设置项了,具体可以看[官方文档](https://typeorm.io/data-source-options#what-is-datasourceoptions)

在创建好后则使用`.initialize()`来初始化建立连接即可.


```js
AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
```

需要注意目前暂时还不能将创建操作滞后到读入配置后,因此一个常见的办法是先用一个全局对象比如`AppDataSource`放在一个全局可访问的模块中,然后单独构造一个`init(opt)`函数用于在传入配置后替换这个对象

+ `models/db.ts`

    ```ts
    import { DataSource,DataSourceOptions } from 'typeorm'

    export let AppDataSource = new DataSource()
    let inited = false
    export async function InitAppDataSource (options: DataSourceOptions): boolean {
        if (inited){
            return false
        }
        AppDataSource = new DataSource(options)
        await AppDataSource.initialize()
        inited=true
        return true
    }
    ```


+ `main.ts`


    ```ts
    import {AppDataSource,InitAppDataSource} from './models/db'
    import {}

    InitAppDataSource().then((res)=>{
        const userRepository = dataSource.getRepository(User)
        AserRepository.find({ skip: 2, take: 5 }
    }))
    ```

## 使用风格

`typeorm`支持两种风格的使用方式

+ `Data Mapper`

+ `Active Record`

这两种风格在映射对象声明和请求处理上并不一致.

### Active Record风格

所谓Active Record即使用`entity`对象作为操作主体.整体思路是以`BaseEntity`为基类构造`entity`类,然后每次用的时候就使用`entity`类或其实例执行对应方法即可.`entity`对象会使用默认的`DataSource`执行请求

#### 映射对象声明


#### 请求处理 

### Data Mapper风格

所谓Data Mapper风格即使用`AppDataSource`中构造的`Repository`作为操作主体,`entity`类作为参数.这种风格是typeorm最主要的接口风格.其优点是连接管理和`entity`定义解构,

#### 映射对象声明


#### 请求处理