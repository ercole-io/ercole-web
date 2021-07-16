export const state = () => ({
  hiddenVirtual: true,
  hiddenCpu: true,
  hiddenAgent: true,
  hiddenReliability: true
})

export const mutations = {
  SET_VISIBLE_COLS: (state, payload) => {
    state['hidden' + payload.name] = payload.value
  }
}
