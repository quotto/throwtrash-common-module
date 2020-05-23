interface EvweekValue {
    weekday: string,
    start: string
}

interface TrashTypeValue {
    type: string,
    name: string
}

interface TrashSchedule {
    type: string,
    value: string | EvweekValue
}

interface TrashData {
    type: string,
    trash_val?: string,
    schedules: Array<TrashSchedule>
}