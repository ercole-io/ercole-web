<template>
  <div>
    Groups

    <b-button @click="addGroup">add group</b-button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  async beforeMount() {
    await this.getGroups()
  },
  methods: {
    ...mapActions(['getGroups', 'createGroup']),
    addGroup() {
      const data = {
        name: 'GroupTest10',
        roles: ['RoleTest1', 'RoleTest2'],
      }
      this.createGroup(data)
    },
  },
}
</script>

<style lang="scss" scoped></style>
