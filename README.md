# Your Trash Is You

> Self-knowledge through self-tracking

A quantified self application that looks through your trash and generates more trash for you

### Installation

To install, clone this repo and `cd` into the directory, and do:

```
npm install
```

You'll then need to create a `config.json` file with directories for your trash and a folder where all the screenshots you throw away will be stored.

After that, you'll need to install [pm2](http://pm2.keymetrics.io/) on your machine. Once you have this you should be able to do:

```
pm2 start your-trash-is-you.js
```

which will run the program in the background.
