const fs = require('fs');
const {execSync} = require('child_process');
const gui = require('./gui');
const corePath = '/cores/';
const corePrefix = 'core';
const sourcePath = '/cores/dnh/';
const binaryPath = sourcePath + 'dnethackdir/dnethack';

console.log('Collecting and processing core dumps...');

const cores = fs.readdirSync(corePath).filter(fileName=>fileName.includes('core'));
console.log(cores);
const backtraces = cores.map(core=>{
	return {
		backtrace: execSync(`printf "bt\nquit\n" | gdb -silent ${binaryPath} ${corePath}${core}`,{cwd:sourcePath,stdio:['pipe','pipe','ignore']}).toString(),
		core: core
	};
});
console.log('Launching TUI....');
gui.init(backtraces);
