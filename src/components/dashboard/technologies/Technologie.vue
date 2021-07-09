<template>
  <HbuttonScroll>
    <div class="technologies">
      <div
        class="technologies-list"
        v-for="(tech, i) in getTech"
        :key="tech.id || i"
      >
        <div class="image">
          <template v-if="!loading">
            <img v-bind:src="`data:image/jpeg;base64,${tech.extra.logo}`" />
          </template>
          <b-skeleton width="30" height="30" :active="loading"></b-skeleton>
        </div>

        <div class="tech-name">
          <template v-if="!loading">
            {{ tech.extra.name }}
          </template>
          <b-skeleton width="100" :active="loading"></b-skeleton>
        </div>

        <div class="agents">
          <template v-if="!loading">
            {{ tech.agents }}
          </template>
          <b-skeleton width="15" :active="loading"></b-skeleton>
        </div>

        <div class="progress">
          <template v-if="!loading">
            <Progress
              :radius="20"
              :value="tech.perc"
              :strokeColor="tech.extra.color"
              :strokeWidth="5"
              :transitionDuration="2000"
            />
          </template>
          <b-skeleton
            circle
            width="50"
            height="50"
            :active="loading"
          ></b-skeleton>
        </div>

        <!-- <div>{{ tech.money }} €</div> -->
      </div>
    </div>
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
    ...mapGetters(['getTechnologies']),
    getTech() {
      return this.loading ? 5 : this.getTechnologies
    }
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
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 0 3px;
  min-width: 120px;

  .image {
    width: 30px;
    height: 30px;
    margin: 0 auto;
    display: block;
  }

  .tech-name {
    font-size: 0.75em;
    font-weight: 500;
    padding: 10px 0;
  }

  .agents {
    border-width: 0;
    padding-bottom: 4px;
    list-style: none;
    font-size: 0.9em;
  }

  .progress {
    width: 50px;
    height: 50px;
  }
}
</style>
