import axios from 'axios'
export interface Checkbox {
   id: number
   state: boolean
}
export default {
   async sokolova(box: Checkbox[]) {
      const { data } = await axios.post<Checkbox[]>('http://pmsokolova.ru/post_check.php', box)
      return data
   },
}
