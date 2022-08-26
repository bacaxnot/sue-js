import { Component } from "../classes/Component"
import { IComponentVars } from "./iComponentVars"

export interface IComponent {
    readonly name:string,
    readonly content:Element,
    readonly components:Array<Component>,
    readonly vars:IComponentVars
} 