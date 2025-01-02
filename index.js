const { app, BrowserWindow } = require('electron');

function createWindow(url, title, width, height, zoomFactor) {
  const mainWindow = new BrowserWindow({
    width: width,
    height: height,
    useContentSize: true,
    webPreferences: {
      zoomFactor: zoomFactor || 1.0,
    }
  });

  mainWindow.setTitle(title);
  mainWindow.on('page-title-updated', (event) => {
    event.preventDefault(); // ページのtitleタグによるタイトル変更を抑制
  });

  mainWindow.loadURL(url);
}

app.whenReady().then(() => {
  createWindow('https://poloniex.com/ja/futures/trade/BTCUSDTPERP', "Poloniex", 1600, 800);

  // Mac でDockアイコンをクリックして再度起動する場合に対応する例
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// 全ウィンドウが閉じられたらアプリを終了 (Mac 以外)
// Mac ではDockに残り続けるのが一般的
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
