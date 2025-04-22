import { Command, Option, OptionValues } from 'commander'

function getCmdOptions(): OptionValues {
  const program = new Command()
  program
    .option('--window_limit <number>', '允许的窗口数') // 默认窗口限制数为1
    .option('--can_background', '是否允许后台运行') // 默认不启用调试模式
    .option('--window_hide_as_close', '是否将窗口的关闭改为隐藏') // 默认不启用调试模式
    .addOption(new Option('--usercmd <char>', '用户命令').choices(['cleansetting', 'exit']))
    .description('Electron 应用程序')

  program.parse(process.argv)
  const options = program.opts()
  console.log('解析的参数:', options)
  return options
}

export { getCmdOptions }
