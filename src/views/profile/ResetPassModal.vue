<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Reset Password</p>
    </header>
    <section class="modal-card-body">
      <p class="is-size-6">
        Your password has been reset! <br />
        After logging in, change your password in change password.
      </p>
      <br />
      <p class="is-size-6">
        New Password:
        <span v-copy="newPass" class="has-text-weight-bold">
          {{ newPass }}
        </span>
      </p>
    </section>
    <footer class="modal-card-foot is-justify-content-flex-end">
      <b-button label="Confirm" type="is-primary" @click="$emit('close')" />
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    newPass: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped></style>
