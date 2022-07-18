export interface initOptions {
    use: {
        id: string | number;
        name: string | number;
    };
    requestUrl: string;
    peojectName: string | number;
    peojectCode?: string | number;
    maxCollection: number;
    osType: string;
    clientType: string;
    clientVersion: string;
    outputLog: boolean;
}
export interface sendInfo {
    ErrorType: errorType;
    error: string;
    date: number;
    meta: Meta;
    type: string;
    value: string;
    stackTrace: any;
    // [key: string]: string | number;
}

export enum errorType {
    JS = 'js',
    RS = 'resource',
    PROMISE = 'promise',
    UJ = 'unhandledrejection',
    HP = 'http',
    CS = 'cors',
    VUE = 'vue',
    REACT = 'react',
}
interface Meta {
    file?: string;
    // col 错误列号
    col?: number;
    // row 错误行号
    row?: number;
}
