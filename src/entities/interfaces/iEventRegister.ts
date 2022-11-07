import { IComponent } from '@interfaces'

export interface IEventRegister {
    targetQuery: string
    event: string
    callback: (self: IComponent) => any
    options?: boolean | AddEventListenerOptions | undefined
}
