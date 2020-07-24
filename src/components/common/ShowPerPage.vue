<template>
  <div>
    Showing {{ totalItems > perPage ? perPage : totalItems }} hosts from
    {{ totalItems }}
  </div>
</template>

<script>
export default {
  props: {
    totalItems: {
      type: Number
    },
    perPage: {
      type: Number
    }
  }
}
</script>

<style lang="scss" scoped></style>
