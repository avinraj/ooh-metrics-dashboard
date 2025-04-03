import HttpService from '../../core/services/http.service';

interface CampaignServiceInterface {
    getCampaigns(): Promise<any>;
}

class CampaignService implements CampaignServiceInterface {
    private httpService: HttpService = new HttpService();

    constructor() {
    }

    getCampaigns(campaignDto: any = {}): Promise<any> {
        return this.httpService.getAll(`user/campaigns`, campaignDto);
    }
}

export default new CampaignService(); // Export an instance of the class
