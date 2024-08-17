export default defineAppConfig({
  ui: {
    primary: 'orange',
    gray: 'neutral',
    formGroup: {
      label: {
        base: 'text-gray-800 dark:text-gray-300 mb-0.5',
        required: 'after:ml-1',
      },
    },
    input: {
      default: { variant: 'outline', color: 'primary' },
      placeholder:
        'placeholder:select-none placeholder:text-xs placeholder:text-gray-600 dark:placeholder:text-gray-400',
      file: {
        base: 'file:text-gray-500 dark:file:text-gray-400',
      },
      variant: {
        outline:
          'ring-{color}-400 focus:ring-{color}-400 dark:ring-{color}-400/70 dark:focus:ring-{color}-400/80',
      },
    },
    button: {
      base: 'select-none duration-200',
      default: { variant: 'soft', color: 'primary' },
      variant: {
        ghost:
          'text-{color}-500 hover:bg-{color}-100 dark:text-{color}-400 dark:hover:bg-{color}-800',
      },
    },
    tabs: {
      list: {
        background: 'bg-gray-100 dark:bg-primary-400',
        marker: {
          background: 'bg-primary-300 dark:bg-primary-800',
        },
        tab: {
          active: 'text-gray-900 dark:text-white',
          inactive: 'text-gray-500 dark:text-gray-800',
        },
      },
    },
    badge: {
      base: 'select-none',
      default: {
        variant: 'soft',
        color: 'primary',
      },
      variant: {
        solid:
          'bg-{color}-300 text-{color}-800 dark:bg-{color}-400 dark:text-gray-900',
        soft: 'bg-{color}-50 text-{color}-300 dark:bg-{color}-400 dark:bg-opacity-10 dark:text-{color}-400',
      },
    },
    table: {
      strategy: 'override',
      th: {
        base: 'whitespace-nowrap',
        padding: 'px-4 py-3.5',
        color: '',
        font: 'font-normal',
        size: 'text-sm',
      },
      td: {
        base: 'whitespace-nowrap border border-gray-200 dark:border-gray-800',
        padding: 'p-2',
        color: 'text-white',
        font: '',
        size: 'text-xxs',
      },
      tbody: 'divide-none',
    },
    link: {
      base: 'text-primary-300 duration-200 select-none',
    },
  },
})
