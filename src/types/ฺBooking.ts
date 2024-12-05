export type BookingForm = {
    user: string[];
    Date: string;
    date: string;
    timestart: string;
    timeend: string;
}

export interface BookingFormData {
    user: string[];
    Date: string;
    date: string;
    timestart: string;
    timeend: string;
}

export type BookingDetail = {
    id: number,
    number: number,
    room_id: number,
    name: string,
    date: string,
    timestart: string,
    timeend: string
}

export interface BookingDetailData {
    id: number,
    number: number,
    room_id: number,
    name: string,
    date: string,
    timestart: string,
    timeend: string
}