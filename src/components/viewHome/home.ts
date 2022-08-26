import { Component } from '../../entities/classes/Component'
import { IComponentOptions } from '../../entities/interfaces/iComponentOptions'
import template from './home.html?raw'
import './home.sass'

import { CircularButton} from '../circularButton/circularButton'

const options: IComponentOptions = {
    name: 'HomeView',
    template: template,
    components:[
        CircularButton
    ],
    props:[
        'class'
    ],
    vars(_){return{
        mssg: 'Holaaaaa' ,
        otherMssg: 'Mundosss'
    }
    },
    listeners: [
        {
            targetQuery: '.example',
            event: 'click',
            callback(self){
                self.content.textContent = 'red'
            }
        }
    ]
}

export const HomeView = new Component(options)