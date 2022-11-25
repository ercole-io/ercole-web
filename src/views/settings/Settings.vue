<template>
  <BoxContent title="Ercole Settings" border :mbottom="false" v-if="isMounted">
    <div slot="customTitle">
      <b-button
        type="is-danger"
        size="is-small"
        @click="resetAllSettings"
        class="mr-2"
      >
        Restore All
      </b-button>

      <b-button
        type="is-custom-primary"
        size="is-small"
        @click="submitSettings"
      >
        Save All
      </b-button>
    </div>
    <Collapse :collapses="collapses">
      <template slot="Api Service">
        <ApiService />
      </template>

      <template slot="Alert Service">
        <AlertService />
      </template>

      <template slot="Chart Service">
        <ChartService />
      </template>

      <template slot="Data Service">
        <DataService />
      </template>

      <template slot="Resource File Path">
        <ResourceFilePath />
      </template>

      <template slot="Thunder Service">
        <ThunderService />
        <!-- <VueJsonPretty :data="getThunderService" /> -->
      </template>
    </Collapse>
  </BoxContent>
</template>

<script>
import { mapActions } from 'vuex'
import settings from '@/mixins/settings/settings.js'
import BoxContent from '@/components/common/BoxContent.vue'
import Collapse from '@/components/common/Collapse.vue'
import AlertService from '@/components/settings/AlertService.vue'
import ApiService from '@/components/settings/ApiService.vue'
import ChartService from '@/components/settings/ChartService.vue'
import DataService from '@/components/settings/DataService.vue'
import ResourceFilePath from '@/components/settings/ResourceFilePath.vue'
import ThunderService from '@/components/settings/ThunderService.vue'

export default {
  mixins: [settings],
  components: {
    BoxContent,
    Collapse,
    AlertService,
    ApiService,
    ChartService,
    DataService,
    ResourceFilePath,
    ThunderService,
  },
  data() {
    return {
      collapses: [
        'Api Service',
        'Alert Service',
        'Chart Service',
        'Data Service',
        'Resource File Path',
        'Thunder Service',
      ],
      isMounted: false,
    }
  },
  async beforeMount() {
    await this.requestSettings().then(() => {
      this.isMounted = true
    })
  },
  methods: {
    ...mapActions(['requestSettings']),
  },
}
</script>

<style lang="scss" scoped></style>
