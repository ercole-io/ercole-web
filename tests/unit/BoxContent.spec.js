import BoxContent from '@/components/common/BoxContent'
import { mount } from '@vue/test-utils'

describe('Ercole Logo', () => {
  it('will mount the component', () => {
    const wrapper = mount(BoxContent, {
      propsData: {
        title: 'Title Test',
        border: true,
        mbottom: false,
        bgcolor: '#000000'
      }
    })
    expect(wrapper).toMatchSnapshot()
  })
})
