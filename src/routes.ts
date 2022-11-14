import { IRouteObject } from '@interfaces'
import { HomeView, NotFound } from '@views'

export const routes: IRouteObject[] = [
    {
        path: '/',
        view: HomeView,
    },
    {
        path: '/detail',
        view: HomeView,
    },
    {
        path: '*',
        view: NotFound,
    },
]
