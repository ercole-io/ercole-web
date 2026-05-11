import Footer from '@/components/Footer.vue'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

describe('Footer.vue', () => {
  it('renders the Footer component', () => {
    const wrapper = mount(Footer)
    expect(wrapper.exists()).toBe(true)
  })

  it('will show platform version text correctly', async () => {
    const text = `Ercole 2.0 © ${new Date().getFullYear()} Sorint.lab S.p.A.`

    const wrapper = mount(Footer)
    await nextTick() // Ensures DOM updates if needed

    expect(wrapper.find('[data-footer]').exists()).toBe(true)
    expect(wrapper.find('[data-footer]').text()).toBe(text)
  })
})
