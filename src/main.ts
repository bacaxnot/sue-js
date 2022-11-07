import './styles/style.sass'
import { App } from '@classes'
import { HomeView } from '@views'

const appContainer = document.querySelector<HTMLDivElement>('#app')!
const app = new App(appContainer)

app.start()
app.render(HomeView)

export default app
