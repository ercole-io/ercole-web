<template>
  <article>
    <BoxContent
      title="Ercole Settings"
      border
      :mbottom="false"
      v-if="isMounted"
    >
      <SearchInput
        searchPlaceholder="Search By Label Name"
        @input="searchByLabels($event)"
        style="margin-right: 10px"
        slot="customTitle"
      />

      <b-collapse
        class="card collapse-card"
        animation="slide"
        key="1"
        :open="isOpen == 1"
        @open="isOpen = 1"
        :aria-id="'col-' + 1"
      >
        <template #trigger="props">
          <div
            class="card-header collapse-header"
            role="button"
            :aria-controls="'col-' + 1"
            :aria-expanded="props.open"
          >
            <p class="card-header-title collapse-title">
              <span :class="{ highlightText: highlightApiService }">
                Api Service
              </span>
            </p>
            <a class="card-header-icon collapse-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon>
            </a>
          </div>
        </template>
        <div class="card-content">
          <div class="content collapse-content extra-padding">
            <ApiService />
          </div>
        </div>
      </b-collapse>

      <b-collapse
        class="card collapse-card"
        animation="slide"
        key="2"
        :open="isOpen == 2"
        @open="isOpen = 2"
        :aria-id="'col-' + 2"
      >
        <template #trigger="props">
          <div
            class="card-header collapse-header"
            role="button"
            :aria-controls="'col-' + 2"
            :aria-expanded="props.open"
          >
            <p class="card-header-title collapse-title">
              <span :class="{ highlightText: highlightAlertService }">
                Alert Service
              </span>
            </p>
            <a class="card-header-icon collapse-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon>
            </a>
          </div>
        </template>
        <div class="card-content">
          <div class="content collapse-content extra-padding">
            <AlertService />
          </div>
        </div>
      </b-collapse>

      <b-collapse
        class="card collapse-card"
        animation="slide"
        key="3"
        :open="isOpen == 3"
        @open="isOpen = 3"
        :aria-id="'col-' + 3"
      >
        <template #trigger="props">
          <div
            class="card-header collapse-header"
            role="button"
            :aria-controls="'col-' + 3"
            :aria-expanded="props.open"
          >
            <p class="card-header-title collapse-title">
              <span :class="{ highlightText: highlightChartService }">
                Chart Service
              </span>
            </p>
            <a class="card-header-icon collapse-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon>
            </a>
          </div>
        </template>
        <div class="card-content">
          <div class="content collapse-content extra-padding">
            <ChartService />
          </div>
        </div>
      </b-collapse>

      <b-collapse
        class="card collapse-card"
        animation="slide"
        key="4"
        :open="isOpen == 4"
        @open="isOpen = 4"
        :aria-id="'col-' + 4"
      >
        <template #trigger="props">
          <div
            class="card-header collapse-header"
            role="button"
            :aria-controls="'col-' + 4"
            :aria-expanded="props.open"
          >
            <p class="card-header-title collapse-title">
              <span :class="{ highlightText: highlightDataService }">
                Data Service
              </span>
            </p>
            <a class="card-header-icon collapse-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon>
            </a>
          </div>
        </template>
        <div class="card-content">
          <div class="content collapse-content extra-padding">
            <DataService />
          </div>
        </div>
      </b-collapse>

      <b-collapse
        class="card collapse-card"
        animation="slide"
        key="5"
        :open="isOpen == 5"
        @open="isOpen = 5"
        :aria-id="'col-' + 5"
      >
        <template #trigger="props">
          <div
            class="card-header collapse-header"
            role="button"
            :aria-controls="'col-' + 5"
            :aria-expanded="props.open"
          >
            <p class="card-header-title collapse-title">
              <span :class="{ highlightText: highlightResourceFilePath }">
                Resource File Path
              </span>
            </p>
            <a class="card-header-icon collapse-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon>
            </a>
          </div>
        </template>
        <div class="card-content">
          <div class="content collapse-content extra-padding">
            <ResourceFilePath />
          </div>
        </div>
      </b-collapse>

      <b-collapse
        class="card collapse-card"
        animation="slide"
        key="6"
        :open="isOpen == 6"
        @open="isOpen = 6"
        :aria-id="'col-' + 6"
      >
        <template #trigger="props">
          <div
            class="card-header collapse-header"
            role="button"
            :aria-controls="'col-' + 6"
            :aria-expanded="props.open"
          >
            <p class="card-header-title collapse-title">
              <span :class="{ highlightText: highlightThunderService }">
                Thunder Service
              </span>
            </p>
            <a class="card-header-icon collapse-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon>
            </a>
          </div>
        </template>
        <div class="card-content">
          <div class="content collapse-content extra-padding">
            <ThunderService />
          </div>
        </div>
      </b-collapse>
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
      isOpen: 0,
    }
  },
  async created() {
    await this.requestSettings().then(() => {
      this.isMounted = true
    })
  },
  methods: {
    ...mapActions(['requestSettings']),
  },
}
</script>

<style lang="scss" scoped>
.collapse-card {
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
}
</style>
