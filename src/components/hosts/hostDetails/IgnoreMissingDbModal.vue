<template>
  <div class="modal-card" style="width: 700px">
    <header class="modal-card-head">
      <p class="modal-card-title">Ignore Missing Databases</p>
    </header>
    <section class="modal-card-body">
      <SimpleTable
        :theadData="['Database Name', 'Ignore Comment', 'Ignore Database']"
        v-if="!isLoading"
      >
        <template slot="tbodyContent">
          <tr v-for="(db, i) in getAllData" :key="i">
            <TdContent :value="db.name" />
            <TdContent :value="db.ignoredComment" />
            <td>
              <b-button
                type="is-ghost"
                size="is-small"
                class="bt-ignore"
                expanded
                @click="ignoreDatabase(!db.ignored, db.name)"
              >
                <b-icon
                  :icon="db.ignoredComment ? 'eye-slash' : 'eye'"
                  size="is-small"
                  pack="fas"
                  :type="db.ignoredComment ? 'is-dark' : 'is-info'"
                />
              </b-button>
            </td>
          </tr>
        </template>
      </SimpleTable>
      <b-loading
        :is-full-page="false"
        v-model="isLoading"
        :can-cancel="false"
        v-if="isLoading"
      ></b-loading>
    </section>
    <footer class="modal-card-foot"></footer>
  </div>
</template>

<script>
import store from '@/store/index.js'
import i18n from '@/i18n.js'
import SimpleTable from '@/components/common/Table/SimpleTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'

export default {
  name: 'host-details-oracle-ignoe-missing-dbs-modal',
  components: {
    SimpleTable,
    TdContent,
  },
  data() {
    return {
      keys: ['dbname', 'ignored', 'ignoredComment'],
      isLoading: false,
    }
  },
  methods: {
    ignoreDatabase(ignore, dbname) {
      if (ignore) {
        this.ignoreDatabaseDialog('ignoreDbLicense', dbname, ignore)
      } else {
        this.ignoreDatabaseDialog('reactivateDbLicense', dbname, ignore)
      }
    },
    ignoreDatabaseDialog(message, dbname, ignore) {
      if (message === 'ignoreDbLicense') {
        message = `Are you sure you want to ignore database <b>${dbname}</b>?`
      } else {
        message = `Are you sure you want to reactivate database <b>${dbname}</b>?`
      }

      this.$buefy.dialog.prompt({
        title: 'Ignore Database',
        message: message,
        inputAttrs: {
          placeholder: 'Leave an ignore comment!',
          disabled: !ignore ? true : false,
        },
        type: 'is-danger',
        hasIcon: true,
        onConfirm: (value) => this.ignoreMissingDatabase(value, dbname, ignore),
        confirmText: i18n.t('common.general.yes'),
        cancelText: i18n.t('common.general.no'),
      })
    },
    ignoreMissingDatabase(value, dbname, ignore) {
      this.isLoading = true
      store
        .dispatch('ignoreMissingDatabase', {
          value,
          dbname,
          ignore,
        })
        .then(() => {
          this.isLoading = false
        })
    },
  },
  computed: {
    getAllData() {
      return store.getters['getAllMissingDBs']
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
  min-height: 144px;
}
</style>
