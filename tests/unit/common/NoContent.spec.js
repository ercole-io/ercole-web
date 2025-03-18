import { mount } from '@vue/test-utils'
import NoContent from '@/components/common/NoContent.vue'

describe('NoContent.vue', () => {
  let wrapper

  it('should mount the component', () => {
    const wrapper = mount(NoContent)
    expect(wrapper.exists()).toBe(true)
  })

  it.skip('will show no content text when passed', () => {
    wrapper = mount(NoContent, {
      propsData: {
        noContentText: 'Test no content text',
      },
    })

    expect(wrapper.find('.no-content').text()).toBe('Test no content text')
  })

  it('will render the default no content text when prop is not passed', () => {
    const wrapper = mount(NoContent)

    // Ensure that the default text is rendered when no prop is passed
    expect(wrapper.find('.no-content').text()).toBe(
      'There are no content to show'
    )
  })
})
