import { IComponent } from '@interfaces'

export interface IApp {
    start(): void
    render(component: IComponent): void
}
