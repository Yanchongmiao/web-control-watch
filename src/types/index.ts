export interface initOptions {
    use: {
        id: string | number;
        name: string | number;
    };
    requestUrl: string;
    peojectName: string | number;
    peojectCode?: string | number;
    maxCollection: number;
    outputLog: boolean;
}
export interface sendInfo {
    type: string;
    msg: string;
    info?: any;
    date: number;
    [key: string]: string | number;
}
