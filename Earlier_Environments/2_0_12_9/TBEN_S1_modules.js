var modules_TBEN_S1=
[{
	mod_name:"TBEN_S1-8DIP",
	mod_id:0x60204000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		]
	},
	{
		sect_name:"Diag",
		num_elems:2,
		datapoints:
		[
		{
			name:"Overcurrent supply VAUX1 at channels 1-4",
			category:"Global",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Overcurrent supply VAUX1 at channels 5-8",
			category:"Global",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
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
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:1,
			channelNumEnd:8,
		},
		]
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		]
	},
	]
},
{
	mod_name:"TBEN_S1-8DOP",
	mod_id:0x60540400,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:1,
		datapoints:
		[
		{
			name:"Manual output reset after overcurrent",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:1,
			channelNumEnd:8,
		},
		]
	},
	{
		sect_name:"Diag",
		num_elems:3,
		datapoints:
		[
		{
			name:"Overcurrent supply VAUX2 at channels 1-4",
			category:"Global",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Overcurrent supply VAUX2 at channels 5-8",
			category:"Global",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Output signal overcurrent",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:1,
			channelNumEnd:8,
		},
		]
	},
	{
		sect_name:"Input",
		num_elems:0,
		datapoints:
		[
		]
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
			channelNumStart:1,
			channelNumEnd:8,
		},
		]
	},
	]
},
{
	mod_name:"TBEN_S1-8DXP",
	mod_id:0x60554400,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:2,
		datapoints:
		[
		{
			name:"Manual output reset after overcurrent",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:1,
			channelNumEnd:8,
		},
		{
			name:"Output Enable",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:1,
			channelNumEnd:8,
		},
		]
	},
	{
		sect_name:"Diag",
		num_elems:3,
		datapoints:
		[
		{
			name:"Overcurrent supply VAUX1 at channels 1-4",
			category:"Global",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Overcurrent supply VAUX2 at channels 5-8",
			category:"Global",
			chan_unit:"",
			bitOffset:1,
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
			channelNumEnd:8,
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
			channelNumEnd:8,
		},
		]
	},
	]
},
{
	mod_name:"TBEN_S1-4DIP-4DOP",
	mod_id:0x40533300,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:1,
		datapoints:
		[
		{
			name:"Manual output reset after overcurrent",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:5,
			channelNumEnd:8,
		},
		]
	},
	{
		sect_name:"Diag",
		num_elems:3,
		datapoints:
		[
		{
			name:"Overcurrent supply VAUX1 at channels 1-4",
			category:"Global",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Overcurrent supply VAUX2 at channels 5-8",
			category:"Global",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Output signal overcurrent",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:5,
			channelNumEnd:8,
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
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:1,
			channelNumEnd:4,
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
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:5,
			channelNumEnd:8,
		},
		]
	},
	]
},
{
	mod_name:"TBEN_S1-8DIP-D",
	mod_id:0x60404000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		]
	},
	{
		sect_name:"Diag",
		num_elems:8,
		datapoints:
		[
		{
			name:"Overcurrent supply VAUX1 at channel 1",
			category:"Global",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Overcurrent supply VAUX1 at channel 2",
			category:"Global",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Overcurrent supply VAUX1 at channel 3",
			category:"Global",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Overcurrent supply VAUX1 at channel 4",
			category:"Global",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Overcurrent supply VAUX1 at channel 5",
			category:"Global",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Overcurrent supply VAUX1 at channel 6",
			category:"Global",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Overcurrent supply VAUX1 at channel 7",
			category:"Global",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Overcurrent supply VAUX1 at channel 8",
			category:"Global",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
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
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:1,
			channelNumEnd:8,
		},
		]
	},
	{
		sect_name:"Output",
		num_elems:0,
		datapoints:
		[
		]
	},
	]
},
];
