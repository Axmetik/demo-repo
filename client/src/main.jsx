import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'bulma/css/bulma.css';
import App from './App'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App></App>
  </BrowserRouter>
)
