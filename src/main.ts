import './styles/style.sass'
import App from './entities/classes/App'
import { HomeView } from './views/home/home'

const appContainer = document.querySelector<HTMLDivElement>('#app')!
const app = new App(appContainer)

app.start()
app.render(HomeView)

export default app
