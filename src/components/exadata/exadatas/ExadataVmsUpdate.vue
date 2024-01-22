<template>
  <div class="cluster-name-container">
    <form>
      <b-field grouped custom-class="is-small">
        <b-input
          placeholder="Cluster name"
          size="is-small"
          v-model="clusterName"
        ></b-input>
        <p class="control">
          <b-button
            size="is-small"
            icon-right="check"
            class="cluster-name-field control"
            type="is-primary"
            @click="dispatchVmsClusterNameUpdate"
            :disabled="this.$v.$invalid"
          />
        </p>
      </b-field>
    </form>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import { NotificationProgrammatic as Notification } from 'buefy'
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      clusterName: this.cluster.clusterName,
    }
  },

  props: {
    cluster: {
      type: Object,
      required: true,
    },
  },
  components: {},

  validations: {
    clusterName: {
      required,
      minLength: minLength(4),
    },
  },

  methods: {
    ...mapActions(['updateVmsClusterName', 'getExadataData']),
    async dispatchVmsClusterNameUpdate() {
      const { rackID, hostID, hostname } = this.cluster
      try {
        await this.updateVmsClusterName({
          rackID,
          hostID,
          hostname,
          clusterName: this.clusterName,
        })
        Notification.open({
          message: `Vms ${rackID} name updated correctly!`,
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
    },
  },
}
</script>

<style lang="scss" scoped>
.cluster-name-container {
  display: flex;
  justify-content: center;
  flex-direction: row;
  padding: 0;
  width: 100%;
}
</style>
