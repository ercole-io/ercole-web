import _ from 'lodash'
import { resolveCapacity } from '@/helpers/hostDetails/databases/oracle.js'

const setCapacityByOsData = (data) => {
  let m = []
  let w1 = []
  let w2 = []
  let w3 = []
  let w4 = []
  let d1 = []
  let d2 = []
  let d3 = []
  let d4 = []
  let d5 = []
  let d6 = []
  let d7 = []

  let capacityOS = resolveCapacity(data)
  _.forEach(capacityOS, (val) => {
    if (val.target === 'm') {
      m.push(val)
    }
    if (val.target === 'w1') {
      w1.push(val)
    }
    if (val.target === 'w2') {
      w2.push(val)
    }
    if (val.target === 'w3') {
      w3.push(val)
    }
    if (val.target === 'w4') {
      w4.push(val)
    }
    if (val.target === 'd1') {
      d1.push(val)
    }
    if (val.target === 'd2') {
      d2.push(val)
    }
    if (val.target === 'd3') {
      d3.push(val)
    }
    if (val.target === 'd4') {
      d4.push(val)
    }
    if (val.target === 'd5') {
      d5.push(val)
    }
    if (val.target === 'd6') {
      d6.push(val)
    }
    if (val.target === 'd7') {
      d7.push(val)
    }
  })

  m = resolveValues(m)
  w1 = resolveValues(w1)
  w2 = resolveValues(w2)
  w3 = resolveValues(w3)
  w4 = resolveValues(w4)
  d1 = resolveValues(d1)
  d2 = resolveValues(d2)
  d3 = resolveValues(d3)
  d4 = resolveValues(d4)
  d5 = resolveValues(d5)
  d6 = resolveValues(d6)
  d7 = resolveValues(d7)

  return _.concat(m, w1, w2, w3, w4, d1, d2, d3, d4, d5, d6, d7)
}

const customizer = (objValue, srcValue) => {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
}

const resolveValues = (val) => {
  return _(val)
    .flatten()
    .groupBy('target')
    .map(
      _.spread((...values) => {
        return _.mergeWith(...values, customizer)
      })
    )
    .value()
}

export default setCapacityByOsData
