<template>
  <ErrorCode
    code="500"
    :codeText="$t('common.errors.500')"
    :codeDesc="$t('common.errors.500msg')"
  >
    <div class="buttons" slot="actions">
      <b-button type="is-ercole-blue" @click="$router.go(-1)">
        {{ $t('common.general.goBack') }}
      </b-button>
      <b-button type="is-ercole-blue">
        <router-link to="/" class="routerLink">Dashboard</router-link>
      </b-button>
    </div>
  </ErrorCode>
</template>

<script>
import ErrorCode from '@/components/common/ErrorCode.vue'

export default {
  name: 'internalserver-page',
  components: {
    ErrorCode,
  },
}
</script>

<style lang="scss" scoped>
.routerLink {
  color: white;
}
</style>
