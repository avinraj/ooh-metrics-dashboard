class StorageService {
  private prefix: string;

  constructor() {
    this.prefix = 'OOH';
  }

  get(type: 'local' | 'session', key: string, prefixStat: boolean = true): string | undefined {
    let data;
    switch (type) {
      case 'local':
        data = localStorage.getItem(prefixStat ? `${this.prefix}-${key}` : key);
        break;
      case 'session':
        data = sessionStorage.getItem(prefixStat ? `${this.prefix}-${key}` : key);
        break;
      default:
        throw new Error('Invalid storage type');
    }
    return data && data !== null ? data : undefined;
  }

  set(type: 'local' | 'session', key: string, data: any): string | undefined {
    switch (type) {
      case 'local':
        localStorage.setItem(`${this.prefix}-${key}`, data);
        break;
      case 'session':
        sessionStorage.setItem(`${this.prefix}-${key}`, data);
        break;
      default:
        throw new Error('Invalid storage type');
    }
    return this.get(type, key);
  }

  remove(type: 'local' | 'session', key: string): void {
    switch (type) {
      case 'local':
        localStorage.removeItem(`${this.prefix}-${key}`);
        break;
      case 'session':
        sessionStorage.removeItem(`${this.prefix}-${key}`);
        break;
      default:
        throw new Error('Invalid storage type');
    }
  }

  clear(type: 'local' | 'session'): void {
    switch (type) {
      case 'local':
        localStorage.clear();
        break;
      case 'session':
        sessionStorage.clear();
        break;
      default:
        throw new Error('Invalid storage type');
    }
  }

  getDefault(type: 'local' | 'session', key: string, defaultData: any): string {
    const data = this.get(type, key);
    return data ? data : this.setDefault(type, key, defaultData);
  }

  setDefault(type: 'local' | 'session', key: string, data: any): string {
    return this.set(type, key, data) || '';
  }
}

export default StorageService;
