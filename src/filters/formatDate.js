import moment from 'moment'

export default date => {
  return date !== '1970-01-01T00:00:00Z'
    ? moment.utc(date).format('DD/MM/YYYY')
    : '-'
}
