
import os      from 'os';
import path    from 'path';
import process from 'process';
import url     from 'url';



const action = (() => {

	let value = Array.from(process.argv).slice(2).filter((v) => v.startsWith('--') === false).shift() || '';

	if (/^([backup]{6})$/g.test(value) === true) {
		return 'backup';
	} else if (/^([restore]{7})$/g.test(value) === true) {
		return 'restore';
	}

	return 'help';

})();

const flags = (() => {

	let flags = {
		debug:   false,
		plugins: []
	};

	Array.from(process.argv).filter((v) => v.startsWith('--') === true).forEach((flag) => {

		let tmp = flag.substr(2).split('=');
		if (tmp.length === 2) {

			let key = tmp[0];
			let val = tmp[1];

			if (val.startsWith('"') === true) {
				val = val.substr(1);
			}

			if (val.endsWith('"') === true) {
				val = val.substr(0, val.length - 1);
			}

			let num = parseInt(val, 10);
			if (Number.isNaN(num) === false && (num).toString() === val) {
				val = num;
			}

			if (val.includes(',') === true) {
				val = val.split(',').map((v) => v.trim());
			}

			if (val === 'true')  val = true;
			if (val === 'false') val = false;
			if (val === 'null')  val = null;

			flags[key] = val;

		}

	});

	return flags;

})();

const folder = (() => {

	let folder   = '/tmp/backup';
	let platform = os.platform();
	let user     = process.env.SUDO_USER || process.env.USER || process.env.USERNAME;

	if (platform === 'linux' || platform === 'freebsd' || platform === 'openbsd') {
		folder = path.resolve('/home/' + user + '/Backup');
	} else if (platform === 'android') {
		folder = path.resolve('/mnt/sdcard/Backup');
	} else if (platform === 'darwin') {
		folder = path.resolve('/Users/' + user + '/Backup');
	} else if (platform === 'win32') {
		folder = path.resolve((process.env.USERPROFILE || 'C:\\Users\\' + user) + '/Backup');
	}

	if (folder.endsWith('/') === true) {
		folder = folder.substr(0, folder.length - 1);
	}

	return folder;

})();

const profile = (() => {

	let platform = os.platform();
	let user     = process.env.SUDO_USER || process.env.USER || process.env.USERNAME;
	let folder   = '/home/' + user;

	if (platform === 'linux' || platform === 'freebsd' || platform === 'openbsd') {
		folder = path.resolve('/home/' + user);
	} else if (platform === 'android') {
		folder = path.resolve('/mnt/sdcard');
	} else if (platform === 'darwin') {
		folder = path.resolve('/Users/' + user);
	} else if (platform === 'win32') {
		folder = path.resolve((process.env.USERPROFILE || 'C:\\Users\\' + user));
	}

	if (folder.endsWith('/') === true) {
		folder = folder.substr(0, folder.length - 1);
	}

	return folder;


})();

const root = (() => {

	return path.resolve(url.fileURLToPath(import.meta.url), '../../../');

})();



const ENVIRONMENT = {

	action:  action,
	flags:   flags,
	folder:  folder,
	profile: profile,
	root:    root

};


export { ENVIRONMENT };

