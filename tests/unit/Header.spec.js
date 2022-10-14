import Vue from 'vue'
import Vuex from 'vuex'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Header from '@/components/Header.vue'

Vue.config.ignoredElements = [
  'b-navbar',
  'b-navbar-item',
  'b-navbar-dropdown',
  'b-select',
  'b-icon',
  'b-dropdown-item',
  'b-dropdown',
]

const localVue = createLocalVue()
localVue.use(Vuex)

const actions = {
  logout: jest.fn().mockName('logout'),
}
const store = new Vuex.Store({
  actions,
})

const $t = () => {}

describe('Header.vue', () => {
  // it('is a Vue instance', () => {
  //   const wrapper = shallowMount(Header, { mocks: { $t } })
  //   expect(wrapper.isVueInstance()).toBe(true)
  // })

  it('verify if component exists', () => {
    const wrapper = shallowMount(Header, { mocks: { $t } })
    expect(wrapper.exists()).toBe(true)
  })

  // it('will show the logged username on header', () => {
  //   const wrapper = shallowMount(Header, {
  //     computed: {
  //       username: () => 'Username Test',
  //       userRole: () => 'User Role Test',
  //     },
  //     mocks: { $t },
  //   })

  //   const el = wrapper.find('[data-navbar-username]')
  //   expect(el.attributes().label).toBe('Username Test, User Role Test')
  // })

  it('will dispatch logout action when click logout button', async () => {
    const wrapper = shallowMount(Header, {
      store,
      localVue,
      mocks: { $t },
    })

    wrapper.find('[data-logout-button]').trigger('click')

    await wrapper.vm.$nextTick()

    expect(actions.logout).toHaveBeenCalled()
  })
})
