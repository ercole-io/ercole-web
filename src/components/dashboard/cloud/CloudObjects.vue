<template>
  <BoxContent title="Cloud Objects" border hasShadow :mbottom="false">
    <div class="cloud">
      <div class="cloud-list" v-for="(tech, i) in getCloud" :key="tech.id || i">
        <div class="image">
          <GhostLoading :isLoading="loading" setHeight="40" setWidth="100%">
            <img :src="tech.extra.logo" v-if="!loading" />
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
            setHeight="70"
            setWidth="70"
            isCircle
          >
            <Progress
              :radius="25"
              :value="tech.perc"
              :strokeColor="tech.extra.color"
              :strokeWidth="7"
              :transitionDuration="2000"
              v-if="!loading"
            />
          </GhostLoading>
        </div>
      </div>
    </div>
  </BoxContent>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapGetters } from 'vuex'
import Progress from 'easy-circular-progress'
import GhostLoading from '@/components/common/GhostLoading.vue'
import BoxContent from '@/components/common/BoxContent.vue'

export default {
  components: {
    Progress,
    GhostLoading,
    BoxContent,
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
    ...mapGetters(['getCloudObjects']),
    getCloud() {
      return this.loading ? 3 : this.getCloudObjects
    },
  },
}
</script>

<style lang="scss" scoped>
.cloud {
  display: flex;
  max-width: 100%;
  justify-content: space-between;
}
.cloud-list {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 0 3px;
  min-width: 150px;

  .image {
    width: 50%;
    height: auto;
    margin: 0 auto;
    display: block;
  }

  .tech-name {
    font-size: 0.85em;
    font-weight: 500;
    padding: 10px 0;
  }

  .agents {
    border-width: 0;
    padding-bottom: 4px;
    list-style: none;
    font-size: 1em;
  }

  .progress {
    width: 70px;
    height: 70px;
    text-align: center;
  }
}
</style>
