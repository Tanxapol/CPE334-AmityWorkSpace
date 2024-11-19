export type Rooms = {
    id: number
    title: string,
    building: string,
    street: string,
    subdistrict: string,
    district: string,
    country: string,
    postcode: string,
    imageURL: string,
    lat: number,
    lng: number,
    star: number,
    amenities: string[]
}

export interface RoomData {
    id: number
    title: string,
    building: string,
    street: string,
    subdistrict: string,
    district: string,
    country: string,
    postcode: string,
    imageURL: string,
    lat: number,
    lng: number,
    star: number,
    amenities: string[]
}