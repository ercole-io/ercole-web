<template>
  <div>
    <template v-if="percent">
      <b-slider
        v-model="sliderVal"
        format="percent"
        :tooltip="false"
        indicator
      />
    </template>

    <template v-else>
      <b-slider v-model="sliderVal" :min="minTick" :max="maxTick" :step="steps">
        <template v-if="marks">
          <b-slider-tick v-for="val in ticks" :value="val" :key="val">
            {{ val }}
          </b-slider-tick>
        </template>

        <template v-else>
          <b-slider-tick :value="minTick">
            {{ minTick }}
          </b-slider-tick>
          <b-slider-tick :value="maxTick">
            {{ maxTick }}
          </b-slider-tick>
        </template>
      </b-slider>
    </template>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  props: {
    value: {},
    ticks: {
      type: Array
    },
    steps: {
      type: Number,
      default: 0.01
    },
    marks: {
      type: Boolean,
      default: false
    },
    percent: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    sliderVal: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    minTick() {
      return _.first(this.ticks)
    },
    maxTick() {
      return _.last(this.ticks)
    }
  }
}
</script>

<style lang="scss" scoped></style>
