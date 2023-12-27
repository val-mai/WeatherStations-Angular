export interface Metric {
    title:string,
    unit:string,
    value:string,
    device: string,
    last_update?: Date,
    icon?:any
}
