import { Frontends, Services, Variable } from './class'
import { listener } from './listener'

let cemConfig
const load = async function (micro, one) {
    const frontend = new Frontends(micro)
    if (micro.listener) {
        for (let key in micro.listener) {
            frontend.on(key, micro.listener[key])
        }
    }
    if (one) {
        if (one === true) {
            new EventSource('/esbuild').addEventListener('change', () => location.reload())
        }
        frontend.init()
    }
    return
}

const initMap = async function (config) {
    new EventSource('/esbuild').addEventListener('change', () => location.reload())
    listener()
    cemConfig = config
    for (let key in config.services) {
        if (config.services[key]?.path?.js) {
            Services[key] = await import(config.services[key]?.path?.js)
            if (typeof Services[key].loader == "function") {
                await Services[key].loader(Variable)
            }
        }
    }

    for (let key in config.microFrontends) {
        if (config.microFrontends[key]?.path?.css) {
            let head = document.getElementsByTagName('head')[0];
            let link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = config.microFrontends[key]?.path?.css;
            head.appendChild(link);
        }
        if (config.microFrontends[key]?.path?.js) {
            let microFrontend = await import(config.microFrontends[key]?.path?.js)
            microFrontend.micro.name = config.microFrontends[key].name
            load(microFrontend.micro, config.microFrontends[key].one)
        }
    }
    history.pushState({}, '', window.location.pathname);
    window.dispatchEvent(new Event('popstate'));
}

export { load, initMap, cemConfig }