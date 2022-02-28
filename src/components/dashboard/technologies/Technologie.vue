<template>
  <HbuttonScroll>
    <div class="technologies">
      <div class="technologies-list">
        <div class="image">
          <GhostLoading :isLoading="loading" setHeight="30" setWidth="30">
            <img
              src="@/assets/images/ercole-logo-no-text.png"
              v-if="!loading"
            />
          </GhostLoading>
        </div>

        <div class="tech-name">
          <GhostLoading :isLoading="loading" setWidth="100">
            <span v-if="!loading">{{ getTotalTarget.extra.name }}</span>
          </GhostLoading>
        </div>

        <div class="agents">
          <GhostLoading :isLoading="loading" setHeight="15" setWidth="15">
            <span v-if="!loading">{{ getTotalTarget.agents }}</span>
          </GhostLoading>
        </div>

        <div class="progress">
          <GhostLoading
            :isLoading="loading"
            setHeight="50"
            setWidth="50"
            isCircle
          >
            <Progress
              :radius="20"
              :value="getTotalTarget.perc"
              :strokeColor="getTotalTarget.extra.color"
              :strokeWidth="5"
              :transitionDuration="2000"
              v-if="!loading"
            />
          </GhostLoading>
        </div>
      </div>

      <div
        class="technologies-list"
        v-for="(tech, i) in getTech"
        :key="tech.id || i"
      >
        <div class="image">
          <GhostLoading :isLoading="loading" setHeight="30" setWidth="30">
            <img
              v-bind:src="`data:image/jpeg;base64,${tech.extra.logo}`"
              v-if="!loading"
            />
          </GhostLoading>
        </div>

        <div class="tech-name">
          <GhostLoading :isLoading="loading" setWidth="100">
            <span v-if="!loading">{{ tech.extra.name }}</span>
          </GhostLoading>
        </div>

        <div class="agents">
          <GhostLoading :isLoading="loading" setHeight="15" setWidth="15">
            <span v-if="!loading">{{ tech.agents }}</span>
          </GhostLoading>
        </div>

        <div class="progress">
          <GhostLoading
            :isLoading="loading"
            setHeight="50"
            setWidth="50"
            isCircle
          >
            <Progress
              :radius="20"
              :value="tech.perc"
              :strokeColor="tech.extra.color"
              :strokeWidth="5"
              :transitionDuration="2000"
              v-if="!loading"
            />
          </GhostLoading>
        </div>
      </div>
    </div>
  </HbuttonScroll>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapGetters } from 'vuex'
import Progress from 'easy-circular-progress'
import HbuttonScroll from '@/components/HbuttonScroll.vue'
import GhostLoading from '@/components/common/GhostLoading.vue'

export default {
  components: {
    Progress,
    HbuttonScroll,
    GhostLoading,
  },
  data() {
    return {
      loading: true,
    }
  },
  beforeMount() {
    bus.$on('loadTechComplete', () => {
      this.loading = false
    })
  },
  computed: {
    ...mapGetters(['getTotalTarget', 'getTechnologies']),
    getTech() {
      return this.loading ? 5 : this.getTechnologies
    },
  },
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
