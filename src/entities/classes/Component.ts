import { IComponent } from "../interfaces/iComponent";
import { ComponentOptions } from "../interfaces/iComponentOptions";
import { ComponentVars } from "../interfaces/iComponentVars";
import { EventRegister } from "../interfaces/iEventRegister";
import { Utilities } from "./Utilities";

export default class Component implements IComponent {
    readonly components: Array<Component>
    readonly props: Array<string>
    readonly vars: ComponentVars
    readonly asyncVars: ComponentVars
    private listeners: Array<EventRegister>
    private name: string
    private template: string
    protected element!: HTMLElement

    constructor(options:ComponentOptions){
        this.name = options.name
        this.template = options.template
        this.props = options.props ?? []
        this.components = options.components ?? []
        this.vars = options.vars ?? {}
        this.asyncVars = options.asyncVars ?? []
        this.listeners = options.listeners ?? []

        this.refresh()
    }
    protected refresh():Component {
        this.replaceVars()
            .replaceAsyncVars()
            .then()
        this.updateElement()
            .renderComponents()
            .addListeners()
        return this
    }
    public get content():HTMLElement {
        return this.element
    }
    protected updateElement():Component {
        this.element = Utilities.htmlToElement(this.template)
        return this
    }
    protected addListeners():Component {
        this.listeners.forEach( listener => {
            let target: HTMLElement
            if(listener.targetQuery){
                target = this.element.querySelector(listener.targetQuery)!
            }else{
                target = this.element
            }
            target.addEventListener(listener.event, listener.callback, listener.options)
        })
        return this
    }
    protected renderComponents():Component {
        this.components.forEach(component => {
            let componentElement = this.element.querySelector(component.name)
            console.log(componentElement)
            component.refresh()
        })
        return this
    }
    protected replaceVars():Component {
        Object.keys(this.vars).forEach( key => {
            let variable = new RegExp(`{this.${key}}`, "g")
            let value = this.vars[key]
            let updatedTemplate = this.template.replace(variable, value)
            this.template = updatedTemplate
        })
        return this
    }
    protected async replaceAsyncVars():Promise<Component> {
        Object.keys(this.asyncVars).forEach( key => {
            let value = this.vars[key]
            this.template.replace(key, value)
        })
        return this
    }
}