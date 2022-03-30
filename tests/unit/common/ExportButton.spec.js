import Vue from 'vue'
import { mount } from '@vue/test-utils'
import ExportButton from '@/components/common/ExportButton.vue'

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

  // it('is a Vue instance', () => {
  //   expect(wrapper.isVueInstance()).toBe(true)
  // })

  it('verify if component exists', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('will show button text', () => {
    expect(wrapper.find('[data-export-button]').text()).toBe(
      'Export Button Text'
    )
  })

  it('will call export method when button clicked', async () => {
    wrapper.setMethods({ exportData: jest.fn() })
    wrapper.find('[data-export-button]').trigger('click')

    expect(wrapper.vm.exportData).toHaveBeenCalled()
  })
})
