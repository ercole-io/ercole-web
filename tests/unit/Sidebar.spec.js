import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import Sidebar from '@/components/Sidebar.vue'
import i18n from '@/i18n'

Vue.config.ignoredElements = ['b-icon']

let wrapper
beforeEach(() => {
  wrapper = shallowMount(Sidebar, { i18n })
})

afterEach(() => {
  wrapper.destroy()
})

describe('Sidebar.vue', () => {
  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('verify if component exists', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('will emit a collapse value when clicked on button', () => {
    wrapper.vm.onToggleCollapse(true)

    expect(wrapper.emitted().collapsedSidebar[0]).toEqual([true])
  })
})
