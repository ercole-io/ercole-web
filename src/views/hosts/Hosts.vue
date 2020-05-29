<template>
  <AllHostsTable :hosts="hosts" />
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AllHostsTable from '@/components/hosts/AllHostsTable.vue'

export default {
  components: {
    AllHostsTable
  },
  data() {
    return {
      hosts: []
    }
  },
  async beforeMount() {
    await this.getHosts()
    this.hosts = this.getAllHosts
  },
  methods: {
    ...mapActions(['getHosts'])
  },
  computed: {
    ...mapGetters(['getAllHosts'])
  }
}
</script>

<style lang="scss"></style>
