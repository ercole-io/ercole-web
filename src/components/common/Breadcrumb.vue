<template>
  <nav
    class="breadcrumb is-small"
    aria-label="breadcrumbs"
    v-if="$route.name !== 'dashboard'"
  >
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
            {{ dynamicTitle }}
          </span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import dynamicTitle from '@/mixins/dynamicTitle.js'

export default {
  mixins: [dynamicTitle],
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
  }
}
</script>

<style lang="scss" scoped>
.breadcrumb {
  margin: 0;
  padding: 10px 20px 8px 20px;
  border-bottom: 1px solid #ccc;

  ul {
    align-items: center;
  }

  .is-active {
    font-size: 1rem;
    font-weight: 500;
  }
}
</style>
