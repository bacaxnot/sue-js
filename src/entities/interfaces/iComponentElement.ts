import { updateType } from "../classes/ComponentElement";
import { IComponentVars } from "./iComponentVars";

export interface IComponentElement{
    readonly self: HTMLElement,
    update(vars: IComponentVars, type: updateType): void,
    querySelector(query: string): HTMLElement,
    getAttribute(attr: string): string | null,
    setAttribute(attr: string, value: string): void
}