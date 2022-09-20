export enum EventStatus {
   notStarted  = 'notstarted',
   finished    = 'finished',
   inprogress  = 'inprogress',
}

export enum EventStatusLoad {
   finished    = 1,
   notstarted  = 0,
}

export enum BetButtonText {
   make        = 'Сделать ставку',
   done        = 'Ставка сделана',
   default     = 'Автоматическая ставка',
}

export enum BetStatus {
   team        = 'Угадал победителя!)',
   score       = 'Угадал счёт матча!',
   no_info     = 'Нет данных',
   false       = 'Ставка проиграна',
   inprogress  = 'Матч идет',
}
