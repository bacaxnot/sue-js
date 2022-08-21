import template from './circularButton.html?raw'
import Component from '../../entities/classes/Component'
import { ComponentOptions } from '../../entities/interfaces/iComponentOptions'

const options: ComponentOptions = {
    name: 'circularButton',
    template: template,
    vars: {
        mssg:'Hola',
        otherMssg: 'Mundo'
    },
    listeners: [
        {
            targetQuery: '',
            event: 'click',
            callback: ()=>{alert('circular')}
        }
    ]
}

export const CircularButton = new Component(options)