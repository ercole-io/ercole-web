<template>
  <BoxContent :title="$t('dashboard.pageTitle.totalTargets')" border>
    <div class="total-targets">
      <div class="total-targets-col">
        <div>
          Agents discovered
        </div>
        <div>
          Percentage of compliance
        </div>
        <div>
          Money missing
        </div>
      </div>
      <div class="total-targets-col">
        <div>
          <span class="has-text-weight-semibold is-size-5">100</span>/150
        </div>
        <div
          class="has-text-weight-semibold is-size-5 has-background-grey-lighter"
        >
          80%
        </div>
        <div class="has-text-weight-semibold is-size-5">-87.000 €</div>
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
  data() {
    return {
      data: [
        { name: 'Agents Discovered', value: '100/150' },
        { name: 'Percentage of Compliance', value: '80%' },
        { name: 'Money Missing', value: '-87.000 $' }
      ],
      columns: [{ field: 'name' }, { field: 'value' }]
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
