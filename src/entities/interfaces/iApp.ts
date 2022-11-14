import { IComponent, IRouteObject } from '@interfaces'

export interface IApp {
    routes: IRouteObject[]
    start(): void
    render(component: IComponent): void
}
