<template>
  <div class="scroll">
    <div class="technologies">
      <div
        class="technologies-list"
        v-for="tech in technologies"
        :key="tech.id"
      >
        <img v-bind:src="`data:image/jpeg;base64,${tech.extra.logo}`" />
        <span>{{ tech.extra.name }}</span>
        <div>{{ tech.agents }}</div>
        <div>
          <Progress
            :radius="20"
            :value="tech.perc"
            :strokeColor="tech.extra.color"
            :strokeWidth="5"
            :transitionDuration="2000"
          />
        </div>
        <!-- <div>{{ tech.money }} €</div> -->
      </div>
    </div>
  </div>
</template>

<script>
import Progress from 'easy-circular-progress'

export default {
  props: {
    technologies: {
      type: Array,
      required: true
    }
  },
  components: {
    Progress
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

  img {
    width: 30%;
    margin: 0 auto;
    display: block;
  }

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 0.75em;
    font-weight: 500;
    min-height: 35px;
  }

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
