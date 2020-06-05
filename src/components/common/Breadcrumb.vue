<template>
  <nav class="breadcrumb is-small" aria-label="breadcrumbs">
    <ul>
      <li><a href="/">Dashboard</a></li>
      <li
        v-for="(b, i) in breadcrumbList"
        :key="i"
        @click="routeTo(i)"
        :class="{ 'is-active': !b.link }"
      >
        <a :href="b.link">
          {{ b.name }}
          <span v-if="dynamicTitle && !b.link" class="dynamicTitle">
            - {{ dynamicTitle }}
          </span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'

export default {
  data() {
    return {
      dynamicTitle: ''
    }
  },
  created() {
    bus.$on('dynamicTitle', value => {
      this.dynamicTitle = value
    })
  },
  methods: {
    routeTo(route) {
      if (this.breadcrumbList[route].link) {
        this.$router.push(this.breadcrumbList[route].link)
      }
    }
  },
  computed: {
    breadcrumbList() {
      return this.$route.meta.breadcrumb
    }
  },
  watch: {
    $route() {
      this.dynamicTitle = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.breadcrumb {
  margin-bottom: 1rem;

  ul {
    margin: 0;
  }

  li + li {
    margin-top: 0;
  }

  .dynamicTitle {
    margin-left: 4px;
  }
}
</style>
