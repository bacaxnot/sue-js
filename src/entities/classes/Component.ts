import {
    IComponent,
    IComponentOptions,
    IComponentVars,
    IEventRegister,
    IComponentElement,
} from '@interfaces'
import { extractIterableInfo, replaceInString } from '@utils'
import { ComponentElement } from '@classes'

export class Component implements IComponent {
    private element: IComponentElement
    private propsState!: IComponentVars

    constructor(private options: IComponentOptions) {
        this.element = new ComponentElement(options.template)
    }
    public load(): IComponent {
        this.replaceVars().renderIterables().renderComponents().addListeners()
        return this
    }
    public get name(): string {
        return this.options.name
    }
    public get content(): HTMLElement {
        return this.element.self
    }
    public get props(): IComponentVars {
        if (!this.propsState) {
            this.propsState = {}
            this.options.props?.forEach(key => {
                let value = this.element.getAttribute(key)
                this.propsState[key] = value
            })
        }
        return this.propsState
    }
    public get components(): IComponent[] {
        return this.options.components ?? []
    }
    public get vars(): IComponentVars {
        return this.options.vars?.(this) ?? {}
    }
    public get listeners(): IEventRegister[] {
        return this.options.listeners ?? []
    }
    public fresh(): IComponent {
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
        this.components.forEach(component => {
            let componentElements = this.element.querySelector(component.name)
            componentElements.forEach(componentElement => {
                this.element.replace(componentElement, component.fresh())
            })
        })
        return this
    }
    protected renderIterables(): Component {
        let children = Array.from(this.content.children)
        children.forEach(child => {
            let iterable = child.getAttribute('e-for') ?? ''
            let iterableInfo = extractIterableInfo(iterable)
            if (iterableInfo.isValid) {
                let source = (
                    iterableInfo.kind == 'vars'
                        ? this.vars[iterableInfo.source!]
                        : this.props[iterableInfo.source!]
                ) as Array<any>
                let elements: HTMLElement[] = []
                let targetAttr: string | undefined = undefined
                let attrs = Array.from(child.attributes)
                attrs.forEach(attr => {
                    if (attr.nodeValue == iterableInfo.target) {
                        targetAttr = attr.nodeName
                    }
                })
                source.forEach(value => {
                    let newElement = child.cloneNode(true) as HTMLElement
                    let text = newElement.innerHTML
                    if (targetAttr) {
                        newElement.setAttribute(targetAttr, value)
                    }
                    text = replaceInString(
                        text,
                        `{${iterableInfo.target}}`,
                        value
                    )
                    newElement.innerHTML = text
                    elements.push(newElement)
                })
                child.replaceWith(...elements)
            }
        })
        return this
    }
}
