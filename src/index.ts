import { Base } from './base';
import { IEnterpriseResponse, IGuess, IResponse } from './interface';

export class Audd {
    public recognize: Base<IResponse>;
    public recognizeWithOffset: Base<IGuess>;
    public enterprise: Base<IEnterpriseResponse>;

    constructor(token: string) {
        this.recognize = new Base(token, 'https://api.audd.io');
        this.recognizeWithOffset = new Base(token, 'https://api.audd.io/recognizeWithOffset');
        this.enterprise = new Base(token, 'https://enterprise.audd.io');
    }
}
