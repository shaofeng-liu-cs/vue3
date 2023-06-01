import { fileURLToPath, URL } from 'node:url'
// import { resolve } from 'path'

import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// import copy from 'rollup-plugin-copy'
import visualizer from 'rollup-plugin-visualizer' //代码体积分析包

const environmentConfig = {
  geoserver: 'http://10.45.51.63', // http://10.45.51.161:8080  http://172.16.24.63:8000/oss/  http://192.168.193.18:8089
  online_design: 'http://10.45.51.63', // https://qrun.iwhalecloud.com http://10.45.51.162:8000   https://192.168.193.137/oss/ http://172.16.24.63:8000/
  gis_platform: 'http://10.45.51.63', // http://172.16.24.63:8000/oss/  http://10.45.50.133:7012 http://192.168.193.1/five-gv-customer
  arcgis: 'http://10.45.50.133:7051'
}
// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass'
          //       // directives: true,
          //       // version: "2.1.5",
        })
      ]
    }),
    visualizer({
      emitFile: true, //是否被触摸
      filename: 'test.html', //生成分析网页文件名
      open: true, //在默认用户代理中打开生成的文件
      gzipSize: true, //从源代码中收集 gzip 大小并将其显示在图表中
      brotliSize: true //从源代码中收集 brotli 大小并将其显示在图表中
    })
    // copy({
    //   targets: [{ src: './src/assets/logo.svg', dest: './dist/assets/image' }], // 路径
    //   hook: 'writeBundle', // 钩子，插件运行在rollup完成打包并将文件写入磁盘之前
    //   verbose: true // 在终端进行console.log
    // })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      scss: {
        // 引入 mixin.scss 这样就可以在全局中使用 mixin.scss中预定义的变量了
        // 给导入的路径最后加上 ;
        additionalData: '@use "@/assets/style/mixin.scss" as *;'
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // lib: {
    //   // Could also be a dictionary or array of multiple entry points
    //   entry: resolve(__dirname, 'src/main.js'),
    //   name: 'MyLib',
    //   // the proper extensions will be added
    //   fileName: 'my-lib'
    // },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
      // plugins: [
      //   copy({
      //     targets: [{ src: './src/assets/logo.svg', dest: './dist/assets/image' }], // 路径
      //     hook: 'writeBundle', // 钩子，插件运行在rollup完成打包并将文件写入磁盘之前
      //     verbose: true // 在终端进行console.log
      //   })
      // ]
    }
  },
  server: {
    host: 'localhost',
    port: 8080,
    open: true,
    base: './dist',
    origin: 'http://127.0.0.1:8080',
    // proxy: [
    //   {
    //     context: [
    //       '/iserver',
    //       '/edesign', // edn后台接口转发
    //       '/im', // im后台接口
    //       '/oss/styles',
    //       '/opb',
    //       '/oss_public',
    //       '/frm',
    //       '/wfm',
    //       '/login',
    //       '/logged',
    //       '/styles',
    //       '/gis-plat/open-api',
    //       '/oss_core/im/rivt/gis',
    //       '/oss_core/im',
    //       // '/oss_core/edesign',
    //       '/oss_core/edesign/assets', // 静态文件更新后需要更新到线上要不会获取不到最新的今天文件
    //       '/oss_core/edesign/lib', // 静态文件更新后需要更新到线上要不会获取不到最新的今天文件
    //       '/users'
    //     ],
    //     target: `${environmentConfig.online_design}/oss`,
    //     changeOrigin: true, // target是域名的话，需要这个参数，
    //     secure: false, // 设置支持https协议的代理
    //     pathRewrite: { '^/oss/styles': '/styles' }
    //   },
    //   {
    //     context: ['/oss_core/edesign/view'], // 路径通过转发和生产保持一致
    //     target: 'http://localhost:8080/', // 当前服务地址
    //     changeOrigin: true, // target是域名的话，需要这个参数，
    //     secure: false, // 设置支持https协议的代理
    //     pathRewrite: { '^/oss_core/edesign/view': '/' }
    //   },
    //   {
    //     context: ['/arcgis'],
    //     target: `${environmentConfig.arcgis}/`,
    //     changeOrigin: true, // target是域名的话，需要这个参数，
    //     secure: false // 设置支持https协议的代理
    //   },
    //   {
    //     context: ['/geoserver'],
    //     target: `${environmentConfig.geoserver}/oss`,
    //     changeOrigin: true,
    //     secure: false // 设置支持https协议的代理
    //   },
    //   {
    //     context: ['/gis-plat/gis-sdk/gis'],
    //     target: `${environmentConfig.gis_platform}/oss`, // http://10.45.48.200:8080/  http://localhost:8080/
    //     changeOrigin: true,
    //     secure: false // 设置支持https协议的代理
    //     // pathRewrite: { '^/gis-plat/gis-sdk/gis': '/gis' },
    //   }
    // ]
    proxy: {
      // 带选项写法：http://localhost:5173/api/bar -> http://jsonplaceholder.typicode.com/bar
      '/gis-plat/gis-sdk/gis': {
        target: `${environmentConfig.gis_platform}/oss`,
        changeOrigin: true
      }
    }
  }
})
