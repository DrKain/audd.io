import { createReadStream } from 'fs';
import { statSync } from 'fs';
import { IData } from './interface';

const fetch = require('node-fetch');
const FormData = require('form-data');

export class Base {
    public api_token = '';

    public call(url: string, data: IData) {
        return new Promise((resolve, reject) => {
            if (this.api_token === '') return reject('api_token not set');
            fetch(url, data)
                .then((d: any) => d.json())
                .then((res: any) => resolve(res), reject);
        });
    }

    public createForm(file: string, extra: any = {}) {
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

export const base = new Base();
