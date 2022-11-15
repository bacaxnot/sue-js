import { Component } from '@classes'
import { IComponentOptions } from '@interfaces'
import template from './navbar.html?raw'
import logo from '@logos/navbar.png'

const options: IComponentOptions = {
    name: 'NavBar',
    template: template,
    vars(self) {
        return {
            logo: logo,
        }
    },
    listeners: [],
}

export const NavBar = new Component(options)
