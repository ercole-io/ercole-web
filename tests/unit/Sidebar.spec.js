import Vue from 'vue'
import { mount } from '@vue/test-utils'
import Sidebar from '@/components/Sidebar.vue'
import i18n from '@/i18n'

Vue.config.ignoredElements = ['b-icon']

describe('Sidebar Component', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(Sidebar, { i18n })
  })

  afterEach(() => {
    wrapper = null
  })

  it.skip('will mount the component', () => {
    expect(wrapper).toMatchSnapshot()
  })

  // it('is a Vue instance', () => {
  //   expect(wrapper.isVueInstance()).toBe(true)
  // })

  it.skip('will verify if component exists', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it.skip('will emit a collapse value when clicked on button', () => {
    wrapper.vm.onToggleCollapse(true)

    expect(wrapper.emitted().collapsedSidebar[0]).toEqual([true])
  })
})
