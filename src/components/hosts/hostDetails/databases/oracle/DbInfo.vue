<template>
  <b-tab-item label="Info">
    <div class="columns">
      <div class="column is-4">
        <Card cardTitle="DB Details" cardType="custom">
          <CardList :colSizes="['6', '6']" :list="details" />
        </Card>
      </div>
      <div class="column is-4">
        <div class="columns mb-0">
          <div class="column is-12">
            <Card cardTitle="DMemory" cardType="custom">
              <CardList :colSizes="['6', '6']" :list="memory" />
            </Card>
          </div>
        </div>
        <div class="columns">
          <div class="column is-12">
            <Card cardTitle="Resource Utilization" cardType="custom">
              <CardList :colSizes="['6', '6']" :list="resource" />
            </Card>
          </div>
        </div>
      </div>
      <div class="column is-4">
        <div class="columns mb-0">
          <div class="column is-12">
            <Card cardTitle="Space Utilization" cardType="custom">
              <CardList :colSizes="['6', '6']" :list="space" />
            </Card>
          </div>
        </div>
        <div class="columns">
          <div class="column is-12">
            <Card cardTitle="Additional Info" cardType="custom">
              <CardList :colSizes="['6', '6']" :list="additional" />
            </Card>
          </div>
        </div>
      </div>
    </div>
  </b-tab-item>
</template>

<script>
import Card from '@/components/common/Card.vue'
import CardList from '@/components/common/CardList.vue'

export default {
  props: {
    dbInfo: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    Card,
    CardList
  },
  computed: {
    details() {
      return [
        { name: 'Status', value: this.dbInfo.status },
        { name: 'Role', value: this.dbInfo.role },
        { name: 'Db ID', value: this.dbInfo.dbID },
        { name: 'Db Name', value: this.dbInfo.name },
        { name: 'Unique Name', value: this.dbInfo.uniqueName },
        {
          name: 'Archive Log',
          value: this.dbInfo.archiveLog,
          hasIcon: true
        },
        { name: 'Block Size', value: this.dbInfo.blockSize },
        { name: 'Charset', value: this.dbInfo.charset },
        { name: 'N Charset', value: this.dbInfo.nCharset }
      ]
    },
    memory() {
      return [
        { name: 'Memory Target', value: this.dbInfo.memoryTarget },
        { name: 'PGA Target (GB)', value: this.dbInfo.pgaTarget },
        { name: 'SGA MaxSize (GB)', value: this.dbInfo.sgaMaxSize },
        { name: 'SGA Target (GB)', value: this.dbInfo.sgaTarget }
      ]
    },
    resource() {
      return [
        { name: 'Db Time', value: this.dbInfo.dbTime },
        { name: 'Elapsed', value: this.dbInfo.elapsed },
        { name: 'Thread Used', value: this.dbInfo.work },
        { name: 'CPU Count', value: this.dbInfo.cpuCount }
      ]
    },
    space() {
      return [
        {
          name: 'Allocable (GB)',
          value: this.dbInfo.allocable
        },
        {
          name: 'DataFile Size (GB)',
          value: this.dbInfo.datafileSize
        },
        {
          name: 'Segments Size (GB)',
          value: this.dbInfo.segmentsSize
        }
      ]
    },
    additional() {
      return [
        { name: 'ASM', value: this.dbInfo.asm, hasIcon: true },
        { name: 'Data Guard', value: this.dbInfo.dataguard, hasIcon: true },
        { name: 'Platform', value: this.dbInfo.platform },
        { name: 'Version', value: this.dbInfo.version }
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>
