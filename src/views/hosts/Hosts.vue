<template>
  <section>
    <AllHostsTable :hosts="hosts" />
  </section>
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
  async created() {
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
