<script lang="ts" setup>
const props = defineProps<{
  id: number
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
}>()

const emit = defineEmits<{
  removeToast: [id: number]
}>()

const progression = ref<HTMLElement | null>(null)
const progressionWidth = ref<number>(0)

const animate = () => {
  progressionWidth.value++

  if (progression.value) {
    progression.value.style.width = `${progressionWidth.value}%`
  }
}

onMounted(() => {
  setTimeout(() => {
    emit('removeToast', props.id)
  }, 5000)

  const intervalID = setInterval(() => {
    if (progressionWidth.value === 100) {
      clearInterval(intervalID)
    } else {
      animate()
    }
  }, 50)
})

let containerClasses = ''
let progressionContainerClasses = ''
let progressionClasses = ''

switch (props.type) {
  case 'success':
    containerClasses = 'text-green/80 bg-green/10 border-green/60'
    progressionContainerClasses = 'bg-green/30'
    progressionClasses = 'bg-green'
    break
  case 'error':
    containerClasses = 'text-red/80 bg-red/10 border-red/60'
    progressionContainerClasses = 'bg-red/30'
    progressionClasses = 'bg-red'
    break
  case 'warning':
    containerClasses = 'text-orange/80 bg-orange/10 border-orange/60'
    progressionContainerClasses = 'bg-orange/30'
    progressionClasses = 'bg-orange'
    break
  case 'info':
    containerClasses = 'text-yellow/80 bg-yellow/10 border-yellow/60'
    progressionContainerClasses = 'bg-yellow/30'
    progressionClasses = 'bg-yellow'
    break
}
</script>


<template>
  <li :class="containerClasses"
    class="pointer-events-auto relative w-fit max-w-80 cursor-default overflow-clip rounded-xl rounded-tl-none border px-3 py-2 backdrop-blur-xl"
    @click="emit('removeToast', props.id)">
    <span>{{ props.message }}</span>
    <div :class="progressionContainerClasses" class="absolute bottom-0 left-0 h-0.5 w-full">
      <div ref="progression" :class="progressionClasses" class="h-0.5 rounded-full duration-75" style="width: 0" />
    </div>
  </li>
</template>

<style lang="scss" scoped></style>
