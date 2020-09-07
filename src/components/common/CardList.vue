<template>
  <ul class="card-list">
    <li v-for="item in list()" :key="item.name">
      <span>{{ item.name }}</span>
      <span v-if="!item.hasIcon">{{ item.value }}</span>
      <span v-if="item.hasIcon">
        <b-icon
          size="is-small"
          :icon="item.value[0]"
          :type="item.value[1]"
          style="vertical-align: middle;"
        >
        </b-icon>
      </span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    list: {
      type: [Function, Array],
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.card-list {
  li {
    display: flex;
    justify-content: space-between;
    font-size: 0.9em;
    padding: 0.2em 1em;

    &:nth-child(odd) {
      background: #f1f1f1;
    }

    span:first-child {
      font-weight: 500;
    }

    span:last-child {
      min-width: 10px;
    }
  }
}
</style>
