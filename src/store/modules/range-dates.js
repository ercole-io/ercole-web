import moment from 'moment'

export const state = () => ({
  rangeDates: [],
  rangeDatesAlt: []
})

export const mutations = {
  SET_RANGE_DATES: (state, payload) => {
    state.rangeDates = [
      moment(payload[0])
        .subtract(1, 'days')
        .format('YYYY-MM-DD'),
      moment(payload[1])
        .add(1, 'days')
        .format('YYYY-MM-DD')
    ]
  },
  SET_RANGE_DATES_ALT: (state, payload) => {
    state.rangeDatesAlt = [
      moment(payload[0])
        .subtract(1, 'days')
        .format('YYYY-MM-DD'),
      moment(payload[1])
        .add(1, 'days')
        .format('YYYY-MM-DD')
    ]
  }
}
