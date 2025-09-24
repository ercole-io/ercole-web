import moment from 'moment'

export default (date) => {
  if (!date || date === '1970-01-01T00:00:00Z') return null
  const m = moment(date)
  return m.isValid() ? m.format('DD/MM/YYYY') : null
}
