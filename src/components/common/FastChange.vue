<template>
  <div class="is-flex">
    <b-button
      type="is-light"
      icon-right="exchange-alt"
      icon-pack="fa"
      size="is-small"
      class="mr-3"
      @click="toggleAutocomplete = !toggleAutocomplete"
    />
    <CustomAutocomplete
      v-model="searchValue"
      :filterResult="setData"
      :inputMethod="onSelectOption"
      :setPlaceholder="setPlaceholder"
      openOnFocus
      appendToBody
      v-if="toggleAutocomplete"
      ref="fastSwitchRef"
    />
  </div>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import CustomAutocomplete from '@/components/common/Form/CustomAutocomplete.vue'

export default {
  props: {
    routeName: {
      type: String,
      required: true
    },
    current: {
      type: String,
      required: true
    }
  },
  components: {
    CustomAutocomplete
  },
  data() {
    return {
      searchValue: '',
      data: [],
      toggleAutocomplete: false
    }
  },
  methods: {
    onSelectOption() {
      if (this.checkOption() && this.searchValue !== this.current) {
        if (this.routeName === 'hosts-details') {
          this.$router.push({
            name: 'hosts-details',
            params: { hostname: this.searchValue }
          })
        } else if (this.routeName === 'cluster-details') {
          this.$router.push({
            name: 'cluster-details',
            params: { clustername: this.searchValue }
          })
        }

        this.toggleAutocomplete = false
        this.searchValue = ''
      }
    },
    checkOption() {
      return _.some(this.originalData, name => {
        return name === this.searchValue
      })
    }
  },
  computed: {
    ...mapGetters(['getHostnames', 'getClusternames']),
    originalData() {
      let data = null
      if (this.routeName === 'hosts-details') {
        data = _.filter(this.getHostnames, val => val !== this.current)
      } else if (this.routeName === 'cluster-details') {
        data = _.filter(this.getClusternames, val => val !== this.current)
      }
      return data
    },
    setData() {
      return this.originalData.filter(option => {
        return (
          option
            .toString()
            .toLowerCase()
            .indexOf(this.searchValue.toLowerCase()) >= 0
        )
      })
    },
    setPlaceholder() {
      return `Switch by ${_.split(this.routeName, '-details', 1)} name`
    }
  },
  watch: {
    toggleAutocomplete(value) {
      if (value) {
        setTimeout(() => {
          this.$refs.fastSwitchRef.$children[0].focus()
        }, 0)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
