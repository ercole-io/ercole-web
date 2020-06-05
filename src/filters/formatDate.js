import moment from 'moment'

export default date => {
  return moment(date).format('DD/MM/YYYY')
}
