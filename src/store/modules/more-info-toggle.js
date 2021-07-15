export const state = () => ({
  hiddenVirtual: true,
  hiddenCpu: true,
  hiddenAgent: true
})

export const mutations = {
  SET_VISIBLE_COLS: (state, payload) => {
    console.log(payload)
    state['hidden' + payload.name] = payload.value
  }
}
