import args from "commander"

export default (argv) => (bind) => {
    args.version('0.0.1')
        .description('run a static http server')
        .option('-P, --port [number]', 'port')
        .option('-H, --host [string]', 'hostname')
        .option('-D, --dburl [string]', 'dburl')
        .option('-R, --redisurl [string]', 'redisurl')
        .option('-C, --redischannel [string]', 'redischannel')
        .option('--config <path>', 'force a config file')
        .parse(argv)
    return bind(args)
}