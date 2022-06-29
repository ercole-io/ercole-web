<template>
  <BoxContent
    title="Cloud Objects"
    border
    hasShadow
    :mbottom="false"
    data-cy="cloud-objects"
  >
    <div class="cloud">
      <div class="cloud-list" v-for="(tech, i) in getCloud" :key="tech.id || i">
        <div class="image">
          <GhostLoading :isLoading="loading" setHeight="62" setWidth="100%">
            <img :src="tech.extra.logo" v-if="!loading" />
          </GhostLoading>
        </div>

        <!-- <div class="tech-name">
          <GhostLoading :isLoading="loading" setWidth="100">
            <span v-if="!loading">{{ tech.extra.name }}</span>
          </GhostLoading>
        </div> -->

        <div class="agents">
          <GhostLoading :isLoading="loading" setHeight="40" setWidth="53">
            <b-tag
              size="is-large"
              v-if="!loading"
              :style="{ 'background-color': tech.extra.color }"
              style="color: #fff"
            >
              {{ tech.agents }}
            </b-tag>
          </GhostLoading>
        </div>
      </div>
    </div>
  </BoxContent>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapGetters } from 'vuex'
import GhostLoading from '@/components/common/GhostLoading.vue'
import BoxContent from '@/components/common/BoxContent.vue'

export default {
  components: {
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
  min-height: 178px;
}
.cloud-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 3px;
  min-width: 150px;

  .image {
    width: 80%;
    height: auto;
    margin: 0 auto;
    display: block;
  }

  .tech-name {
    font-size: 0.85em;
    font-weight: 500;
  }

  .agents {
    border-width: 0;
    padding-bottom: 4px;
    list-style: none;
    font-size: 1.1em;
    padding-top: 20px;
    font-weight: bold;
  }
}
</style>
