# VManager

### Installation

To install the app:

```bash
git clone git@github.com:robertkirsz/vmanager.git
cd vmanager
yarn install
```

### Development

To run the app, you need to these two commands running in separate terminal tabs:

```bash
yarn serve
yarn start
```

The first one launches JSON Server and stars serving `db.json` file.
The second one makes the app available at [http://localhost:3000](http://localhost:3000).

### Info

The app is made with Create React App using TypeScript template. I'm using React Toolkit to serve global state, and styled-components with Tailwind for styling. For that I need to use Craco to rewire CRA in order to modify PostCSS config.
