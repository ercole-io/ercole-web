<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Create a New Role</p>
    </header>
    <section class="modal-card-body">
      <b-input
        v-model="newRole"
        size="is-small"
        placeholder="Write the Role Name"
      />
    </section>
    <footer class="modal-card-foot is-justify-content-flex-end">
      <b-button label="Cancel" @click="$parent.close()" />
      <b-button label="Create" type="is-primary" @click="addRole" />
    </footer>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      newRole: null,
    }
  },
  methods: {
    ...mapActions(['createRole']),
    addRole() {
      this.createRole(this.newRole)
      this.$parent.close()
    },
  },
}
</script>

<style lang="scss" scoped></style>
