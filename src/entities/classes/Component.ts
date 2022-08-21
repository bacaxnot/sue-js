import { IComponent } from "../interfaces/iComponent";
import { ComponentOptions } from "../interfaces/iComponentOptions";
import { ComponentVars } from "../interfaces/iComponentVars";
import { EventRegister } from "../interfaces/iEventRegister";
import { Converter } from "./Converter";

export default class Component implements IComponent {
    readonly components: Array<Component>
    readonly vars: ComponentVars
    readonly asyncVars: ComponentVars
    private listeners: Array<EventRegister>
    private template: string
    protected element!: HTMLElement

    constructor(options:ComponentOptions){
        this.template = options.template
        this.components = options.components ?? []
        this.vars = options.vars ?? {}
        this.asyncVars = options.asyncVars ?? []
        this.listeners = options.listeners ?? []

        this.refresh()
    }
    protected refresh():void {
        this.renderComponents()
        this.replaceVars()
        this.replaceAsyncVars().then()
        this.updateElement()
    }
    public get content():HTMLElement {
        return this.element
    }
    protected updateElement():void {
        this.element = Converter.htmlToElement(this.template)
        this.listeners.forEach( listener => {
            let target: HTMLElement
            if(listener.targetQuery){
                target = this.element.querySelector(listener.targetQuery)!
            }else{
                target = this.element
            }
            console.log(target, this.element)
            target.addEventListener(listener.event, listener.callback, listener.options)
        })
    }
    protected renderComponents():void {
        this.components.forEach(component => {
            component.refresh()
        })
    }
    protected replaceVars():void {
        Object.keys(this.vars).forEach( key => {
            let variable = new RegExp(`{${key}}`, "g")
            let value = this.vars[key]
            let updatedTemplate = this.template.replace(variable, value)
            this.template = updatedTemplate
        })
    }
    protected async replaceAsyncVars():Promise<void> {
        Object.keys(this.asyncVars).forEach( key => {
            let value = this.vars[key]
            this.template.replace(key, value)
        })
    }
}