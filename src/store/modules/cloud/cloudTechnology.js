export const state = () => ({
  cloudTechnology: null,
})

export const getters = {
  returnCloudTechnology: (state) => {
    return state.cloudTechnology
  },
}

export const mutations = {
  SET_CLOUD_TECHNOLOGY: (state, payload) => {
    state.cloudTechnology = payload
  },
}
