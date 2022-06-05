
const { app, BrowserWindow } = require('electron');



const createWindow = () => {

	let window = new BrowserWindow({
		width:         800,
		height:        600,
		frame:         false,
		titleBarStyle: 'hidden'
	});

	window.webContents.openDevTools();

	window.loadFile('index.html');

};



app.whenReady().then(() => {
	createWindow();
});


app.on('activate', () => {

	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}

});

app.on('window-all-closed', () => {
	app.quit();
});

