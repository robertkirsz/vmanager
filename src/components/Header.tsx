import { NavLink } from 'react-router-dom'

import SavingIndicator from 'components/SavingIndicator'
import AddVideoButton from 'components/AddVideoButton'

export default function Header() {
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="content-wrapper items-center justify-between space-x-2">
        <nav className="flex flex-col xs:flex-row xs:space-x-4">
          <NavLink
            to="/"
            exact
            className="opacity-50 whitespace-nowrap"
            activeStyle={{ opacity: 1 }}
          >
            Home
          </NavLink>

          <NavLink
            to="/about-us"
            className="opacity-50 whitespace-nowrap"
            activeStyle={{ opacity: 1 }}
          >
            About us
          </NavLink>

          <NavLink to="/faq" className="opacity-50 whitespace-nowrap" activeStyle={{ opacity: 1 }}>
            FAQ
          </NavLink>
        </nav>

        <SavingIndicator />
        <AddVideoButton />
      </div>
    </header>
  )
}
