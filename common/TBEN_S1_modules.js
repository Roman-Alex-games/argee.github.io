var modules_TBEN_S1=
[{
	mod_name:"Basic",
	mod_id:0x40533300,
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
			channelNumStart:4,
			channelNumEnd:7,
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
		],
	max_size:4,
	},
	{
		sect_name:"Diag",
		num_elems:3,
		datapoints:
		[
		{
			name:"Overcurrent VAUX1 Ch0-3",
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
			name:"Overcurrent VAUX2 Ch4-7",
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
			name:"Overcurrent",
			category:"Diagnostics",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:4,
			channelNumEnd:7,
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
	max_size:12,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"Input values",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
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
	max_size:4,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output value",
			category:"Output values",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:4,
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
	max_size:4,
	},
	]
},
{
	mod_name:"Diagnostic",
	mod_id:0x9080000,
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
		num_elems:3,
		datapoints:
		[
		{
			name:"Overcurrent VAUX1 Ch0-3",
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
			name:"Overcurrent VAUX2 Ch4-7",
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
			name:"Output overcurrent",
			category:"Input values",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:4,
			channelNumEnd:7,
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
	max_size:12,
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
	mod_name:"Input Latch Ch0-3",
	mod_id:0x1082000,
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
		num_elems:1,
		datapoints:
		[
		{
			name:"Latch input",
			category:"Input values",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
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
	max_size:4,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Latch reset",
			category:"Output values",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
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
	max_size:4,
	},
	]
},
{
	mod_name:"Ext. Func. Digital",
	mod_id:0x202082,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:3,
		datapoints:
		[
		{
			name:"extended digital mode",
			category:"Ext. IO functions",
			chan_unit:"",
			bitOffset:0,
			bitLen:7,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"deactivated",
				1,
				"digital filter and impulse stretch",
				4,
				"counter",
				],
		},
		{
			name:"input filter",
			category:"Ext. IO functions",
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
				"0.2 ms",
				1,
				"3 ms",
				],
		},
		{
			name:"impulse stretch (*10ms)",
			category:"Ext. IO functions",
			chan_unit:"",
			bitOffset:8,
			bitLen:8,
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
		num_elems:3,
		datapoints:
		[
		{
			name:"Counter value",
			category:"Input values",
			chan_unit:"",
			bitOffset:0,
			bitLen:32,
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
		{
			name:"Counter frequency (Hz)",
			category:"Input values",
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
		{
			name:"Status",
			category:"Input values",
			chan_unit:"",
			bitOffset:48,
			bitLen:8,
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
	max_size:56,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Counter reset",
			category:"Output values",
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
				"not active",
				1,
				"active",
				],
		},
		],
	max_size:1,
	},
	]
},
{
	mod_name:"Ext. Func. Digital",
	mod_id:0x2000080,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:3,
		datapoints:
		[
		{
			name:"extended digital mode",
			category:"Ext. IO functions",
			chan_unit:"",
			bitOffset:0,
			bitLen:7,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"deactivated",
				1,
				"digital filter and impulse stretch",
				],
		},
		{
			name:"input filter",
			category:"Ext. IO functions",
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
				"0.2 ms",
				1,
				"3 ms",
				],
		},
		{
			name:"impulse stretch (*10ms)",
			category:"Ext. IO functions",
			chan_unit:"",
			bitOffset:8,
			bitLen:8,
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
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
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
	mod_name:"Ext. Func. Digital",
	mod_id:0x2082102,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:1,
		datapoints:
		[
		{
			name:"extended digital mode",
			category:"PWM Output",
			chan_unit:"",
			bitOffset:0,
			bitLen:7,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:2,
			defaultValue:0,
			enumValues:
				[
				0,
				"deactivated",
				2,
				"PWM out",
				],
		},
		],
	max_size:7,
	},
	{
		sect_name:"Diag",
		num_elems:1,
		datapoints:
		[
		{
			name:"Overcurrent PWM output",
			category:"Diagnostics",
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
		],
	max_size:1,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Overcurrent PWM output",
			category:"Input values",
			chan_unit:"",
			bitOffset:0,
			bitLen:8,
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
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Duty cycle %",
			category:"Output values",
			chan_unit:"",
			bitOffset:0,
			bitLen:8,
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
	max_size:8,
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
{
	mod_name:"Basic",
	mod_id:0x60204000,
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
		num_elems:2,
		datapoints:
		[
		{
			name:"Overcurrent VAUX1 Ch0-3",
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
			name:"Overcurrent VAUX1 Ch4-7",
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
		],
	max_size:2,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"Input values",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:1,
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
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"Diagnostic",
	mod_id:0x6080000,
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
			name:"Overcurrent VAUX1 Ch0-3",
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
			name:"Overcurrent VAUX1 Ch4-7",
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
		],
	max_size:2,
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
	mod_name:"Input Latch Ch0-7",
	mod_id:0x2082000,
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
		num_elems:1,
		datapoints:
		[
		{
			name:"Latch input",
			category:"Input values",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:1,
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
			name:"Latch reset",
			category:"Output values",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:1,
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
	mod_name:"Basic",
	mod_id:0x60540400,
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
			channelNumEnd:7,
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
		],
	max_size:8,
	},
	{
		sect_name:"Diag",
		num_elems:1,
		datapoints:
		[
		{
			name:"Overcurrent",
			category:"Diagnostics",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
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
	max_size:16,
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
			category:"Output values",
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
	]
},
{
	mod_name:"Diagnostic",
	mod_id:0x8080000,
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
		num_elems:3,
		datapoints:
		[
		{
			name:"Overcurrent VAUX2 Ch0-3",
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
			name:"Overcurrent VAUX2 Ch4-7",
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
			name:"Output overcurrent",
			category:"Input values",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
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
	mod_name:"Basic",
	mod_id:0x60554400,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:2,
		datapoints:
		[
		{
			name:"Activate output",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:1,
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
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
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
		],
	max_size:16,
	},
	{
		sect_name:"Diag",
		num_elems:3,
		datapoints:
		[
		{
			name:"Overcurrent VAUX1 Ch0-3",
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
			name:"Overcurrent VAUX2 Ch4-7",
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
			name:"Overcurrent",
			category:"Diagnostics",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
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
	max_size:16,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"Input values",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:1,
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
			category:"Output values",
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
	]
},
{
	mod_name:"Diagnostic",
	mod_id:0xA080000,
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
		num_elems:3,
		datapoints:
		[
		{
			name:"Overcurrent VAUX1 Ch0-3",
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
			name:"Overcurrent VAUX2 Ch4-7",
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
			name:"Overcurrent",
			category:"Diagnostics",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
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
	mod_name:"Ext. Func. Digital",
	mod_id:0x1082102,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:3,
		datapoints:
		[
		{
			name:"extended digital mode",
			category:"Ext. IO functions",
			chan_unit:"",
			bitOffset:0,
			bitLen:7,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:3,
			defaultValue:0,
			enumValues:
				[
				0,
				"deactivated",
				1,
				"digital filter and impulse stretch",
				2,
				"PWM out",
				],
		},
		{
			name:"input filter",
			category:"Ext. IO functions",
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
				"0.2 ms",
				1,
				"3 ms",
				],
		},
		{
			name:"impulse stretch (*10ms)",
			category:"Ext. IO functions",
			chan_unit:"",
			bitOffset:8,
			bitLen:8,
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
	{
		sect_name:"Diag",
		num_elems:1,
		datapoints:
		[
		{
			name:"Overcurrent PWM output",
			category:"Diagnostics",
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
		],
	max_size:1,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Overcurrent PWM output",
			category:"Input values",
			chan_unit:"",
			bitOffset:0,
			bitLen:8,
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
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Duty cycle %",
			category:"Output values",
			chan_unit:"",
			bitOffset:0,
			bitLen:8,
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
	max_size:8,
	},
	]
},
{
	mod_name:"Basic",
	mod_id:0x60404000,
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
		num_elems:1,
		datapoints:
		[
		{
			name:"Overcurrent VAUX1",
			category:"Diagnostics",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
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
			category:"Input values",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
			dataType:1,
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
		num_elems:0,
		datapoints:
		[
		],
	max_size:0,
	},
	]
},
{
	mod_name:"Diagnostic",
	mod_id:0x7080000,
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
		num_elems:1,
		datapoints:
		[
		{
			name:"Overcurrent VAUX1",
			category:"Input values",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
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
	mod_name:"Basic",
	mod_id:0x6082082,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:2,
		datapoints:
		[
		{
			name:"Activate output",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
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
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
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
		],
	max_size:12,
	},
	{
		sect_name:"Diag",
		num_elems:3,
		datapoints:
		[
		{
			name:"Overcurrent VAUX1 Ch0-1",
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
			name:"Overcurrent VAUX2 Ch2-3",
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
			name:"Overcurrent",
			category:"Diagnostics",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
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
	max_size:12,
	},
	{
		sect_name:"Input",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"Input values",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
			dataType:1,
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
	max_size:4,
	},
	{
		sect_name:"Output",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output value",
			category:"Output values",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
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
	max_size:4,
	},
	]
},
{
	mod_name:"Diagnostic",
	mod_id:0x17080000,
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
		num_elems:3,
		datapoints:
		[
		{
			name:"Overcurrent VAUX1 Ch0-1",
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
			name:"Overcurrent VAUX2 Ch2-3",
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
			name:"Overcurrent",
			category:"Diagnostics",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
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
	max_size:12,
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
