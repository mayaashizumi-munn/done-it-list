export interface DoneIt {
    id: number
    title: string
    description?: string
    startTime: Date
    endTime?: Date
    categoryType: string
    categoryLabel: string
    link?: string
}

export interface DoneItDate {
    date: string
    time: Date
    doneIts: DoneIt[]
}

export interface ToDo {
    id: number
    title: string
}
