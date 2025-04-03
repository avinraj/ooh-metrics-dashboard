export interface TrackingLinksModel {
    _id: string
    campaign_id: string;
    createdAt: string;
    name: string;
    url: string;
    user_id: string
}

export interface TrackingLinksDto {
    pageSize: string
}