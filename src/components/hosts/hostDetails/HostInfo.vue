<template>
  <section>
    <div class="columns">
      <div class="column">
        <div class="columns">
          <div class="column">
            <Card cardTitle="General info">
              <CardList :list="general" />
            </Card>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <Card cardTitle="Agent">
              <CardList :list="agent" />
            </Card>
          </div>
        </div>
      </div>

      <div class="column">
        <div class="columns">
          <div class="column">
            <Card cardTitle="Virtual">
              <CardList :list="virtual" />
            </Card>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <Card cardTitle="CPU">
              <CardList :list="cpu" />
            </Card>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Card from '@/components/common/Card.vue'
import CardList from '@/components/common/CardList.vue'

export default {
  props: {
    hostInfo: {
      type: Object,
      required: true
    }
  },
  components: {
    Card,
    CardList
  },
  computed: {
    general() {
      return [
        {
          name: 'Environment',
          value: this.hostInfo.environment
        },
        {
          name: 'Technologie',
          value: this.hostInfo.hostType
        },
        {
          name: 'OS',
          value: this.hostInfo.os
        },
        {
          name: 'Kernel',
          value: this.hostInfo.kernel
        },
        {
          name: 'Memorie',
          value: this.hostInfo.memoryTotal
        },
        {
          name: 'Swap',
          value: this.hostInfo.swapTotal
        }
      ]
    },
    virtual() {
      return [
        {
          name: 'Platform',
          value: this.hostInfo.platform
        },
        {
          name: 'Cluster',
          value: this.hostInfo.cluster
        },
        {
          name: 'Physical',
          value: this.hostInfo.physicalHost
        },
        {
          name: 'Clust',
          value: this.hostInfo.aixCluster
        }
      ]
    },
    cpu() {
      return [
        {
          name: 'Model',
          value: this.hostInfo.model
        },
        {
          name: 'Threads',
          value: this.hostInfo.threads
        },
        {
          name: 'Cores',
          value: this.hostInfo.cores
        },
        {
          name: 'Socket',
          value: this.hostInfo.socket
        }
      ]
    },
    agent() {
      return [
        {
          name: 'Version',
          value: this.hostInfo.version
        },
        {
          name: 'Last Update',
          value: this.hostInfo.createdAt
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>
