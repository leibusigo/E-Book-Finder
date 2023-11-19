import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './views/App'
import './assets/styles/global.css'
import './assets/styles/reset.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
