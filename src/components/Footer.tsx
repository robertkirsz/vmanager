import { version } from '../../package.json'

export default function Header() {
  return (
    <footer className="mt-auto bg-gray-200">
      <div className="content-wrapper">
        <span className="opacity-50 text-sm">VManager Demo v{version}</span>
      </div>
    </footer>
  )
}
