import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import Overlay from './components/Overlay'

createRoot(document.getElementById('root')).render(
  <>
    <App
      spheres={[
        [2, 'orange', 0.05, [-1.5, 0.2, -1]],
        [0.75, 'hotpink', 0.1, [-1, 1.2, -2]],
        [1.25, 'aquamarine', 0.2, [1.4, -1.5, 1.5]],
        [1.5, 'lightblue', 0.3, [-1.2, -0.5, -2.4]],
        [1.2, 'pink', 0.3, [-1.6, 1.5, -2.5]],
        [1.2, 'skyblue', 0.3, [1.3, 1.8, -2.2]],
        [1, 'orange', 0.05, [-1.4, -1.1, 0.5]],
        [1, 'hotpink', 0.1, [1.2, 1.6, 1.8]],
        [1, 'aquamarine', 0.2, [1.1, -1.2, 1.1]],
        [1, 'lightblue', 0.3, [-1, 0.3, -1.7]],
        [0.8, 'pink', 0.3, [-1.1, 2.1, -2.4]],
        [0.8, 'skyblue', 0.3, [1.6, 1.7, -1.9]]
      ]}
    />
    <Overlay />
  </>
)
