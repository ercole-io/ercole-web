import Vue from 'vue'
import Vuex from 'vuex'
import store from '@/store/index.js'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Agents from '@/components/dashboard/alerts/Agents.vue'

Vue.config.ignoredElements = ['b-icon', 'b-button']

const localVue = createLocalVue()
localVue.use(Vuex)

const $t = () => {}

describe('Agents.vue', () => {
  it('is a Vue instance', () => {
    const wrapper = shallowMount(Agents, { store, mocks: { $t } })
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('verify if component exists', () => {
    const wrapper = shallowMount(Agents, { store, mocks: { $t } })
    expect(wrapper.exists()).toBe(true)
  })

  it('must show how many agents exists', () => {
    const wrapper = shallowMount(Agents, {
      computed: {
        stoppedAgents: () => [1, 2, 3, 4, 5].length
      },
      mocks: { $t }
    })

    expect(wrapper.find('[data-stoped-agents]').text()).toBe('5')
  })
})
