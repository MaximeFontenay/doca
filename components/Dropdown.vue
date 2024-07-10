<script lang="ts" setup>
const props = defineProps<{
  title?: string
  defaultValue: string | number
  values: string[]
}>()

const emit = defineEmits<{
  changeValue: [value: string]
}>()

const dropdown = ref<HTMLElement | null>(null)
const dropdownContainer = ref<HTMLElement | null>(null)
const showDropdown = ref<boolean>(false)
const selectedDropdownValue = ref<string | number>(props.defaultValue)
const dropdownValues = ref<string[]>(props.values)

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const selectDropdownValue = (value: string) => {
  //todo: find a way to close the dropdown when a value is selected
  selectedDropdownValue.value = value
  showDropdown.value = false
  emit('changeValue', value)
}

onClickOutside(dropdownContainer, () => {
  if (showDropdown.value) {
    showDropdown.value = false
  }
})
</script>

<template>
  <div
    ref="dropdownContainer"
    class="relative cursor-pointer select-none rounded px-2 text-right ring-0 duration-200 hover:text-primary"
    tabindex=" 0"
    :aria-label="`Dropdown, current value: ${selectedDropdownValue}`"
    @click="toggleDropdown"
    @keyup.enter="toggleDropdown"
    @keyup.space="toggleDropdown"
  >
    <div class="flx-center gap-0.5 font-medium">
      {{ selectedDropdownValue }}
      <ICaretRight
        class="p-0.5 transition-transform duration-200"
        :class="{ 'rotate-90': showDropdown }"
        :size="16"
      />
    </div>
    <ol
      ref="dropdown"
      :class="{
        'pointer-events-auto opacity-100': showDropdown,
        'pointer-events-none opacity-0': !showDropdown,
      }"
      class="absolute right-2.5 z-10 space-y-2 rounded border border-light/25 bg-white/1 p-2 text-xs backdrop-blur-md duration-300"
    >
      <template v-for="value in dropdownValues" :key="value">
        <li v-if="selectedDropdownValue !== value">
          <button
            class="tab rounded-sm text-light duration-200 hover:text-primary"
            type="button"
            :tabindex="showDropdown ? 0 : -1"
            :aria-label="`Select ${value}`"
            @click="selectDropdownValue(value)"
          >
            {{ value }}
          </button>
        </li>
      </template>
    </ol>
  </div>
</template>

<style></style>
