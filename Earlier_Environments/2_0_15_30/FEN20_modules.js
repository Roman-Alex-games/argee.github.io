var modules_FEN20=
[{
	mod_name:"16-DXP",
	mod_id:0x81695500,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:3,
		datapoints:
		[
		{
			name:"Invert digital input",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:16,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:1,
			channelNumEnd:16,
		},
		{
			name:"Manual reset after overcurr.",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:32,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:1,
			channelNumEnd:16,
		},
		{
			name:"Activate output",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:48,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:1,
			channelNumEnd:16,
		},
		]
	},
	{
		sect_name:"Diag",
		num_elems:2,
		datapoints:
		[
		{
			name:"Overcurrent on sensor group",
			category:"Global",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Output signal overcurrent",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:1,
			channelNumEnd:16,
		},
		]
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:1,
			channelNumEnd:16,
		},
		]
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output value",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:1,
			channelNumEnd:16,
		},
		]
	},
	]
},
{
	mod_name:"4DIP-4DXP",
	mod_id:0x41564300,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:4,
		datapoints:
		[
		{
			name:"Invert digital input",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:1,
			channelNumEnd:4,
		},
		{
			name:"Activate output",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:16,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:1,
			channelNumEnd:4,
		},
		{
			name:"Manual reset after overcurr.",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:1,
			channelNumEnd:4,
		},
		{
			name:"Invert digital input",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:4,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:5,
			channelNumEnd:8,
		},
		]
	},
	{
		sect_name:"Diag",
		num_elems:2,
		datapoints:
		[
		{
			name:"Overcurrent on sensor group",
			category:"Global",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Output signal overcurrent",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:1,
			channelNumEnd:4,
		},
		]
	},
	{
		sect_name:"Input",
		num_elems:2,
		datapoints:
		[
		{
			name:"Input value",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:1,
			channelNumEnd:4,
		},
		{
			name:"Input value",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:4,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:5,
			channelNumEnd:8,
		},
		]
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output value",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:1,
			channelNumEnd:4,
		},
		]
	},
	]
},
];
