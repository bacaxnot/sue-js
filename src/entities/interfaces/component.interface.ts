import Component from "../classes/Component"
import { ComponentVars } from "./componentVars.int"

export interface IComponent {
    readonly content: Element,
    readonly components: Array<Component>,
    readonly vars: ComponentVars,
    readonly asyncVars: ComponentVars,

    //render(): void,
} 