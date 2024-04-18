var modules_TBEN_S2_4AO=
[{
	mod_name:"Analog output",
	mod_id:0x2182,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:9,
		datapoints:
		[
		{
			name:"Operation mode",
			category:"Analog Out",
			chan_unit:"",
			bitOffset:4,
			bitLen:4,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"voltage",
				1,
				"current",
				],
		},
		{
			name:"Current range",
			category:"Analog Out",
			chan_unit:"",
			bitOffset:16,
			bitLen:4,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"0...20 mA",
				1,
				"4...20 mA",
				],
		},
		{
			name:"Voltage range",
			category:"Analog Out",
			chan_unit:"",
			bitOffset:20,
			bitLen:4,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:5,
			defaultValue:0,
			enumValues:
				[
				0,
				"-10...+10 V",
				1,
				"0...10 V",
				2,
				"2...10 V",
				3,
				"0...5 V",
				4,
				"1...5 V",
				],
		},
		{
			name:"Data representation",
			category:"Analog Out",
			chan_unit:"",
			bitOffset:10,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"standard",
				1,
				"NE43",
				2,
				"extended range",
				],
		},
		{
			name:"Deactivate channel",
			category:"Analog Out",
			chan_unit:"",
			bitOffset:9,
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
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Output recovery mode",
			category:"Analog Out",
			chan_unit:"",
			bitOffset:12,
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
				"automatic",
				1,
				"manual",
				],
		},
		{
			name:"Deactivate diagnostics",
			category:"Analog Out",
			chan_unit:"",
			bitOffset:8,
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
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Output on fieldbus error",
			category:"Analog Out",
			chan_unit:"",
			bitOffset:0,
			bitLen:3,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"default value",
				1,
				"substitute value",
				2,
				"keep current value",
				],
		},
		{
			name:"Substitute value",
			category:"Analog Out",
			chan_unit:"",
			bitOffset:32,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:48,
	},
	{
		sect_name:"Diag",
		num_elems:2,
		datapoints:
		[
		{
			name:"Overload",
			category:"Analog Out",
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
			name:"Wire break",
			category:"Analog Out",
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
		],
	max_size:2,
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
			category:"Analog Out",
			chan_unit:"",
			bitOffset:0,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:16,
	},
	]
},
{
	mod_name:"Analog output diag",
	mod_id:0x100000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:2,
		datapoints:
		[
		{
			name:"Overload",
			category:"Diagnostic channel",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:3,
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
			name:"Wire break",
			category:"Diagnostic channel",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:3,
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
	max_size:33,
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
	mod_name:"Module status",
	mod_id:0x80000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	{
		sect_name:"Input",
		num_elems:5,
		datapoints:
		[
		{
			name:"I/O-ASSISTANT Force Mode active",
			category:"Module state",
			chan_unit:"",
			bitOffset:14,
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
			name:"Undervoltage V1",
			category:"Module state",
			chan_unit:"",
			bitOffset:9,
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
			name:"Undervoltage V2",
			category:"Module state",
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
			name:"Module diagnostics available",
			category:"Module state",
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
			name:"Internal error",
			category:"Module state",
			chan_unit:"",
			bitOffset:10,
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
	max_size:15,
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
];
