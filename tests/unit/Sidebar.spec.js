import Vue from 'vue'
import { mount } from '@vue/test-utils'
import Sidebar from '@/components/Sidebar.vue'
import i18n from '@/i18n'

Vue.config.ignoredElements = ['b-icon']

let wrapper
beforeEach(() => {
  wrapper = mount(Sidebar, { i18n })
})

afterEach(() => {
  wrapper.destroy()
})

describe('Sidebar Component', () => {
  it('will mount the component', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('will verify if component exists', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('will emit a collapse value when clicked on button', () => {
    wrapper.vm.onToggleCollapse(true)

    expect(wrapper.emitted().collapsedSidebar[0]).toEqual([true])
  })

  // it.skip('will update the menu', () => {
  //   const newMenu = wrapper.vm.menu
  //   wrapper.setData({
  //     menu: [
  //       ...newMenu,
  //       {
  //         href: { name: 'test' },
  //         title: 'menu.test',
  //         icon: 'fas fa-test'
  //       }
  //     ]
  //   })
  //   expect(wrapper).toMatchSnapshot()
  // })
})
