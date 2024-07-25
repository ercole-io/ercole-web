export const state = () => ({
  hiddenVirtual: true,
  hiddenCpu: true,
  hiddenAgent: true,
  hiddenReliabilityDB: true,
  hiddenReliabilityOracle: true,
  hiddenSpaceUsed: true,
  hiddenCharset: true,
  hiddenProfile: true,
})

export const mutations = {
  SET_VISIBLE_COLS: (state, payload) => {
    state['hidden' + payload.name] = payload.value
  },
}
