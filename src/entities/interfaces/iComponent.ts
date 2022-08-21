import Component from "../classes/Component"
import { ComponentVars } from "./iComponentVars"

export interface IComponent {
    readonly content: Element,
    readonly components: Array<Component>,
    readonly vars: ComponentVars,
    readonly asyncVars: ComponentVars,

    //render(): void,
} 