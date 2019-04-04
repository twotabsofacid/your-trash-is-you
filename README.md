# Your Trash Is You

> Self-knowledge through self-tracking

A quantified self application that looks through your trash and generates more trash for you

### What this does

This is an application that watches the trashcan on your computer and saves all the screenshots you throw away, in order for you to do something with them later. It also resizes all the images to 1200x1200, so that they can be more easily manipulated.

### Todos

Implement either machine learning to generate new screenshots, or use compositing or some other method to create new content. Then drop this content on a persons desktop.

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
