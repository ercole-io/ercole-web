import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Dashboard from '@/views/Dashboard.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let store
let actions
beforeEach(() => {
  actions = {
    getDashboardData: jest.fn().mockName('getDashboardData'),
    getTechnologiesData: jest.fn().mockName('getTechnologiesData'),
    getGlobalFiltersLocations: jest.fn().mockName('getGlobalFiltersLocations'),
    getGlobalFiltersEnvironments: jest
      .fn()
      .mockName('getGlobalFiltersEnvironments'),
    getCloudObjects: jest.fn().mockName('getCloudObjects'),
    getDbConnection: jest.fn().mockName('getDbConnection'),
    requestDynamicMenu: jest.fn().mockName('requestDynamicMenu'),
    requestSettings: jest.fn().mockName('requestSettings'),
  }

  store = new Vuex.Store({
    actions,
  })
})

describe('Dashboard.vue', () => {
  it('verify if component exists', () => {
    const wrapper = shallowMount(Dashboard, { localVue, store })
    expect(wrapper.exists()).toBe(true)
  })

  it(`will dispatch actions when mounting component`, () => {
    shallowMount(Dashboard, { localVue, store })
    expect(actions.getDashboardData).toHaveBeenCalled()
    expect(actions.getTechnologiesData).toHaveBeenCalled()
    expect(actions.getGlobalFiltersLocations).toHaveBeenCalled()
    expect(actions.getGlobalFiltersEnvironments).toHaveBeenCalled()
    expect(actions.getCloudObjects).toHaveBeenCalled()
    expect(actions.getDbConnection).toHaveBeenCalled()
    expect(actions.requestDynamicMenu).toHaveBeenCalled()
    expect(actions.requestSettings).toHaveBeenCalled()
  })
})
