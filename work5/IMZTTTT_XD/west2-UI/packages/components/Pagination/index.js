import Pagination from './Pagination.vue'

Pagination.install = (app) => {
  // 注册组件
  app.component(Pagination.name, Pagination)
}

export default Pagination