import template from './circularButton.html?raw'
import { Component } from '../../entities/classes/Component'
import { IComponentOptions } from '../../entities/interfaces/iComponentOptions'

const options: IComponentOptions = {
    name: 'circularButton',
    template: template,
    props:[
        'mssg'
    ],
    listeners:[
        {
            targetQuery:'',
            event:'click',
            callback(_) {
                console.log('This component wroks!')
            },
        }
    ]
}

export const CircularButton = new Component(options)