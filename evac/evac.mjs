#!/usr/bin/env node

import process  from 'process';

import { console     } from '../base/index.mjs';
import { Evac        } from './source/Evac.mjs';
import { ENVIRONMENT } from './source/ENVIRONMENT.mjs';



const show_help = () => {

	console.info('');
	console.info('EVAC (node.js build)');
	console.info('');

	console.log('');
	console.log('Usage: evac [Action] [--Flag=Value...]');
	console.log('');
	console.log('Available Actions:');
	console.log('');
	console.log('    Action  | Description                                         ');
	console.log('    --------|-----------------------------------------------------');
	console.log('    backup  | Backup this machine to a specific backup folder.    ');
	console.log('    restore | Restore this machine from a specific backup folder. ');
	console.log('');
	console.log('Available Flags:');
	console.log('');
	console.log('    Flag       | Default | Values               | Description                                   ');
	console.log('    -----------|---------|----------------------|-----------------------------------------------');
	console.log('    --debug    | false   | true, false          | Enable/Disable debug mode.                    ');
	console.log('    --plugins  | null    | Array of Identifiers | Override the List of Plugins that is executed.');
	console.log('');
	console.log('Examples:');
	console.log('');
	console.log('    evac backup /mnt/backup/folder;');
	console.log('    evac restore /mnt/backup/folder;');
	console.log('');
	console.log('    evac backup --plugins="firefox,thunderbird" /mnt/backup;');
	console.log('    evac restore --plugins="firefox,thunderbird" /mnt/backup;');
	console.log('');

};



if (ENVIRONMENT.action === 'backup') {

	let evac = new Evac({
		debug:   ENVIRONMENT.flags.debug   || false,
		plugins: ENVIRONMENT.flags.plugins || [],
		source:  ENVIRONMENT.profile       || null,
		target:  ENVIRONMENT.folder        || null
	});

	evac.on('finish', (result) => {
		process.exit(result === true ? 0 : 1);
	});

	evac.backup();

} else if (ENVIRONMENT.action === 'restore') {

	let evac = new Evac({
		debug:   ENVIRONMENT.flags.debug   || false,
		plugins: ENVIRONMENT.flags.plugins || [],
		source:  ENVIRONMENT.folder        || null,
		target:  ENVIRONMENT.profile       || null
	});

	evac.on('finish', (result) => {
		process.exit(result === true ? 0 : 1);
	});

	evac.restore();

} else {

	show_help();
	process.exit(1);

}

