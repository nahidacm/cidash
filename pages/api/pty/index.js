import os from 'os';
import pty from 'node-pty';

const PTYHandler = (req, res) => {
    console.log('started pty API: ');

    var shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

    var ptyProcess = pty.spawn(shell, [], {
        name: 'xterm-color',
        cols: 80,
        rows: 30,
        cwd: process.env.HOME,
        env: process.env
      });
      
      ptyProcess.on('data', function(data) {
        console.log('pty after on data: ', data);
        
        // process.stdout.write(data);
      });
    
}

export default PTYHandler;