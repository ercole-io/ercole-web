import ErrorCode from '@/components/common/ErrorCode.vue'
import { mount } from '@vue/test-utils'

describe('ErrorCode.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(ErrorCode, {
      propsData: {
        code: '000',
        codeText: 'Test Code Text',
        codeDesc: 'Test Code Descroption',
      },
      slots: {
        actions: '<div>Test Actions Content</div>',
      },
    })
  })

  it('verify if component exists', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('must show the error code', () => {
    expect(wrapper.find('.error-code').text()).toBe('000')
  })

  it('must show the error code text', () => {
    expect(wrapper.find('.error-code-text').text()).toBe('Test Code Text')
  })

  it('must show the error code description', () => {
    expect(wrapper.find('.error-code-desc').text()).toBe(
      'Test Code Descroption'
    )
  })
})
