<template>
  <HostsAll :hosts="hosts" />
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import HostsAll from '@/components/hosts/HostsAll.vue'

export default {
  components: {
    HostsAll
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
