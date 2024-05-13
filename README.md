# web-reload

web-reload is a simple CLI for auto-reloading web applications with each change made to your project at the time of development.

# Installation

Install web-reload globally with [**npm**](http://npmjs.org/) using the command below to use in your terminal:

```bash
npm install -g @jonhoffmam/web-reload
```

You can also install web-reload as a development dependency:

```bash
npm install --save-dev @jonhoffmam/web-reload
```

# Usage

> Your web application must be inside a ***src*** folder!

If you have installed web-reload globally you can simply run the command in your terminal:

```bash
web-reload

# OR

webreload
```

If you have installed web-reload as a development dependency, you can insert in your package.json file:

Example:

```json
"scripts": {
  "start": "web-reload"
}
```

When running your application it will be available at <http://localhost:3000>

# Collaborators

- [Jonathan Hoffmam Pivetta](https://github.com/jonhoffmam)

# License

MIT
