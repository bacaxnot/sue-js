import { ComponentVars } from "./iComponentVars"
import { EventRegister } from "./iEventRegister"
import Component from "../classes/Component"

export interface ComponentOptions {
    template: string,
    components?: Component[],
    vars?: ComponentVars,
    asyncVars?: ComponentVars,
    listeners?: Array<EventRegister>
}