<template>
  <section>
    <boxContent>
      <div class="columns">
        <div class="column is-9">
          <NotificationsInfo />
        </div>
        <div
          class="column is-3 has-text-right is-flex"
          style="justify-content: flex-end;"
        >
          <Filesys />

          <b-button
            class="ml-2"
            type="is-danger is-small"
            @click="deleteHost(hostname)"
          >
            Dismiss
          </b-button>
        </div>
      </div>
    </boxContent>

    <!-- <boxContent>
      <HostTags
        title="Host Tags:"
        inputWidth="150"
        :tagsList="['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4']"
        @addTag="handleAddTag"
        @removeTag="handleRemoveTag"
        @editTag="handleEditTag"
      />
    </boxContent> -->

    <BoxContent>
      <HostInfo />
    </BoxContent>

    <div class="columns">
      <BoxContent :title="`Databases of ${hostname}`" class="column is-8">
        <HostDatabases
          :activeDB="dbname"
          v-if="hostDetails.hostDBs.length > 0"
        />
        <noContent
          v-else
          noContentText="There are no Databases for this Host"
        />
      </BoxContent>

      <BoxContent :title="`CPU Usage of ${hostname}`" class="column is-4">
        <HostGraph :chartData="chartData" />
      </BoxContent>
    </div>
    <BoxContent v-if="hostDetails.currentHost.features.unknown.customData" :title="`Custom data of ${hostname}`" class="column is-12">
      <pre>
        {{ hostDetails.currentHost.features.unknown.customData | json 4 }} 
      </pre>
    </BoxContent>
  </section>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapGetters, mapActions, mapState } from 'vuex'
import BoxContent from '@/components/common/BoxContent.vue'
import NotificationsInfo from '@/components/hosts/hostDetails/NotificationsInfo.vue'
// import HostTags from '@/components/common/Tags.vue'
import HostInfo from '@/components/hosts/hostDetails/HostInfo.vue'
import HostGraph from '@/components/hosts/hostDetails/Graph.vue'
import HostDatabases from '@/components/hosts/hostDetails/databases/Databases.vue'
import noContent from '@/components/common/NoContent.vue'
import Filesys from '@/components/hosts/hostDetails/Filesys.vue'
import axiosDefault from '@/axios/axios-default.js'

export default {
  props: {
    hostname: {
      type: String,
      required: true
    },
    dbname: {
      type: String,
      required: false
    }
  },
  components: {
    BoxContent,
    NotificationsInfo,
    // HostTags,
    HostInfo,
    HostGraph,
    HostDatabases,
    noContent,
    Filesys
  },
  data() {
    return {
      chartData: []
    }
  },
  async beforeMount() {
    await this.getHostByName(this.hostname)
    bus.$emit('dynamicTitle', this.hostname)

    this.chartData = this.getGpuGrowthChart
  },
  methods: {
    ...mapActions(['getHostByName']),
    deleteHost(hostname) {
      this.$buefy.dialog.confirm({
        title: 'Dismissing Host',
        message: `Are you sure you want to <b>dismiss</b> the host <b>${hostname}</b>? This action cannot be undone.`,
        confirmText: 'Dismiss Host',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          axiosDefault.delete(`/hosts/${hostname}`).then(() => {
            this.$router.push({ name: 'hosts' })
            bus.$emit('hostDismissedMsg', hostname)
          })
        }
      })
    },
    handleAddTag(value) {
      console.log('make api call to add tag', value)
    },
    handleRemoveTag(value) {
      console.log('make api call to remove tag', value)
    },
    handleEditTag(value) {
      console.log('make api call to edit tag', value)
    }
  },
  computed: {
    ...mapState(['hostDetails']),
    ...mapGetters(['getCurrentHost', 'getGpuGrowthChart'])
  }
}
</script>

<style lang="scss" scoped></style>
