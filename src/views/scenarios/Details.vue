<template>
  <BoxContent
    :title="`${getCurrentScenario.name} - ${getDateTime(
      getCurrentScenario.createdAt
    )} - ${getCurrentScenario.location}`"
    customStyleTitle="font-size: 18px; margin-bottom: 0"
    border
    hasShadow
  >
    <div slot="customTitle">
      <b-button
        type="is-danger is-small"
        @click="handleDeleteScenario"
        label="Delete Scenario"
        icon-pack="fas"
        icon-left="trash"
      />
    </div>

    <DetailsSummary
      :summaryData="getCurrentScenario.hosts"
      :isLoading="loadingTableStatus"
    />

    <LicensesDetails />
  </BoxContent>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { bus } from '@/helpers/eventBus.js'
import formatDateTime from '@/filters/formatDateTime'
import BoxContent from '@/components/common/BoxContent.vue'
import DetailsSummary from '@/components/scenarios/details/DetailsSummary.vue'
import LicensesDetails from '@/components/scenarios/details/LicensesDetails.vue'

export default {
  name: 'DetailsScenarios',
  components: {
    BoxContent,
    DetailsSummary,
    LicensesDetails,
  },
  async beforeMount() {
    bus.$emit('dynamicTitle', this.$route.params.scenario)
    await this.fetchCurrentScenario(this.$route.params.id)
  },
  methods: {
    ...mapActions(['fetchCurrentScenario', 'deleteListScenario']),
    getDateTime(date) {
      return formatDateTime(date)
    },
    handleDeleteScenario() {
      const scenario = this.$route.params.scenario
      const id = this.$route.params.id

      this.$buefy.dialog.confirm({
        title: `Delete Scenario`,
        message: `Are you sure you want to <b>delete</b> the scenario <b>${scenario}</b>? This action cannot be undone.`,
        confirmText: 'Confirm',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.deleteScenario(id, scenario)
        },
      })
    },
    async deleteScenario(id, name) {
      await this.deleteListScenario(id).then((res) => {
        if (res.status === 204) {
          this.$buefy.toast.open({
            message: `The scenario ${name} was deleted!`,
            type: 'is-success',
            duration: 5000,
            position: 'is-bottom',
          })
          this.listScenario()
        } else {
          this.$buefy.toast.open({
            message: `Something went wrong with this scenario. Please try again!`,
            type: 'is-danger',
            duration: 5000,
            position: 'is-bottom',
          })
        }
      })
    },
    listScenario() {
      this.$router.push({
        name: 'list-scenarios',
      })
    },
  },
  computed: {
    ...mapGetters(['getCurrentScenario', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
