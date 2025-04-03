import HttpService from '../../core/services/http.service';

interface TrackingLinksServiceInterface {
    getTrackingLinks(): Promise<any>;
}

class TrackingLinksService implements TrackingLinksServiceInterface {
    private httpService: HttpService = new HttpService();

    constructor() {
    }

    getTrackingLinks(trackingLinksDto: any = {}): Promise<any> {
        return this.httpService.getAll(`qr/list`, trackingLinksDto);
    }
}

export default new TrackingLinksService(); // Export an instance of the class
