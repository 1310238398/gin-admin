// https://umijs.org/config/
import pageRoutes from './router.config';

const plugins = [
  [
    'umi-plugin-react',
    {
      dva: { immer: true },
      antd: true,
      dynamicImport: {
        webpackChunkName: true,
      },
      locale: {
        enable: true, // default false
        default: 'zh-CN', // default zh-CN
      },
    },
  ],
];

export default {
  // add for transfer to umi
  plugins,
  targets: { ie: 11 },
  treeShaking: true,
  // 路由配置
  routes: pageRoutes,
  hash: true,
  // Theme for antd
  // https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': '#2F5CFF',
  },
  proxy: {
    '/oper/web/': {
      target: 'http://39.98.250.155:11088/',
      changeOrigin: true,
    },
    '/oldoper/web': {
      target: 'http://39.98.250.155:8080/',
      changeOrigin: true,
    },
    '/s/': {
      target: 'http://39.98.250.155:8080/',
      changeOrigin: true,
    },
    '/cms/': {
      target: 'http://39.98.250.155:8080/',
      changeOrigin: true,
    },
    '/mall/': {
      target: 'http://39.98.250.155:8080/',
      changeOrigin: true,
    },
    '/gxtmall/': {
      // target: 'http://39.98.250.155:8080/',
      target: 'http://127.0.0.1:10076/',
      changeOrigin: true,
    },
    '/ad/': {
      // target: 'http://39.98.250.155:8080/',
      target: 'http://127.0.0.1:10077/',
      changeOrigin: true,
    },
    '/proxy/': {
      target: 'http://39.98.250.155:8080/',
      changeOrigin: true,
    },
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, _, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }
      const match = context.resourcePath.match(/src(.*)/);
      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = antdProPath
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `web${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }
      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
};
