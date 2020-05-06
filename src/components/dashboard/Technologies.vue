<template>
  <div>
    <PageTitle :pageTitle="$t('dashboard.pageTitle.technologies')" />

    <div style="padding: 1rem">
      technologies content
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
