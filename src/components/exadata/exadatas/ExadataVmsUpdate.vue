<template>
  <div class="cluster-name-container">
    <form>
      <b-field grouped custom-class="is-small">
        <b-input
          placeholder="Cluster name"
          size="is-small"
          v-model="clusterName"
          v-if="isEditing || clusterName === ''"
        />

        <p class="no-editing" v-if="!isEditing && clusterName !== ''">
          {{ clusterName }}
        </p>

        <p class="control">
          <b-button
            size="is-small"
            icon-right="check"
            class="cluster-name-field control"
            type="is-primary"
            @click="dispatchVmsClusterNameUpdate"
            :disabled="this.$v.$invalid"
            v-if="isEditing || clusterName === ''"
          />

          <b-button
            size="is-small"
            icon-right="pen-to-square"
            icon-pack="fa"
            class="cluster-name-field control"
            type="is-primary"
            @click="isEditing = true"
            v-if="!isEditing && clusterName !== ''"
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
      isEditing: false,
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
        }).then(() => {
          this.isEditing = false
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

.no-editing {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 30px 0 60px;
}
</style>
