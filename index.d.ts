interface Static {
    [elemName: string]: any;
}

interface CEM {
    [elemName: string]: any;
}

interface Map {
    [elemName: string]: any;
}

interface jsxResult {
    tag: String,
    data: any,
    children: any[]
}

interface Micro {
    name: String,
    loader: Function,
    display: Function,
	listener?: any,
    Static?: Static
}


export declare function Cemjsx(tag: String, data: any, ...children: any[]): jsxResult

export declare function load(micro: Micro, one?: Boolean): void

export declare function initMap(micro: Map): void

export declare let CEM: CEM