<template>
  <article>
    <HostDetailsTable :hostTable="host" />

    <div class="columns">
      <HostDetailsGraph :hostname="host.Hostname" />
      <HostDetailsData :hostname="host.Hostname" />
    </div>
  </article>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import HostDetailsTable from '@/components/hosts/HostDetailsTable.vue'
import HostDetailsGraph from '@/components/hosts/HostDetailsGraph.vue'
import HostDetailsData from '@/components/hosts/HostDetailsData.vue'

export default {
  props: {
    hostname: {
      type: String,
      required: true
    }
  },
  components: {
    HostDetailsTable,
    HostDetailsGraph,
    HostDetailsData
  },
  data() {
    return {
      host: {}
    }
  },
  async beforeMount() {
    await this.getHostByName(this.hostname)
    this.host = this.getCurrentHost
  },
  methods: {
    ...mapActions(['getHostByName'])
  },
  computed: {
    ...mapGetters(['getCurrentHost'])
  }
}
</script>

<style lang="scss" scoped></style>
