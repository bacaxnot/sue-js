import Component from '../../entities/classes/Component'
import { ComponentOptions } from '../../entities/interfaces/iComponentOptions'
import template from './home.html?raw'
import './home.sass'

import { CircularButton} from '../circularButton/circularButton'

const options: ComponentOptions = {
    name: 'HomeView',
    template: template,
    vars: {
        mssg:'Hola',
        otherMssg: 'Mundo'
    },
    components:[
        CircularButton
    ],
    listeners: [
        {
            targetQuery: '.example',
            event: 'click',
            callback: ()=>{alert('works')}
        }
    ]
}

export class HomeView extends Component{
    constructor(){
        super(options)   
    }
}

export default new HomeView()