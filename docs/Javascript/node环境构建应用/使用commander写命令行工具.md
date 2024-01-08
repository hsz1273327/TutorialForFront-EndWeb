# 使用commander写命令行工具

node标准库提供了[`process.argv`](https://dev.nodejs.cn/learn/nodejs-accept-arguments-from-the-command-line/)用于解析命令行参数,但太简陋了.[commander](https://github.com/tj/commander.js/blob/master/Readme_zh-CN.md)是一个相对更符合后端开发人员使用习惯的选择.

## 基本接口

和python标准库的`argparse`类似.`commander`也是通过选项来声明命令行参数的解析行为的,只是`argparse`用参数,而`commander`更加贴合写js用户的使用习惯用了pipeline.同时由于js是弱类型语言,解析出来的参数都是字符串也就不存在需要校验类型这一说了.下面是最基础的一个样例:

```js
const { Command, Option} = require('commander');
const program = new Command();

program
  .name('string-util')
  .description('CLI to some JavaScript string utilities')
  .version('0.8.0');
  .argument('<string>', 'string to split')
  .option('--first', 'display just the first substring')
  .addOption(new Option('-s, --separator <char>', 'separator character', ',').choices([',', '::', ';']))
  .action((str, options) => {
    const limit = options.first ? 1 : undefined;
    console.log(str.split(options.separator, limit));
  });

program.parse();

```

可以看到`argument`是参数,`option`就是flag参数,`action`则是执行的操作,至于其他,就是写常规的说明描述类选项,在所有这些设置完后,调用`program.parse()`执行参数解析即可.

+ `argument`中第一位是参数被解析到的类型申明,第二位为说明

+ `option`中第一位是flag形式,全靠字符串解析,可以使用`-x`声明短flag,`--xxx`声明长flag.如果在长flag声明中有写`<xxx>`则这个flag是个参数型选项;如果长flag声明中有`[xxx]`则说明待解析的参数字符串中这个flag后面如果有填参数就当参数型选项处理,没有就当boolean型选项处理;如果都没有就是boolean型选项,出现就是`true`,没出现就是`false`.如果可以是参数型选项且参数是列表,则使用`<xxx...>`或`[xxx...]`的形式声明.第二位是说明,第三位可选是默认值.如果希望一个flag是必填则使用接口`.requiredOption`代替接口`.option`即可.如果flag限制复杂,比如是枚举,或者要声明和其他flag的冲突关系等,可以使用`addOption`接口传入一个设置好的`Option`对象即可,

+ 在`action`中参数是一个第一位为`argument`中定义的参数,第二位为`option`定义参数融合而成的一个对象,第三个可选的是命令文本本身.

## 层级命令

commander也支持编写类似git那样复杂的层级命令

```js
const { Command, Option} = require('commander');
const program = new Command();

program
  .name('string-util')
  .description('CLI to some JavaScript string utilities')
  .version('0.8.0');



program.command('split1')
  .description('Split a string into substrings and display as an array')
  .argument('<string>', 'string to split')
  .option('--first', 'display just the first substring')
  .addOption(new Option('-s, --separator <char>', 'separator character', ',').choices([',', '::', ';']))
  .action((str, options) => {
    const limit = options.first ? 1 : undefined;
    console.log(str.split(options.separator, limit));
  });


program.command('split2')
  .description('Split a string into substrings and display as an array')
  .argument('<string>', 'string to split')
  .option('--first', 'display just the first substring')
  .addOption(new Option('-s, --separator <char>', 'separator character', '/').choices([',', '::', ';']))
  .action((str, options) => {
    const limit = options.first ? 1 : undefined;
    console.log(str.split(options.separator, limit));
  });


program.parse();

```

每调一次`command`就是一个子命令,一样是为不同的子命令绑定`argument`,`option`,`action`后执行总体的`program.parse()`即可.