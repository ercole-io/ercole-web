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
    getHosts: jest.fn().mockName('getHosts'),
    getClusters: jest.fn().mockName('getClusters')
  }

  store = new Vuex.Store({
    actions
  })
})

describe('Dashboard.vue', () => {
  it('is a Vue instance', () => {
    const wrapper = shallowMount(Dashboard, { localVue, store })
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('verify if component exists', () => {
    const wrapper = shallowMount(Dashboard, { localVue, store })
    expect(wrapper.exists()).toBe(true)
  })

  it('will dispatch getTechnologiesData action when mounting component', () => {
    shallowMount(Dashboard, { localVue, store })
    expect(actions.getTechnologiesData).toHaveBeenCalled()
  })
})
