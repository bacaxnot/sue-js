import { IComponent, IComponentVars, IEventRegister } from '@interfaces'

export interface IComponentElement {
    readonly self: HTMLElement
    update(vars: IComponentVars, props: IComponentVars): void
    querySelector(query: string): HTMLElement[]
    getAttribute(attr: string): string | null
    setAttribute(attr: string, value: string): void
    replace(child: HTMLElement, newComponent: IComponent): void
    addListeners(
        componentInstance: IComponent,
        listeners: IEventRegister[]
    ): void
}
