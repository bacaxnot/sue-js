import { ComponentVars } from "./iComponentVars"
import { EventRegister } from "./iEventRegister"
import Component from "../classes/Component"

export interface ComponentOptions {
    name: string,
    template: string,
    components?: Component[],
    props?: string[],
    vars?: ComponentVars,
    asyncVars?: ComponentVars,
    listeners?: Array<EventRegister>
}