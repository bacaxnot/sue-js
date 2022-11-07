import template from './circularButton.html?raw'
import { Component } from '@classes'
import { IComponentOptions } from '@interfaces'

const options: IComponentOptions = {
    name: 'circularButton',
    template: template,
    props: ['mssg'],
    listeners: [
        {
            targetQuery: '',
            event: 'click',
            callback(self) {
                console.log(self.content)
                console.log('This component works!')
            },
        },
    ],
}

export const CircularButton = new Component(options)
