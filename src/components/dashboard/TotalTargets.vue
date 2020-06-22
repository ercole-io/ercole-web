<template>
  <BoxContent :title="$t('dashboard.pageTitle.totalTargets')" border>
    <div class="total-targets">
      <div class="total-targets-col">
        <div>Agents discovered</div>
        <div>Percentage of compliance</div>
        <div>Money missing</div>
      </div>
      <div class="total-targets-col">
        <div>
          <span class="has-text-weight-semibold is-size-5">
            {{ totalTarget.agentsDiscovered }}
          </span>
        </div>
        <div
          class="has-text-weight-semibold is-size-5 has-background-grey-lighter"
        >
          {{ totalTarget.percCompliance }}%
        </div>
        <div class="has-text-weight-semibold is-size-5">
          {{ totalTarget.moneyMissing }}€
        </div>
      </div>
    </div>
  </BoxContent>
</template>

<script>
import BoxContent from '@/components/common/BoxContent.vue'

export default {
  components: {
    BoxContent
  },
  props: {
    totalTarget: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.total-targets {
  display: flex;
  font-size: 13px;

  .total-targets-col {
    width: 50%;

    div {
      height: 25px;
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
