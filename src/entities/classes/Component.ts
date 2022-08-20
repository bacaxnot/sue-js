import { IComponent } from "../interfaces/component.interface";
import { ComponentOptions } from "../interfaces/componentOptions.int";
import { ComponentVars } from "../interfaces/componentVars.int";
import { Converter } from "./Converter";

export default class Component implements IComponent {
    readonly components: Array<Component>
    readonly vars: ComponentVars
    readonly asyncVars: ComponentVars
    private template: string

    constructor(options: ComponentOptions){
        this.template = options.template
        this.components = options.components ?? []
        this.vars = options.vars ?? {}
        this.asyncVars = options.asyncVars ?? []
        
        this.render()
    }
    protected render():void {
        this.renderComponents()
        this.replaceVars()
        this.replaceAsyncVars().then()
    }
    public get content():Element {
        return Converter.htmlToElement(this.template)
    }
    private renderComponents():void {
        this.components.forEach(component => {
            component.render()
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