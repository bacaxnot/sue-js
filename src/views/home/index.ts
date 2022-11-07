import template from './index.html?raw'
import { Component } from '@classes'
import { IComponentOptions } from '@interfaces'
import { NavBar } from '@components'

const options: IComponentOptions = {
    name: 'HomeView',
    template: template,
    components: [NavBar],
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
                console.log(self.vars.mssg)
            },
        },
    ],
}

export const HomeView = new Component(options)
