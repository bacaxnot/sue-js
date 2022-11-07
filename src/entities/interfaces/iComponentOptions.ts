import { IComponent, IComponentVars, IEventRegister } from '@interfaces'

export interface IComponentOptions {
    name: string
    template: string
    components?: IComponent[]
    props?: string[]
    vars?(self: IComponent): IComponentVars
    listeners?: IEventRegister[]
}
