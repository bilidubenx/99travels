import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Destinations from './pages/Destinations.jsx'
import DestinationDetail from './pages/DestinationDetail.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/destination/:slug" element={<DestinationDetail />} />
        <Route path="/offre/:slug" element={<DestinationDetail />} />
      </Routes>
    </BrowserRouter>
  )
}
