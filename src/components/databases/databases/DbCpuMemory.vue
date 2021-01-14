<template>
  <div class="is-flex" style="justify-content: space-around;">
    <p class="is-size-7 has-text-centered" style="margin-bottom: 0">
      CPU <br />
      <span class="is-size-7 has-text-weight-light">
        Total Thread Used
      </span>
      <br />
      <span class="is-size-5 has-text-weight-medium">
        {{ getTotalCpu }}
      </span>
    </p>
    <p class="is-size-7 has-text-centered" style="margin-bottom: 0">
      Memory <br />
      <span class="is-size-7 has-text-weight-light">
        Total Memory Size
      </span>
      <br />
      <span class="is-size-5 has-text-weight-medium">
        {{ databases.totalMemory | formatNumber('0.00', 'GB') }}
      </span>
    </p>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['databases']),
    ...mapGetters(['getTotalCpu'])
  }
}
</script>

<style lang="scss" scoped></style>
