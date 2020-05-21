<!--
Copyright (c) 2019 Sorint.lab S.p.A.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
-->

<template>
  <div id="app">
    <div class="wrapper">
      <Sidebar :full="sidebarVisible"></Sidebar>
      <div id="content">
        <Topbar class="mb-4"></Topbar>
        <router-view></router-view>
        <!-- footer -->
        <footer class="footer">
          <div class="container">
            Ercole 1.6.14 &copy; 2018-20 Sorint.lab S.p.A.
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import Topbar from "@/components/Topbar.vue";

export default {
  name: "App",
  components: {
    Sidebar,
    Topbar
  },
  computed: {
    sidebarVisible() {
      return this.$store.getters.sidebarVisible;
    }
  }
};
</script>


<style lang="scss">
@import "./styles/custom-bootstrap.scss";
@import "./styles/style.scss";
@import "../node_modules/bootstrap/scss/bootstrap.scss";

.wrapper {
  display: flex;
  align-items: stretch;
  min-height: 100vh;
}

#content {
  background-color: rgb(241, 241, 242);
  position: relative;
  flex: 1 1 auto;
  padding-bottom: 70px;
  min-width: 0px;
  transition: all 0.3s;
}

.footer {
  width: 100%;
  height: 60px;
  line-height: 60px;
  background-color: white;
  margin-top: 25px;
  text-align: center;
  position: absolute;
  bottom: 0;
}
</style>
