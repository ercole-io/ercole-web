// Copyright (c) 2019 Sorint.lab S.p.A.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueNoty from "vuejs-noty";
import CheckMark from "@/components/CheckMark";
import CheckMark2 from "@/components/CheckMark2";
import fullscreen from "vue-fullscreen";
import PieChart from "@/components/PieChart.vue";
import Spinner from "vue-simple-spinner";

import "@/assets/css/fontawesome-all.min.css";

Vue.use(VueNoty);
Vue.use(BootstrapVue);
Vue.use(fullscreen);
Vue.component("CheckMark", CheckMark);
Vue.component("CheckMark2", CheckMark2);
Vue.component("PieChart", PieChart);
Vue.component("VueSimpleSpinner", Spinner);

Vue.filter("truncate", value => {
  if (value.length <= 60) {
    return value;
  } else {
    let filtered = value;
    filtered = value.substring(0, 70);
    filtered = filtered.substring(0, filtered.lastIndexOf(" ")) + "...";
    return filtered;
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    this.$store.commit("init");
  }
}).$mount("#app");
