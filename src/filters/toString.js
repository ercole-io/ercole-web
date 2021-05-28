export default value => {
  if (value || value === 0) {
    return value.toString()
  } else {
    return '-'
  }
}
