<template>
  <div id="app">
    <b-tag
      type="is-danger"
      class="db-connected animate__animated animate__fadeInDown"
      v-if="!isDbConnected"
    >
      Database Not Connected!
    </b-tag>

    <component :is="layout">
      <Suspense>
        <Loading :isLoading="loadingStatus" :isFullPage="true" />
        <router-view
          v-if="isConfigLoaded"
          v-show="!loadingStatus"
          :key="$route.fullPath"
        />
      </Suspense>
    </component>

    <b-modal
      :active.sync="isChangePassModalActive"
      custom-class="custom-class custom-class-2"
      :has-modal-card="true"
    >
      <ChangePassModal
        :limitedUsername="changePassUsername"
        :oldPassword="changePassOldPassword"
      />
    </b-modal>
  </div>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Loading from '@/components/common/Loading.vue'
import ChangePassModal from '@/views/profile/ChangePassModal.vue'
const default_layout = 'default'

export default {
  name: 'app-page',
  components: {
    Loading,
    ChangePassModal,
  },
  data() {
    return {
      isChangePassModalActive: false,
      changePassUsername: '',
      changePassOldPassword: '',
    }
  },
  beforeMount() {
    bus.$on('isLimitedData', (data) => {
      this.isChangePassModalActive = true
      this.changePassUsername = data.limitedUsername
      this.changePassOldPassword = data.oldPassword
    })
  },
  created() {
    this.fetchConfig().then(this.offLoading)
    this.fetchConfigSSO()
      .then((res) => {
        const sso_data = {
          ...res.data,
        }

        this.SET_SSO_VISIBILITY(sso_data.sso_visible)
        sessionStorage.setItem('sso', JSON.stringify(sso_data))
      })
      .catch((err) => {
        if (err) {
          this.SET_SSO_VISIBILITY(false)
        }
      })
  },
  methods: {
    ...mapActions([
      'tryAutoLogin',
      'fetchConfig',
      'fetchConfigSSO',
      'offLoading',
    ]),
    ...mapMutations(['SET_SSO_VISIBILITY']),
  },
  computed: {
    ...mapGetters(['loadingStatus', 'isConfigLoaded', 'isDbConnected']),
    layout() {
      return (this.$route.meta.layout || default_layout) + '-layout'
    },
  },
}
</script>

<style lang="scss">
.db-connected {
  position: absolute;
  top: 18px;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
}
</style>
