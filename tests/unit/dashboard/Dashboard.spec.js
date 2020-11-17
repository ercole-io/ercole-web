import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Dashboard from '@/views/Dashboard.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let store
let actions
beforeEach(() => {
  actions = {
    getDashboardData: jest.fn().mockName('getDashboardData')
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

  it('will dispatch getDashboardData action when mounting component', () => {
    shallowMount(Dashboard, { localVue, store })
    expect(actions.getDashboardData).toHaveBeenCalled()
  })
})
