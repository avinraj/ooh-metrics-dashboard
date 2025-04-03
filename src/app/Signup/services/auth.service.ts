import HttpService from '../../core/services/http.service';

interface AuthServiceInterface {
  login(email: string, password: string): Promise<any>;
}

class AuthService implements AuthServiceInterface {
  private httpService: HttpService = new HttpService();

  constructor() {
  }

  login(email: string, password: string): Promise<any> {
    return this.httpService.create(`user/login`, {
      email,
      password,
    });
  }
}

export default new AuthService(); // Export an instance of the class
