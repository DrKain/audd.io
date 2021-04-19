import { IData, IExtra } from './interface';
export declare class Base<T> {
    private api_token;
    private endpoint;
    constructor(api_token: string, endpoint: string);
    /**
     * Attempt to match the exact song using an externally linked file
     * @param url Direct link an audio or video file
     * @param extra Extra form data
     */
    fromURL(url: string, extra?: IExtra): Promise<T>;
    /**
     * Attempt to match the exact song using a file
     * @param file Path to file
     * @param extra Extra form data
     */
    fromFile(file: string, extra?: IExtra): Promise<T>;
    call(data: IData): Promise<any>;
    private createForm;
}
