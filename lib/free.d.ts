import { IGuess, IResponse } from './interface';
import { Base } from './base';
export declare class Audd {
    api_token: string;
    debug: boolean;
    base: Base;
    constructor(api_key: string);
    get host(): string;
    get uri_recognize(): string;
    get uri_withoffset(): string;
    private recognizeWithOffset;
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
     * Attempt to recognise one or more songs in an external video or audio file
     * @param url Direct link an audio or video file
     * @param extra Extra form data
     * @returns IGuess
     */
    guessFromURL(url: string, extra?: any): Promise<IGuess>;
    /**
     * Attempt to recognise one or more songs in a video or audio file
     * @param file Path to file
     * @param extra Extra form data
     * @returns IGuess
     */
    guessFromFile(file: string, extra?: any): Promise<IGuess>;
}
