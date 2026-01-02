import './App.css'
import { RouterProvider } from 'react-router-dom'
import AppRouter from './navigation/AppRoutes'
function App() {
  return <RouterProvider router={AppRouter} />
}

export default App
