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
  <div>
    <i v-if="value === 'NOTICE'" class="fas fa-info-circle text-info" :class="faSize"/>
    <i v-else-if="value === 'CRITICAL'" class="fas fa-exclamation-circle text-danger" :class="faSize" />
    <i v-else class="fas fa-exclamation-triangle text-warning" :class="faSize" />    
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: ""
    }
  },
  computed: {
    faSize() {
      return this.size ? "fa-" + this.size : "";
    }
  }
};
</script>

<style scoped>
</style>
