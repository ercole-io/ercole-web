import Agents from '@/components/dashboard/alerts/Agents.vue'
import store from '@/store/index.js'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.config.ignoredElements = ['b-icon', 'b-button', 'b-skeleton']

const localVue = createLocalVue()
localVue.use(Vuex)

const $t = () => {}

describe('Agents.vue', () => {
  it('verify if component exists', () => {
    const wrapper = shallowMount(Agents, { store, mocks: { $t } })
    expect(wrapper.exists()).toBe(true)
  })

  it('must show how many agents exists', async () => {
    const wrapper = shallowMount(Agents, {
      computed: {
        stoppedAgents: () => [1, 2, 3, 4, 5].length,
      },
      mocks: { $t },
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.find('[data-stoped-agents]').text()).toBe('5')
  })
})
