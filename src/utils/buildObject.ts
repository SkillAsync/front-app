import { ref } from 'vue'

export const buildObject = (inputs: Array<any>) => {
  return inputs.reduce(
    (acc, input) => {
      acc[input.name] = ref('')
      return acc
    },
    {} as Record<string, any>
  )
}
