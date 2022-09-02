import { IComponent } from "../interfaces/iComponent";
import { IComponentVars } from "../interfaces/iComponentVars";
import { IComponentOptions } from "../interfaces/iComponentOptions";
import { IEventRegister } from "../interfaces/iEventRegister";
import { ComponentElement } from "./ComponentElement";

export class Component implements IComponent {
    private element: ComponentElement
    private propsState!: IComponentVars

    constructor(private options: IComponentOptions){
        this.element = new ComponentElement(options.template)
    }
    public load(): Component {
        this.replaceVars()
            .renderComponents()
            .addListeners()
        return this
    }
    public get name(): string{
        return this.options.name
    }
    public get content(): HTMLElement {
        return this.element.self
    }
    public get props(): IComponentVars{
        if(!this.propsState){
            this.propsState = {}
            this.options.props?.forEach( key => {
                let value = this.element.getAttribute(key)
                this.propsState[key] = value
            })
        }
        return this.propsState
    }
    public get components(): Component[]{
        return this.options.components ?? []
    }
    public get vars(): IComponentVars{
        return this.options.vars?.(this) ?? {}
    }
    public get listeners(): IEventRegister[]{
        return this.options.listeners ?? []
    }
    public newCopy(): Component {
        return new Component(this.options)
    }
    protected addListeners(): Component {
        this.element.addListeners(this, this.listeners)
        return this
    }
    protected replaceVars(): Component {
        this.element.update(this.vars, this.props)
        return this
    }
    protected renderComponents(): Component {
        this.components.forEach( component => {
            let componentElements = this.element.querySelector(component.name)
            console.log(component, componentElements)
            componentElements.forEach( componentElement => {
                this.element.replace(componentElement, component.newCopy())
            })
        })
        return this
    }
}