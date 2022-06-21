import './index.css';
import { initOptions, sendInfo } from './types';
let webControl: initWebControlWatch;
export default {
    install(app: any, optiobns: initOptions) {
        // console.log('初始化', app, optiobns);
        webControl = new initWebControlWatch(app, optiobns);
    },
};
export const get = (): Array<sendInfo> => webControl.getAll();
export const remove = (): void => webControl.remove();
class initWebControlWatch {
    app: null;
    options: initOptions | null = null;
    sentArr: Array<sendInfo> = [];
    constructor(app: null, options: initOptions | null) {
        this.app = app;
        this.options = options;
        this.init();
        this.initPerformance();
    }
    init() {
        this.initError();
        this.initUnhandledrejection();
    }
    // 自定义错误上报
    error(type: string, info: any = {}) {
        this.sentArr.push({
            type: type,
            info,
            msg: `
            错误字符串信息:${info.message}
            错误文件:${info.source}
            错误所在的行数:${info.lineno}
            列数:${info.colno}
            Error对象:${info.error}
            `,
            date: +new Date(),
        });
    }
    initError() {
        window.onerror = (message, source, lineno, colno, error) => {
            //错误字符串信息  发生错误的js文件  错误所在的行数  列数  Error对象
            const info: any = {
                message,
                source,
                lineno,
                colno,
                error,
            };
            this.sentArr.push({
                type: 'onerror',
                info,
                msg: `
                错误字符串信息:${message}
                错误文件:${source}
                错误所在的行数:${lineno}
                列数:${colno}
                Error对象:${error}
                `,
                date: +new Date(),
            });
            console.log('收集到error', this.sentArr);
            return this.options?.outputLog;
        };
    }
    initUnhandledrejection() {
        window.addEventListener('unhandledrejection', (event) => {
            this.sentArr.push({
                type: 'unhandledrejection',
                msg: `
                promise异常:rejected
                错误值:${event.reason}`,
                date: +new Date(),
            });
            console.log('收集到error', this.sentArr);
            return this.options?.outputLog;
        });
    }
    /**
     * 
       页面首次渲染时间：FP(firstPaint)=domLoading-navigationStart
       DOM加载完成：DCL(DOMContentEventLoad)=domContentLoadedEventEnd-navigationStart
       图片、样式等外链资源加载完成：L(Load)=loadEventEnd-navigationStart
     * **/
    initPerformance() {
        console.log('性能上报');
        // DNS查询时间：domainLookupEnd - domainLookupStartTCP连接时间：connectEnd - connectStart首字节响应时间：responseStart - requestStart内容传输时间：responseEnd - responseStartDOM解析时间：domInteractive - responseEnd资源加载时间：loadEventStart - loadEventEnd
        // const performanceURL = 'http://performance/';
        // console.log(performanceURL, performance);

        // this.send(performanceURL,performance.timing)
        // let performanceURL = 'http://performance/'
        // this.send(performanceURL,performance.timing)
    }
    getAll() {
        return this.sentArr;
    }
    remove(): void {
        this.sentArr = [];
    }
    send() {
        console.log('发送数据');
    }
}
