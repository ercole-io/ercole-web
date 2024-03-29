<template>
  <nav
    class="breadcrumb is-small"
    aria-label="breadcrumbs"
    v-if="$route.name !== 'dashboard'"
  >
    <ul>
      <li><a href="/">Dashboard</a></li>
      <li v-for="(b, i) in breadcrumbList" :key="i" @click="routeTo(i)">
        <span v-if="!b.link">
          {{ b.name }}
        </span>
        <a v-if="b.link" :href="b.link" id="link">
          {{ b.name }}
        </a>
        <span
          class="dynamicTitle"
          v-if="dynamicTitle && !b.link"
          v-copy="dynamicTitle"
        >
          {{ dynamicTitle }}
        </span>
      </li>
    </ul>
    <FastChange
      :current="dynamicTitle"
      :routeName="$route.name"
      v-if="
        $route.name === 'hosts-details' || $route.name === 'cluster-details'
      "
    />
    <b-progress
      type="is-primary"
      size="is-medium"
      class="retrieveProgress"
      show-value
      v-if="showProgress"
    >
      <p class="is-size-7">Retrieving Recommendations Updates</p>
    </b-progress>
  </nav>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import dynamicTitle from '@/mixins/dynamicTitle.js'
import tooltipMixin from '@/mixins/tooltipMixin.js'
import FastChange from '@/components/common/FastChange.vue'

export default {
  name: 'commom-breadcrumb-component',
  mixins: [dynamicTitle, tooltipMixin],
  components: {
    FastChange,
  },
  data() {
    return {
      showProgress: false,
    }
  },
  beforeMount() {
    bus.$on('retrieveUpdates', (val) => {
      this.showProgress = val
    })
  },
  methods: {
    routeTo(route) {
      if (this.breadcrumbList[route].link) {
        this.$router.push(this.breadcrumbList[route].link)
      }
    },
  },
  computed: {
    breadcrumbList() {
      return this.$route.meta.breadcrumb
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.breadcrumb {
  margin: 0;
  padding: 10px 20px 8px 20px;
  border-bottom: 1px solid #ccc;
  min-height: 43px;
  display: flex;
  align-items: center;
  position: relative;

  ul {
    align-items: center;

    li {
      color: $ercole-blue;
      font-size: 0.75rem;

      span {
        padding: 0 0.75em;
      }
    }

    li:last-child {
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;

      &::before {
        font-size: 0.75rem;
      }
    }

    a {
      color: $custom-primary;

      &:hover {
        color: $ercole-blue;
      }
    }
  }

  .dynamicTitle {
    padding: 0 0.75em;
    margin-left: -26px;
  }
}

.retrieveProgress {
  position: absolute;
  top: 12px;
  right: 20px;
  width: 300px;
}
</style>
