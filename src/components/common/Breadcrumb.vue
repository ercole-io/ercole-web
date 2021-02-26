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
        <a :href="b.link" id="link">
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
  </nav>
</template>

<script>
import dynamicTitle from '@/mixins/dynamicTitle.js'
import tooltipMixin from '@/mixins/tooltipMixin.js'

export default {
  mixins: [dynamicTitle, tooltipMixin],
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
  min-height: 43px;
  display: flex;
  align-items: center;

  li + li::before {
    font-size: 11px;
  }

  ul {
    align-items: center;
  }

  .is-active {
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
  }

  .dynamicTitle {
    padding: 0 0.75em;
    margin-left: -26px;
  }
}
</style>
