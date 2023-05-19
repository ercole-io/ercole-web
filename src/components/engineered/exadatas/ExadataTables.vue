<template>
  <article>
    <div
      class="is-flex is-justify-content-flex-end"
      v-if="getEngSys.length > 0"
    >
      <SearchInput v-model="exadataSearchTherm" class="mr-2" />
      <ExportButton url="exadata" expName="exadata" />
    </div>
    <div class="columns" style="flex-flow: wrap">
      <GhostLoading
        :isLoading="loadingTableStatus"
        setHeight="395"
        class="column is-6"
        v-if="loadingTableStatus"
      />
      <GhostLoading
        :isLoading="loadingTableStatus"
        setHeight="395"
        v-if="loadingTableStatus"
        class="column is-6"
      />
      <BoxContent
        :title="data.hostname"
        border
        v-for="data in exadataSearch"
        :key="data._id"
        class="column is-6"
      >
        <ExadataProgress :exadataProgress="data.progress" />

        <ExadataTypes
          typeName="KVM Host"
          :typeData="data.kvmhost"
          v-if="data.kvmhost && data.kvmhost.length > 0"
        />

        <ExadataTypes
          typeName="Bare Metal"
          :typeData="data.baremetal"
          v-if="data.baremetal && data.baremetal.length > 0"
        />

        <ExadataTypes
          typeName="DOM0"
          :typeData="data.dom0"
          v-if="data.dom0 && data.dom0.length > 0"
        />

        <ExadataTypes
          typeName="IBSwitch"
          :typeData="data.ibswitch"
          v-if="data.ibswitch && data.ibswitch.length > 0"
        />

        <ExadataTypes
          typeName="Storage"
          :typeData="data.storagecell"
          v-if="data.storagecell && data.storagecell.length > 0"
        />
      </BoxContent>

      <NoContent
        class="column is-12"
        style="height: 370px; background-color: #eeeeee"
        v-if="getEngSys.length === 0 && !loadingTableStatus"
      />
    </div>
  </article>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import tooltipMixin from '@/mixins/tooltipMixin.js'
import BoxContent from '@/components/common/BoxContent.vue'
import GhostLoading from '@/components/common/GhostLoading.vue'
import NoContent from '@/components/common/NoContent.vue'
import ExportButton from '@/components/common/ExportButton.vue'
import SearchInput from '@/components/common/SearchInput.vue'
import ExadataProgress from '@/components/engineered/exadatas/ExadataProgress.vue'
import ExadataTypes from '@/components/engineered/exadatas/ExadataTypes.vue'

export default {
  mixins: [tooltipMixin],
  name: 'engineered-tables-component',
  components: {
    BoxContent,
    GhostLoading,
    NoContent,
    ExportButton,
    SearchInput,
    ExadataProgress,
    ExadataTypes,
  },
  data() {
    return {
      exadataSearchTherm: '',
    }
  },
  computed: {
    ...mapGetters(['getEngSys', 'loadingTableStatus']),
    exadataSearch() {
      if (this.exadataSearchTherm !== '') {
        // const searchExadata = _.filter(this.getEngSys, (val) => {
        //   return _.includes(
        //     _.upperCase(val.hostname),
        //     _.upperCase(this.exadataSearchTherm)
        //   )
        // })

        // const search = _.map(this.getEngSys, (el) => {
        //   return {
        //     ...el,
        //     kvmhost: _.filter(el.kvmhost, (kvm) =>
        //       _.includes(
        //         _.upperCase(kvm.hostname),
        //         _.upperCase(this.exadataSearchTherm)
        //       )
        //     ),
        //     ibswitch: _.filter(el.ibswitch, (ibs) =>
        //       _.includes(
        //         _.upperCase(ibs.hostname),
        //         _.upperCase(this.exadataSearchTherm)
        //       )
        //     ),
        //     storagecell: _.filter(el.storagecell, (sto) =>
        //       _.includes(
        //         _.upperCase(sto.hostname),
        //         _.upperCase(this.exadataSearchTherm)
        //       )
        //     ),
        //     dom0: _.filter(el.dom0, (dom) =>
        //       _.includes(
        //         _.upperCase(dom.hostname),
        //         _.upperCase(this.exadataSearchTherm)
        //       )
        //     ),
        //     baremetal: _.filter(el.baremetal, (bar) =>
        //       _.includes(
        //         _.upperCase(bar.hostname),
        //         _.upperCase(this.exadataSearchTherm)
        //       )
        //     ),
        //   }
        // })
        // // console.log(search)

        const search = _.filter(this.getEngSys, (obj) => {
          return _.includes(
            _.lowerCase(JSON.stringify(obj)),
            _.lowerCase(_.toString(this.exadataSearchTherm))
          )
        })

        // console.log(search)

        return search
      } else {
        return this.getEngSys
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
