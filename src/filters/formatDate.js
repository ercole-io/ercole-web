import moment from 'moment'

export default date => {
  return moment.utc(date).format('DD/MM/YYYY')
}
