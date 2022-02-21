import { mount } from '@vue/test-utils'
import Footer from '@/components/Footer.vue'

describe('Footer.vue', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(Footer)
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('verify if component exists', () => {
    const wrapper = mount(Footer)
    expect(wrapper.exists()).toBe(true)
  })

  it('will show plataform version text correctly', () => {
    const text = `Ercole 2.0 © ${new Date().getFullYear()} Sorint.lab S.p.A.`

    const wrapper = mount(Footer)

    expect(wrapper.find('[data-footer]').text()).toBe(text)
  })
})
