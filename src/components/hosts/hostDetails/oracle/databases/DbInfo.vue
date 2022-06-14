<template>
  <b-tab-item label="Info" v-if="hasInfo">
    <div class="columns">
      <div class="column is-4">
        <Card cardTitle="DB Details" cardType="custom">
          <CardListHighlight :colSizes="['6', '6']" :list="details" />
        </Card>
      </div>
      <div class="column is-4">
        <div class="columns mb-0">
          <div class="column is-12">
            <Card cardTitle="Memory" cardType="custom">
              <CardListHighlight :colSizes="['6', '6']" :list="memory" />
            </Card>
          </div>
        </div>
        <div class="columns">
          <div class="column is-12">
            <Card cardTitle="Resource Utilization" cardType="custom">
              <CardListHighlight :colSizes="['6', '6']" :list="resource" />
            </Card>
          </div>
        </div>
      </div>
      <div class="column is-4">
        <div class="columns mb-0">
          <div class="column is-12">
            <Card cardTitle="Space Utilization" cardType="custom">
              <CardListHighlight :colSizes="['6', '6']" :list="space" />
            </Card>
          </div>
        </div>
        <div class="columns">
          <div class="column is-12">
            <Card cardTitle="Additional Info" cardType="custom">
              <CardListHighlight :colSizes="['6', '6']" :list="additional" />
            </Card>
          </div>
        </div>
      </div>
    </div>
  </b-tab-item>
</template>

<script>
import { mapState } from 'vuex'
import { filterOptionsOracle } from '@/helpers/hostDetails.js'
import Card from '@/components/common/Card.vue'
import CardListHighlight from '@/components/common/CardListHighlight.vue'

export default {
  props: {
    dbInfo: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    Card,
    CardListHighlight,
  },
  computed: {
    ...mapState(['hostDetails']),
    details() {
      return [
        { name: 'Status', value: this.dbInfo.status },
        { name: 'Role', value: this.dbInfo.role },
        { name: 'Db ID', value: this.dbInfo.dbID },
        { name: 'Db Name', value: this.dbInfo.name },
        { name: 'Unique Name', value: this.dbInfo.uniqueName },
        {
          name: 'Archive Log',
          value: this.dbInfo.archivelog,
          hasIcon: true,
        },
        { name: 'Block Size', value: this.dbInfo.blockSize },
        { name: 'Charset', value: this.dbInfo.charset },
        { name: 'N Charset', value: this.dbInfo.nCharset },
      ]
    },
    memory() {
      return [
        { name: 'Memory Target', value: this.dbInfo.memoryTarget },
        { name: 'PGA Target (GB)', value: this.dbInfo.pgaTarget },
        { name: 'SGA MaxSize (GB)', value: this.dbInfo.sgaMaxSize },
        { name: 'SGA Target (GB)', value: this.dbInfo.sgaTarget },
      ]
    },
    resource() {
      return [
        { name: 'Db Time', value: this.dbInfo.dbTime },
        { name: 'Elapsed', value: this.dbInfo.elapsed },
        { name: 'DB time / Elapsed (min. 1)', value: this.dbInfo.work },
        { name: 'CPU Count', value: this.dbInfo.cpuCount },
      ]
    },
    space() {
      return [
        {
          name: 'Allocable (GB)',
          value: this.dbInfo.allocable,
        },
        {
          name: 'DataFile Size (GB)',
          value: this.dbInfo.datafileSize,
        },
        {
          name: 'Segments Size (GB)',
          value: this.dbInfo.segmentsSize,
        },
      ]
    },
    additional() {
      return [
        { name: 'ASM', value: this.dbInfo.asm, hasIcon: true },
        { name: 'Data Guard', value: this.dbInfo.dataguard, hasIcon: true },
        { name: 'Platform', value: this.dbInfo.platform },
        { name: 'Version', value: this.dbInfo.version },
      ]
    },
    hasInfo() {
      return (
        (this.hostDetails.selectedKeys.length === 1 &&
          this.hostDetails.selectedKeys.includes('name')) ||
        filterOptionsOracle.filter(
          (opt) =>
            this.hostDetails.selectedKeys.includes(opt.value) &&
            opt.group === 'info'
        ).length > 0
      )
    },
  },
}
</script>

<style lang="scss" scoped></style>
