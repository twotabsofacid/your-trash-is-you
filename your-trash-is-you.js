'use strict';

// Requires
const OS = require('os');
const CONFIG = {
	"trash": `${OS.homedir()}/.Trash`,
	"saved_trash": `${OS.homedir()}/Documents/.saved_trash`
}
const fs = require('fs');
const jetpack = require('fs-jetpack');
const chokidar = require('chokidar');
const sharp = require('sharp');

class YourTrashIsYou {
	constructor() {
		// Create the CONFIG for Linux, or Windows
		let type = OS.type();
		if (type == 'Linux') {
			// Set to /home/$USER/.local/share/Trash
			CONFIG.trash = `${OS.homedir()}/.local/share/Trash`;
			CONFIG.saved_trash = `${OS.homedir()}/.saved_trash`;
		} else if (type == 'Windows_NT') {
			// probably return false?? for now??
			return false;
		}
		// Create the saved trash folder, if it doesn't exist
		if (!fs.existsSync(CONFIG.saved_trash)){
			fs.mkdirSync(CONFIG.saved_trash);
		}
		this.watch();
	}
	watch() {
		let watcher = chokidar.watch(CONFIG.trash);
		watcher.on('all', (event, path) => {
			this.runSaveTrashItem(event, path);
		});
	}
	/**
	 * runSaveNames
	 *
	 * save all trashed file names into a JSON file,
	 * keeping the name, file size, and date added to trash
	 */
	runSaveTrashItem(event, path) {
		if (event == 'add') {
			// save the file info,
			// and create an object with an additional timestamp
			let fileInfo = jetpack.inspect(path);
			let trashObj = {
				name: fileInfo.name,
				path: `${CONFIG.trash}/${fileInfo.name}`,
				type: fileInfo.type,
				size: fileInfo.size
			};
			// If we have a file, and if it's a screenshot
			if (trashObj.type == 'file' && trashObj.name.indexOf('Screen Shot') !== -1 && trashObj.name.indexOf('.png') !== -1) {
				// Copy the file here
				console.log(trashObj.path);
				// Use sharp to change the image
				sharp(`${trashObj.path}`)
					.resize(1200, 1200)
					.toFile(`${CONFIG.saved_trash}/${trashObj.name.split(' ').join('').split('png')[0]}.jpg`, (err, info) => {
						if (err) {
							console.warn(err);
						} else {
							console.log(info);
						}
					});
			}
		}
	}
}

const yourTrash = new YourTrashIsYou();
