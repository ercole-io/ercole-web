<template>
  <div class="scroll">
    <div class="technologies">
      <div class="technologies-list" v-for="(tech, i) in technologies" :key="i">
        <div class="has-text-weight-semibold">{{ tech.name }}</div>
        <div>{{ tech.agents }}</div>
        <div class="has-background-grey-lighter">{{ tech.perc }}%</div>
        <div>{{ tech.money }} €</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    technologies: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll {
  overflow-x: auto;
}

.technologies {
  display: flex;
  max-width: 625px;
  width: 0;
}
.technologies-list {
  margin: 0;
  padding: 0 3px;

  div {
    text-align: center;
    border-width: 0;
    padding: 2px 0;
    list-style: none;
    min-width: 100px;
    font-size: 0.9em;
  }
}
</style>
