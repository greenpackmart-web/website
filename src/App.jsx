import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProductsPage from './pages/ProductsPage'
import ProductCategoryPage from './pages/ProductCategoryPage'
import ManufacturingPage from './pages/ManufacturingPage'
import IndustriesPage from './pages/IndustriesPage'
import ExportPage from './pages/ExportPage'
import FaqPage from './pages/FaqPage'
import GetQuotePage from './pages/GetQuotePage'
import RequestSamplesPage from './pages/RequestSamplesPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="products">
            <Route index element={<ProductsPage />} />
            <Route path=":slug" element={<ProductCategoryPage />} />
          </Route>
          <Route path="manufacturing" element={<ManufacturingPage />} />
          <Route path="industries" element={<IndustriesPage />} />
          <Route path="export" element={<ExportPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="get-quote" element={<GetQuotePage />} />
          <Route path="request-samples" element={<RequestSamplesPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
