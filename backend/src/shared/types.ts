export type PropertyType = {
    _id: string;
    userId: string;
    name: string;
    city: string;
    description: string;
    type: string;
    adultCount: number;
    childCount: number;
    facilities: string[];
    starRating: number;
    pricePerNight: number;
    imageUrls: string[];
    updatedAt: Date;
}; 