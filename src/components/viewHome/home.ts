import Component from '../../entities/classes/Component'
import template from './home.html?raw'
import './home.sass'

const options = {
    template: template,
    vars: {
        mssg:'Hola',
        otherMssg: 'Mundo'
    }
}

export class HomeView extends Component{
    constructor(){
        super(options)   
    }
}

export default new HomeView()