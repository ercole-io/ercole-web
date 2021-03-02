<template>
  <section v-if="isMounted">
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

    <HostInfo />

    <div class="columns">
      <HostDatabases :activeDB="dbname" :hostname="hostname" />
      <ChartCpu :chartData="chartData" :hostname="hostname" />
    </div>
  </section>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapGetters, mapActions, mapState } from 'vuex'
import BoxContent from '@/components/common/BoxContent.vue'
import NotificationsInfo from '@/components/hosts/hostDetails/NotificationsInfo.vue'
// import HostTags from '@/components/common/Tags.vue'
import HostInfo from '@/components/hosts/hostDetails/HostInfo.vue'
import ChartCpu from '@/components/hosts/hostDetails/ChartCpu.vue'
import HostDatabases from '@/components/hosts/hostDetails/databases/Databases.vue'
import Filesys from '@/components/hosts/hostDetails/Filesys.vue'
import axiosDefault from '@/axios/axios-default.js'

export default {
  props: {
    hostname: {
      type: String,
      required: true,
      default: ''
    },
    dbname: {
      type: String,
      required: false,
      default: ''
    }
  },
  components: {
    BoxContent,
    NotificationsInfo,
    // HostTags,
    HostInfo,
    ChartCpu,
    HostDatabases,

    Filesys
  },
  data() {
    return {
      chartData: [],
      isMounted: false
    }
  },
  async beforeMount() {
    await this.getHostByName(this.hostname)
    bus.$emit('dynamicTitle', this.hostname)

    this.chartData = this.getGpuGrowthChart

    this.isMounted = true
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
          axiosDefault
            .delete(`/hosts/${hostname}`)
            .then(() => {
              this.$router.push({ name: 'hosts' })
            })
            .then(() => {
              this.$buefy.toast.open({
                message: `The host ${hostname} was successfully dismissed!`,
                type: 'is-success',
                duration: 10000000000,
                position: 'is-bottom'
              })
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
