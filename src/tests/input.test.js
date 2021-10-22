import { mount } from '@vue/test-utils'
import InputComponent from '../components/InputComponent.vue'

describe('InputComponentTest', () => {
    const wrapper = mount(InputComponent)
  
    it('Correct html', () => {
      expect(wrapper.html()).toContain('input')
      expect(wrapper.html()).toContain('label')
    })

    it('Correct input', () => {
      await wrapper.find("input").setValue("123");
      expect(wrapper.find(".message").text())
    })
})