<template>
  <div class="modal-card" style="width: 500px">
    <header class="modal-card-head">
      <p class="modal-card-title has-text-weight-medium">
        Clone <span class="has-text-weight-bold">{{ data.name }}</span> Scenario
      </p>
    </header>
    <section class="modal-card-body">
      <CustomField label="Name">
        <CustomInput v-model="cloneScenario.name" />
      </CustomField>

      <CustomField label="Location">
        <CustomInput v-model="cloneScenario.location" customInputDisable />
      </CustomField>

      <CustomField label="Hosts">
        <SimpleTable
          :theadData="['Hostname', 'Original Core', 'Simulated Core']"
        >
          <template slot="tbodyContent">
            <tr v-for="host in cloneScenario.hosts" :key="host.id">
              <TdContent :value="host.hostname" />
              <TdContent :value="host.originalCore" />
              <TdContent isSlot>
                <CustomField>
                  <CustomInput
                    v-model="host.simulatedCore"
                    inputType="number"
                  />
                </CustomField>
              </TdContent>
            </tr>
          </template>
        </SimpleTable>
      </CustomField>
    </section>
    <footer class="modal-card-foot is-justify-content-flex-end">
      <b-button label="Close" type="is-danger" @click="$parent.close()" />
      <b-button
        label="Confirm"
        type="is-primary"
        @click="handleSaveCloneScenario"
      />
    </footer>
  </div>
</template>

<script>
import store from '@/store/index.js'
import { mapActions, mapMutations } from 'vuex'
import CustomField from '@/components/common/Form/CustomField.vue'
import CustomInput from '@/components/common/Form/CustomInput.vue'
import SimpleTable from '@/components/common/Table/SimpleTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'

export default {
  name: 'CloneScenarioModal',
  props: {
    data: {
      type: [Array, Object],
      required: true,
    },
  },
  components: {
    CustomField,
    CustomInput,
    SimpleTable,
    TdContent,
  },
  data() {
    return {
      cloneScenario: {},
    }
  },
  beforeMount() {
    this.cloneScenario = this.data
  },
  methods: {
    ...mapActions(['createScenario', 'offLoadingTable']),
    ...mapMutations(['SET_PAGE_NUM']),
    handleSaveCloneScenario() {
      const data = this.cloneScenario //remove created_at
      store
        .dispatch('createScenario', {
          data,
        })
        .then((res) => {
          if (res.status === 200) {
            this.$buefy.toast.open({
              message: `The scenario ${data.name} was created!`,
              type: 'is-success',
              duration: 5000,
              position: 'is-bottom',
            })
            this.handleClearHosts()
          } else {
            this.$buefy.toast.open({
              message: `Something went wrong with this scenario. Please try again!`,
              type: 'is-danger',
              duration: 5000,
              position: 'is-bottom',
            })
          }
        })
        .then(() => {
          this.SET_PAGE_NUM(1)
          this.offLoadingTable()
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.modal-card-title {
  font-size: 1.2rem;
}

.modal-card-body {
  font-size: 1rem;
  cursor: default;
}
</style>
