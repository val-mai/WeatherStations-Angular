export interface Device {
  id: string;
  name: string;
  mac: string;
  type: number;
  dateZoneId: string;
  createTime: Date;
  longitude: number;
  latitude: number;
  stationType: string;
}
