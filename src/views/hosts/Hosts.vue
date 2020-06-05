<template>
  <section>
    <PageTitle />
    <AllHostsTable :hosts="hosts" />
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import PageTitle from '@/components/common/PageTitle.vue'
import AllHostsTable from '@/components/hosts/hosts/HostsList.vue'

export default {
  components: {
    PageTitle,
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
