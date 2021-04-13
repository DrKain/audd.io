import { existsSync } from 'fs';
import { IData, IEnterpriseResponse } from './interface';
import { URLSearchParams } from 'url';
import { Base } from './base';

export class AuddEnterprise {
    private api_token = '';
    public debug = false;
    public base: Base = new Base();

    constructor(api_key: string) {
        this.api_token = api_key;
        this.base.api_token = api_key;
    }

    get host() {
        return 'https://enterprise.audd.io';
    }

    private recognize(data: IData): Promise<IEnterpriseResponse> {
        return new Promise((resolve, reject) => {
            const url = this.host + (data.params ? '?' + data.params.toString() : '');
            this.base
                .call(url, data)
                .then((res) => resolve(res as IEnterpriseResponse))
                .catch(reject);
        });
    }

    public fromURL(url: string, extra: any = {}): Promise<IEnterpriseResponse> {
        return new Promise((resolve, reject) => {
            this.recognize({
                params: new URLSearchParams({
                    api_token: this.api_token,
                    url,
                    ...extra
                }),
                method: 'POST'
            } as IData).then(resolve, reject);
        });
    }

    /**
     * Attempt to match the exact song using a file
     * @param file Path to file
     * @param extra Extra form data
     * @returns IResponse
     */
    public fromFile(file: string, extra: any = {}): Promise<IEnterpriseResponse> {
        return new Promise((resolve, reject) => {
            if (!existsSync(file)) reject('File not found');
            const form = this.base.createForm(file, extra);
            this.recognize({ body: form, method: 'POST' } as IData).then(resolve, reject);
        });
    }
}
