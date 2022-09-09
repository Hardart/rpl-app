export type AlertType = 'Ошибка' | 'Информация' | 'Предупреждение'
export interface Alert {
   id: number
   type: AlertType
   text: string
}
