import { IData } from './interface';
export declare class Base {
    api_token: string;
    call(url: string, data: IData): Promise<unknown>;
    createForm(file: string, extra?: any): any;
}
export declare const base: Base;
