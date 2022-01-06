const blessed = require('neo-blessed');


const init = (cores)=>{
	const screen = blessed.screen({
		smartCSR: true
	});

	screen.title = 'Core Dump Viewer';

	// Create a box perfectly centered horizontally and vertically.
	const box = blessed.box({
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		scrollable:true,
		content: 'Core Dump Viewer',
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
	const infoBox = blessed.box({
		parent:box,
		top: '2%',
		left: 0,
		width: '98%',
		height: '70%',
		scrollable:true,
		content: 'Select a corefile for info...',
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

	const coreList = blessed.list({
		parent:box,
		top: '71%',
		left: 0,
		width: '98%',
		height: '29%',
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
	coreList.on('select',item=>{
		let coreName = item.content;
		coreName += '\n' + cores.find(core=>core.core === coreName).backtrace;
		infoBox.setContent(coreName);
		screen.render();
	});
	coreList.key('r',()=>{
		const input = blessed.form({
			parent:box,
			top:'center',
			left:'center',
			width:'20%',
			height:6,
			text:'Rename Core',
			bg: 'black',
			keys:true,
			autoNext:true
		});
		const textbox = blessed.textbox({
			parent:input,
			top:'center',
			left:'center',
			height:1,
			keys:true,
			inputOnFocus: true,
			vi:false,
			text:'test value',
			bg:'green',
			fg:'black'
		});
		//textbox.setValue();
		textbox.on('submit',submission=>{
			if(submission){
				const toRename = coreList.getItem(coreList.selected).content
				cores.find(cores=>cores.core===toRename).core = submission;
				coreList.setItem(coreList.selected,submission);
			}
			input.detach();
			screen.render();
			setTimeout(()=>{coreList.focus()});
		});
		textbox.focus();
		screen.render();
		//console.log(coreList);
	});
	screen.append(box);
	screen.key(['q', 'C-c'], function(ch, key) {
		return process.exit(0);
	});
	coreList.focus();
	screen.render();

}
module.exports = {
	init
}

//init();
