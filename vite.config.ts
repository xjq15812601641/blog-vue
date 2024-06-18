import type { UserConfig, ConfigEnv } from 'vite';
import pkg from './package.json'; // 导入package.json文件
import dayjs from 'dayjs'; // 导入dayjs库
import { loadEnv } from 'vite'; // 导入loadEnv函数
import { resolve } from 'path'; // 导入resolve函数
import { generateModifyVars } from './build/generate/generateModifyVars'; // 导入generateModifyVars函数
import { createProxy } from './build/vite/proxy'; // 导入createProxy函数
import { wrapperEnv } from './build/utils'; // 导入wrapperEnv函数
import { createVitePlugins } from './build/vite/plugin'; // 导入createVitePlugins函数
import { OUTPUT_DIR } from './build/constant'; // 导入OUTPUT_DIR常量

// 定义函数，用于解析路径
function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

// 从package.json文件中获取dependencies、devDependencies、name和version信息
const { dependencies, devDependencies, name, version } = pkg;

// 定义__APP_INFO__对象，包含应用程序信息和最后构建时间
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
};

// 导出默认配置对象
export default ({ command, mode }: ConfigEnv): UserConfig => {

  const root = process.cwd(); // 使用Node.js全局对象的cwd方法获取当前使用nodejs的项目的绝对路径

  const env = loadEnv(mode, root); // loadEnv会根据mode(当前构建模式）和root参数去查找对应的环境文件（.env、.env.production、.env.development等）



  const viteEnv = wrapperEnv(env);  //将合并好的env属性的值转为合适的类型

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv;

  const isBuild = command === 'build';  // command === 'build'判断是否为true

  return {
    base: VITE_PUBLIC_PATH,//env定义的 ‘./‘
    root,//env定义的项目绝对路径。
    resolve: {
      alias: [
        {find: /\/@\//, replacement: pathResolve('src') + '/',},//使用/@/来引用项目中的src目录
        {find: /\/#\//, replacement: pathResolve('types') + '/',},//使用/#/来引用项目中的types目录
      ],//配置路径别名
    },//alias是vite的其中一个配置项
    server: {
      host: "0.0.0.0",//true表示能使用主机名的ip访问，否则只能用localhost
      hmr: true,
      cors: true,
      port: VITE_PORT,//env定义的端口号
      open: false,
      proxy: createProxy(VITE_PROXY),//定义要访问的服务器的端口
    },//server是vite的其中一个配置项
    build: {
      minify: 'terser',//用Terser压缩项目的代码文件
      outDir: OUTPUT_DIR,//构建后的文件输出到指定的目录dist
      terserOptions: {
        compress: {
          keep_infinity: true,//keep_infinity表示保留Infinity关键字
          drop_console: VITE_DROP_CONSOLE,//env定义为false，删除打印语句
        },//通过compress选项配置
      },//是Terser压缩工具的配置选项
      brotliSize: false,//禁用Brotli压缩
      chunkSizeWarningLimit: 2000,//设置代码块大小警告的阈值2000
    },//build是vite的其中一个配置项
    define: {
      __INTLIFY_PROD_DEVTOOLS__: false,//控制国际化插件(Intlify)在生产环境下是否加载开发工具
      __APP_INFO__: JSON.stringify(__APP_INFO__),//存储一些应用信息或配置，可以在项目的各个地方使用
    },//define是Vite构建工具的配置项之一
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: generateModifyVars(),//生成并应用Less的全局样式变量
          javascriptEnabled: true,//启用Less中的JavaScript表达式，允许在Less中使用JavaScript表达式来动态生成样式
        },//表示配置Less预处理器的选项
      },//用于配置CSS预处理器的选项
    },//css是Vite构建工具的配置项之一
    plugins: createVitePlugins(viteEnv, isBuild),//plugins是Vite构建工具的配置项之一，
    optimizeDeps: {
      include: ['@vue/runtime-core', '@vue/shared', '@iconify/iconify'],
    },
  };
};
