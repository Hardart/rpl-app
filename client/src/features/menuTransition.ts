import { delay } from '@/helpers'
export const onEnter = async (el: HTMLElement) => {
   el.style.top = '100%'
   await delay()
   el.style.top = '0'
}

export const onLeave = async (el: HTMLElement) => {
   el.style.top = '0'
   await delay()
   el.style.top = '100%'
}
