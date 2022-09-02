import { IComponentVars } from "./iComponentVars"
import { IEventRegister } from "./iEventRegister"
import { Component } from "../classes/Component"

export interface IComponentOptions {
    name: string,
    template: string,
    components?: Component[],
    props?: string[],
    vars?(self:Component): IComponentVars,
    listeners?: IEventRegister[],
}