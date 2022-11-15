import template from './index.html?raw'
import { Component } from '@classes'
import { IComponentOptions } from '@interfaces'
import { NavBar } from '@components'

const options: IComponentOptions = {
    name: 'NotFound',
    template: template,
    components: [NavBar],
    vars(self) {
        return {
            title: 'Whoops!',
            mssg: `Check for the URL, this link doesn't exist`,
        }
    },
}

export const NotFound = new Component(options)
