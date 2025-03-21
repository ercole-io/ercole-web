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
    getCloudObjects: jest.fn().mockName('getCloudObjects'),
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
    expect(actions.getCloudObjects).toHaveBeenCalled()
  })
})
