import { IComponentVars } from "../interfaces/iComponentVars";
import { IComponentElement } from "../interfaces/iComponentElement";
import { IEventRegister } from "../interfaces/iEventRegister";
import { Component } from "./Component";


export class ComponentElement implements IComponentElement{
    private creator: HTMLTemplateElement
    private instance: HTMLElement

    constructor(private template: string){
        this.creator = document.createElement('template')
        this.setCreator(this.template)
        this.instance = this.creator.content.firstElementChild as HTMLElement
    }
    private setCreator(stringHTML: string): void {
        this.creator.innerHTML = stringHTML.trim()
    }
    public get self(): HTMLElement{
        return this.instance
    }
    private updateMemoryReference(): void {
        this.instance = this.creator.content.firstElementChild as HTMLElement
    }
    public update(vars: IComponentVars, props: IComponentVars): void {
        let updatedTemplate = this.template
        let keys: string[]
        // iterating vars
        keys = Object.keys(vars)
        keys.forEach( key => {
            let variable = new RegExp(`{this.${key}}`, "g")
            let value = vars[key]
            updatedTemplate = updatedTemplate.replace(variable, value)
        })
        // iterating props
        keys = Object.keys(props)
        keys.forEach( key => {
            let variable = new RegExp(`{${key}}`, "g")
            let value = props[key]
            updatedTemplate = updatedTemplate.replace(variable, value)
        })
        // updating values
        this.creator.innerHTML = updatedTemplate
        this.updateMemoryReference()
    }
    public querySelector(query: string): HTMLElement {
        if(query){
            return this.self.querySelector(query)!
        }else{
            return this.self
        }
    }
    public getAttribute(attr: string): string | null {
        return this.self.getAttribute(attr)
    }
    public setAttribute(attr: string, value: string): void {
        this.self.setAttribute(attr, value)
    }
    public addListeners(componentInstance: Component, listeners: IEventRegister[]){
        listeners.forEach( listener => {
            let target = this.querySelector(listener.targetQuery)
            target.addEventListener(listener.event, ()=>{listener.callback(componentInstance)}, listener.options)
        })
    }
}