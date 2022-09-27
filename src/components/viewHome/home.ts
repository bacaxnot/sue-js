import { Component } from '../../entities/classes/Component'
import { IComponentOptions } from '../../entities/interfaces/iComponentOptions'
import template from './home.html?raw'
import './home.sass'

import { CircularButton } from '../circularButton/circularButton'

const options: IComponentOptions = {
    name: 'HomeView',
    template: template,
    components: [CircularButton],
    props: ['class'],
    vars(self) {
        return {
            mssg: 'Hello',
            otherMssg: 'World',
            mssgs: ['ms1', 'ms2', 'ms3', 'ms4'],
        }
    },
    listeners: [
        {
            targetQuery: '.example2',
            event: 'click',
            callback(self) {
                console.log('Another eventhandler')
                console.log(self)
            },
        },
    ],
}

export const HomeView = new Component(options)
