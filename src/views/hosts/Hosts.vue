<template>
  <section>
    <PageTitle />
    <HostList :hosts="hosts" />
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import PageTitle from '@/components/common/PageTitle.vue'
import HostList from '@/components/hosts/hosts/HostsList.vue'

export default {
  components: {
    PageTitle,
    HostList
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
