import { Component } from "../classes/Component";

export interface IEventRegister {
    targetQuery: string,
    event: string,
    callback: (self: Component) => any,
    options?: boolean | AddEventListenerOptions | undefined
}