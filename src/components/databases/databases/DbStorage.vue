<template>
  <div>
    <p class="is-size-7 has-text-centered" style="margin-bottom: 0">
      Storage
    </p>
    <div class="is-flex" style="justify-content: space-around;">
      <p class="has-text-centered">
        <span class="is-size-7 has-text-weight-light">
          Total Segment Size
        </span>
        <br />
        <span class="is-size-5 has-text-weight-medium">
          {{ databases.totalSegment | formatNumber('0.00', 'GB') }}
        </span>
      </p>
      <p class="has-text-centered">
        <span class="is-size-7 has-text-weight-light">
          Total Datafile Size
        </span>
        <br />
        <span class="is-size-5 has-text-weight-medium">
          {{ databases.totalDatafile | formatNumber('0.00', 'GB') }}
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['databases'])
  }
}
</script>

<style lang="scss" scoped></style>
