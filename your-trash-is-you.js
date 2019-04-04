'use strict';

// Requires
const CONFIG = require('./config.json');
const jetpack = require('fs-jetpack');
const chokidar = require('chokidar');
const sharp = require('sharp');

class YourTrashIsYou {
	start() {
		// make sure we have a directory to save this stuff to
		jetpack.dir(CONFIG.saved_trash);
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
			if (trashObj.type == 'file' && trashObj.name.indexOf('Screen Shot') !== -1) {
				// Copy the file here
				console.log(trashObj.path);
				// Use sharp to change the image
				sharp(`${trashObj.path}`)
					.resize(1200, 1200)
					.toFile(`${CONFIG.saved_trash}/${trashObj.name.split(' ').join('')}`, (err, info) => {
						if (err) {
							console.warn(err);
						} else {
							console.log(info);
						}
					});
				//jetpack.copy(trashObj.path, `${CONFIG.saved_trash}/${trashObj.name}`, { overwrite: true });
			}
		}
	}
}

const yourTrash = new YourTrashIsYou();
yourTrash.watch();
