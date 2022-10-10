# nativescript和nativescript-vue

[nativescript](https://github.com/NativeScript/NativeScript)项目本质上是一个用于让js可以访问到移动端原生资源的框架,它实际是跑在[android](https://github.com/NativeScript/android-runtime)或者[ios](https://github.com/NativeScript/android-runtime)上分别构建的runtime上的(类似java-runtime).可以理解为只是一个中间层(类似jdk).而具体对接特定的开发框架又需要使用特定的项目(类似java,scala,jython这类).比如我们要使用vue则需要使用项目[nativescript-vue](https://github.com/nativescript-vue/nativescript-vue).这种模块化当然相当清晰,但也带来了使用上的复杂性,好在官方构造了一个命令行工具[ns](https://github.com/NativeScript/nativescript-cli)来解决这个问题.

## nativescript的安装

nativescript安装分为两步:

1. 安装原生开发环境.注意只有mac os才能同时安装ios和android的开发环境,window和linux都只能构造安卓开发环境.本文以mac为例子介绍.windows和linux安装android开发环境可以参考mac下的操作.

2. 安装nativescript命令行工具

### mac下安装原生开发环境

#### ios开发环境

首先确保你的mac os版本不要太低,我的目前是11.6.4,而且是intel处理器版本,可以完美使用

1. 安装xcode,注意只有命令行工具不够.
2. 确认`XCode > Preferences > Locations`位置`Command Line Tools`已经被设置
3. 安装node环境,`brew install node`
4. 安装cocoapods,`brew install cocoapods`
5. 安装watchman,`brew install watchman`
6. 安装xcodeproj,`sudo gem install xcodeproj`
7. 设置`XCode > Preferences > Components`位置选择一个版本的iphone的simulator下载

#### android开发环境

1. 安装jdk

    ```bash
    brew tap homebrew/cask-versions
    brew install --cask zulu11
    ```

2. 安装[Android Studio](https://developer.android.google.cn/studio),
3. 进入Android Studio,进入`more actions -> SDK manager`,在`sdk platform`中选择需要的sdk版本安装,并在`sdk tools`中必须至少安装`android sdk build-tools`和`android sdk commandline-tools`,同时记录下安装到的位置,即`Android SDK Location`(如果要兼容react native需要选择`sdk platform`为`android 11(R)`,`sdk tools`中需要安装版本为`30.0.2`的`android sdk build-tools`),同时创建一个simulator.

4. 设置环境变量

    ```bash
    #==============================android
    export ANDROID_SDK_ROOT=/Users/mac/libs/android
    export ANDROID_HOME=$ANDROID_SDK_ROOT
    export PATH=$PATH:$ANDROID_SDK_ROOT/emulator
    export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools
    export PATH=$PATH:$ANDROID_SDK_ROOT/tools
    export PATH=$PATH:$ANDROID_SDK_ROOT/tools/bin

    ```

### 安装nativescript命令行工具

`npm install -g nativescript`

可以用`ns doctor ios`检查ios环境是否可用,用`ns doctor android`测试android环境是否可用

### nativescript和node的关系

nativescript借助webpack打包,它会将js代码编译为对应平台上runtime支持的程序.因此可以理解为编译期在开编译机的node上执行,而运行时则在目标设备的runtime上,与node无关.因此我们需要注意很多依赖node标准库的库是无法直接在nativescript上使用的,反而因为浏览器上没有node环境中的标准库,所以不少可以使用.但如果你使用ts进行开发,很多老旧的浏览器库会找不到类型声明文件.总体来说nativescript和node上的库并不能完全通用.

下面列举常用功能可用的库(持续更新):

+ id生成: [pure-uuid](https://github.com/rse/pure-uuid)
+ 数字签名,hash,加密: [crypto-js](https://github.com/brix/crypto-js)
+ jwt:[jwt-decode](https://github.com/auth0/jwt-decode)

### nativescript-vue的相关组件

+ 页面元素组件,nativescript-vue原生组件可以在<https://nativescript-vue.org/cn/docs/elements/layouts/absolute-layout/>页面查看.
+ 设备接口组件,多以插件的形式存在,官方插件可以在<https://docs.nativescript.org/plugins/>这里看到,社区维护的插件可以在<https://github.com/orgs/nativescript-community/repositories?type=all>下找到,另外还有一个比较大的组件集合<https://github.com/nstudio>.第三方插件可以在插件市场<https://market.nativescript.org/>中查找,注意第三方插件良莠不齐,最好先去看看他们的源码和下载量.当然也有不少插件其实是个人维护,就只能在github上搜关键字查找了.找到需要的插件后,在项目下执行`ns plugin add <插件名>`就可以安装到项目了.

### nativescript-vue与vue的关系

`nativescript-vue`其实和`vue`本体没什么关系,它只是使用vue2语法来写构造原生界面而已.具体来说

+ 使用的基础标签不同,`vue`是用的是html标准标签,`nativescript-vue`则是使用`nativescript-vue`封装的`nativescript`标签
+ `nativescript-vue`官方在实验性的适配`vue-router`,因此目前无法支持`vue-router`,只能使用内置的[manual-routing方式](https://nativescript-vue.org/en/docs/routing/manual-routing/)
+ `nativescript-vue`只能使用`vuex 3`(最高版本3.6.2)
+ `nativescript-vue`通过插件调用移动端上的设备,而vue走浏览器的html5接口

### 周边工具与设置

nativescript-vue也提供了一些工具方便开发:

+ `devtools`,用于观察组件树,方便调试,作用类似vue中的chrome插件`vuejs devtools`(亲测无用)

    ```bash
    npm install --save @vue/devtools@^5.3.4 @triniwiz/nativescript-toasty @triniwiz/nativescript-socketio@4.0.1 nativescript-vue-devtools
    ```

    使用方法:

    1. 在入口文件中导入devtools模块(亲测无法使用)

        ```ts
        import VueDevtools from 'nativescript-vue-devtools'
        Vue.use(VueDevtools)
        ```

    2. 运行devtools

        ```bash
        npx vue-devtools
        ```

    3. 重建并运行您的应用程序

        ```bash
        rm -rf platforms
        ns run android --bundle | ns run ios --bundle
        ```

+ vscode插件`NativeScript`,个人感觉不及命令行直接输入方便,可以不装
+ vscode插件`NativeScript-Vue Snippets`,可以识别`NativeScript-Vue`中的标签,用于提供代码模板

如果你使用ts开发,可能会出现报错`无法使用 JSX,除非提供了 “--jsx“ 标志。ts(17004)`,这种需要修改`tsconfig.json`配置文件增加一项配置.

```json
{
  "compilerOptions": {
    "jsx": "preserve",
    ...
  },
  ...
}
```

### hello world

惯例的我们来一个hello world项目开始我们的学习,我们依然使用vue语法.这个项目来自官网,主要是让我们大致对native-script-vue的用法有个直观认识.
本项目最终代码在[native-helloworld](https://github.com/hsz1273327/TutorialForFront-EndWeb/tree/native-helloworld)

首先我们先用命令行工具构造一个项目模板

```bash
ns create myCoolApp --ts --vue
```

上面的命令我们会创建一个名为`myCoolApp`的目录,其中就是我们项目的模板,这个项目将:

+ 使用typescript作为开发语言
+ 使用vue 2作为开发框架
+ 使用css或者scss作为样式表语言控制样式.

其目录中会有一个名为`app`的目录,这就是我们源码存放的位置.另一个比较重要的文件夹是`App_Resources`,它用于控制打包后应用程序的配置,比如使用的图标等就是它控制的,另外如果有针对不同平台的原生代码也是放在这里,关于应用打包我们在本系列最后介绍.

我们可以先什么都不做,执行`ns debug android`来编译下现在的项目.正常的话就会跳出android的默认simulator,并开始编译项目,当编译完成后模拟器中就会跳出app的界面.

#### 源码结构

通常app目录下会有如下文件/文件夹

+ `app.ts`|`app.js`,项目入口文件
+ `app.scss`|`app.css`,项目的全局样式定义
+ `fonts/`,项目使用的字体文件
+ `components/`,存放vue组件,通常我会习惯增加一个`views/`文件夹存放以`Page`标签为最外层标签的页面视图定义文件,而`components/`中则是存放非`Page`标签的组件组合
+ `assets/`,应用中使用到的静态资源,主要是图片这类
+ `models/`,应用的的数据模型,一般本地数据的管理会放这里
+ `store/`,定义状态,一般是vuex使用,用于管理界面内部状态
+ `apis/`,定义访问外部接口数据的行为,有时会和`models`合并
`

#### 正式开始helloworld

首先我们来看整体看下每一个文件

##### 入口文件`app.ts`

```typescript
import Vue from 'nativescript-vue'
import Home from './views/Home.vue'

declare let __DEV__: boolean;

Vue.config.silent = !__DEV__

new Vue({
  render: (h) => h('frame', [h(Home)]),
}).$start()

```

其中

```ts

declare let __DEV__: boolean;

Vue.config.silent = !__DEV__
```

用于声明对执行环境的判断,此处用于在执行`ns build <platform>`时设置`--env.production`后取消vue的log.

```ts
new Vue({
  render: (h) => h('frame', [h(Home)]),
}).$start()
```

则是应用的启动入口.在nativescript-vue中我们并不需要`index.html`这样的界面入口,直接一个vue的根实例即可.

##### 数据定义`models/Flick.ts`

这个例子我们并没有连接外部数据.数据就定义在这个位置.

这个例子中我们给出了3个电影的介绍信息.

```ts
interface FlickModel {
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

class FlickService {
  private flicks: FlickModel[] = [
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
            'The Book of Mormon was conceived by Trey Parker, Matt Stone and Robert Lopez. Parker and Stone grew up in Colorado, and were familiar with The Church of Jesus Christ of Latter-day Saints and its members. They became friends at the University of Colorado Boulder and collaborated on a musical film, Cannibal! The Musical (1993), their first experience with movie musicals. In 1997, they created the TV series South Park for Comedy Central and in 1999, the musical film South Park: Bigger, Longer & Uncut. The two had first thought of a fictionalized Joseph Smith, religious leader and founder of the Latter Day Saint movement, while working on an aborted Fox series about historical characters. Their 1997 film, Orgazmo, and a 2003 episode of South Park, "All About Mormons", both gave comic treatment to Mormonism. Smith was also included as one of South Park\'s "Super Best Friends", a Justice League parody team of religious figures like Jesus and Buddha.'
        },
        {
          title: 'Development',
          body: `During the summer of 2003, Parker and Stone flew to New York City to discuss the script of their new film, Team America: World Police, with friend and producer Scott Rudin (who also produced South Park: Bigger, Longer & Uncut). Rudin advised the duo to see the musical Avenue Q on Broadway, finding the cast of marionettes in Team America similar to the puppets of Avenue Q. Parker and Stone went to see the production during that summer and the writer-composers of Avenue Q, Lopez and Jeff Marx, noticed them in the audience and introduced themselves. Lopez revealed that South Park: Bigger, Longer & Uncut was highly influential in the creation of Avenue Q. The quartet went for drinks afterwards, and soon found that each camp wanted to write something involving Joseph Smith. The four began working out details nearly immediately, with the idea to create a modern story formulated early on. For research purposes, the quartet took a road trip to Salt Lake City where they "interviewed a bunch of missionaries—or ex-missionaries." They had to work around Parker and Stone\'s South Park schedule. In 2006, Parker and Stone flew to London where they spent three weeks with Lopez, who was working on the West End production of Avenue Q. There, the three wrote "four or five songs" and came up with the basic idea of the story. After an argument between Parker and Marx, who felt he was not getting enough creative control, Marx was separated from the project.[10] For the next few years, the remaining trio met frequently to develop what they initially called The Book of Mormon: The Musical of the Church of Jesus Christ of Latter-day Saints. "There was a lot of hopping back and forth between L.A. and New York," Parker recalled.`
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
          body: `A reading was held in 2012, featuring Kelli Barret as Anya (Anastasia), Aaron Tveit as Dmitry, Patrick Page as Vladimir, and Angela Lansbury as the Empress Maria. A workshop was held on June 12, 2015, in New York City, and included Elena Shaddow as Anya, Ramin Karimloo as Gleb Vaganov, a new role, and Douglas Sills as Vlad.
          The original stage production of Anastasia premiered at the Hartford Stage in Hartford, Connecticut on May 13, 2016 (previews). The show was directed by Darko Tresnjak and choreography by Peggy Hickey, with Christy Altomare and Derek Klena starring as Anya and Dmitry, respectively.
          Director Tresnjak explained: "We've kept, I think, six songs from the movie, but there are 16 new numbers. We've kept the best parts of the animated movie, but it really is a new musical." The musical also adds characters not in the film. Additionally, Act 1 is set in Russia and Act 2 in Paris, "which was everything modern Soviet Russia was not: free, expressive, creative, no barriers," according to McNally.
          The musical also omits the supernatural elements from the original film, including the character of Rasputin and his musical number "In the Dark of the Night", (although that song’s melody is repurposed in the new number "Stay, I Pray You"), and introduces instead a new villain called Gleb, a general for the Bolsheviks who receives orders to kill Anya.`
        }
      ]
    }
  ]

  getFlicks(): FlickModel[] {
    return this.flicks
  }

  getFlickById(id: number): FlickModel | undefined {
    return this.flicks.find(flick => flick.id === id) || undefined
  }
}

export { FlickModel, FlickService }
```

与之相关的是`assets`文件夹下的图片资源

##### 视图`views`

+ `views/Home.vue`

    ```vue
    <template>
      <Page>
        <ActionBar title="NativeFlix" />
        <ListView
          height="100%"
          separatorColor="transparent"
          for="item in flicks"
          @itemTap="onFlickTap"
        >
          <v-template>
            <GridLayout
              height="280"
              borderRadius="10"
              class="bg-secondary"
              rows="*, auto, auto"
              columns="*"
              margin="5 10"
              padding="0"
            >
              <image row="0" margin="0" stretch="aspectFill" :src="item.image" />
              <label
                row="1"
                margin="10 10 0 10"
                fontWeight="700"
                class="text-primary"
                fontSize="18"
                :text="item.title"
              />
              <label
                row="2"
                margin="0 10 10 10"
                class="text-secondary"
                fontSize="14"
                textWrap="true"
                :text="item.description"
              />
            </GridLayout>
          </v-template>
        </ListView>
      </Page>
    </template>

    <script lang="ts">
    import Vue from "nativescript-vue";
    import { FlickService } from "../models/Flick";
    import Details from "./Details.vue";
    const flickService = new FlickService();

    export default Vue.extend({
      data() {
        return {
          flicks: flickService.getFlicks(),
        };
      },
      methods: {
        onFlickTap(args) {
          const id = args.item.id;
          this.$navigateTo(Details, {
            props: { id },
          });
        },
      },
    });
    </script>

    <style scoped lang="scss">
    @import "@nativescript/theme/scss/variables/blue";

    // Custom styles
    .fas {
      @include colorize($color: accent);
    }

    .info {
      font-size: 20;
      horizontal-align: center;
      vertical-align: center;
    }
    </style>
    ```

+ `views/Details.vue`

    ```vue
    <template>
      <Page>
        <ActionBar v-if="flick" :title="flick.title" />
        <ScrollView height="100%">
          <StackLayout>
            <Image margin="0" stretch="aspectFill" :src="flick.image" />
            <StackLayout padding="10 20">
              <StackLayout v-for="detail in flick.details" :key="detail.id">
                <Label
                  marginTop="15"
                  fontSize="16"
                  fontWeight="700"
                  class="text-primary"
                  textWrap="true"
                  :text="detail.title"
                />
                <Label
                  fontSize="14"
                  class="text-secondary"
                  textWrap="true"
                  :text="detail.body"
                />
              </StackLayout>
            </StackLayout>
          </StackLayout>
        </ScrollView>
      </Page>
    </template>

    <script lang="ts">
    import Vue from "nativescript-vue";
    import { FlickService } from "../models/Flick";
    const flickService = new FlickService();

    export default Vue.extend({
      props: ["id"],
      data() {
        return {
          flick: flickService.getFlickById(this.id),
        };
      },
    });
    </script>
    ```

可以看到一个nativescript-vue的组件依然是经典的vue3段式.

+ `template`段管组件结构

+ `script`段管组件逻辑

+ `style`段管样式

`script`和`style`基本和经典的vue2没有区别,主要区别在`template`段.

`template`段中最主要的是标签.注意,和浏览器环境并不一样,在浏览器中vue里用的标签都是平等的,但在nativescript-vue中有个特殊的标签`<Page>`.它必须在一个组件的最外层,表示这个Vue组件是一个页面.我们只可以用非`<Page>`标签封装自定义组件(虽然一般也不用).

标签`<ListView>`及其中的子节点使用了`for`属性而没有使用`v-for`,并不是说nativescript-vue不支持`v-for`,而是标签`<ListView>`的针对循环的一个优化.`v-for`会在页面上有多少渲染多少,而标签`<ListView>`的`for`属性则类似懒加载,当前页面展示到哪里就会渲染到哪里.

而从`Home`页面跳转至`Details`页面我们使用的是`this.$navigateTo(Details, {props: { id }});`接口,这也是目前唯一支持的[manual-routing方法](https://nativescript-vue.org/cn/docs/routing/manual-routing/)的常用模式

### hello world plus

上面的例子已经足以展示如何使用nativescript-vue构造界面,但真正的原生应用光有界面往往是不够的,往往都需要可以调用一些设备上的工具.我们对它进行一些改动,让他使用本地sqlite管理数据,替代在代码中写死数据.sqlite是一个基于文件的关系数据库,使用SQL语言管理数据,该工具在智能手机时代之前就已经在各种功能机上被广泛使用,无论android还是iphone我们都可以用它管理应用数据.这个项目保存在[native-helloworld-plus](https://github.com/hsz1273327/TutorialForFront-EndWeb/tree/native-helloworld-plus)分支.

我们需要修改的只有`model`层.主要也是修改`models`目录下的内容

+ `models/Flick.ts`,我们改用sqlite保存数据,并提供了`Init`方法用于初始化数据库

    ```ts
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
    //flicks 待存储的数据
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
              'The Book of Mormon was conceived by Trey Parker, Matt Stone and Robert Lopez. Parker and Stone grew up in Colorado, and were familiar with The Church of Jesus Christ of Latter-day Saints and its members. They became friends at the University of Colorado Boulder and collaborated on a musical film, Cannibal! The Musical (1993), their first experience with movie musicals. In 1997, they created the TV series South Park for Comedy Central and in 1999, the musical film South Park: Bigger, Longer & Uncut. The two had first thought of a fictionalized Joseph Smith, religious leader and founder of the Latter Day Saint movement, while working on an aborted Fox series about historical characters. Their 1997 film, Orgazmo, and a 2003 episode of South Park, "All About Mormons", both gave comic treatment to Mormonism. Smith was also included as one of South Parks "Super Best Friends", a Justice League parody team of religious figures like Jesus and Buddha.'
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
            body: `A reading was held in 2012, featuring Kelli Barret as Anya (Anastasia), Aaron Tveit as Dmitry, Patrick Page as Vladimir, and Angela Lansbury as the Empress Maria. A workshop was held on June 12, 2015, in New York City, and included Elena Shaddow as Anya, Ramin Karimloo as Gleb Vaganov, a new role, and Douglas Sills as Vlad.
          The original stage production of Anastasia premiered at the Hartford Stage in Hartford, Connecticut on May 13, 2016 (previews). The show was directed by Darko Tresnjak and choreography by Peggy Hickey, with Christy Altomare and Derek Klena starring as Anya and Dmitry, respectively.
          Director Tresnjak explained: "We have kept, I think, six songs from the movie, but there are 16 new numbers. We have kept the best parts of the animated movie, but it really is a new musical." The musical also adds characters not in the film. Additionally, Act 1 is set in Russia and Act 2 in Paris, "which was everything modern Soviet Russia was not: free, expressive, creative, no barriers," according to McNally.
          The musical also omits the supernatural elements from the original film, including the character of Rasputin and his musical number "In the Dark of the Night", (although that song’s melody is repurposed in the new number "Stay, I Pray You"), and introduces instead a new villain called Gleb, a general for the Bolsheviks who receives orders to kill Anya.`
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
        // 如果是编译环境不是production则每次检查如果数据库已经存在就删除
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
            let InsertDataSQL = `INSERT INTO  ${TABLE_NAME} (id,genre,title,image,url,description,details) VALUES`
            let values = []
            for (let flick of flicks) {
              let detailjson = JSON.stringify(flick.details)
              let v = ` (${flick.id}, '${flick.genre}', '${flick.title}', '${flick.image}', '${flick.url}','${flick.description}','${detailjson}' )`
              values.push(v)
            }
            InsertDataSQL += values.join(",")
            InsertDataSQL += ";"
            try {
              await DB.execSQL(InsertDataSQL);
            } catch (err) {
              console.error(`batch insert flick  into ${DB_NAME} get error ${err.message}`);
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
      }
    }
    //GetFlicks 获取flicks库存列表
    async function GetFlicks(): Promise<FlickModel[]> {
      const QueryListSQL = `
      SELECT id,title,image,description
      FROM ${TABLE_NAME}
      `
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
    ```

    在nativescript-vue中我们使用sqlite需要借助插件[nativescript-sqlite](https://github.com/NathanaelA/nativescript-sqlite/blob/master/src/README.md),安装好后只要导入即可


+ `app.ts`,我们在`created`和`beforeDestroy`挂载点分别挂载初始化函数和关闭函数

    ```ts
    ...
    import { Init,Close } from './models/Flick'

    ...

    new Vue({
      ...
      created: function () {
        Init()
      },
      beforeDestroy: function (){
        Close()
      }
    }).$start()
    ```

+ `views/Home.vue`,我们改用异步方式从数据库中获取数据

    ```vue
    <template>
    ...
    </template>

    <script lang="ts">
    ...
    import { GetFlicks,FlickModel } from "../models/Flick";
    ...
    interface Data {
      flicks: FlickModel[];
    }
    export default Vue.extend({
      data():Data {
        return {
          flicks: [],
        };
      },
      methods: {
        ...
      },
      created: function () {
        GetFlicks().then((res) => {
          this.flicks = res;
        });
      },
    });
    </script>

    <style scoped lang="scss">
    ...
    </style>
    ```

+ `views/Details.vue`类似的也是改用异步方式从数据库中获取详情

    ```vue
    <template>
    ...
    </template>

    <script lang="ts">
    ...
    import { GetFlickById, FlickDetail } from "../models/Flick";
    interface Data {
      flick: FlickDetail;
    }
    export default Vue.extend({
      props: {
        id: Number,
      },
      data(): Data {
        return {
          flick: {
            id: 0,
            genre: "",
            title: "",
            image: "",
            url: "",
            description: "",
            details: [],
          },
        };
      },
      computed: {
        ...
      },
      mounted: function () {
        GetFlickById(this.id).then((res) => {
          this.flick = res;
        });
      },
    });
    </script>
    ```
