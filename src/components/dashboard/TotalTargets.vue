<template>
  <BoxContent :title="$t('dashboard.pageTitle.totalTargets')" border>
    <div class="total-targets">
      <div class="total-targets-col">
        <div>Agents discovered</div>
        <div>Percentage of compliance</div>
        <!-- <div>Unpaid Dues</div> -->
      </div>
      <div class="total-targets-col">
        <div>
          <span class="has-text-weight-semibold is-size-5">
            {{ getTotalTarget.agentsDiscovered }}
          </span>
        </div>
        <div>
          <Progress
            :radius="20"
            :value="percCompliance"
            strokeColor="#363636"
            :strokeWidth="5"
            :transitionDuration="2000"
          />
        </div>
        <!-- <div class="has-text-weight-semibold is-size-5">
          {{ getTotalTarget.agentsDiscovered }}€
        </div> -->
      </div>
    </div>
  </BoxContent>
</template>

<script>
import { mapGetters } from 'vuex'
import BoxContent from '@/components/common/BoxContent.vue'
import Progress from 'easy-circular-progress'

export default {
  components: {
    BoxContent,
    Progress
  },
  data() {
    return {
      percCompliance: 0.0
    }
  },
  beforeUpdate() {
    this.percCompliance = this.getTotalTarget.percCompliance
  },
  computed: {
    ...mapGetters(['getTotalTarget'])
  }
}
</script>

<style lang="scss" scoped>
.total-targets {
  display: flex;
  font-size: 13px;
  margin-top: 66px;

  .total-targets-col {
    width: 50%;

    div {
      height: 30px;
      display: flex;
      align-items: center;
      margin: 12px 0;
    }
  }

  .total-targets-col:first-child {
    div {
      justify-content: left;
      line-height: 14px;
    }
  }

  .total-targets-col:last-child {
    div {
      justify-content: center;
    }
  }
}
</style>
