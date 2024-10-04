<template>
  <section>
    <div class="tabs is-small">
      <ul>
        <router-link
          v-for="tab in tabs"
          :key="tab"
          :to="{ name: `licenses-contracts-${tab}` }"
          v-slot="{ navigate }"
          custom
        >
          <li
            @click="navigate"
            role="link"
            :class="{ 'is-active': getRouteName === tab }"
          >
            <a>{{ `${$i18n.t(`menu.${tab}`)}` }}</a>
          </li>
        </router-link>
      </ul>
    </div>

    <router-view />
  </section>
</template>

<script>
import _ from 'lodash'
import { mapActions } from 'vuex'

export default {
  name: 'licensescontracts-page',
  data() {
    return {
      tabs: [
        'oracle',
        'mysql',
        'sqlserver',
        // 'postgresql',
        // 'mongodb'
      ],
    }
  },
  mounted() {
    this.getLicensesHosts()
    this.getLicensesClusters()
  },
  methods: {
    ...mapActions(['getLicensesHosts', 'getLicensesClusters']),
  },
  computed: {
    getRouteName() {
      return _.last(_.split(this.$route.path, '/'))
    },
  },
}
</script>

<style lang="scss" scoped></style>
