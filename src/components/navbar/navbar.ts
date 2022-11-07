import { Component } from '../../entities/classes/Component'
import { IComponentOptions } from '../../entities/interfaces/iComponentOptions'
import template from './navbar.html?raw'

const options: IComponentOptions = {
    name: 'NavBar',
    template: template,
    components: [],
    props: ['class'],
    vars(self) {
        return {}
    },
    listeners: [],
}

export const NavBar = new Component(options)
