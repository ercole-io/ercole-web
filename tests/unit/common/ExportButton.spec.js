import ExportButton from '@/components/common/ExportButton.vue'
import { mount } from '@vue/test-utils'
import Vue from 'vue'

Vue.config.ignoredElements = ['b-button']

describe('ExportButton.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(ExportButton, {
      propsData: {
        text: 'Export Button Text',
        url: '/api/testurl',
        expName: 'exportnametest',
      },
    })
  })

  it('verify if component exists', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('will show button text', () => {
    expect(wrapper.find('[data-export-button]').text()).toBe(
      'Export Button Text'
    )
  })
})
