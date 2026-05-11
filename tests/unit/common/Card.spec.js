import Card from '@/components/common/Card.vue'
import { mount } from '@vue/test-utils'

describe('Card.vue', () => {
  it('verify if component exists', () => {
    const wrapper = mount(Card)
    expect(wrapper.exists()).toBe(true)
  })

  it('will render the card title', () => {
    const wrapper = mount(Card, {
      propsData: {
        cardTitle: 'Test Card Title',
      },
    })

    expect(wrapper.find('.card-title').text()).toBe('Test Card Title')
  })

  it('will display default content when passed', () => {
    const wrapper = mount(Card, {
      slots: {
        default: '<div>Test Default Content</div>',
      },
    })

    expect(wrapper.find('.card-content').text()).toContain(
      'Test Default Content'
    )
  })
})
