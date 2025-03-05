<template>
  <section>
    <p class="subHeader">RDMA over Converged Ethernet (RoCE)</p>
    <div class="table-container">
      <b-table :data="[rdmaData]">
        <b-table-column width="20%" label="Switch Name" centered>
          <template v-slot="props">
            <template v-if="context != 'EDIT' && props.row">
              <p
                v-tooltip="options(props.row.switchName)"
                v-html="highlight(props.row.switchName)"
              />
            </template>
            <template v-else>
              <b-field class="always-show">
                <b-input
                  placeholder="Switch Name"
                  v-model="rdma.switchName"
                  size="is-small"
                  type="text"
                >
                </b-input>
              </b-field>
            </template>
          </template>
        </b-table-column>
        <b-table-column width="20%" label="Model" centered>
          <template v-slot="props">
            <template v-if="context != 'EDIT' && props.row">
              <p
                v-tooltip="options(props.row.model)"
                v-html="highlight(props.row.model)"
              />
            </template>
            <template v-else>
              <b-field class="always-show">
                <b-input
                  placeholder="Model"
                  v-model="rdma.model"
                  size="is-small"
                  type="text"
                >
                </b-input>
              </b-field>
            </template> </template
        ></b-table-column>
        <b-table-column width="20%" label="Version" centered>
          <template v-slot="props">
            <template v-if="context != 'EDIT' && props.row">
              <p
                v-tooltip="options(props.row.swVersion)"
                v-html="highlight(props.row.swVersion)"
              />
            </template>
            <template v-else>
              <b-field class="always-show">
                <b-input
                  placeholder="Version"
                  v-model="rdma.swVersion"
                  size="is-small"
                  type="text"
                >
                </b-input>
              </b-field>
            </template> </template
        ></b-table-column>
        <b-table-column
          v-if="this.context == 'EDIT' || !rdmaData"
          width="40px"
          centered
        >
          <template>
            <b-field class="always-show">
              <b-button
                size="is-small"
                type="is-success"
                @click="dispatchUpdatedRDMA()"
                >Update RDMA</b-button
              >
            </b-field>
          </template>
        </b-table-column>
        <b-table-column v-else width="40px" centered>
          <template>
            <b-field class="always-show">
              <b-button
                size="is-small"
                type="is-success"
                @click="changeToEdit()"
                >Change to Edit View</b-button
              >
            </b-field>
          </template>
        </b-table-column>
      </b-table>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import { NotificationProgrammatic as Notification } from 'buefy'
import tooltipMixin from '@/mixins/tooltipMixin.js'
import HighlightSearchMixin from '@/mixins/highlightSearch.js'
export default {
  mixins: [tooltipMixin, HighlightSearchMixin],
  data() {
    return {
      rdma: {
        swVersion: '',
        switchName: '',
        model: '',
      },
      context: '',
    }
  },
  props: {
    rackID: {
      required: true,
      type: String,
    },
    rdmaData: {
      required: false,
      type: Object,
      default: () => {
        return {
          swVersion: '',
          switchName: '',
          model: '',
        }
      },
    },
  },
  methods: {
    ...mapActions(['createRDMA', 'getExadataData']),
    async dispatchUpdatedRDMA() {
      const { swVersion, switchName, model } = this.rdma
      try {
        await this.createRDMA({
          rackID: this.rackID,
          swVersion,
          switchName,
          model,
        })
        Notification.open({
          message: `RDMA ${this.rackID} updated correctly!`,
          type: 'is-success',
          position: 'is-top',
        })
        //this.getExadataData()
      } catch (error) {
        Notification.open({
          message: 'Something was wrong!',
          type: 'is-danger',
          position: 'is-top',
        })
      }
      this.context = ''
    },
    changeToEdit() {
      this.rdma = this.rdmaData
      this.context = 'EDIT'
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.subHeader {
  border: none;
  background-color: $light-primary;
  padding: 0.2em 0.75em;
  font-size: 12px;
  font-weight: 900;
  margin: 2px 0 0 0 !important;
}
</style>
