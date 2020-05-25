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
        <a :href="b.link">{{ b.name }}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      breadcrumbList: []
    }
  },
  mounted() {
    this.updateBreadcrumb()
  },
  methods: {
    routeTo(route) {
      if (this.breadcrumbList[route].link) {
        this.$router.push(this.breadcrumbList[route].link)
      }
    },
    updateBreadcrumb() {
      this.breadcrumbList = this.$route.meta.breadcrumb
    }
  },
  watch: {
    $route() {
      this.updateBreadcrumb()
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
}
</style>
