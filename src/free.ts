import { statSync, createReadStream, existsSync } from 'fs';
import { IData, IGuess, IResponse } from './interface';
import { URLSearchParams } from 'url';
import { base } from './base';

const FormData = require('form-data');
const fetch = require('node-fetch');

export class Audd {
    public api_token = '';
    public debug = false;

    constructor(api_key: string) {
        this.api_token = api_key;
        base.api_token = api_key;
    }

    get host() {
        return 'https://api.audd.io';
    }

    get uri_recognize() {
        return this.host;
    }

    get uri_withoffset() {
        return this.host + '/recognizeWithOffset';
    }

    private recognizeWithOffset(data: IData): Promise<IGuess> {
        return new Promise((resolve, reject) => {
            const url = this.uri_withoffset + (data.params ? '?' + data.params.toString() : '');
            base.call(url, data)
                .then((res: any) => resolve(res as IGuess))
                .catch(reject);
        });
    }

    private recognize(data: IData): Promise<IResponse> {
        return new Promise((resolve, reject) => {
            const url = this.uri_recognize + (data.params ? '?' + data.params.toString() : '');
            base.call(url, data)
                .then((res) => resolve(res as IResponse))
                .catch(reject);
        });
    }
    /**
     * Attempt to match the exact song using an externally linked file
     * @param url Direct link an audio or video file
     * @param extra Extra form data
     * @returns IResponse
     */
    public fromURL(url: string, extra: any = {}): Promise<IResponse> {
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
    public fromFile(file: string, extra: any = {}): Promise<IResponse> {
        return new Promise((resolve, reject) => {
            if (!existsSync(file)) reject('File not found');
            const form = base.createForm(file, extra);
            this.recognize({ body: form, method: 'POST' } as IData).then(resolve, reject);
        });
    }

    /**
     * Attempt to recognise one or more songs in an external video or audio file
     * @param url Direct link an audio or video file
     * @param extra Extra form data
     * @returns IGuess
     */
    public guessFromURL(url: string, extra: any = {}): Promise<IGuess> {
        return new Promise((resolve, reject) => {
            this.recognizeWithOffset({
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
     * Attempt to recognise one or more songs in a video or audio file
     * @param file Path to file
     * @param extra Extra form data
     * @returns IGuess
     */
    public guessFromFile(file: string, extra: any = {}): Promise<IGuess> {
        return new Promise((resolve, reject) => {
            if (!existsSync(file)) reject('File not found');
            const form = base.createForm(file, extra);
            this.recognizeWithOffset({
                body: form,
                method: 'POST'
            } as IData).then(resolve);
        });
    }
}
