const blessed = require('neo-blessed');


const init = (cores)=>{
	var screen = blessed.screen({
		smartCSR: true
	});

	screen.title = 'Core Dump Viewer';

	// Create a box perfectly centered horizontally and vertically.
	var box = blessed.list({
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		scrollable:true,
		interactive:true,
		mouse:true,
		keys:true,
		vi:true,
		content: 'Core Dump Viewer',
		items: cores.map(core=>core.core),
		border: {
			type: 'line'
		},
		style: {
			selected:{
				fg:'green',
				bg:'black'
			},
			fg: 'white',
			bg: 'black',
			border: {
				fg: '#f0f0f0'
			}
		}
	});
	box.on('click', function(data) {
		box.setContent('{center}Some different {red-fg}content{/red-fg}.{/center}');
		screen.render();
	});
	screen.append(box);
	/*cores.forEach((core,i)=>{
		const newBox = blessed.box({
			//top: i*20,
			parent:box,
			top:20*i,
			left: 0,
			width: '100%',
			height: '100%',
			content: core.core,
			style: {
				fg: 'white',
				bg: 'black',
				border: {
					fg: '#f0f0f0'
				}
			}
		});

	});*/

	screen.key(['q', 'C-c'], function(ch, key) {
		return process.exit(0);
	});
	box.focus();
	screen.render();

}
module.exports = {
	init
}

//init();
