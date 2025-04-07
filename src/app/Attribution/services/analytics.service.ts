import HttpService from '../../core/services/http.service';

interface AnalyticsServiceInterface {
    getAnalytics(): Promise<any>;
}

class AnalyticsService implements AnalyticsServiceInterface {
    private httpService: HttpService = new HttpService();

    constructor() {
    }

    getAnalytics(analyticsDto: any = {}): Promise<any> {
        return this.httpService.getAll(`user/analytics`, analyticsDto);
    }
}

export default new AnalyticsService(); // Export an instance of the class
