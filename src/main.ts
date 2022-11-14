import './styles/style.sass'
import { App } from '@classes'
import { routes } from '@/routes'

const container = document.querySelector<HTMLDivElement>('#app')!
const app = new App(container, routes)

app.start()

export default app
