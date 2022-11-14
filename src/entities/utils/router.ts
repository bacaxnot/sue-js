import { IApp } from '@interfaces'

const pathToRegex = (path: string): RegExp =>
    new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.*)') + '$')

export const navigateTo = (url: string, app: IApp): void => {
    history.pushState(null, '', url)
    router(app)
}

export const router = async (app: IApp): Promise<void> => {
    const potentialMatches = app.routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path,
        }
    })
    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch)
    if (!match) {
        match = {
            route: app.routes.find(route => route.path === '*')!,
            isMatch: true,
        }
    }
    app.render(match.route.view)
}
