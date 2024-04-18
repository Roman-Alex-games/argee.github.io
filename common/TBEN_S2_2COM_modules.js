var modules_TBEN_S2_2COM=
[{
	mod_name:"COM",
	mod_id:0x186282,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:14,
		datapoints:
		[
		{
			name:"Operation mode",
			category:"COM",
			chan_unit:"",
			bitOffset:0,
			bitLen:3,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:4,
			defaultValue:0,
			enumValues:
				[
				0,
				"RS485",
				1,
				"RS232",
				2,
				"MB-Client 485",
				3,
				"MB-Client 232",
				],
		},
		{
			name:"Swap A/B Line",
			category:"COM",
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
				"no",
				1,
				"yes",
				],
		},
		{
			name:"Data rate",
			category:"COM",
			chan_unit:"",
			bitOffset:4,
			bitLen:4,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:10,
			defaultValue:6,
			enumValues:
				[
				4,
				"2400 Bit/s",
				5,
				"4800 Bit/s",
				6,
				"9600 Bit/s",
				7,
				"14.4 kBit/s",
				8,
				"19.2 kBit/s",
				9,
				"28.8 kBit/s",
				10,
				"38.4 kBit/s",
				11,
				"57.6 kBit/s",
				12,
				"115.2 kBit/s",
				13,
				"230.4 kBit/s",
				],
		},
		{
			name:"Character format",
			category:"COM",
			chan_unit:"",
			bitOffset:8,
			bitLen:3,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:5,
			defaultValue:2,
			enumValues:
				[
				0,
				"7O",
				1,
				"7E",
				2,
				"8N",
				3,
				"8O",
				4,
				"8E",
				],
		},
		{
			name:"Stop bits",
			category:"COM",
			chan_unit:"",
			bitOffset:11,
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
				"1 bit",
				1,
				"2 bit",
				],
		},
		{
			name:"EOF detection",
			category:"COM",
			chan_unit:"",
			bitOffset:12,
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
				"character timeout",
				1,
				"1 end delimiter",
				2,
				"2 end delimiter",
				3,
				"framelength",
				],
		},
		{
			name:"Termination active",
			category:"COM",
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
				"yes",
				1,
				"no",
				],
		},
		{
			name:"Biasing active",
			category:"COM",
			chan_unit:"",
			bitOffset:15,
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
				"yes",
				1,
				"no",
				],
		},
		{
			name:"Power supply VAUX1",
			category:"COM",
			chan_unit:"",
			bitOffset:16,
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
				"0V(High-Z)",
				1,
				"V1(24VDC)",
				2,
				"+5VDC",
				],
		},
		{
			name:"Character timeout",
			category:"COM",
			chan_unit:"",
			bitOffset:32,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:100,
			enumValues:
				[
				],
		},
		{
			name:"Response timeout",
			category:"COM",
			chan_unit:"",
			bitOffset:48,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:2000,
			enumValues:
				[
				],
		},
		{
			name:"1st end delimiter",
			category:"COM",
			chan_unit:"",
			bitOffset:64,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:3,
			enumValues:
				[
				],
		},
		{
			name:"2nd end delimiter",
			category:"COM",
			chan_unit:"",
			bitOffset:72,
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
		{
			name:"MB-Server cycle time (*1ms)",
			category:"COM",
			chan_unit:"",
			bitOffset:80,
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
	max_size:96,
	},
	{
		sect_name:"Diag",
		num_elems:11,
		datapoints:
		[
		{
			name:"Hardware error",
			category:"COM",
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
			name:"Parameterization error",
			category:"COM",
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
			name:"Overcurrent supply VAUX1",
			category:"COM",
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
			name:"Error MB-Server 0",
			category:"COM",
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
				"-",
				1,
				"active",
				],
		},
		{
			name:"Error MB-Server 1",
			category:"COM",
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
			name:"Error MB-Server 2",
			category:"COM",
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
		{
			name:"Error MB-Server 3",
			category:"COM",
			chan_unit:"",
			bitOffset:11,
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
			name:"Error MB-Server 4",
			category:"COM",
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
				"-",
				1,
				"active",
				],
		},
		{
			name:"Error MB-Server 5",
			category:"COM",
			chan_unit:"",
			bitOffset:13,
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
			name:"Error MB-Server 6",
			category:"COM",
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
			name:"Error MB-Server 7",
			category:"COM",
			chan_unit:"",
			bitOffset:15,
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
	max_size:16,
	},
	{
		sect_name:"Input",
		num_elems:10,
		datapoints:
		[
		{
			name:"Transmitter ready",
			category:"COM",
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
				"off",
				1,
				"on",
				],
		},
		{
			name:"Receive complete",
			category:"COM",
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
				"off",
				1,
				"on",
				],
		},
		{
			name:"Frame error",
			category:"COM",
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
				"off",
				1,
				"on",
				],
		},
		{
			name:"parity/format error",
			category:"COM",
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
				"off",
				1,
				"on",
				],
		},
		{
			name:"Buffer overflow",
			category:"COM",
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
				"off",
				1,
				"on",
				],
		},
		{
			name:"Timeout",
			category:"COM",
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
				"off",
				1,
				"on",
				],
		},
		{
			name:"Invalid TX length",
			category:"COM",
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
				"off",
				1,
				"on",
				],
		},
		{
			name:"Invalid RX length",
			category:"COM",
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
				"off",
				1,
				"on",
				],
		},
		{
			name:"received frame length",
			category:"COM",
			chan_unit:"",
			bitOffset:16,
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
		{
			name:"MB-Server cycle time (*1ms)",
			category:"COM",
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
		sect_name:"Output",
		num_elems:4,
		datapoints:
		[
		{
			name:"transmit",
			category:"COM",
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
				"off",
				1,
				"on",
				],
		},
		{
			name:"receive",
			category:"COM",
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
				"off",
				1,
				"on",
				],
		},
		{
			name:"transmitter frame length",
			category:"COM",
			chan_unit:"",
			bitOffset:16,
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
		{
			name:"receiver frame length",
			category:"COM",
			chan_unit:"",
			bitOffset:32,
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
	max_size:40,
	},
	]
},
{
	mod_name:"RS Data/SCB",
	mod_id:0x410200,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:7,
		datapoints:
		[
		{
			name:"Server address",
			category:"SCB",
			chan_unit:"",
			bitOffset:0,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:0,
			enumLen:0,
			defaultValue:1,
			enumValues:
				[
				],
		},
		{
			name:"Number reg. read access",
			category:"SCB",
			chan_unit:"",
			bitOffset:8,
			bitLen:4,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:13,
			defaultValue:1,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				2,
				"2",
				3,
				"3",
				4,
				"4",
				5,
				"5",
				6,
				"6",
				7,
				"7",
				8,
				"8",
				9,
				"9",
				10,
				"10",
				11,
				"11",
				12,
				"12",
				],
		},
		{
			name:"Number reg. write access",
			category:"SCB",
			chan_unit:"",
			bitOffset:12,
			bitLen:4,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:13,
			defaultValue:1,
			enumValues:
				[
				0,
				"0",
				1,
				"1",
				2,
				"2",
				3,
				"3",
				4,
				"4",
				5,
				"5",
				6,
				"6",
				7,
				"7",
				8,
				"8",
				9,
				"9",
				10,
				"10",
				11,
				"11",
				12,
				"12",
				],
		},
		{
			name:"Read access",
			category:"SCB",
			chan_unit:"",
			bitOffset:16,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:17,
			defaultValue:0,
			enumValues:
				[
				0,
				"deactivated",
				3,
				"read holding registers (FC 3)",
				4,
				"read input register (FC 4)",
				23,
				"read/write multiple registers (FC 23)",
				128,
				"read extension",
				131,
				"multi server mode: read 1 holding register (FC 3)",
				132,
				"multi server mode: read 1 input register (FC 4)",
				151,
				"multi server mode: read/write 1 register (FC 23)",
				163,
				"multi server mode: read 2 holding registers (FC 3)",
				164,
				"multi server mode: read 2 input registers (FC 4)",
				183,
				"multi server mode: read/write 2 registers (FC 23)",
				195,
				"multi server mode: read 3 holding registers (FC 3)",
				196,
				"multi server mode: read 3 input registers (FC 4)",
				215,
				"multi server mode: read/write 3 registers (FC 23)",
				227,
				"multi server mode: read 4 holding registers (FC 3)",
				228,
				"multi server mode: read 4 input registers (FC 4)",
				247,
				"multi server mode: read/write 4 registers (FC 23)",
				],
		},
		{
			name:"Write access",
			category:"SCB",
			chan_unit:"",
			bitOffset:24,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
			dataType:1,
			enumLen:14,
			defaultValue:0,
			enumValues:
				[
				0,
				"deactivated",
				6,
				"write single register (FC 6)",
				16,
				"write multiple registers (FC 16)",
				23,
				"read/write multiple registers (FC 23)",
				128,
				"write extension",
				134,
				"Multi server mode: write single register (FC 6)",
				144,
				"Multi server mode: write 1 register (FC 16)",
				151,
				"Multi server mode: read/write 1 register (FC 23)",
				176,
				"Multi server mode: write 2 registers (FC 16)",
				183,
				"Multi server mode: read/write 2 registers (FC 23)",
				208,
				"Multi server mode: write 3 registers (FC 16)",
				215,
				"Multi server mode: read/write 3 registers (FC 23)",
				240,
				"Multi server mode: write 4 registers (FC 16)",
				247,
				"Multi server mode: read/write 4 registers (FC 23)",
				],
		},
		{
			name:"Start address for read access",
			category:"SCB",
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
			name:"Start address for write access",
			category:"SCB",
			chan_unit:"",
			bitOffset:48,
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
	max_size:64,
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
		num_elems:12,
		datapoints:
		[
		{
			name:"Input register 0",
			category:"SCB",
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
		{
			name:"Input register 1",
			category:"SCB",
			chan_unit:"",
			bitOffset:16,
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
			name:"Input register 2",
			category:"SCB",
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
			name:"Input register 3",
			category:"SCB",
			chan_unit:"",
			bitOffset:48,
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
			name:"Input register 4",
			category:"SCB",
			chan_unit:"",
			bitOffset:64,
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
			name:"Input register 5",
			category:"SCB",
			chan_unit:"",
			bitOffset:80,
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
			name:"Input register 6",
			category:"SCB",
			chan_unit:"",
			bitOffset:96,
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
			name:"Input register 7",
			category:"SCB",
			chan_unit:"",
			bitOffset:112,
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
			name:"Input register 8",
			category:"SCB",
			chan_unit:"",
			bitOffset:128,
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
			name:"Input register 9",
			category:"SCB",
			chan_unit:"",
			bitOffset:144,
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
			name:"Input register 10",
			category:"SCB",
			chan_unit:"",
			bitOffset:160,
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
			name:"Input register 11",
			category:"SCB",
			chan_unit:"",
			bitOffset:176,
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
	max_size:192,
	},
	{
		sect_name:"Output",
		num_elems:12,
		datapoints:
		[
		{
			name:"Output register 0",
			category:"SCB",
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
		{
			name:"Output register 1",
			category:"SCB",
			chan_unit:"",
			bitOffset:16,
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
			name:"Output register 2",
			category:"SCB",
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
			name:"Output register 3",
			category:"SCB",
			chan_unit:"",
			bitOffset:48,
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
			name:"Output register 4",
			category:"SCB",
			chan_unit:"",
			bitOffset:64,
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
			name:"Output register 5",
			category:"SCB",
			chan_unit:"",
			bitOffset:80,
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
			name:"Output register 6",
			category:"SCB",
			chan_unit:"",
			bitOffset:96,
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
			name:"Output register 7",
			category:"SCB",
			chan_unit:"",
			bitOffset:112,
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
			name:"Output register 8",
			category:"SCB",
			chan_unit:"",
			bitOffset:128,
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
			name:"Output register 9",
			category:"SCB",
			chan_unit:"",
			bitOffset:144,
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
			name:"Output register 10",
			category:"SCB",
			chan_unit:"",
			bitOffset:160,
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
			name:"Output register 11",
			category:"SCB",
			chan_unit:"",
			bitOffset:176,
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
	max_size:192,
	},
	]
},
{
	mod_name:"MB-Server Timing",
	mod_id:0x1480000,
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
			name:"COM  MB-Server Timing (*1ms) 0",
			category:"COM",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:16,
			bitIncremental:128,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"COM  MB-Server Timing (*1ms) 1",
			category:"COM",
			chan_unit:"Channel",
			bitOffset:16,
			bitLen:16,
			bitIncremental:128,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"COM  MB-Server Timing (*1ms) 2",
			category:"COM",
			chan_unit:"Channel",
			bitOffset:32,
			bitLen:16,
			bitIncremental:128,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"COM  MB-Server Timing (*1ms) 3",
			category:"COM",
			chan_unit:"Channel",
			bitOffset:48,
			bitLen:16,
			bitIncremental:128,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"COM  MB-Server Timing (*1ms) 4",
			category:"COM",
			chan_unit:"Channel",
			bitOffset:64,
			bitLen:16,
			bitIncremental:128,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"COM  MB-Server Timing (*1ms) 5",
			category:"COM",
			chan_unit:"Channel",
			bitOffset:80,
			bitLen:16,
			bitIncremental:128,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"COM  MB-Server Timing (*1ms) 6",
			category:"COM",
			chan_unit:"Channel",
			bitOffset:96,
			bitLen:16,
			bitIncremental:128,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		{
			name:"COM  MB-Server Timing (*1ms) 7",
			category:"COM",
			chan_unit:"Channel",
			bitOffset:112,
			bitLen:16,
			bitIncremental:128,
			channelNumStart:0,
			channelNumEnd:1,
			dataType:0,
			enumLen:0,
			defaultValue:0,
			enumValues:
				[
				],
		},
		],
	max_size:368,
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
	mod_name:"MB-Server Status",
	mod_id:0x4480000,
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
		num_elems:14,
		datapoints:
		[
		{
			name:"exception code",
			category:"COM 0 MB-Server Status",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:4,
			bitIncremental:16,
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
			name:"read error",
			category:"COM 0 MB-Server Status",
			chan_unit:"Channel",
			bitOffset:4,
			bitLen:1,
			bitIncremental:16,
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
		{
			name:"write error",
			category:"COM 0 MB-Server Status",
			chan_unit:"Channel",
			bitOffset:5,
			bitLen:1,
			bitIncremental:16,
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
		{
			name:"parity/format error",
			category:"COM 0 MB-Server Status",
			chan_unit:"Channel",
			bitOffset:6,
			bitLen:1,
			bitIncremental:16,
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
		{
			name:"MODBUS timeout",
			category:"COM 0 MB-Server Status",
			chan_unit:"Channel",
			bitOffset:7,
			bitLen:1,
			bitIncremental:16,
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
		{
			name:"Valid read config.",
			category:"COM 0 MB-Server Status",
			chan_unit:"Channel",
			bitOffset:12,
			bitLen:1,
			bitIncremental:16,
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
		{
			name:"Valid write conig.",
			category:"COM 0 MB-Server Status",
			chan_unit:"Channel",
			bitOffset:13,
			bitLen:1,
			bitIncremental:16,
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
		{
			name:"exception code",
			category:"COM 1 MB-Server Status",
			chan_unit:"Channel",
			bitOffset:128,
			bitLen:4,
			bitIncremental:16,
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
			name:"read error",
			category:"COM 1 MB-Server Status",
			chan_unit:"Channel",
			bitOffset:132,
			bitLen:1,
			bitIncremental:16,
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
		{
			name:"write error",
			category:"COM 1 MB-Server Status",
			chan_unit:"Channel",
			bitOffset:133,
			bitLen:1,
			bitIncremental:16,
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
		{
			name:"parity/format error",
			category:"COM 1 MB-Server Status",
			chan_unit:"Channel",
			bitOffset:134,
			bitLen:1,
			bitIncremental:16,
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
		{
			name:"MODBUS timeout",
			category:"COM 1 MB-Server Status",
			chan_unit:"Channel",
			bitOffset:135,
			bitLen:1,
			bitIncremental:16,
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
		{
			name:"Valid read config.",
			category:"COM 1 MB-Server Status",
			chan_unit:"Channel",
			bitOffset:140,
			bitLen:1,
			bitIncremental:16,
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
		{
			name:"Valid write conig.",
			category:"COM 1 MB-Server Status",
			chan_unit:"Channel",
			bitOffset:141,
			bitLen:1,
			bitIncremental:16,
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
	max_size:269,
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
	mod_name:"COM diagnostics",
	mod_id:0x3100000,
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
		num_elems:11,
		datapoints:
		[
		{
			name:"Hardware error",
			category:"COM",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:1,
			channelNumEnd:2,
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
			name:"Parameterization error",
			category:"COM",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:1,
			channelNumEnd:2,
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
			category:"COM",
			chan_unit:"Channel",
			bitOffset:7,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:1,
			channelNumEnd:2,
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
			name:"Error MB-Server 0",
			category:"COM",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:1,
			channelNumEnd:2,
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
			name:"Error MB-Server 1",
			category:"COM",
			chan_unit:"Channel",
			bitOffset:9,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:1,
			channelNumEnd:2,
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
			name:"Error MB-Server 2",
			category:"COM",
			chan_unit:"Channel",
			bitOffset:10,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:1,
			channelNumEnd:2,
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
			name:"Error MB-Server 3",
			category:"COM",
			chan_unit:"Channel",
			bitOffset:11,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:1,
			channelNumEnd:2,
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
			name:"Error MB-Server 4",
			category:"COM",
			chan_unit:"Channel",
			bitOffset:12,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:1,
			channelNumEnd:2,
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
			name:"Error MB-Server 5",
			category:"COM",
			chan_unit:"Channel",
			bitOffset:13,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:1,
			channelNumEnd:2,
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
			name:"Error MB-Server 6",
			category:"COM",
			chan_unit:"Channel",
			bitOffset:14,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:1,
			channelNumEnd:2,
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
			name:"Error MB-Server 7",
			category:"COM",
			chan_unit:"Channel",
			bitOffset:15,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:1,
			channelNumEnd:2,
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
	max_size:47,
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
	mod_name:"DXP",
	mod_id:0x82082,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:2,
		datapoints:
		[
		{
			name:"Manual reset after overcurr.",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:4,
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
		{
			name:"Activate output",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:12,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:4,
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
		],
	max_size:16,
	},
	{
		sect_name:"Diag",
		num_elems:1,
		datapoints:
		[
		{
			name:"Input value",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:12,
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
				"off",
				1,
				"on",
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
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:4,
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
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:4,
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
	max_size:8,
	},
	]
},
{
	mod_name:"DXP diagnostics",
	mod_id:0x3080000,
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
			name:"Overcurrent VAUX2 CH4/5",
			category:"DXP",
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
			name:"Overcurrent VAUX2 CH6/7",
			category:"DXP",
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
			name:"Output overcurrent",
			category:"DXP",
			chan_unit:"Channel",
			bitOffset:12,
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
	mod_name:"Ext. DXP functions",
	mod_id:0x80,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:3,
		datapoints:
		[
		{
			name:"extended digital mode",
			category:"DXP extended",
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
			category:"DXP extended",
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
			category:"DXP extended",
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
];