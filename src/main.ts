import './index.css';
import { errorType, initOptions, sendInfo } from './types';
let webControl: initWebControlWatch;
export default {
    install(app: any, optiobns: initOptions) {
        // console.log('初始化', app, optiobns);
        webControl = new initWebControlWatch(app, optiobns);
    },
};
class initWebControlWatch {
    app: null;
    options: initOptions = {
        use: {
            id: 0,
            name: 0,
        },
        requestUrl: '',
        peojectName: '',
        maxCollection: 5,
        osType: '',
        clientType: '',
        clientVersion: '',
        outputLog: false,
    };
    sentArr: Array<sendInfo> = [];
    constructor(app: null, options: initOptions | null) {
        this.app = app;
        this.options = options;
        console.log('options', options);
        this.init();
        // this.initPerformance();
        let d;
        console.log(d.xxx);
        // Promise.reject('1');
    }
    init() {
        this.initError();
        this.initUnhandledrejection();
    }
    // 自定义错误上报
    error(type: string, info: any = {}) {
        // this.sentArr.push({
        //     type: type,
        //     info,
        //     msg: `
        //     错误字符串信息:${info.message}
        //     错误文件:${info.source}
        //     错误所在的行数:${info.lineno}
        //     列数:${info.colno}
        //     Error对象:${info.error}
        //     `,
        //     date: +new Date(),
        // });
    }
    initError() {
        window.addEventListener(
            'error',
            (event: ErrorEvent) => {
                const { message, lineno, colno, error, filename } = event;
                this.sentArr.push({
                    ErrorType: this.getErrorKey(event), //大类错误类型 是js 还是promise......
                    type: error.name, //错误名称 是语法错误还是....
                    value: message, //错误信息
                    error,
                    stackTrace: this.parseStackFrames(error), // 解析后的错误堆栈
                    meta: {
                        file: filename,
                        // col 错误列号
                        col: colno,
                        // row 错误行号
                        row: lineno,
                    },
                    date: +new Date(),
                });
                console.log('收集到error', this.sentArr[0]);
                // 阻止向上抛出控制台报错
                this.options.outputLog && event.preventDefault();
            },
            true,
        );
    }
    initUnhandledrejection() {
        window.addEventListener('unhandledrejection', (event) => {
            // event.defaultPrevented;
            this.sentArr.push({
                ErrorType: this.getErrorKey(event), //大类错误类型 是js 还是promise......
                type: 'PromiseRejectionEvent', //错误名称 是语法错误还是....
                value: event.reason.message || event.reason, //错误信息
                error: '未处理的reject',
                stackTrace: this.parseStackFrames(event.reason), // 解析后的错误堆栈
                meta: {},
                date: +new Date(),
            });
            console.log('收集到promise', this.sentArr);
        });
    }
    getErrorKey = (event: ErrorEvent | Event) => {
        // const isJsError = event instanceof ErrorEvent;
        if (event instanceof ErrorEvent) {
            return errorType.JS;
        } else if (event instanceof PromiseRejectionEvent) {
            return errorType.PROMISE;
        } else {
            return errorType.CS;
        }
    };
    /**
     * 
       页面首次渲染时间：FP(firstPaint)=domLoading-navigationStart
       DOM加载完成：DCL(DOMContentEventLoad)=domContentLoadedEventEnd-navigationStart
       图片、样式等外链资源加载完成：L(Load)=loadEventEnd-navigationStart
     * **/
    initPerformance() {
        // performance.getEntriesByType('navigation')[0];
        // const observer = new PerformanceObserver((list) => {
        //     for (const entry of list.getEntries()) {
        //         console.groupCollapsed(entry.name);
        //         console.log(entry.entryType);
        //         console.log(entry.startTime);
        //         console.log(entry.duration);
        //         console.groupEnd(entry.name);
        //     }
        // });
        // observer.observe({
        //     entryTypes: [
        //         'longtask',
        //         'frame',
        //         'navigation',
        //         'resource',
        //         'mark',
        //         'measure',
        //         'paint',
        //     ],
        // });
        new PerformanceObserver((entryList) => {
            // console.log('LCP candidate:', entryList.getEntries());
            // console.log(entryList.getEntries());
            for (const entry of entryList.getEntries()) {
                // console.log(entry);
                const { duration, entryType, name, startTime } = entry;
                const obj = {
                    Duration: duration,
                    'Entry Type': entryType,
                    Name: name,
                    'Start Time': startTime,
                };
                console.log(obj);

                // console.groupCollapsed(entry.name);
                // console.log(entry.entryType);
                // console.log(entry.startTime);
                // console.log(entry.duration);
                // console.groupEnd(entry.name);
            }
        }).observe({
            entryTypes: [
                'navigation', // 浏览器文档事件的指标的方法和属性
                'resource', // 加载应用程序资源的详细网络计时数据
                'secureConnectionStart',
            ],
            buffered: true,
        });
        // let o = {
        //     dnsNum = performance
        // }
        /*
        TTFB：Time To First Byte，首字节时间
        FP：First Paint，首次绘制，绘制Body
        FCP：First Contentful Paint，首次有内容的绘制，第一个dom元素绘制完成
        FMP：First Meaningful Paint，首次有意义的绘制
        TTI：Time To Interactive，可交互时间，整个内容渲染完成
        */
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
        // navigator.sendBeacon(url, data);
        // function sendBeacon(url, params) {
        //     const data = new URLSearchParams(params)
        //     const headers = {
        //       type: 'application/x-www-form-urlencoded'
        //     }
        //     const blob = new Blob([data], headers)
        //     navigator.sendBeacon(url, blob)
        //   }
    }
    sendPxPoint(url, params) {
        // const img = new Image();
        // img.style.display = 'none';
        // const removeImage = function () {
        //     img.parentNode.removeChild(img);
        // };
        // img.onload = removeImage;
        // img.onerror = removeImage;
        // const data = new URLSearchParams(params);
        // img.src = `${url}?${data}`;
        // document.body.appendChild(img);
    }
    parseStackLine(line: string) {
        const FULL_MATCH =
            /^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|address|native|eval|webpack|<anonymous>|[-a-z]+:|.*bundle|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i;
        // 限制只追溯10个
        const STACKTRACE_LIMIT = 10;
        const lineMatch = line.match(FULL_MATCH);
        if (!lineMatch) return {};
        const filename = lineMatch[2];
        const functionName = lineMatch[1] || '';
        const lineno = parseInt(lineMatch[3], 10) || undefined;
        const colno = parseInt(lineMatch[4], 10) || undefined;
        return {
            filename,
            functionName,
            lineno,
            colno,
        };
    }
    parseStackFrames(error: Error) {
        const STACKTRACE_LIMIT = 10;
        const { stack } = error;
        // 无 stack 时直接返回
        if (!stack) return [];
        const frames = [];
        for (const line of stack.split('\n').slice(1)) {
            const frame = this.parseStackLine(line);
            if (frame) {
                frames.push(frame);
            }
        }
        return frames.slice(0, STACKTRACE_LIMIT);
    }
}
