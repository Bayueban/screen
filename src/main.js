import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./style/index.scss";
import "lib-flexible-computer";
import "element-ui/lib/theme-chalk/index.css";
import * as echarts from "echarts";
import "echarts-gl";
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;
import { DatePicker, Pagination, Table, TableColumn } from "element-ui";
Vue.use(Table);
Vue.use(DatePicker);
Vue.use(Pagination);
Vue.use(TableColumn);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
