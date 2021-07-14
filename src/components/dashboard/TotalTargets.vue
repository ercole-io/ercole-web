<template>
  <BoxContent :title="$t('views.dashboard.totalTargets')" border>
    <div class="total-targets">
      <div class="col col01">
        <span>{{ $t('views.dashboard.agentsDiscovered') }}</span>
        <span
          class="has-text-weight-semibold is-justify-content-center is-size-5"
        >
          <GhostLoading :isLoading="loading" setHeight="14" setWidth="23">
            {{ getTotalTarget.agentsDiscovered }}
          </GhostLoading>
        </span>
      </div>

      <div class="col col02">
        <span>{{ $t('views.dashboard.percCompliance') }}</span>
        <span>
          <GhostLoading
            :isLoading="loading"
            setHeight="50"
            setWidth="50"
            isCircle
          >
            <Progress
              :radius="20"
              :value="getTotalTarget.percCompliance"
              strokeColor="#363636"
              :strokeWidth="5"
              :transitionDuration="2000"
            />
          </GhostLoading>
        </span>
      </div>
    </div>
  </BoxContent>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapGetters } from 'vuex'
import BoxContent from '@/components/common/BoxContent.vue'
import Progress from 'easy-circular-progress'
import GhostLoading from '@/components/common/GhostLoading.vue'

export default {
  components: {
    BoxContent,
    Progress,
    GhostLoading
  },
  data() {
    return {
      percCompliance: 0.0,
      loading: true
    }
  },
  beforeMount() {
    bus.$on('loadDashboardComplete', () => {
      this.loading = false
    })
    console.log()
  },
  computed: {
    ...mapGetters(['getTotalTarget'])
  }
}
</script>

<style lang="scss" scoped>
.total-targets {
  font-size: 13px;
  margin-top: 78px;
  flex-direction: column;

  .col {
    display: flex;
    line-height: 14px;
    align-items: center;

    span:first-child {
      width: 70%;
      display: flex;
      justify-content: left;
    }

    span:last-child {
      width: 30%;
      display: flex;
      justify-content: center;
    }
  }

  .col01 {
    height: 30px;
  }

  .col02 {
    height: 50px;
  }
}
</style>
