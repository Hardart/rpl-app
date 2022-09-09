import { useEventsStore } from '@/stores/events'

const observer = new IntersectionObserver((entries) => {
   entries.forEach((entry) => {
      if (entry.isIntersecting) {
         useEventsStore().addMoreFinished()
         // observer.unobserve(entry.target)
      }
   })
})

export default {
   name: 'intersection',
   mounted(el: HTMLElement) {
      observer.observe(el)
   },
}
