import template from './circularButton.html?raw'
import { Component } from '../../entities/classes/Component'
import { IComponentOptions } from '../../entities/interfaces/iComponentOptions'

const options: IComponentOptions = {
    name: 'circularButton',
    template: template,
    props:[
        'mssg'
    ]
}

export const CircularButton = new Component(options)