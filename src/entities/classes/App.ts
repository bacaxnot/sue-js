import { IApp, IComponent, IRouteObject } from '@interfaces'
import { navigateTo, router } from '@utils'

export class App implements IApp {
    public constructor(
        private container: HTMLDivElement,
        public routes: IRouteObject[]
    ) {}
    /**
     * start:
     * Executes all the logic the app needs to work properly before rendering
     */
    public start(): void {
        this.setRoutes()
    }
    /**
     * append
     * Appends child elements to container
     */
    public append(component: IComponent): void {
        component.load()
        this.container.append(component.content)
    }
    /**
     * render
     * Changes the DOM tree inside the app container
     */
    public render(component: IComponent): void {
        component.load()
        this.container.replaceChildren(component.content)
    }
    /**
     * Sets the routes of the app listening to DOMContentLoaded changes
     */
    private setRoutes(): void {
        document.addEventListener('DOMContentLoaded', () => {
            router(this)
            this.enableInnerRouterLinks()
        })
        window.addEventListener('popstate', () => {
            router(this)
        })
    }
    /**
     * Enables the use of <a data-link> elements to innter app navigation
     */
    private enableInnerRouterLinks(): void {
        document.body.addEventListener('click', e => {
            let element = e.target as HTMLAnchorElement
            if (element.matches('[data-link]')) {
                e.preventDefault()
                navigateTo(element.href, this)
            }
        })
    }
}
