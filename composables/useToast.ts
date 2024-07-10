export interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
}

const toasts = ref<Toast[]>([])

const addToast = (
  message: string,
  type: 'success' | 'error' | 'warning' | 'info' = 'success',
) => {
  toasts.value.push({
    id: Date.now(),
    message: message,
    type: type,
  })
}

const removeToast = (id: number) => {
  toasts.value = toasts.value.filter((toast) => toast.id !== id)
}

export const useToasts = () => {
  return {
    toasts,
    addToast,
    removeToast,
  }
}
