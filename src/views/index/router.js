const routers = [
  {
    path: '/',
    name: 'home',
    redirect: '/index/invest'
  }, {
    // 投资机构
    path: '/index/invest',
    name: 'invest',
    component (resolve) {
      require.ensure(['./article/invest.vue'], () => {
        resolve(require('./article/invest.vue'))
      })
    }
  }
]

export default routers
