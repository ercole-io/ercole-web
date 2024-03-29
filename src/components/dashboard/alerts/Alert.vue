<template>
  <div class="card alert-card">
    <header class="card-header">
      <p class="card-header-title alert-title">
        <b-icon type="is-dark" pack="fas" size="is-small" :icon="title[1]" />
        <span :data-cy="setDataCy">{{ title[0] }}</span>
      </p>
    </header>

    <main
      class="alert-body"
      v-if="loading || getTotals.total"
      :data-cy="`${setDataCy}-id`"
    >
      <transition name="flip" :duration="5000">
        <div v-if="!isAnimated">
          <div class="columns is-vcentered is-gapless bottom-space">
            <div class="column">
              <GhostLoading :isLoading="loading" setHeight="24" setWidth="24">
                <b-icon
                  v-if="!loading && getTotals.total"
                  :type="setIcon.iconType"
                  :icon="setIcon.icon"
                  custom-size="mdi-24px"
                />
              </GhostLoading>
            </div>

            <div class="column">
              <GhostLoading :isLoading="loading" setHeight="30" setWidth="116">
                <b-button
                  :data-cy="`${setDataCy}-mark-as-read`"
                  @click="
                    handleMarkAsRead(
                      getFirst.alertId,
                      hasFlag,
                      getFirst.severity
                    )
                  "
                  type="is-ercole-blue"
                  size="is-small"
                  icon-pack="fas"
                  icon-left="check-circle"
                  class="has-text-weight-semibold"
                  style="float: right"
                  v-if="!loading && getTotals.total && isAdmin"
                >
                  {{ $t('views.dashboard.markAsRead') }}
                </b-button>
              </GhostLoading>
            </div>
          </div>
          <div class="columns is-vcentered is-gapless bottom-space mt-3">
            <div class="column">
              <GhostLoading :isLoading="loading">
                <p v-if="!loading && getTotals.total">
                  <span class="has-text-weight-semibold">
                    {{ $t('views.dashboard.from') }}
                  </span>

                  {{ getFirst.host }}
                </p>
              </GhostLoading>
            </div>
          </div>
          <div class="columns is-vcentered is-gapless bottom-space">
            <div class="column">
              <GhostLoading :isLoading="loading">
                <p v-if="!loading && getTotals.total">
                  <span class="has-text-weight-semibold">
                    {{ $t('views.dashboard.date') }}
                  </span>
                  {{ getFirst.date | formatDate }}
                </p>
              </GhostLoading>
            </div>
          </div>
          <div class="columns is-vcentered is-gapless bottom-space">
            <div class="column">
              <GhostLoading :isLoading="loading" setSize="is-large">
                <p v-if="!loading && getTotals.total" class="wrap-msg">
                  {{ getFirst.msg }}
                </p>
              </GhostLoading>
            </div>
          </div>
          <div class="columns is-vcentered is-gapless bottom-space">
            <div class="column has-text-centered">
              <GhostLoading :isLoading="loading" setSize="is-small">
                <a
                  @click="descriptionAlert(getFirst)"
                  v-if="!loading && getTotals.total"
                  class="full-description"
                  :data-cy="`${setDataCy}-full-desc`"
                >
                  {{ $t('common.general.fullDesc') }}
                </a>
              </GhostLoading>
            </div>
          </div>
        </div>
      </transition>
    </main>
    <main class="alert-body" v-if="!getTotals.total && !loading">
      <NoContent
        :noContentText="`${$t('views.dashboard.noAlerts')} ${setDataCy}`"
      />
    </main>
    <GhostLoading :isLoading="loading" setHeight="30">
      <footer class="card-footer card-buttons">
        <b-button
          @click="handleAlertClick(hasFlag, 'INFO')"
          :disabled="getTotals.info === 0"
          :type="{
            'is-light-blue': getTotals.info !== 0,
            'inverted-alert info': getTotals.info === 0,
          }"
          size="is-small"
          icon-pack="mdi"
          icon-left="information"
          class="has-text-weight-semibold alert-button"
          expanded
          :data-cy="`${setDataCy}-info`"
        >
          <p :data-cy="`${setDataCy}-info-value`">{{ getTotals.info }}</p>
        </b-button>

        <b-button
          @click="handleAlertClick(hasFlag, 'WARNING')"
          :disabled="getTotals.warn === 0"
          :type="{
            'is-light-warning': getTotals.warn !== 0,
            'inverted-alert warning': getTotals.warn === 0,
          }"
          size="is-small"
          icon-pack="mdi"
          icon-left="alert"
          class="has-text-weight-semibold alert-button"
          expanded
          :data-cy="`${setDataCy}-warn`"
        >
          <p :data-cy="`${setDataCy}-warn-value`">{{ getTotals.warn }}</p>
        </b-button>

        <b-button
          @click="handleAlertClick(hasFlag, 'CRITICAL')"
          :disabled="getTotals.crit === 0"
          :type="{
            'is-light-danger': getTotals.crit !== 0,
            'inverted-alert danger': getTotals.crit === 0,
          }"
          size="is-small"
          icon-pack="mdi"
          icon-left="alert-circle"
          class="has-text-weight-semibold alert-button"
          expanded
          :data-cy="`${setDataCy}-crit`"
        >
          <p :data-cy="`${setDataCy}-crit-value`">{{ getTotals.crit }}</p>
        </b-button>
      </footer>
    </GhostLoading>
  </div>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapGetters } from 'vuex'
