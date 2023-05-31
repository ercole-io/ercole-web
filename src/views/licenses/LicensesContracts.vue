<template>
  <section>
    <div class="tabs is-small is-boxed">
      <ul>
        <router-link
          tag="li"
          :to="{ name: 'licenses-contracts-oracle' }"
          @click="onTabChange(0)"
          exact
        >
          <a>Oracle</a>
        </router-link>
        <router-link
          tag="li"
          :to="{ name: 'licenses-contracts-mysql' }"
          @click="onTabChange(1)"
          exact
        >
          <a>MySQL</a>
        </router-link>
        <router-link
          tag="li"
          :to="{ name: 'licenses-contracts-sqlserver' }"
          @click="onTabChange(2)"
          exact
        >
          <a>SQLServer</a>
        </router-link>
        <router-link
          tag="li"
          :to="{ name: 'licenses-contracts-postgresql' }"
          @click="onTabChange(3)"
          exact
        >
          <a>PostgreSQL</a>
        </router-link>
        <router-link
          tag="li"
          :to="{ name: 'licenses-contracts-mongodb' }"
          @click="onTabChange(4)"
          exact
        >
          <a>MongoDB</a>
        </router-link>
      </ul>
    </div>

    <router-view></router-view>

    <!-- <b-tabs
      size="is-small"
      type="is-boxed"
      class="block"
      v-model="activeTab"
      @input="onTabChange"
    >
      <b-tab-item label="Oracle">
        <OracleContracts />
      </b-tab-item>
      <b-tab-item label="MySQL">
        <MySqlContracts />
      </b-tab-item>
      <b-tab-item label="SQLServer">
        <MsSqlServerContracts />
      </b-tab-item>
    </b-tabs> -->
  </section>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapActions } from 'vuex'

export default {
  name: 'licensescontracts-page',
  data() {
    return {
      activeTab: 0,
    }
  },
  mounted() {
    this.getLicensesHosts()
    this.getLicensesClusters()
  },
  methods: {
    ...mapActions(['getLicensesHosts', 'getLicensesClusters']),
    onTabChange(value) {
      console.log(value)
      bus.$emit('onTabChange', value)
    },
  },
}
</script>

<style lang="scss" scoped></style>
