<template>
  <div>
    <PageTitle :pageTitle="$t('dashboard.pageTitle.totalTargets')" />

    <div style="padding: 1rem">
      total targets content
    </div>
  </div>
</template>

<script>
import PageTitle from '../Common/PageTitle'

export default {
  components: {
    PageTitle
  }
}
</script>

<style lang="scss" scoped></style>
