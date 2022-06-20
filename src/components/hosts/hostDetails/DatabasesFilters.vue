<template>
  <BoxContent
    title="Databases Advanced Filters"
    class="database-filters"
    :mbottom="false"
  >
    <SearchInput
      :searchPlaceholder="$t('views.hostDetails.search')"
      v-model="searchDb"
      @input="onSearch($event)"
      :onBlur="onSearchBlur"
      class="mb-3"
    />

    <span v-for="(opt, i) in filterOptions" :key="i">
      <hr
        class="my-0 has-background-grey-light"
        style="height: 1px"
        v-if="i > 0 && opt.level === 1"
      />
      <div class="is-block px-2" v-if="opt.level === 1">
        <b-checkbox
          size="is-small"
          v-model="selectedKeys"
          :native-value="opt.value"
          :disabled="opt.disabled"
          @change.native="onFilterClick($event)"
        >
          {{ opt.name }}
        </b-checkbox>
      </div>

      <div class="is-inline" v-if="opt.level === 2">
        <b-checkbox
          size="is-small"
          v-model="selectedKeys"
          :native-value="opt.value"
          style="min-width: 50%"
          class="px-5"
          @change.native="onFilterClick($event)"
        >
          {{ opt.name }}
        </b-checkbox>
      </div>
    </span>

    <b-button
      type="is-ercole-blue"
      size="is-small"
      class="my-2"
      @click="resetFilters"
      expanded
    >
      Reset Databases Filters
    </b-button>
  </BoxContent>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import hostDatabasesFilters from '@/mixins/hostDatabasesFilters.js'
import BoxContent from '@/components/common/BoxContent.vue'
import SearchInput from '@/components/common/SearchInput.vue'

export default {
  mixins: [hostDatabasesFilters],
  props: {
    filters: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    BoxContent,
    SearchInput,
  },
  data() {
    return {
      selectedKeys: [],
    }
  },
  beforeMount() {
    this.selectedKeys = this.hostDetails.selectedKeys
  },
  methods: {
    ...mapMutations(['SET_SELECTED_KEYS']),
    resetFilters() {
      this.selectedKeys = ['name']
      this.SET_SELECTED_KEYS(this.selectedKeys)
    },
    onFilterClick(e) {
      const clickedOption = this.filters.find(
        (item) => item.value === e.target.value
      )

      if (clickedOption.group) {
        const group = this.filters.filter(
          (item) => item.group === clickedOption.group
        )

        const groupParent = group.find((item) => item.level === 1).value

        const subGroup = group
          .filter((item) => item.level === 2)
          .map((item) => item.value)

        if (clickedOption.level === 1) {
          if (e.target.checked) {
            const selectedKeysSet = new Set([...this.selectedKeys, ...subGroup])
            this.selectedKeys = [...selectedKeysSet]
          } else {
            this.selectedKeys = this.selectedKeys.filter(
              (item) => !subGroup.includes(item)
            )
          }
        }

        if (clickedOption.level === 2) {
          const selectedSubGroup =
            this.selectedKeys.filter((item) => subGroup.includes(item))
              .length === subGroup.length

          if (e.target.checked && selectedSubGroup) {
            const selectedKeysSet = new Set([...this.selectedKeys, groupParent])
            this.selectedKeys = [...selectedKeysSet]
          } else if (!e.target.checked) {
            this.selectedKeys = this.selectedKeys.filter(
              (item) => item !== groupParent
            )
          }
        }
      }

      if (!this.selectedKeys.length) {
        this.selectedKeys = ['name']
      }
    },
  },
  computed: {
    ...mapState(['hostDetails']),
    filterOptions() {
      return this.filters.map((opt) => ({
        ...opt,
        disabled: opt.disabled ? opt.disabled(this.selectedKeys) : false,
      }))
    },
  },
  watch: {
    selectedKeys() {
      this.SET_SELECTED_KEYS(this.selectedKeys)
    },
  },
  beforeDestroy() {
    this.resetFilters()
  },
}
</script>

<style lang="scss" scoped>
.database-filters {
  margin-top: 6px;
  padding-bottom: 0;
  border: 1px solid #679189;
  border-radius: 4px;
}
</style>
