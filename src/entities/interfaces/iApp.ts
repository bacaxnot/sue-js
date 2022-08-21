import Component from "../classes/Component";

export interface IApp {
    start(): void,
    render(component: Component): void,
}