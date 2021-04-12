import { IGuess, IResponse } from './interface';
export declare class Audd {
    api_token: string;
    debug: boolean;
    enterprise: boolean;
    constructor(api_token?: string | null);
    get host(): "https://enterprise.audd.io" | "https://api.audd.io";
    get uri_recognize(): "https://enterprise.audd.io" | "https://api.audd.io";
    get uri_withoffset(): string;
    /**
     * Logs a message to the console when debugging is enabled
     * @param message Log Message
     */
    private log;
    /**
     * Sends a request to the Audd.io API and returns the response
     * @param data IData
     * @returns IResponse
     */
    private recognizeWithOffset;
    /**
     * Sends a request to the Audd.io API and returns the response
     * @param data IData
     * @returns IResponse
     */
    private recognize;
    /**
     * Attempt to match the exact song using an externally linked file
     * @param url Direct link an audio or video file
     * @param extra Extra form data
     * @returns IResponse
     */
    fromURL(url: string, extra?: any): Promise<IResponse>;
    /**
     * Attempt to match the exact song using a file
     * @param file Path to file
     * @param extra Extra form data
     * @returns IResponse
     */
    fromFile(file: string, extra?: any): Promise<IResponse>;
    /**
     * Attempt to recognise one or more songs in a video or audio file
     * @param file Path to file
     * @param extra Extra form data
     * @returns IGuess
     */
    guessFromFile(file: string, extra?: any): Promise<IGuess>;
    /**
     * Attempt to recognise one or more songs in an external video or audio file
     * @param url Direct link an audio or video file
     * @param extra Extra form data
     * @returns IGuess
     */
    guessFromURL(url: string, extra?: any): Promise<IGuess>;
}
