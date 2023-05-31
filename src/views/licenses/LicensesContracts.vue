<template>
  <section>
    <div class="tabs is-small is-boxed">
      <ul>
        <router-link tag="li" :to="{ name: 'licenses-contracts-oracle' }" exact>
          <a>Oracle</a>
        </router-link>
        <router-link tag="li" :to="{ name: 'licenses-contracts-mysql' }" exact>
          <a>MySQL</a>
        </router-link>
        <router-link
          tag="li"
          :to="{ name: 'licenses-contracts-sqlserver' }"
          exact
        >
          <a>SQLServer</a>
        </router-link>
        <router-link
          tag="li"
          :to="{ name: 'licenses-contracts-postgresql' }"
          exact
        >
          <a>PostgreSQL</a>
        </router-link>
        <router-link
          tag="li"
          :to="{ name: 'licenses-contracts-mongodb' }"
          exact
        >
          <a>MongoDB</a>
        </router-link>
      </ul>
    </div>

    <router-view></router-view>
  </section>
</template>

<script>
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
  },
}
</script>

<style lang="scss" scoped></style>
