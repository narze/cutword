import { mount } from '@vue/test-utils'
import Index from '@/pages/index.vue'
import flushPromises from 'flush-promises'

describe('Index', () => {
  let wrapper;

  beforeEach(() => {
    const $axios = { $get: () => Promise.resolve({ output: 'ตัด|คำ|ภาษา|ไทย' }) }
    wrapper = mount(Index, {
      mocks: { $axios }
    })
  });

  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  test('renders title', () => {
    expect(wrapper.html()).toContain("Cutword")
  })

  test("cuts words", async () => {
    const textArea = wrapper.find("textarea#input")
    expect(textArea.exists()).toBe(true)

    textArea.setValue("ตัดคำภาษาไทย")
    expect(textArea.element.value).toBe("ตัดคำภาษาไทย")

    const button = wrapper.get("button#cut")
    button.trigger("click")

    await flushPromises()

    const output = wrapper.get("textarea#output")
    expect(output.element.value).toBe("ตัด|คำ|ภาษา|ไทย")
  })
})
