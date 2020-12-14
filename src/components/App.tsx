import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { fetchAuthors, fetchCategories } from 'thunks'

import Header from 'components/Header'
import ErrorMessages from 'components/ErrorMessages'
import Footer from 'components/Footer'

import AboutUsPage from 'pages/AboutUsPage'
import FaqPage from 'pages/FaqPage'
import HomePage from 'pages/HomePage'

export default function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAuthors())
    dispatch(fetchCategories())
  }, [dispatch])

  return (
    <Router>
      <ErrorMessages />

      <Header />

      <Switch>
        <Route path="/faq">
          <FaqPage />
        </Route>

        <Route path="/about-us">
          <AboutUsPage />
        </Route>

        <Route path="/">
          <HomePage />
        </Route>
      </Switch>

      <Footer />
    </Router>
  )
}
