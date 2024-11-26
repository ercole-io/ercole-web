<template>
  <article v-if="isMounted">
    <BoxContent title="Ercole Settings" border :mbottom="false">
      <SearchInput
        searchPlaceholder="Search By Label Name"
        @input="searchByLabels($event)"
        style="margin-right: 10px"
        slot="customTitle"
      />

      <b-tabs
        v-model="activeTab"
        size="is-small"
        type="is-boxed"
        vertical
        animated
        expanded
      >
        <b-tab-item
          v-for="item in settingsData"
          :value="item.name"
          :label="item.name"
          :key="item.order"
          :headerClass="['settings-menu-item', hightlightMenu(item.comp)]"
        >
          <component :is="item.comp" class="settings-component" />
        </b-tab-item>
      </b-tabs>
    </BoxContent>
  </article>
</template>

<script>
import settings from '@/mixins/settings/settings.js'
import BoxContent from '@/components/common/BoxContent.vue'
import AlertService from '@/components/settings/AlertService.vue'
import ApiService from '@/components/settings/ApiService.vue'
import ChartService from '@/components/settings/ChartService.vue'
import DataService from '@/components/settings/DataService.vue'
import ResourceFilePath from '@/components/settings/ResourceFilePath.vue'
import ThunderService from '@/components/settings/ThunderService.vue'
import SearchInput from '@/components/common/SearchInput.vue'
import { mapActions } from 'vuex'

export default {
  name: 'settings-page',
  mixins: [settings],
  components: {
    BoxContent,
    AlertService,
    ApiService,
    ChartService,
    DataService,
    ResourceFilePath,
    ThunderService,
    SearchInput,
  },
  data() {
    return {
      isMounted: false,
      isOpen: 0,
      activeTab: 1,
      settingsData: [
        {
          order: 0,
          name: 'Api Service',
          comp: 'ApiService',
        },
        {
          order: 1,
          name: 'Alert Service',
          comp: 'AlertService',
        },
        {
          order: 2,
          name: 'Chart Service',
          comp: 'ChartService',
        },
        {
          order: 3,
          name: 'Data Service',
          comp: 'DataService',
        },
        {
          order: 4,
          name: 'Thunder Service',
          comp: 'ThunderService',
        },
        {
          order: 5,
          name: 'Resource File Path',
          comp: 'ResourceFilePath',
        },
      ],
    }
  },
  async beforeMount() {
    await this.requestSettings().then(() => {
      this.isMounted = true
    })
  },
  methods: {
    ...mapActions(['requestSettings']),
    hightlightMenu(item) {
      return this[`highlight${item}`] ? 'highlightText-settings' : null
    },
  },
}
</script>

<style lang="scss">
.settings-component {
  width: 80%;
  margin: 0 auto;
}

.settings-menu-item {
  max-width: 100% !important;

  a {
    justify-content: right !important;
    font-weight: 500;
    font-size: 0.8rem;
  }
}

/* .collapse-card {
  box-shadow: none;
  margin-bottom: 15px;
}

.collapse-header {
  background-color: #ededed;
}

.collapse-title {
  margin-bottom: 0 !important;
  font-size: 0.8em;
  padding: 0.5rem 0.75rem;
}

.collapse-icon {
  padding: 0.5rem;
}

.collapse-content {
  padding: 0;

  .content {
    padding: 25px;
  }
}

.extra-padding {
  padding: 5px 10px 10px 10px;
}
.extra-margin {
  margin-bottom: 10px;
} */
</style>
