import { IEnterpriseResponse } from './interface';
import { Base } from './base';
export declare class AuddEnterprise {
    private api_token;
    debug: boolean;
    base: Base;
    constructor(api_key: string);
    get host(): string;
    private recognize;
    fromURL(url: string, extra?: any): Promise<IEnterpriseResponse>;
    /**
     * Attempt to match the exact song using a file
     * @param file Path to file
     * @param extra Extra form data
     * @returns IResponse
     */
    fromFile(file: string, extra?: any): Promise<IEnterpriseResponse>;
}
