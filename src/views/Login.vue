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
	<div class="container-fluid">
    <div class="row justify-content-center align-items-center">
			<div class="col-6">
				<div layout:fragment="content" class="custom-panel">
					<b-form-group> 
						<h2 class="form-signin-heading">Login</h2>
						<div v-if="invalidCredentials" class="alert alert-danger">
							The username and the password aren't valid.
						</div>
						<div class="form-group">
							<label for="username">Username</label>
              				<b-form-input
								v-model.trim="username"
								placeholder="username" />
						</div>
						<div class="form-group">
							<label for="password">Password</label>
              				<b-form-input
								type="password"
								v-model="password"
								placeholder="password"
								@keydown.enter.native="login()" />
						</div>
						<!-- <div class="form-group form-check">
							<input id="remember-me" class="form-check-input" name="remember-me" type="checkbox" />
							<label class="form-check-label" for="remember-me">Remember Me</label>
						</div> -->
            			<b-btn class="btn btn-primary" @click="login()">Sign in</b-btn>
					</b-form-group>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import UserService from "@/services/UserService.js";

export default {
  data() {
    return {
      invalidCredentials: false,
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
		UserService
			.login(this.$store.getters.backendConfig, this.username, this.password)
			.then(data => {
				this.$store.commit("setToken", data);
				this.$router.push('/');
			})
			.catch(() => {
				this.invalidCredentials = true
				this.$noty.error("Failed to login.");
			});
	}
  }

  //   mounted() {

  // UserService
  //   .login(this.$store.getters.backendConfig, 'user', 'password')
  //    .then(data => {
  //       this.$store.commit("setToken", data);
  //       this.$router.push('/');
  //     })
  //     .catch(() => {
  //       this.$noty.error("Failed to login.");
  //     });
  //   }
};
</script>

<style scoped>
</style>
