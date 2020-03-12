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
	<div class="feature">
		<strong>{{name}}</strong>
		<span class="status">
			<CheckMark :value="status"></CheckMark>
		</span>
	</div>
</template>

<script>
export default {
  props: {
    name: {
      type: String
    },
    status: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.feature {
  display: grid;
  grid-template-columns: 80% 20%;
  align-items: center;
}

.status {
  justify-self: center;
}

.text-muted {
  color: #d9d9d9 !important;
}
</style>
