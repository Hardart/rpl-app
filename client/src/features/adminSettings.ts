import { ref } from 'vue'

interface MenuItem {
   id: number
   title: string
   slug: string
}
export const menuItems: MenuItem[] = [
   { id: 0, title: 'Основные', slug: 'Base' },
   { id: 1, title: 'Пользователи', slug: 'Users' },
   { id: 2, title: 'Ставки', slug: 'Bets' },
   { id: 3, title: 'Тестовый блок', slug: 'Test' },
]
export const comp = ref({
   id: menuItems[0].id,
   activeSlug: menuItems[0].slug,
   activeTitle: menuItems[0].title,
})

export const setActiveComp = (menuItem: MenuItem) => {
   comp.value.id = menuItem.id
   comp.value.activeSlug = menuItem.slug
   comp.value.activeTitle = menuItem.title
}

export const isOpen = ref(false)
export const openAdminSettings = () => (isOpen.value = !isOpen.value)
