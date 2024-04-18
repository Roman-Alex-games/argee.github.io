var modules_TBEN_S2_4AI=
[{
	mod_name:"Analog input",
	mod_id:0x80182,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:17,
		datapoints:
		[
		{
			name:"Operation mode",
			category:"Analog In",
			chan_unit:"",
			bitOffset:4,
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
				"thermocouple",
				1,
				"voltage",
				2,
				"current",
				3,
				"resistance",
				4,
				"RTD",
				],
		},
		{
			name:"Thermocouple type",
			category:"Analog In",
			chan_unit:"",
			bitOffset:44,
			bitLen:4,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:10,
			defaultValue:0,
			enumValues:
				[
				0,
				"type K, -270...1370 C, -454...2498 F",
				1,
				"type B, +100...1820 C, 212...3308 F",
				2,
				"type E, -270...1000 C, -454...1832 F",
				3,
				"type J, -210...1200 C, -346...2192 F",
				4,
				"type N, -270...1300 C, -454...2372 F",
				5,
				"type R, -50...1768 C, -58...3214 F",
				6,
				"type S, -50...1768 C, -58...3214 F",
				7,
				"type T, -270...400 C, -454...752 F",
				8,
				"type C, 0...2315 C, 32...4199 F",
				9,
				"type G, 0...2315 C, 32...4199 F",
				],
		},
		{
			name:"Thermocouple cold junc. config.",
			category:"Analog In",
			chan_unit:"",
			bitOffset:40,
			bitLen:4,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:4,
			defaultValue:0,
			enumValues:
				[
				0,
				"PT1000",
				1,
				"PT100",
				2,
				"cold junction from channel 1",
				3,
				"none",
				],
		},
		{
			name:"Voltage range",
			category:"Analog In",
			chan_unit:"",
			bitOffset:16,
			bitLen:4,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:9,
			defaultValue:0,
			enumValues:
				[
				0,
				"-10...10 V",
				1,
				"0...10 V",
				2,
				"2...10 V",
				3,
				"0...5 V",
				4,
				"1...5 V",
				5,
				"-1...1 V",
				6,
				"-500...500 mV",
				7,
				"-100...100 mV",
				8,
				"-50...50 mV",
				],
		},
		{
			name:"Voltage wiring type",
			category:"Analog In",
			chan_unit:"",
			bitOffset:20,
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
				"differential",
				1,
				"single ended",
				2,
				"differential without ground",
				],
		},
		{
			name:"Current range",
			category:"Analog In",
			chan_unit:"",
			bitOffset:22,
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
				"4...20 mA",
				1,
				"0...20 mA",
				2,
				"-20...20 mA",
				],
		},
		{
			name:"Current wiring type",
			category:"Analog In",
			chan_unit:"",
			bitOffset:24,
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
				"differential",
				1,
				"single ended",
				2,
				"differential without ground",
				],
		},
		{
			name:"Resistance range",
			category:"Analog In",
			chan_unit:"",
			bitOffset:28,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:4,
			defaultValue:0,
			enumValues:
				[
				0,
				"0...100 Ohm",
				1,
				"0...400 Ohm",
				2,
				"0...2000 Ohm",
				3,
				"0...4000 Ohm",
				],
		},
		{
			name:"Resistance wiring type",
			category:"Analog In",
			chan_unit:"",
			bitOffset:26,
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
				"2-wire",
				1,
				"3-wire",
				2,
				"4-wire",
				],
		},
		{
			name:"RTD type",
			category:"Analog In",
			chan_unit:"",
			bitOffset:32,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:12,
			defaultValue:0,
			enumValues:
				[
				0,
				"PT100, -200...850 C, -328...1562 F",
				1,
				"PT100, -200...150 C, -328...302 F",
				2,
				"NI100, -60...250 C, -76...482 F",
				3,
				"NI100, -60...150 C, -76...302 F",
				4,
				"PT200, -200...850 C, -328...1562 F",
				5,
				"PT200, -200...150 C, -328...302 F",
				6,
				"PT500, -200...850 C, -328...1562 F",
				7,
				"PT500, -200...150 C, -328...302 F",
				8,
				"PT1000, -200...850 C, -328...1562 F",
				9,
				"PT1000, -200...150 C, -328...302 F",
				10,
				"NI1000, -60...250 C, -76...482 F",
				11,
				"NI1000, -60...150 C, -76...302 F",
				],
		},
		{
			name:"RTD wiring type",
			category:"Analog In",
			chan_unit:"",
			bitOffset:30,
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
				"2-wire",
				1,
				"3-wire",
				2,
				"4-wire",
				],
		},
		{
			name:"Data representation",
			category:"Analog In",
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
			name:"Temperature unit",
			category:"Analog In",
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
				"Celsius",
				1,
				"Fahrenheit",
				],
		},
		{
			name:"Input averaging filter",
			category:"Analog In",
			chan_unit:"",
			bitOffset:12,
			bitLen:4,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:4,
			defaultValue:0,
			enumValues:
				[
				0,
				"standard",
				1,
				"smooth",
				2,
				"fast",
				3,
				"off",
				],
		},
		{
			name:"Deactivate channel",
			category:"Analog In",
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
			name:"Deactivate diagnostics",
			category:"Analog In",
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
			name:"Mains suppression",
			category:"Analog In",
			chan_unit:"",
			bitOffset:0,
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
				"off",
				1,
				"50 Hz",
				2,
				"60 Hz",
				],
		},
		],
	max_size:48,
	},
	{
		sect_name:"Diag",
		num_elems:8,
		datapoints:
		[
		{
			name:"Upper limit value exceeded",
			category:"Analog In",
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
			name:"Lower limit value underrun",
			category:"Analog In",
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
			name:"Overflow",
			category:"Analog In",
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
			name:"Underflow",
			category:"Analog In",
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
			name:"Cold junction error",
			category:"Analog In",
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
			name:"Overcurrent (RTD only)",
			category:"Analog In",
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
			name:"Wire break",
			category:"Analog In",
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
			name:"Overcurrent supply VAUX1",
			category:"Analog In",
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
			category:"Analog In",
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
	mod_name:"Analog input diag",
	mod_id:0x1100000,
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
		num_elems:8,
		datapoints:
		[
		{
			name:"Upper limit value exceeded",
			category:"Diagnostic channel",
			chan_unit:"Channel",
			bitOffset:2,
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
			name:"Lower limit value underrun",
			category:"Diagnostic channel",
			chan_unit:"Channel",
			bitOffset:7,
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
			name:"Overflow",
			category:"Diagnostic channel",
			chan_unit:"Channel",
			bitOffset:5,
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
			name:"Underflow",
			category:"Diagnostic channel",
			chan_unit:"Channel",
			bitOffset:6,
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
			name:"Cold junction compensation wire break",
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
			name:"Overcurrent (RTD only)",
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
		{
			name:"Wire break",
			category:"Diagnostic channel",
			chan_unit:"Channel",
			bitOffset:4,
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
			name:"Overcurrent supply VAUX1",
			category:"Diagnostic channel",
			chan_unit:"Channel",
			bitOffset:3,
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
	max_size:39,
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
