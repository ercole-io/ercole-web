import Vue from 'vue'
import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'
import Header from '@/components/Header.vue'

Vue.config.ignoredElements = ['b-navbar', 'b-navbar-item', 'b-navbar-dropdown']

const localVue = createLocalVue()
localVue.use(Vuex)

const actions = {
  logout: jest.fn().mockName('logout')
}
const store = new Vuex.Store({
  actions
})

describe('Header.vue', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(Header)
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('verify if component exists', () => {
    const wrapper = mount(Header)
    expect(wrapper.exists()).toBe(true)
  })

  it('will show the logged username on header', () => {
    const wrapper = mount(Header, {
      computed: {
        username: () => 'Username Test',
        userRole: () => 'User Role Test'
      }
    })

    const el = wrapper.find('[data-navbar-username]')
    expect(el.attributes().label).toBe('Username Test, User Role Test')
  })

  it('will dispatch logout action when click logout button', async () => {
    const wrapper = mount(Header, {
      store,
      localVue
    })

    wrapper.find('[data-logout-button]').trigger('click')

    await wrapper.vm.$nextTick()

    expect(actions.logout).toHaveBeenCalled()
  })
})