import { descriptionAlertDialog } from '@/helpers/alertsDescDialog.js'
import { checkAlertIcon } from '@/helpers/helpers.js'
import NoContent from '@/components/common/NoContent.vue'
import GhostLoading from '@/components/common/GhostLoading.vue'

export default {
  name: 'daschboard-alerts-alert-component',
  props: {
    title: {
      type: Array,
      default: () => [],
    },
    alertCategory: {
      type: String,
      required: true,
    },
  },
  components: {
    NoContent,
    GhostLoading,
  },
  data() {
    return {
      isAnimated: false,
      loading: true,
    }
  },
  beforeMount() {
    bus.$on('loadAlertsComplete', () => {
      this.loading = false
    })
  },
  methods: {
    ...mapActions(['markAsReadDashboard']),
    handleMarkAsRead(id, flag, type) {
      this.markAsReadDashboard({ id, flag, type }).then(() => {
        this.isAnimated = !this.isAnimated
      })
    },
    handleAlertClick(category, severity) {
      this.$store.commit('SET_ALERTS_PARAMS', {
        status: 'NEW',
        category: category,
        severity: severity,
      })
      this.$router.push('/alerts')
    },
    descriptionAlert(info) {
      const data = {
        code: info.code,
        host: info.host,
        categ: info.category,
        date: info.date,
        desc: info.msg,
        severity: info.severity,
      }
      descriptionAlertDialog(data)
    },
  },
  computed: {
    ...mapGetters([
      'getFirstAlertByCategory',
      'getTotalAlertsByCategory',
      'isAdmin',
    ]),
    getFirst() {
      return this.getFirstAlertByCategory(this.alertCategory)
    },
    getTotals() {
      return this.getTotalAlertsByCategory(this.alertCategory)
    },
    hasFlag() {
      return this.getFirst && this.getFirst.category
        ? this.getFirst.category
        : null
    },
    setIcon() {
      return checkAlertIcon(this.getFirst.severity)
    },
    setDataCy() {
      if (this.title[0] === 'Licenses') {
        return 'licenses'
      } else {
        return 'ercole-engine'
      }
    },
  },
  watch: {
    isAnimated(newValue, oldValue) {
      if (newValue) {
        setTimeout(() => {
          this.isAnimated = oldValue
        }, 1000)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.alert-card {
  padding: 0;
  margin-bottom: 1.5em;
  width: 100%;

  .alert-title {
    font-size: 0.9em !important;

    span:not(:first-child) {
      padding-left: 5px;
    }
  }

  .alert-body {
    font-size: 0.75rem;
    padding: 1rem;
    width: 100%;

    .bottom-space {
      &:not(:last-child) {
        margin-bottom: 0.2rem;
      }
    }
  }

  .card-buttons {
    display: flex;
    width: 100%;

    .alert-button {
      height: 30px;
      font-size: 15px;
      border-radius: 0;

      &:disabled {
        opacity: 1;
      }
    }

    .inverted-alert {
      background-color: #c1c1c1;
      border: none;
    }
  }
}

.full-description {
  color: $custom-primary;

  &:hover {
    color: $ercole-blue;
  }
}

.wrap-msg {
  text-overflow: ellipsis;
  overflow: hidden;
  max-height: 55px;
  white-space: break-spaces;
  overflow-wrap: anywhere;
}

.flip-enter-active {
  transition: all 0.2s cubic-bezier(0.55, 0.085, 0.68, 0.53); //ease-in-quad
}

.flip-leave-active {
  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94); //ease-out-quad
}

.flip-enter,
.flip-leave-to {
  transform: scaleY(0) translateZ(0);
  opacity: 0;
}
</style>
