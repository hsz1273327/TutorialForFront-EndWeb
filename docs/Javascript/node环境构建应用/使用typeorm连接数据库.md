# 使用typeorm连接数据库

[typeorm](https://typeorm.io/)恐怕是这部分中最值得学一下的工具,几乎所有场景下的关系数据库都可以用它做orm.而在前端工程化的今天,关系数据库实在是太重要了.

本项目的例子在[node-orm分支](https://github.com/hsz1273327/TutorialForFront-EndWeb/tree/node-orm)

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


如果你用的tyepscript.需要在`tsconfig.json`中启动如下设置

```json
"emitDecoratorMetadata": true,
"experimentalDecorators": true,
```

和多数orm一样,`typeorm`的使用也分为3块

+ 连接管理
+ 映射对象声明
+ 请求处理

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

需要注意目前暂时还不能将创建操作滞后到读入配置后,因此一个常见的办法是先用一个对象比如`AppDataSource`放在一个全局可访问的模块中,然后单独构造一个`GetOrCreateDataSource(opt)`函数用于在未创建时传入配置后初始化这个对象,已经创建过时则直接返回这个对象.

+ `models/db.js`

    ```ts
    import { DataSource, DataSourceOptions } from 'typeorm'
    import { User } from './entity/user'

    let AppDataSource: DataSource = null
    let inited = false
    export async function GetOrCreateDataSource(options?: DataSourceOptions): Promise<DataSource> {
        if (inited) {
            return AppDataSource
        }
        if (!options) {
            throw "create datasource need params options"
        }
        Object.assign(options,{entities:[User]})
        AppDataSource = new DataSource(options)
        await AppDataSource.initialize()
        User.useDataSource(AppDataSource)
        inited = true
        return AppDataSource
    }
    ```

    这个函数还有一个职能就是注册`entity`,虽然配制`entities`可以用路径来指示,但毕竟经过tsc,webpack等各种环境一顿折腾我们很难保证能够正确加载,还不如直接用import进来的类来注册更加稳健.

+ `main.ts`

    ```ts
    import { GetOrCreateDataSource } from './models/db.js'

    GetOrCreateDataSource({
        type: "sqlite",
        database: "./test.db",
        // entities:["models/**/entity/*.js"],
        synchronize:true
    })
    ...
    ```

## 映射对象声明

我们继续丰富上面的例子,加上`User`这个指代`user`表的entity类

+ `entity/user.ts`

    ```ts
    import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm"

    @Entity()
    export class User extends BaseEntity {
        @PrimaryGeneratedColumn()
        id: number

        @Column()
        firstName: string

        @Column()
        lastName: string

        @Column({default:false})
        isActive: boolean

        @CreateDateColumn()
        createAt: Date

        static findByName(firstName: string, lastName: string) {
            return this.createQueryBuilder("user")
                .where("user.firstName = :firstName", { firstName })
                .andWhere("user.lastName = :lastName", { lastName })
                .getMany()
        }
    }
    ```

`entity`类是一个继承了`BaseEntity`且使用装饰器`@Entity`装饰的类.

`@Entity(options?: EntityOptions)`装饰器标明了这是一个`表实体`,`实体`可以是表也可以是一个`view`,而`view`则可以使用装饰器`@ViewEntity(options?: ViewEntityOptions)`来装饰.

他们都有若干可选的参数,但通常我们不填就好

### 列声明

在内部我们使用属性装饰器`@Column()`来声明属性是表或view中的一个列.根据列的特点不同有如下装饰器可选

+ `@Column`,最一般的列
+ `@PrimaryColumn`,主键列
+ `@Generated`,自增列
+ `@PrimaryGeneratedColumn`,自增主键列
+ `@CreateDateColumn`,创建时间专用列
+ `@UpdateDateColumn`,更新时间专用列
+ `@DeleteDateColumn`,删除时间专用列
+ `@VersionColumn`,自动更新的版本列,调用`save`后版本就会更新
+ `@VirtualColumn`,虚拟列,这是一个不会真存到数据库里的只读列,它会在每次填入数据时执行其中设置的`query`字段中设置的函数构造的请求,然后将结果放入这个被装饰的字段.

    ```ts
    @VirtualColumn({ query: (alias) => `SELECT COUNT("name") FROM "employees" WHERE "companyName" = ${alias}.name` })
    totalEmployeesCount: number;
    ```

这些装饰器中也可以设置sql建表时的各种设置,比如`default`,`nullable`,`unique`,`comment`,`enum`等等

我们还可以使用额外的装饰器`@Index`来装饰属性和`entity`类,用于声明索引

```ts
@Entity()
@Index(["firstName", "lastName"], { unique: true }) //联合索引,且唯一
export class User {
    @Index()
    @Column()
    firstName: string

    @Index()
    @Column()
    lastName: string
}
```

也可以使用装饰器`@Check`装饰`entity`类来设置检查项

```ts
@Entity()
@Check(`"age" > 18`)
export class User {
    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number
}
```

### 关系声明

关系数据库自然还有关系,所谓关系大致可以分为

+ 1对1
+ 1对多
+ 多对多

#### 1对1

我们使用装饰器`@JoinColumn`声明这个字段是join出来的字段,用装饰器`@OneToOne`来声明表中字段的关系

```ts
import { Entity, PrimaryGeneratedColumn, Column,OneToOne ,JoinColumn} from "typeorm"

@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    gender: string

    @Column()
    photo: string
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToOne(() => Profile)
    @JoinColumn()
    profile: Profile
}

```

#### 1对多

一对多需要有方向,即是自己是1还是另一边是1,因此有两个装饰器--`@ManyToOne`和`@OneToMany`

```ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { User } from "./User"

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    url: string

    @ManyToOne(() => User, (user) => user.photos)
    user: User
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => Photo, (photo) => photo.user)
    photos: Photo[]
}
```

像上面这个例子,一个人可以有多个照片,一个照片只归属于一个人,是典型的一(人)对多(照片),因此在人那边声明使用`@OneToMany`,在照片那边则使用`@ManyToOne`

#### 多对多

下面这个例子我们可以看到多对多关系的写法

```ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm"

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
}


@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    text: string

    @ManyToMany(() => Category)
    @JoinTable()
    categories: Category[]
}
```

类似一对一,多对多需要额外的装饰器`@JoinTable()`.

### 钩子

typeorm提供了多个钩子方法装饰器用于在不同操作过程中注册回调,包括

+ `@AfterLoad`,在从数据库中加载数据后被调用
+ `@BeforeInsert`,在插入数据到数据库前被调用
+ `@AfterInsert`,在插入数据到数据库后被调用
+ `@BeforeUpdate`,在更新数据到数据库前被调用
+ `@AfterUpdate`,在更新数据到数据库后被调用
+ `@BeforeRemove`,在从数据库中删除数据前被调用
+ `@AfterRemove`,在从数据库中删除数据后被调用
+ `@BeforeSoftRemove`,在从数据库中软删除数据前被调用
+ `@AfterSoftRemove`,在从数据库中软删除数据后被调用
+ `@BeforeRecover`,在从数据库中恢复数据前被调用
+ `@AfterRecover`,在从数据库中恢复数据后被调用

## 请求处理

`typeorm`支持两种风格的使用方式

+ `Active Record`,即使用`entity`对象作为操作主体.比如:

    ```ts
    const user = new User()
    user.firstName = "Timber"
    user.lastName = "Saw"
    user.isActive = true
    await user.save()

    // example how to remove AR entity
    await user.remove()

    // example how to load AR entities
    const users = await User.find({ skip: 2, take: 5 })
    const newUsers = await User.findBy({ isActive: true })
    const timber = await User.findOneBy({ firstName: "Timber", lastName: "Saw" })
    ```

+ `Data Mapper`,即使用`AppDataSource`构造`Repository`作为操作主体,`entity`类作为参数.比如:

    ```ts
    const userRepository = dataSource.getRepository(User)

    // example how to save DM entity
    const user = new User()
    user.firstName = "Timber"
    user.lastName = "Saw"
    user.isActive = true
    await userRepository.save(user)

    // example how to remove DM entity
    await userRepository.remove(user)

    // example how to load DM entities
    const users = await userRepository.find({ skip: 2, take: 5 })
    const newUsers = await userRepository.findBy({ isActive: true })
    const timber = await userRepository.findOneBy({
        firstName: "Timber",
        lastName: "Saw",
    })
    ```

`entity`类继承了基类`BaseEntity`,它提供了绑定`DataSource`的能力,并提供了常用的操作方法,这就是`Active Record`风格的基础,包括:

> 实例方法

+ `save(options?: SaveOptions): Promise<this>`,保存实例当前状态的数据到数据库
+ `remove(options?: RemoveOptions): Promise<this>`,从数据库中删除当前实例对应的数据
+ `softRemove(options?: SaveOptions): Promise<this>`,从数据库中软删除当前实例对应的数据
+ `recover(options?: SaveOptions): Promise<this>`,从数据库中恢复当前实例对应的数据(已经被软删除)
+ `reload(): Promise<void>`从数据库中重新拉数据替换当前实例中字段的值

> 静态方法

+ `static useDataSource(dataSource: DataSource | null): void`,在上一步中已经使用过,将`entity`类和`DataSource`关联

+ `static getRepository<T extends BaseEntity>(this: { new (): T;} & typeof BaseEntity): Repository<T>`,从关联`DataSource`中提取当前`entity`的`Repository`对象

+ `static hasId(entity: BaseEntity): boolean`,检查表中是否存在传入对象中id值对应的数据

+ `static insert<T extends BaseEntity>(this: { new (): T; } & typeof BaseEntity, entity: QueryDeepPartialEntity<T> | QueryDeepPartialEntity<T>[]): Promise<InsertResult>`,插入一条数据

+ `static update<T extends BaseEntity>(this: { new (): T; } & typeof BaseEntity, criteria: string | string[] | number | number[] | Date | Date[] | ObjectId | ObjectId[] | FindOptionsWhere<T>, partialEntity: QueryDeepPartialEntity<T>): Promise<UpdateResult>`更新一条数据

+ `static upsert<T extends BaseEntity>(this: { new (): T;} & typeof BaseEntity, entityOrEntities: QueryDeepPartialEntity<T> | QueryDeepPartialEntity<T>[], conflictPathsOrOptions: string[] | UpsertOptions<T>): Promise<InsertResult>`,更新一条数据,如果数据不存在则插入

+ `static delete<T extends BaseEntity>(this: { new (): T; } & typeof BaseEntity, criteria: string | string[] | number | number[] | Date | Date[] | ObjectId | ObjectId[] | FindOptionsWhere<T>): Promise<DeleteResult>`,删除一条数据

+ `static exists<T extends BaseEntity>(this: { new (): T; } & typeof BaseEntity, options?: FindManyOptions<T>): Promise<boolean>`,检查数据是否存在于表中

+ `static existsBy<T extends BaseEntity>(this: { new (): T; } & typeof BaseEntity, where: FindOptionsWhere<T>): Promise<boolean>`,检查数据是否存在于表中

+ `static count<T extends BaseEntity>(this: { new (): T; } & typeof BaseEntity, options?: FindManyOptions<T>): Promise<number>`,计算符合条件数据的条数

+ `static countBy<T extends BaseEntity>(this: { new (): T; } & typeof BaseEntity, where: FindOptionsWhere<T>): Promise<number>`,计算符合条件数据的条数

+ `static sum<T extends BaseEntity>(this: { new (): T; } & typeof BaseEntity, columnName: PickKeysByType<T, number>, where: FindOptionsWhere<T>): Promise<number | null>`,计算列的和

+ `static average<T extends BaseEntity>(this: { new (): T; } & typeof BaseEntity, columnName: PickKeysByType<T, number>, where: FindOptionsWhere<T>): Promise<number | null>`,计算列的均值

+ `static minimum<T extends BaseEntity>(this: { new (): T; } & typeof BaseEntity, columnName: PickKeysByType<T, number>, where: FindOptionsWhere<T>): Promise<number | null>`,计算列中最小值

+ `static maximum<T extends BaseEntity>(this: { new (): T; } & typeof BaseEntity, columnName: PickKeysByType<T, number>, where: FindOptionsWhere<T>): Promise<number | null>`,计算列中最大值

+ `static find<T extends BaseEntity>(this: { new (): T; } & typeof BaseEntity, options?: FindManyOptions<T>): Promise<T[]>;`,查找所有符合要求的列

+ `static findBy<T extends BaseEntity>(this: { new (): T; } & typeof BaseEntity, where: FindOptionsWhere<T>): Promise<T[]>`,查找所有符合要求的列

+ `static findAndCount<T extends BaseEntity>(this: { new (): T;} & typeof BaseEntity, options?: FindManyOptions<T>): Promise<[T[], number]>`,查找所有符合要求的列并计数

+ `static findAndCountBy<T extends BaseEntity>(this: { new (): T;} & typeof BaseEntity, where: FindOptionsWhere<T>): Promise<[T[], number]>`,查找所有符合要求的列并计数

+ `static findOne<T extends BaseEntity>(this: { new (): T; } & typeof BaseEntity, options: FindOneOptions<T>): Promise<T | null>`,查找第一个符合要求的列

+ `static findOneBy<T extends BaseEntity>(this: { new (): T; } & typeof BaseEntity, where: FindOptionsWhere<T>): Promise<T | null>`,查找第一个符合要求的列

+ `static findOneOrFail<T extends BaseEntity>(this: { new (): T;} & typeof BaseEntity, options: FindOneOptions<T>): Promise<T>`,查找第一个符合要求的列,找不到就抛出错误

+ `static findOneByOrFail<T extends BaseEntity>(this: { new (): T; } & typeof BaseEntity, where: FindOptionsWhere<T>): Promise<T>`,查找第一个符合要求的列,找不到就抛出错误

+ `static query<T extends BaseEntity>(this: { new (): T; } & typeof BaseEntity, query: string, parameters?: any[]): Promise<any>`,用sql语句请求,并将结果转为entity对象

+ `static clear<T extends BaseEntity>(this: { new (): T; } & typeof BaseEntity): Promise<void>`,清空表中数据

这些方法在`Repository`中也都有,使用哪种风格完全看个人喜好,我个人更喜欢`Active Record`风格.