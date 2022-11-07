import { IComponentVars } from '@interfaces'

export interface IComponent {
    readonly name: string
    readonly content: Element
    readonly components: Array<IComponent>
    readonly vars: IComponentVars
    load(): IComponent
    fresh(): IComponent
}
