<template>
  <section>
    <b-field class="always-show">
      <b-taginput
        @input="dispatchClusterNameUpdate"
        placeholder="Cluster Names"
        size="is-small"
        v-model="clusterNames"
        type="is-primary"
        :on-paste-separators="[]"
        :confirm-keys="['Tab', 'Enter']"
        allow-new
        ellipsis
        :before-adding="beforeAdding"
      >
      </b-taginput>
    </b-field>
  </section>
</template>

<script>
import { NotificationProgrammatic as Notification } from 'buefy'
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      clusterNames: this.cluster.clusterNames,
    }
  },

  props: {
    cluster: {
      type: Object,
      required: true,
    },
  },
  components: {},

  methods: {
    ...mapActions(['updateClusterName', 'getExadataData']),
    async dispatchClusterNameUpdate() {
      const { rackID, hostID } = this.cluster
      try {
        await this.updateClusterName({
          rackID,
          hostID,
          clusterNames: this.clusterNames,
        })
        Notification.open({
          message: `Cluster ${rackID} name updated correctly!`,
          type: 'is-success',
          position: 'is-top',
        })
        this.getExadataData()
      } catch (error) {
        Notification.open({
          message: 'Something was wrong!',
          type: 'is-danger',
          position: 'is-top',
        })
      }
    },
    beforeAdding(tag) {
      return tag.length >= 4
    },
  },
}
</script>

<style lang="scss" scoped>
.cluster-name-container {
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  padding: 0;
  width: max-content;
}

.cluster-name-field {
  width: 100%;
  max-width: 500px;
}

.always-show .taginput-container {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  height: auto;
  cursor: text;
  border-color: #dbdbdb;
  color: #363636;
  max-width: 100%;
  width: 100%;
  box-sizing: border-box;
  clear: both;
  font-size: 1rem;
  position: relative;
  text-align: left;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
  background-color: #fff;
  box-shadow: inset 0 1px 2px hsla(0, 0%, 4%, 0.1);
  padding: calc(0.375em - 1px) calc(0.625em - 1px);
  line-height: 1.5;
}
</style>
