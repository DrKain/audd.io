import { createReadStream } from 'fs';
import { existsSync } from 'fs';
import { statSync } from 'fs';
import { IData, IExtra } from './interface';

const fetch = require('node-fetch');
const FormData = require('form-data');

export class Base<T> {
    private api_token: string;
    private endpoint: string;

    constructor(api_token: string, endpoint: string) {
        this.api_token = api_token;
        this.endpoint = endpoint;
    }

    /**
     * Attempt to match the exact song using an externally linked file
     * @param url Direct link an audio or video file
     * @param extra Extra form data
     */
    public fromURL(url: string, extra: IExtra = {}): Promise<T> {
        return new Promise((resolve, reject) => {
            const params = new URLSearchParams({ api_token: this.api_token, url, ...extra } as any);
            this.call({ params, method: 'POST' } as IData).then(resolve, reject);
        });
    }

    /**
     * Attempt to match the exact song using a file
     * @param file Path to file
     * @param extra Extra form data
     */
    public fromFile(file: string, extra: IExtra = {}): Promise<T> {
        return new Promise((resolve, reject) => {
            if (!existsSync(file)) reject('File not found');
            const form = this.createForm(file, extra);
            this.call({ body: form, method: 'POST' } as IData).then(resolve, reject);
        });
    }

    public call(data: IData): Promise<any> {
        const url = this.endpoint + (data.params ? '?' + data.params.toString() : '');
        return new Promise((resolve, reject) => {
            if (this.api_token === '') return reject('api_token not set');
            fetch(url, data)
                .then((d: any) => d.json())
                .then((res: any) => resolve(res), reject);
        });
    }

    private createForm(file: string, extra: IExtra = {}) {
        const form = new FormData();
        const size = statSync(file).size;
        const stream = createReadStream(file);

        form.append('file', stream, { knownLength: size });

        for (let key of Object.keys(extra)) {
            form.append(key, extra[key]);
        }

        form.append('api_token', this.api_token);
        return form;
    }
}
