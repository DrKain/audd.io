import { Base } from './base';
import { IEnterpriseResponse, IGuess, IResponse } from './interface';
export declare class Audd {
    recognize: Base<IResponse>;
    recognizeWithOffset: Base<IGuess>;
    enterprise: Base<IEnterpriseResponse>;
    constructor(token: string);
}
