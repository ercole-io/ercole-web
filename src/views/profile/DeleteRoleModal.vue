<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Delete Role</p>
    </header>
    <section class="modal-card-body">
      <b-select
        size="is-small"
        v-model="roleToDelete"
        placeholder="Select Role"
        expanded
      >
        <option
          v-for="role in roleList"
          :key="role.name"
          :value="role.name"
          class="is-relative"
        >
          {{ role.name }}
        </option>
      </b-select>
    </section>
    <footer class="modal-card-foot is-justify-content-flex-end">
      <b-button label="Cancel" @click="$parent.close()" />
      <b-button label="Delete" type="is-danger" @click="delRole" />
    </footer>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    roleList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      roleToDelete: null,
    }
  },
  methods: {
    ...mapActions(['deleteRole']),
    delRole() {
      this.deleteRole(this.roleToDelete)
      this.$parent.close()
    },
  },
}
</script>

<style lang="scss" scoped></style>
