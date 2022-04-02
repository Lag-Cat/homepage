import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
  fastRefresh: {},
  base: '/h',
  publicPath: '/h/',
  // dva: {
  //   immer: true,
  //   hmr: true,
  //   lazyLoad: true,
  // },
  // extraBabelPlugins: ['@babel/plugin-transform-modules-commonjs'],
});
