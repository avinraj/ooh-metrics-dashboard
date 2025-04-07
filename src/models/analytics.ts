export interface AnalyticsModel {
    _id: string;
    campaign_id: string;
    createdAt: string;
    device_model: string;
    device_type: string;
    device_vendor: string;
    ip_address: string;
    is_loc_updated: boolean;
    qr_link_id: string;
}
export interface AnalyticsDto {
    pageSize: string
}