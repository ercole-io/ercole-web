<template>
  <HbuttonScroll>
    <template v-if="!loading">
      <div class="technologies">
        <div
          class="technologies-list"
          v-for="tech in getTechnologies"
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
    </template>
    <b-skeleton height="155" :active="loading"></b-skeleton>
  </HbuttonScroll>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapGetters } from 'vuex'
import Progress from 'easy-circular-progress'
import HbuttonScroll from '@/components/HbuttonScroll.vue'

export default {
  components: {
    Progress,
    HbuttonScroll
  },
  data() {
    return {
      loading: true
    }
  },
  beforeMount() {
    bus.$on('loadTechComplete', () => {
      this.loading = false
    })
  },
  computed: {
    ...mapGetters(['getTechnologies'])
  }
}
</script>

<style lang="scss" scoped>
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
