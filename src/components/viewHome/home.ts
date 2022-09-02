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
        'class',
    ],
    vars(self){return{
        mssg: self.props.class ,
        otherMssg: 'Mundosss'
    }
    },
    listeners: [
        {
            targetQuery: '',
            event: 'click',
            callback(self){
                console.log(self.vars.mssg)
            }
        }
    ]
}

export const HomeView = new Component(options)