import Sidebar from '@/components/Menu.vue'
import i18n from '@/i18n'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.config.ignoredElements = ['b-icon', 'sidebar-menu']

const localVue = createLocalVue()
localVue.use(Vuex)

const getters = {
  getDynamicMenu: () => [],
  getCloudActiveProfiles: () => () => true,
}

const store = new Vuex.Store({
  getters,
})

describe('Sidebar Component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Sidebar, {
      i18n,
      store,
      localVue,
      stubs: { 'sidebar-menu': { template: '<div></div>' } },
    })
  })

  afterEach(() => {
    wrapper = null
  })

  it('will mount the component', () => {
    expect(wrapper).toBeDefined()
  })

  it('will verify if component exists', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('will emit a collapse value when clicked on button', () => {
    wrapper.vm.onToggleCollapse(true)
    expect(wrapper.emitted().collapsedSidebar[0]).toEqual([true])
  })
})
