export type BookingHistoryDetail = {
    number: number;
    room_id: number;
    name: string;
    date: string;
    timestart: string;
    timeend: string;
}

export interface BookingHistoryData {
    id: number;
    number: number;
    room_id: number;
    name: string;
    date: string;
    timestart: string;
    timeend: string;
}

export type Address = {
    building: string;
    street: string;
    subdistrict: string;
    district: string;
    country: string;
    postcode: string;
}

export interface AddressData {
    building: string;
    street: string;
    subdistrict: string;
    district: string;
    country: string;
    postcode: string;
}