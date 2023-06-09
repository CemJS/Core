import { cemConfig } from './loader'
import { Frontends, pageFront } from './class'

const changeUrl = async function (e) {
    for (let item of cemConfig.pages) {
        if (item.url == window.location.pathname) {

            pageFront.map((olPage, index) => {
                if (!item.front.includes(olPage)) {
                    Frontends.lists[olPage]?.$el?.remove()
                    Frontends.lists[olPage].clearData()
                    pageFront.splice(index, 1)
                }
            })

            item.front.map((page, index) => {
                if (Frontends.lists[page]) {
                    Frontends.lists[page].init(index)
                }
            })
        }
    }
}

export const listener = function () {
    window.addEventListener('popstate', changeUrl);
}