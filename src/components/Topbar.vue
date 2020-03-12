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
	<nav class="navbar navbar-expand-lg navbar-light sticky-top" style="background-color: white;">
		<button type="button" class="btn btn-outline-dark" @click="toggleSidebar()">
			<i class="fas fa-bars"></i>
		</button>

		<div class="collapse navbar-collapse" id="navbarSupportedContent">
			<ul class="navbar-nav ml-auto">
				<AlertNavbar></AlertNavbar>
				<li class="nav-item">
					<a class="nav-link" href="#" @click="toggleFullscreen()">
						<i class="fas fa-expand fa-lg"></i>
					</a>
				</li>
				<b-nav-item-dropdown right>
					<!-- Using button-content slot -->
					<template slot="button-content">
						<i class="fas fa-user"></i>
						{{ username }}
					</template>
					<b-dropdown-item :href="logoutUrl">Signout</b-dropdown-item>
				</b-nav-item-dropdown>
			</ul>

		</div>
	</nav>
</template>

<script>
import AlertNavbar from "@/components/AlertNavbar";
import UserService from "@/services/UserService";

export default {
  name: "Topbar",
  components: {
    AlertNavbar
  },
  data() {
    return {
      showUserInfos: false,
      username: "Anonymous User"
    };
  },
  created() {
    this.username = "-";
    UserService.getUserInformations()
      .then(userInfo => {
        this.username = userInfo.fullName || userInfo.username;
      })
      .catch(() => {
        this.username = "Error fetching username";
      });
  },
  methods: {
    toggleSidebar() {
      this.$store.commit("toggleSidebar", {});
    },
    toggleFullscreen() {
      this.$fullscreen.toggle();
    }
  },
  computed: {
    logoutUrl() {
      // WARN!!! this piece of code works only on assumption
      // that the app is located at the base root of a
      // website eg. http://www.example.com/index.html.
      // The behaviour in subfolders is unknow.
      return document.location.origin + "/logout";
    }
  }
};
</script>

<style scoped>
</style>
