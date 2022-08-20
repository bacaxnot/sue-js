import './styles/global.sass'
import App from './entities/classes/App'
import HomeView from './components/viewHome/home';

const appContainer = document.querySelector<HTMLDivElement>('#app')!
const app = new App(appContainer);

app.start()
app.render(HomeView)

export default app