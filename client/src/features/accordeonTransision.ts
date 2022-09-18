import { delay } from '@/helpers'
export const onEnter = async (el: HTMLElement) => {
   el.style.height = 'auto'
   const h = getComputedStyle(el).height
   el.style.height = '0'
   await delay()
   el.style.height = h
}
export const onAfterEnter = (el: HTMLElement) => {
   el.style.height = 'auto'
}
export const onLeave = async (el: HTMLElement) => {
   el.style.height = getComputedStyle(el).height
   await delay()
   el.style.height = '0'
}
