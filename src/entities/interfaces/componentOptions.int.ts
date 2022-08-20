import { ComponentVars } from "./componentVars.int"
import Component from "../classes/Component"

export interface ComponentOptions {
    template: string,
    components?: Component[],
    vars?: ComponentVars,
    asyncVars?: ComponentVars
}