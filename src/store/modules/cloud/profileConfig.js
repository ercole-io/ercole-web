export const state = () => ({
  profileList: 'myvalue'
})

export const getters = {
  getProfileList: (state, getters) => {
    return getters.filteredOrNot(state.profileList)
  }
}

export const mutations = {
  SET_PROFILE: (state, payload) => {
    state.profileList = payload
  }
}

export const actions = {
  getProfiles({ commit }) {
    const profiles = [
      {
        Profile: 'User Profile 1',
        TenancyOCID:
          'ocid1.tenancy.oc1..aaaaaaaazizzbqqbjv2se3y3fvm5osfumnorh32nznanirqoju3uks4buh4q',
        UserOCID:
          'ocid1.user.oc1..aaaaaaaaxvidbloqkas7ct4urmpow4kfaoipfhgnss6pvfmlkis7fm2znufa',
        KeyFingerprint: 'df:af:15:e7:6c:43:34:3d:aa:db:dc:90:0a:6c:58:04',
        Region: 'eu-frankfurt-1',
        PrivateKey: 'kwebfçakwhrfgwhfovwkn'
      },
      {
        Profile: 'User Profile 2',
        TenancyOCID:
          'ocid1.tenancy.oc1..aaaaaaaazizzbqqbjv2se3y3fvm5osfumnorh32nznanirqoju3uks4buh4q',
        UserOCID:
          'ocid1.user.oc1..aaaaaaaaxvidbloqkas7ct4urmpow4kfaoipfhgnss6pvfmlkis7fm2znufa',
        KeyFingerprint: 'df:af:15:e7:6c:43:34:3d:aa:db:dc:90:0a:6c:58:04',
        Region: 'eu-frankfurt-2',
        PrivateKey: 'kwebfçakwhrfgwhfovwkn'
      },
      {
        Profile: 'User Profile 3',
        TenancyOCID:
          'ocid1.tenancy.oc1..aaaaaaaazizzbqqbjv2se3y3fvm5osfumnorh32nznanirqoju3uks4buh4q',
        UserOCID:
          'ocid1.user.oc1..aaaaaaaaxvidbloqkas7ct4urmpow4kfaoipfhgnss6pvfmlkis7fm2znufa',
        KeyFingerprint: 'df:af:15:e7:6c:43:34:3d:aa:db:dc:90:0a:6c:58:04',
        Region: 'eu-frankfurt-3',
        PrivateKey: 'kwebfçakwhrfgwhfovwkn'
      }
    ]

    commit('SET_PROFILE', profiles)
  }
}
