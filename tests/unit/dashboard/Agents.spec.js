import Vue from 'vue'
import Vuex from 'vuex'
import store from '@/store/index.js'
import { mount, createLocalVue } from '@vue/test-utils'
import Agents from '@/components/dashboard/alerts/Agents.vue'
import i18n from '@/i18n.js'

Vue.config.ignoredElements = ['b-icon', 'b-button']

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Agents.vue', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(Agents, { store, i18n })
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('verify if component exists', () => {
    const wrapper = mount(Agents, { store, i18n })
    expect(wrapper.exists()).toBe(true)
  })

  it('must show how many agents exists', () => {
    const wrapper = mount(Agents, {
      computed: {
        stoppedAgents: () => [1, 2, 3, 4, 5].length
      },
      i18n
    })

    expect(wrapper.find('[data-stoped-agents]').text()).toBe('5')
  })
})
