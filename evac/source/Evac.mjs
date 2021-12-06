
import process  from 'process';
import readline from 'readline';

import { console, Emitter, isArray, isObject, isString } from '../../base/index.mjs';
import { ENVIRONMENT                                   } from '../../evac/source/ENVIRONMENT.mjs';



const READLINE = readline.createInterface({ input: process.stdin, output: process.stdout });



const Evac = function(settings) {

	settings = isObject(settings) ? settings : {};


	this.settings = Object.freeze(Object.assign({
		debug:   false,
		plugins: isArray(settings.plugins) ? settings.plugins : [

			'music',
			'software',

			'chromium',
			'firefox',
			'thunderbird',

			'gnupg',
			'keepass',
			'openssh'

		],
		source: isString(settings.source) ? settings.source : null,
		target: isString(settings.target) ? settings.target : null
	}, settings));


	Emitter.call(this);


	this.on('confirm', (callback) => {

		READLINE.question('Please confirm [Y/N]: ', (answer) => {

			READLINE.close();

			let select = answer.toLowerCase();
			if (select === 'yes' || select === 'y') {
				callback(true);
			} else if (select === 'no' || select === 'n') {
				callback(false);
			} else {
				callback(null);
			}

		});

	});


	process.on('SIGINT', () => {
		this.cancel();
	});

	process.on('SIGQUIT', () => {
		this.cancel();
	});

	process.on('SIGABRT', () => {
		this.cancel();
	});

	process.on('SIGTERM', () => {
		this.cancel();
	});

	process.on('error', () => {
		this.cancel();
	});

};


Evac.prototype = Object.assign({}, Emitter.prototype, {

	[Symbol.toStringTag]: 'Evac',

	cancel: function() {

		// TODO: Cancel running plugin tasks

		this.emit('finish', [ false ]);

	},

	backup: function() {

		let source = isString(this.settings.source) ? this.settings.source : ENVIRONMENT.profile;
		let target = isString(this.settings.target) ? this.settings.target : ENVIRONMENT.folder;

		setTimeout(() => {

			this.emit('confirm', [ (result) => {

				console.info('Selected:', result);

			}]);

		}, 1000);

	},

	restore: function() {

		let source = isString(this.settings.source) ? this.settings.source : ENVIRONMENT.folder;
		let target = isString(this.settings.target) ? this.settings.target : ENVIRONMENT.profile;

		setTimeout(() => {

			this.emit('confirm', [ (result) => {

				console.info('Selected:', result);

			}]);

		}, 1000);

	}

});


export { Evac };

