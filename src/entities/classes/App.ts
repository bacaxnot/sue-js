import { IApp } from "../interfaces/app.interface"
import Component from "./Component"

export default class App implements IApp {
    
    public constructor(private container: HTMLDivElement){
              
    }
    /**
     * start:
     * Executes all the logic the app needs to work properly before rendering
     */
    public start():void {
        console.log(this.container)
    }
    /**
     * append
     * Appends child elements to container
     */
    public append(component: Component):void {
        this.container.append(component.content)
    }
    /**
     * render
     * Changes the DOM tree inside the app container
     */
    public render(component: Component):void {
        this.container.replaceChildren(component.content)
    }
}