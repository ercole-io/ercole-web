import Header from '@/components/Header.vue'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'

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
