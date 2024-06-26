var modules_TBEN=
[{
	mod_name:"16DIN",
	mod_id:0x824C5000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:2,
		datapoints:
		[
		{
			name:"Invert digital input",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:16,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Pulse stretching",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:40,
			bitLen:8,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:168,
	},
	{
		sect_name:"Diag",
		num_elems:8,
		datapoints:
		[
		{
			name:"Overcurrent VAUX1 Ch0/1",
			category:"Global",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch2/3",
			category:"Global",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch4/5",
			category:"Global",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch6/7",
			category:"Global",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch8/9",
			category:"Global",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch10/11",
			category:"Global",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch12/13",
			category:"Global",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch14/15",
			category:"Global",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:8,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"16DON",
	mod_id:0x82670500,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:1,
		datapoints:
		[
		{
			name:"Manual reset after overcurr.",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Diag",
		num_elems:9,
		datapoints:
		[
		{
			name:"Overcurrent VAUX2 Ch0/1",
			category:"Global",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch2/3",
			category:"Global",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch4/5",
			category:"Global",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch6/7",
			category:"Global",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch8/9",
			category:"Global",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch10/11",
			category:"Global",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch12/13",
			category:"Global",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch14/15",
			category:"Global",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:24,
	},
	{
		sect_name:"Input",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output value",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:16,
	},
	]
},
{
	mod_name:"16DXN",
	mod_id:0x826D5500,
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
			bitOffset:16,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Pulse stretching",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:72,
			bitLen:8,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Activate output",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:48,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:1,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Manual reset after overcurr.",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:32,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:200,
	},
	{
		sect_name:"Diag",
		num_elems:9,
		datapoints:
		[
		{
			name:"Overcurrent VAUX1 Ch0/1",
			category:"Global",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch2/3",
			category:"Global",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch4/5",
			category:"Global",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch6/7",
			category:"Global",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch8/9",
			category:"Global",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch10/11",
			category:"Global",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch12/13",
			category:"Global",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch14/15",
			category:"Global",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:24,
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
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:16,
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
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:16,
	},
	]
},
{
	mod_name:"8DIN-8DON",
	mod_id:0x625B4400,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:3,
		datapoints:
		[
		{
			name:"Invert digital input",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Pulse stretching",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:40,
			bitLen:8,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Manual reset after overcurr.",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:8,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:104,
	},
	{
		sect_name:"Diag",
		num_elems:9,
		datapoints:
		[
		{
			name:"Overcurrent VAUX1 Ch0/1",
			category:"Global",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch2/3",
			category:"Global",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch4/5",
			category:"Global",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch6/7",
			category:"Global",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch8/9",
			category:"Global",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch10/11",
			category:"Global",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch12/13",
			category:"Global",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch14/15",
			category:"Global",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:8,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:8,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output value",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:8,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:8,
	},
	]
},
{
	mod_name:"16DIP",
	mod_id:0x844C5000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:2,
		datapoints:
		[
		{
			name:"Invert digital input",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:16,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Pulse stretching",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:40,
			bitLen:8,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:168,
	},
	{
		sect_name:"Diag",
		num_elems:8,
		datapoints:
		[
		{
			name:"Overcurrent VAUX1 Ch0/1",
			category:"Global",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch2/3",
			category:"Global",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch4/5",
			category:"Global",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch6/7",
			category:"Global",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch8/9",
			category:"Global",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch10/11",
			category:"Global",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch12/13",
			category:"Global",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch14/15",
			category:"Global",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:8,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"16DOP",
	mod_id:0x85670500,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:1,
		datapoints:
		[
		{
			name:"Manual reset after overcurr.",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Diag",
		num_elems:9,
		datapoints:
		[
		{
			name:"Overcurrent VAUX2 Ch0/1",
			category:"Global",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch2/3",
			category:"Global",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch4/5",
			category:"Global",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch6/7",
			category:"Global",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch8/9",
			category:"Global",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch10/11",
			category:"Global",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch12/13",
			category:"Global",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch14/15",
			category:"Global",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:24,
	},
	{
		sect_name:"Input",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output value",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:16,
	},
	]
},
{
	mod_name:"16DXP",
	mod_id:0x846D5500,
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
			bitOffset:16,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Pulse stretching",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:72,
			bitLen:8,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Activate output",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:48,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:1,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Manual reset after overcurr.",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:32,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:200,
	},
	{
		sect_name:"Diag",
		num_elems:9,
		datapoints:
		[
		{
			name:"Overcurrent VAUX1 Ch0/1",
			category:"Global",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch2/3",
			category:"Global",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch4/5",
			category:"Global",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch6/7",
			category:"Global",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch8/9",
			category:"Global",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch10/11",
			category:"Global",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch12/13",
			category:"Global",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch14/15",
			category:"Global",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:24,
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
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:16,
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
			channelNumStart:0,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:16,
	},
	]
},
{
	mod_name:"8DIP-8DOP",
	mod_id:0x655B4400,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:3,
		datapoints:
		[
		{
			name:"Invert digital input",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Pulse stretching",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:40,
			bitLen:8,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"Manual reset after overcurr.",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:8,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"no",
				1,
				"yes",
				],
		},
		],
	max_size:104,
	},
	{
		sect_name:"Diag",
		num_elems:9,
		datapoints:
		[
		{
			name:"Overcurrent VAUX1 Ch0/1",
			category:"Global",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch2/3",
			category:"Global",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch4/5",
			category:"Global",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX1 Ch6/7",
			category:"Global",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch8/9",
			category:"Global",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch10/11",
			category:"Global",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch12/13",
			category:"Global",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent VAUX2 Ch14/15",
			category:"Global",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		{
			name:"Overcurrent",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:8,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"-",
				1,
				"active",
				],
		},
		],
	max_size:16,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:8,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output value",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:8,
			channelNumEnd:15,
			dataType:2,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"off",
				1,
				"on",
				],
		},
		],
	max_size:8,
	},
	]
},
];
