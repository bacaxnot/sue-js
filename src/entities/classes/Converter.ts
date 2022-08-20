export class Converter {
    private static template: HTMLTemplateElement = document.createElement('template')

    public static htmlToElement(HTMLstring: string): Element {
        HTMLstring = HTMLstring.trim()
        this.template.innerHTML = HTMLstring
        return this.template.content.firstElementChild ?? document.createElement('')
    }
}