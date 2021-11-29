import ErcoleLogo from '@/components/common/ErcoleLogo'
import { mount } from '@vue/test-utils'

describe('Ercole Logo', () => {
  it('will mount the component', () => {
    const wrapper = mount(ErcoleLogo)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
