import { statSync, createReadStream, existsSync } from 'fs';
import { IData, IGuess, IResponse } from './interface';
import { URLSearchParams } from 'url';

const FormData = require('form-data');
const fetch = require('node-fetch');

export class Audd {
    public api_token = '';
    public debug = false;
    private uri_recognize = 'https://api.audd.io';
    private uri_withoffset = 'https://api.audd.io/recognizeWithOffset';

    constructor(api_token: string | null = null) {
        if (api_token) this.api_token = api_token;
    }

    /**
     * Logs a message to the console when debugging is enabled
     * @param message Log Message
     */
    private log(message: string) {
        if (this.debug) console.log(message);
    }

    /**
     * Sends a request to the Audd.io API and returns the response
     * @param data IData
     * @returns IResponse
     */
    private recognizeWithOffset(data: IData): Promise<IGuess> {
        return new Promise((resolve, reject) => {
            this.log('[INFO] recognizeWithOffset');
            if (this.api_token === '') return reject('api_token not set');
            this.log(`[INFO] ${Object.keys(data)}`);

            const url = this.uri_withoffset + (data.params ? '?' + data.params.toString() : '');
            this.log(`[INFO] ${data.method} : ${url}`);

            fetch(url, data)
                .then((d: any) => d.json())
                .then((response: IGuess) => {
                    this.log(`[INFO] Status : ${response.status}`);
                    if (response.status === 'error' && response.error) {
                        this.log(`[ERROR] ${response.error.error_code}`);
                        return reject(`${response.error.error_message}`);
                    } else resolve(response as IGuess);
                }, reject);
        });
    }

    /**
     * Sends a request to the Audd.io API and returns the response
     * @param data IData
     * @returns IResponse
     */
    private recognize(data: IData): Promise<IResponse> {
        return new Promise((resolve, reject) => {
            if (this.api_token === '') return reject('api_token not set');
            this.log(`[INFO] ${Object.keys(data)}`);

            const url = this.uri_recognize + (data.params ? '?' + data.params.toString() : '');
            this.log(`[INFO] ${data.method} : ${url}`);

            fetch(url, data)
                .then((d: any) => d.json())
                .then((response: IResponse) => {
                    this.log(`[INFO] Status : ${response.status}`);
                    if (response.status === 'error' && response.error) {
                        this.log(`[ERROR] ${response.error.error_code}`);
                        return reject(`${response.error.error_message}`);
                    } else resolve(response as IResponse);
                }, reject);
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
            this.log(`[INFO] fromURL`);
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
            this.log(`[INFO] fromFile`);

            if (!existsSync(file)) reject('File not found');

            const form = new FormData();
            const size = statSync(file).size;
            const stream = createReadStream(file);

            form.append('file', stream, { knownLength: size });

            for (let key of Object.keys(extra)) {
                form.append(key, extra[key]);
            }

            form.append('api_token', this.api_token);

            this.recognize({ body: form, method: 'POST' } as IData).then(resolve, reject);
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
            this.log(`[INFO] fromFile`);

            if (!existsSync(file)) reject('File not found');

            const form = new FormData();
            const size = statSync(file).size;
            const stream = createReadStream(file);

            for (let key of Object.keys(extra)) {
                form.append(key, extra[key]);
            }

            form.append('file', stream, { knownLength: size });
            form.append('api_token', this.api_token);

            this.recognizeWithOffset({
                body: form,
                method: 'POST'
            } as IData).then(resolve, reject);
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
            this.log(`[INFO] fromURL`);
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
}
