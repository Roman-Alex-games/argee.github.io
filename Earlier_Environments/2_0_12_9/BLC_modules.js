var modules_BLC=
[{
	mod_name:"BLC-1RS232",
	mod_id:0x1479900,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:9,
		datapoints:
		[
		{
			name:"Data rate",
			category:"RS232",
			chan_unit:"",
			bitOffset:0,
			bitLen:4,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Extended status/control mode",
			category:"RS232",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Deactivate diagnostics",
			category:"RS232",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Stop bits",
			category:"RS232",
			chan_unit:"",
			bitOffset:8,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"XON character",
			category:"RS232",
			chan_unit:"",
			bitOffset:16,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"XOFF character",
			category:"RS232",
			chan_unit:"",
			bitOffset:24,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Parity bit",
			category:"RS232",
			chan_unit:"",
			bitOffset:9,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Data bits",
			category:"RS232",
			chan_unit:"",
			bitOffset:11,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Data flow control",
			category:"RS232",
			chan_unit:"",
			bitOffset:12,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		]
	},
	{
		sect_name:"Diag",
		num_elems:5,
		datapoints:
		[
		{
			name:"Parameterization error",
			category:"RS232",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Hardware failure",
			category:"RS232",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Data flow control error",
			category:"RS232",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Frame error",
			category:"RS232",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Buffer overflow",
			category:"RS232",
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
		num_elems:8,
		datapoints:
		[
		{
			name:"Status byte",
			category:"RS232",
			chan_unit:"",
			bitOffset:0,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"In1 / Diagnostic byte",
			category:"RS232",
			chan_unit:"",
			bitOffset:8,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"In2",
			category:"RS232",
			chan_unit:"",
			bitOffset:16,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"In3",
			category:"RS232",
			chan_unit:"",
			bitOffset:24,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"In4",
			category:"RS232",
			chan_unit:"",
			bitOffset:32,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"In5",
			category:"RS232",
			chan_unit:"",
			bitOffset:40,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"In6",
			category:"RS232",
			chan_unit:"",
			bitOffset:48,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"In7",
			category:"RS232",
			chan_unit:"",
			bitOffset:56,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		]
	},
	{
		sect_name:"Output",
		num_elems:8,
		datapoints:
		[
		{
			name:"Control byte",
			category:"RS232",
			chan_unit:"",
			bitOffset:0,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Out1 /ext. control byte",
			category:"RS232",
			chan_unit:"",
			bitOffset:8,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Out2",
			category:"RS232",
			chan_unit:"",
			bitOffset:16,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Out3",
			category:"RS232",
			chan_unit:"",
			bitOffset:24,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Out4",
			category:"RS232",
			chan_unit:"",
			bitOffset:32,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Out5",
			category:"RS232",
			chan_unit:"",
			bitOffset:40,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Out6",
			category:"RS232",
			chan_unit:"",
			bitOffset:48,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Out7",
			category:"RS232",
			chan_unit:"",
			bitOffset:56,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		]
	},
	]
},
{
	mod_name:"BLC-1RS485/422",
	mod_id:0x2479900,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:10,
		datapoints:
		[
		{
			name:"Data rate",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:0,
			bitLen:4,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Extended status/control mode",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Deactivate diagnostics",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Stop bits",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:8,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"XON character",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:16,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"XOFF character",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:24,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Parity bit",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:9,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Data bits",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:11,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Data flow control",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:12,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"RS422/RS485",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		]
	},
	{
		sect_name:"Diag",
		num_elems:5,
		datapoints:
		[
		{
			name:"Parameterization error",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Hardware failure",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Data flow control error",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Frame error",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Buffer overflow",
			category:"RS485/422",
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
		num_elems:8,
		datapoints:
		[
		{
			name:"Status byte",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:0,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"In1 / Diagnostic byte",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:8,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"In2",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:16,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"In3",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:24,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"In4",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:32,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"In5",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:40,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"In6",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:48,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"In7",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:56,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		]
	},
	{
		sect_name:"Output",
		num_elems:8,
		datapoints:
		[
		{
			name:"Control byte",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:0,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Out1 /ext. control byte",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:8,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Out2",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:16,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Out3",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:24,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Out4",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:32,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Out5",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:40,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Out6",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:48,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Out7",
			category:"RS485/422",
			chan_unit:"",
			bitOffset:56,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		]
	},
	]
},
{
	mod_name:"BLC-1SSI",
	mod_id:0x4479900,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:6,
		datapoints:
		[
		{
			name:"Sensor idle data signal test",
			category:"SSI",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Invalid bits (LSB)",
			category:"SSI",
			chan_unit:"",
			bitOffset:8,
			bitLen:4,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Invalid bits (MSB)",
			category:"SSI",
			chan_unit:"",
			bitOffset:12,
			bitLen:3,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Data rate",
			category:"SSI",
			chan_unit:"",
			bitOffset:16,
			bitLen:4,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Data frame bits",
			category:"SSI",
			chan_unit:"",
			bitOffset:24,
			bitLen:6,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Data format",
			category:"SSI",
			chan_unit:"",
			bitOffset:31,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		]
	},
	{
		sect_name:"Diag",
		num_elems:5,
		datapoints:
		[
		{
			name:"SSI group diagnostics",
			category:"SSI",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Wire break",
			category:"SSI",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Overflow",
			category:"SSI",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Underflow",
			category:"SSI",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Configuration error",
			category:"SSI",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		]
	},
	{
		sect_name:"Input",
		num_elems:24,
		datapoints:
		[
		{
			name:"ERR_SSI",
			category:"SSI",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"STS_OFLW",
			category:"SSI",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"STS_UFLW",
			category:"SSI",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"ERR_PARA",
			category:"SSI",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"STS_STOP",
			category:"SSI",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"STS_CMP1",
			category:"SSI",
			chan_unit:"",
			bitOffset:8,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"FLAG_CMP1",
			category:"SSI",
			chan_unit:"",
			bitOffset:9,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"REL_CMP1",
			category:"SSI",
			chan_unit:"",
			bitOffset:10,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"STS_CMP2",
			category:"SSI",
			chan_unit:"",
			bitOffset:11,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"FLAG_CMP2",
			category:"SSI",
			chan_unit:"",
			bitOffset:12,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"REL_CMP2",
			category:"SSI",
			chan_unit:"",
			bitOffset:13,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"STS_DN",
			category:"SSI",
			chan_unit:"",
			bitOffset:14,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"STS_UP",
			category:"SSI",
			chan_unit:"",
			bitOffset:15,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"SSI_DIAG1",
			category:"SSI",
			chan_unit:"",
			bitOffset:16,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"SSI_DIAG2",
			category:"SSI",
			chan_unit:"",
			bitOffset:17,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"SSI_DIAG3",
			category:"SSI",
			chan_unit:"",
			bitOffset:18,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"SSI_DIAG4",
			category:"SSI",
			chan_unit:"",
			bitOffset:19,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"REG_WR_AKN",
			category:"SSI",
			chan_unit:"",
			bitOffset:22,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"REG_WR_ACEPT",
			category:"SSI",
			chan_unit:"",
			bitOffset:23,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"REG_RD status byte",
			category:"SSI",
			chan_unit:"",
			bitOffset:24,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"REG_RD_DATA 0",
			category:"SSI",
			chan_unit:"",
			bitOffset:32,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"REG_RD_DATA 1",
			category:"SSI",
			chan_unit:"",
			bitOffset:40,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"REG_RD_DATA 2",
			category:"SSI",
			chan_unit:"",
			bitOffset:48,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"REG_RD_DATA 3",
			category:"SSI",
			chan_unit:"",
			bitOffset:56,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		]
	},
	{
		sect_name:"Output",
		num_elems:11,
		datapoints:
		[
		{
			name:"STOP",
			category:"SSI",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"EN_CMP1",
			category:"SSI",
			chan_unit:"",
			bitOffset:8,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"CLR_CMP1",
			category:"SSI",
			chan_unit:"",
			bitOffset:9,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"EN_CMP2",
			category:"SSI",
			chan_unit:"",
			bitOffset:11,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"CLR_CMP2",
			category:"SSI",
			chan_unit:"",
			bitOffset:12,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"REG_WR control byte",
			category:"SSI",
			chan_unit:"",
			bitOffset:16,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"REG_RD control byte",
			category:"SSI",
			chan_unit:"",
			bitOffset:24,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"REG_WR_DATA 0",
			category:"SSI",
			chan_unit:"",
			bitOffset:32,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"REG_WR_DATA 1",
			category:"SSI",
			chan_unit:"",
			bitOffset:40,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"REG_WR_DATA 2",
			category:"SSI",
			chan_unit:"",
			bitOffset:48,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"REG_WR_DATA 3",
			category:"SSI",
			chan_unit:"",
			bitOffset:56,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		]
	},
	]
},
{
	mod_name:"BLC-4DI4DO-PD",
	mod_id:0x1563300,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:3,
		datapoints:
		[
		{
			name:"Activate input filter",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Invert digital input",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Manual reset after overcurr.",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:16,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:4,
			channelNumEnd:7,
		},
		]
	},
	{
		sect_name:"Diag",
		num_elems:2,
		datapoints:
		[
		{
			name:"Sensor supply overcurrent",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Output signal overcurrent",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:4,
			channelNumEnd:7,
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
			channelNumStart:0,
			channelNumEnd:3,
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
			channelNumStart:4,
			channelNumEnd:7,
		},
		]
	},
	]
},
{
	mod_name:"BLC-4DI-PD",
	mod_id:0x1563000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:3,
		datapoints:
		[
		{
			name:"Activate input filter",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Invert digital input",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Activate wire break monit. gr.",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:16,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:1,
		},
		]
	},
	{
		sect_name:"Diag",
		num_elems:2,
		datapoints:
		[
		{
			name:"Sensor supply overcurrent",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Wire break",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:1,
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
			channelNumStart:0,
			channelNumEnd:3,
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
	mod_name:"BLC-8DI-PD",
	mod_id:0x1564000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:3,
		datapoints:
		[
		{
			name:"Activate input filter",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
		},
		{
			name:"Invert digital input",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
		},
		{
			name:"Activate wire break monit. gr.",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:16,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
		},
		]
	},
	{
		sect_name:"Diag",
		num_elems:2,
		datapoints:
		[
		{
			name:"Sensor supply overcurrent",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
		},
		{
			name:"Wire break",
			category:"Digital In",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
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
			channelNumStart:0,
			channelNumEnd:7,
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
	mod_name:"BLC-8XSG-PD",
	mod_id:0x1574400,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:4,
		datapoints:
		[
		{
			name:"Activate input filter",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
		},
		{
			name:"Invert digital input",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
		},
		{
			name:"Manual reset after overcurr.",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:16,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
		},
		{
			name:"Activate output",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:24,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
		},
		]
	},
	{
		sect_name:"Diag",
		num_elems:2,
		datapoints:
		[
		{
			name:"Sensor supply overcurrent",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
		},
		{
			name:"Output signal overcurrent",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
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
			channelNumStart:0,
			channelNumEnd:7,
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
			channelNumStart:0,
			channelNumEnd:7,
		},
		]
	},
	]
},
{
	mod_name:"BLC-2RFID-A",
	mod_id:0x1797700,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:6,
		datapoints:
		[
		{
			name:"Operation mode",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:22,
			bitLen:2,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"UHF frequency band",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:20,
			bitLen:2,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"UHF transmission power level",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:3,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Tag type",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:32,
			bitLen:7,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Bypass time",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:40,
			bitLen:8,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Parameter set",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:7,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
		},
		]
	},
	{
		sect_name:"Diag",
		num_elems:5,
		datapoints:
		[
		{
			name:"Overcurrent",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:2,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Transc. param. not supported",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:5,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Module parameter invalid",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:6,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Hardware failure transceiver",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Transc. power supply error",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:11,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
		},
		]
	},
	{
		sect_name:"Input",
		num_elems:2,
		datapoints:
		[
		{
			name:"Read data 0",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:8,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Read data 1",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:8,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
		},
		]
	},
	{
		sect_name:"Output",
		num_elems:2,
		datapoints:
		[
		{
			name:"Read data 0",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:8,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Read data 1",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:8,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
		},
		]
	},
	]
},
{
	mod_name:"BLC-2RFID-C",
	mod_id:0x179DD00,
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
		num_elems:3,
		datapoints:
		[
		{
			name:"Ident current overload",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:2,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Transceiver hardware error",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Transc. power supply error",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:11,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
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
		num_elems:0,
		datapoints:
		[
		]
	},
	]
},
{
	mod_name:"BLC-2RFID-S",
	mod_id:0x2179CC00,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:7,
		datapoints:
		[
		{
			name:"Operation mode",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:22,
			bitLen:2,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"UHF frequency band",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:20,
			bitLen:2,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"UHF transmission power level",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:3,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Tag type",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:32,
			bitLen:7,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Bypass time",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:40,
			bitLen:8,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Data alignment",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:39,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Parameter set",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:7,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
		},
		]
	},
	{
		sect_name:"Diag",
		num_elems:5,
		datapoints:
		[
		{
			name:"Overcurrent",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:2,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Transc. param. not supported",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:5,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Module parameter invalid",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:6,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Hardware failure transceiver",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Transc. power supply error",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:11,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
		},
		]
	},
	{
		sect_name:"Input",
		num_elems:19,
		datapoints:
		[
		{
			name:"XCVR_DETUNED",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"TFR",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"TP",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:2,
			bitLen:1,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"XCVR_ON",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:3,
			bitLen:1,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"XCVR_CON",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:4,
			bitLen:1,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Error",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:5,
			bitLen:1,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Busy",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:6,
			bitLen:1,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Done",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:7,
			bitLen:1,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Error code 0",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:8,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Error code 1",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:16,
			bitLen:8,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Error code 2",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:24,
			bitLen:8,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Read data 0",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:32,
			bitLen:8,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Read data 1",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:40,
			bitLen:8,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Read data 2",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:48,
			bitLen:8,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Read data 3",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:56,
			bitLen:8,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Read data 4",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:64,
			bitLen:8,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Read data 5",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:72,
			bitLen:8,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Read data 6",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:80,
			bitLen:8,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Read data 7",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:88,
			bitLen:8,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
		},
		]
	},
	{
		sect_name:"Output",
		num_elems:19,
		datapoints:
		[
		{
			name:"Reset",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"XCVR Info",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"TAG Info",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:2,
			bitLen:1,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Write",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:3,
			bitLen:1,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Read",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:4,
			bitLen:1,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"TAG ID",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:5,
			bitLen:1,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Next",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:6,
			bitLen:1,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"XCVR",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:7,
			bitLen:1,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Byte count",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:3,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Domain",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:12,
			bitLen:2,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Address",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:16,
			bitLen:16,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Write data 0",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:32,
			bitLen:8,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Write data 1",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:40,
			bitLen:8,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Write data 2",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:48,
			bitLen:8,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Write data 3",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:56,
			bitLen:8,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Write data 4",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:64,
			bitLen:8,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Write data 5",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:72,
			bitLen:8,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Write data 6",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:80,
			bitLen:8,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Write data 7",
			category:"RFID channel",
			chan_unit:"Channel",
			bitOffset:88,
			bitLen:8,
			bitIncremental:96,
			channelNumStart:0,
			channelNumEnd:1,
		},
		]
	},
	]
},
{
	mod_name:"BLC-8XSG-P",
	mod_id:0x2574400,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:4,
		datapoints:
		[
		{
			name:"Activate input filter",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
		},
		{
			name:"Invert digital input",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
		},
		{
			name:"Manual reset after overcurr.",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:16,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
		},
		{
			name:"Activate output",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:24,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
		},
		]
	},
	{
		sect_name:"Diag",
		num_elems:1,
		datapoints:
		[
		{
			name:"Output signal overcurrent",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
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
			channelNumStart:0,
			channelNumEnd:7,
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
			channelNumStart:0,
			channelNumEnd:7,
		},
		]
	},
	]
},
{
	mod_name:"BLC-1CNT/ENC",
	mod_id:0x19BA900,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:17,
		datapoints:
		[
		{
			name:"Invert input A",
			category:"Counter",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Invert input B",
			category:"Counter",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Invert input Z",
			category:"Counter",
			chan_unit:"",
			bitOffset:15,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Count direction",
			category:"Counter",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Signal evaluation (A,B)",
			category:"Counter",
			chan_unit:"",
			bitOffset:2,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Input filter (A,B)",
			category:"Counter",
			chan_unit:"",
			bitOffset:0,
			bitLen:2,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Encoder signal",
			category:"Counter",
			chan_unit:"",
			bitOffset:11,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Synchronization with Z",
			category:"Counter",
			chan_unit:"",
			bitOffset:13,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Function DO3",
			category:"Counter",
			chan_unit:"",
			bitOffset:10,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Function DI3",
			category:"Counter",
			chan_unit:"",
			bitOffset:9,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"PullUp Z",
			category:"Counter",
			chan_unit:"",
			bitOffset:8,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Measurement mode",
			category:"Counter",
			chan_unit:"",
			bitOffset:29,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Count mode",
			category:"Counter",
			chan_unit:"",
			bitOffset:28,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Invert Gate",
			category:"Counter",
			chan_unit:"",
			bitOffset:27,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Gate function",
			category:"Counter",
			chan_unit:"",
			bitOffset:24,
			bitLen:3,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Threshold input A, B, Z",
			category:"Counter",
			chan_unit:"",
			bitOffset:16,
			bitLen:4,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"REG_AUX_ADR",
			category:"Counter",
			chan_unit:"",
			bitOffset:112,
			bitLen:7,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		]
	},
	{
		sect_name:"Diag",
		num_elems:7,
		datapoints:
		[
		{
			name:"Overflow occurred",
			category:"Counter",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Underflow occurred",
			category:"Counter",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Faulty/inconsistent param.",
			category:"Counter",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Overload DO 0",
			category:"Counter",
			chan_unit:"",
			bitOffset:8,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Overload DO 1",
			category:"Counter",
			chan_unit:"",
			bitOffset:9,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Overload DO 2",
			category:"Counter",
			chan_unit:"",
			bitOffset:10,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Overload DO 3",
			category:"Counter",
			chan_unit:"",
			bitOffset:11,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		]
	},
	{
		sect_name:"Input",
		num_elems:19,
		datapoints:
		[
		{
			name:"Digital In 0",
			category:"Counter",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Digital In 1",
			category:"Counter",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Digital In 2",
			category:"Counter",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Digital In 3",
			category:"Counter",
			chan_unit:"",
			bitOffset:3,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Input Z",
			category:"Counter",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Input B",
			category:"Counter",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Input A",
			category:"Counter",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Count direction",
			category:"Counter",
			chan_unit:"",
			bitOffset:8,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"SYNC_AKN",
			category:"Counter",
			chan_unit:"",
			bitOffset:14,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"ERR_PARA",
			category:"Counter",
			chan_unit:"",
			bitOffset:15,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"STS_UFLW",
			category:"Counter",
			chan_unit:"",
			bitOffset:16,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"STS_OFLW",
			category:"Counter",
			chan_unit:"",
			bitOffset:17,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"STS_ZC",
			category:"Counter",
			chan_unit:"",
			bitOffset:18,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"REG_WR_AKN",
			category:"Counter",
			chan_unit:"",
			bitOffset:22,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"REG_WR_ACEPT",
			category:"Counter",
			chan_unit:"",
			bitOffset:23,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"REG_ACT_RD_ADR",
			category:"Counter",
			chan_unit:"",
			bitOffset:24,
			bitLen:7,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"REG_RD_ABORT",
			category:"Counter",
			chan_unit:"",
			bitOffset:31,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"REG_RD_DATA",
			category:"Counter",
			chan_unit:"",
			bitOffset:32,
			bitLen:32,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"AUX_RD_DATA",
			category:"Counter",
			chan_unit:"",
			bitOffset:64,
			bitLen:32,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		]
	},
	{
		sect_name:"Output",
		num_elems:11,
		datapoints:
		[
		{
			name:"Gate",
			category:"Counter",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Digital Out 0",
			category:"Counter",
			chan_unit:"",
			bitOffset:4,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Digital Out 1",
			category:"Counter",
			chan_unit:"",
			bitOffset:5,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Digital Out 2",
			category:"Counter",
			chan_unit:"",
			bitOffset:6,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Digital Out 3",
			category:"Counter",
			chan_unit:"",
			bitOffset:7,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"RES_STS",
			category:"Counter",
			chan_unit:"",
			bitOffset:8,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"SYNC_REQ",
			category:"Counter",
			chan_unit:"",
			bitOffset:14,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"REG_WR_ADR",
			category:"Counter",
			chan_unit:"",
			bitOffset:16,
			bitLen:7,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"REG_WR",
			category:"Counter",
			chan_unit:"",
			bitOffset:23,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"REG_RD_ADR",
			category:"Counter",
			chan_unit:"",
			bitOffset:24,
			bitLen:7,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"REG_WR_DATA",
			category:"Counter",
			chan_unit:"",
			bitOffset:32,
			bitLen:32,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		]
	},
	]
},
{
	mod_name:"BLC-4AI4AO-V/I",
	mod_id:0x419B9900,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:8,
		datapoints:
		[
		{
			name:"Operation mode",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:4,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Data format",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:4,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Deactivate diagnostics",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:5,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Operation mode",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:4,
			bitIncremental:32,
			channelNumStart:4,
			channelNumEnd:7,
		},
		{
			name:"Data format",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:12,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:4,
			channelNumEnd:7,
		},
		{
			name:"Deactivate diagnostics",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:13,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:4,
			channelNumEnd:7,
		},
		{
			name:"Output on module bus error",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:14,
			bitLen:2,
			bitIncremental:32,
			channelNumStart:4,
			channelNumEnd:7,
		},
		{
			name:"Substitute value",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:16,
			bitLen:16,
			bitIncremental:32,
			channelNumStart:4,
			channelNumEnd:7,
		},
		]
	},
	{
		sect_name:"Diag",
		num_elems:7,
		datapoints:
		[
		{
			name:"Measured value out of range",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Wire break (4-20 mA only)",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Over-/underflow (NE43 only)",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:3,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Hardware failure",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:7,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Output value out of range",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:4,
			channelNumEnd:7,
		},
		{
			name:"Over-/underflow (NE43 only)",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:11,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:4,
			channelNumEnd:7,
		},
		{
			name:"Hardware failure",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:15,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:4,
			channelNumEnd:7,
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
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:16,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
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
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:16,
			bitIncremental:16,
			channelNumStart:4,
			channelNumEnd:7,
		},
		]
	},
	]
},
{
	mod_name:"BLC-4AO-V",
	mod_id:0x427A0900,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:5,
		datapoints:
		[
		{
			name:"Operation mode",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:4,
			bitIncremental:24,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Data format",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:4,
			bitLen:1,
			bitIncremental:24,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Deactivate diagnostics",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:5,
			bitLen:1,
			bitIncremental:24,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Output on module bus error",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:6,
			bitLen:2,
			bitIncremental:24,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Substitute value",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:16,
			bitIncremental:24,
			channelNumStart:0,
			channelNumEnd:3,
		},
		]
	},
	{
		sect_name:"Diag",
		num_elems:3,
		datapoints:
		[
		{
			name:"Output value out of range",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Over-/underflow (NE43 only)",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:3,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Hardware failure",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:7,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:3,
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
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:16,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
		},
		]
	},
	]
},
{
	mod_name:"BLC-2AI2AO-V/I",
	mod_id:0x21797700,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:8,
		datapoints:
		[
		{
			name:"Operation mode",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:4,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Data format",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:4,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Deactivate diagnostics",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:5,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Operation mode",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:4,
			bitIncremental:32,
			channelNumStart:2,
			channelNumEnd:3,
		},
		{
			name:"Data format",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:12,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:2,
			channelNumEnd:3,
		},
		{
			name:"Deactivate diagnostics",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:13,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:2,
			channelNumEnd:3,
		},
		{
			name:"Output on module bus error",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:14,
			bitLen:2,
			bitIncremental:32,
			channelNumStart:2,
			channelNumEnd:3,
		},
		{
			name:"Substitute value",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:16,
			bitLen:16,
			bitIncremental:32,
			channelNumStart:2,
			channelNumEnd:3,
		},
		]
	},
	{
		sect_name:"Diag",
		num_elems:7,
		datapoints:
		[
		{
			name:"Measured value out of range",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Wire break (4-20 mA only)",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Over-/underflow (NE43 only)",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:3,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Hardware failure",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:7,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Output value out of range",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:2,
			channelNumEnd:3,
		},
		{
			name:"Over-/underflow (NE43 only)",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:11,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:2,
			channelNumEnd:3,
		},
		{
			name:"Hardware failure",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:15,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:2,
			channelNumEnd:3,
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
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:16,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
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
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:16,
			bitIncremental:16,
			channelNumStart:2,
			channelNumEnd:3,
		},
		]
	},
	]
},
{
	mod_name:"BLC-4AI-TC",
	mod_id:0x42779000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:4,
		datapoints:
		[
		{
			name:"Data format",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Deactivate diagnostics",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:2,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Deactivate channel",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:3,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Thermocouple type",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:4,
			bitLen:4,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:3,
		},
		]
	},
	{
		sect_name:"Diag",
		num_elems:5,
		datapoints:
		[
		{
			name:"Measured value out of range",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Thermocouple wire break",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Cold junction compensation wire break",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:2,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Common mode voltage out of range",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:3,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Hardware failure",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:7,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:3,
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
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:16,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
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
	mod_name:"BLC-2RS485-A",
	mod_id:0x217A9700,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:11,
		datapoints:
		[
		{
			name:"Data rate",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:4,
			bitIncremental:48,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Deactivate diagnostics",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:7,
			bitLen:1,
			bitIncremental:48,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Timeout",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:16,
			bitLen:8,
			bitIncremental:48,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Stop bits",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:48,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Parity bit",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:9,
			bitLen:2,
			bitIncremental:48,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Substitute char parity error",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:11,
			bitLen:1,
			bitIncremental:48,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Transmit buffer",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:12,
			bitLen:2,
			bitIncremental:48,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Error frame buffering",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:14,
			bitLen:2,
			bitIncremental:48,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Start string",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:24,
			bitLen:4,
			bitIncremental:48,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Stop string",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:28,
			bitLen:4,
			bitIncremental:48,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Frame lenght",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:32,
			bitLen:16,
			bitIncremental:48,
			channelNumStart:0,
			channelNumEnd:1,
		},
		]
	},
	{
		sect_name:"Diag",
		num_elems:7,
		datapoints:
		[
		{
			name:"Overcurrent",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Parity error",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Timeout",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:2,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Tx buffer overflow",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:3,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Rx buffer overflow",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:4,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Invalid parameter",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:6,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Hardware failure",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:7,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
		},
		]
	},
	{
		sect_name:"Input",
		num_elems:15,
		datapoints:
		[
		{
			name:"Timeout detected",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Def. no. of rec characters reached",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Stop string received",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:2,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"New diag. message available",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:3,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Flush Rx buffer acknowledge",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:5,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Flush Tx buffer acknowledge",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:6,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Channel reset acknowledge",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:7,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Acyclic parameter set activ.",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Busy",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:9,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Upper Tx buffer position reached",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:10,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Lower Tx buffer position reached",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:11,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Upper Rx buffer position reached",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:12,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Lower Rx buffer position reached",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:13,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Tx buffer empty",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:14,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Rx buffer empty",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:15,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:1,
		},
		]
	},
	{
		sect_name:"Output",
		num_elems:5,
		datapoints:
		[
		{
			name:"Resend last frame",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:3,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Send Tx buffer",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:4,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Flush Rx buffer",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:5,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Flush Tx buffer",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:6,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Channel reset",
			category:"RS485 channel",
			chan_unit:"Channel",
			bitOffset:7,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
		},
		]
	},
	]
},
{
	mod_name:"BLC-4DI-N",
	mod_id:0x42003000,
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
		num_elems:0,
		datapoints:
		[
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
			channelNumStart:0,
			channelNumEnd:3,
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
	mod_name:"BLC-8DI-N",
	mod_id:0x62004000,
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
		num_elems:0,
		datapoints:
		[
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
			channelNumStart:0,
			channelNumEnd:7,
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
	mod_name:"BLC-4DO-2A-N",
	mod_id:0x44300300,
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
		num_elems:1,
		datapoints:
		[
		{
			name:"Overcurrent",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
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
			channelNumStart:0,
			channelNumEnd:3,
		},
		]
	},
	]
},
{
	mod_name:"BLC-4AI-V/I",
	mod_id:0x41779000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:6,
		datapoints:
		[
		{
			name:"Measurement range",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Data format",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Deactivate diagnostics",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:2,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Deactivate channel",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:3,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Operation mode",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:4,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Data representation",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:5,
			bitLen:2,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:3,
		},
		]
	},
	{
		sect_name:"Diag",
		num_elems:2,
		datapoints:
		[
		{
			name:"Measured value out of range",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Wire break",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:3,
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
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:16,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
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
	mod_name:"BLC-16DO-0.1A-P",
	mod_id:0x80550500,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:4,
		datapoints:
		[
		{
			name:"Wire break detection threshold",
			category:"Global",
			chan_unit:"",
			bitOffset:0,
			bitLen:4,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Overcurrent detection threshold",
			category:"Global",
			chan_unit:"",
			bitOffset:4,
			bitLen:4,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Activate wire break monitoring",
			category:"Global",
			chan_unit:"",
			bitOffset:9,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Activate overcurrent monitoring",
			category:"Global",
			chan_unit:"",
			bitOffset:8,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		]
	},
	{
		sect_name:"Diag",
		num_elems:1,
		datapoints:
		[
		{
			name:"Overcurrent",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:15,
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
			channelNumStart:0,
			channelNumEnd:15,
		},
		]
	},
	]
},
{
	mod_name:"BLC-1CVI",
	mod_id:0x18B9900,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:8,
		datapoints:
		[
		{
			name:"Guarding time [n*0.1s]",
			category:"Global",
			chan_unit:"",
			bitOffset:64,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Life time factor",
			category:"Global",
			chan_unit:"",
			bitOffset:72,
			bitLen:8,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Data rate",
			category:"Global",
			chan_unit:"",
			bitOffset:80,
			bitLen:3,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Activate terminating resistor",
			category:"Global",
			chan_unit:"",
			bitOffset:83,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Activate node",
			category:"Node",
			chan_unit:"node",
			bitOffset:0,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:8,
		},
		{
			name:"Activate guarding",
			category:"Node",
			chan_unit:"node",
			bitOffset:1,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:8,
		},
		{
			name:"Input data size",
			category:"Node",
			chan_unit:"node",
			bitOffset:2,
			bitLen:3,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:8,
		},
		{
			name:"Output data size",
			category:"Node",
			chan_unit:"node",
			bitOffset:5,
			bitLen:3,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:8,
		},
		]
	},
	{
		sect_name:"Diag",
		num_elems:8,
		datapoints:
		[
		{
			name:"Emergencies transmitted since module start",
			category:"Global",
			chan_unit:"",
			bitOffset:32,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Node address not within permissible range (1-8)",
			category:"Global",
			chan_unit:"",
			bitOffset:33,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Overcurrent VC",
			category:"Global",
			chan_unit:"",
			bitOffset:34,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Overcurrent VE",
			category:"Global",
			chan_unit:"",
			bitOffset:35,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Emergencies transmitted since module start",
			category:"Node",
			chan_unit:"node",
			bitOffset:0,
			bitLen:1,
			bitIncremental:4,
			channelNumStart:1,
			channelNumEnd:8,
		},
		{
			name:"Transmitted emergencies",
			category:"Node",
			chan_unit:"node",
			bitOffset:1,
			bitLen:1,
			bitIncremental:4,
			channelNumStart:1,
			channelNumEnd:8,
		},
		{
			name:"Communication error transmitted since module start/Guard Time timeout",
			category:"Node",
			chan_unit:"node",
			bitOffset:2,
			bitLen:1,
			bitIncremental:4,
			channelNumStart:1,
			channelNumEnd:8,
		},
		{
			name:"Communication error/Guard Time timeout",
			category:"Node",
			chan_unit:"node",
			bitOffset:3,
			bitLen:1,
			bitIncremental:4,
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
			name:"In byte",
			category:"Node",
			chan_unit:"node",
			bitOffset:0,
			bitLen:8,
			bitIncremental:8,
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
			name:"Out byte",
			category:"Node",
			chan_unit:"node",
			bitOffset:0,
			bitLen:8,
			bitIncremental:8,
			channelNumStart:1,
			channelNumEnd:8,
		},
		]
	},
	]
},
{
	mod_name:"BLC-8DO-R-NO",
	mod_id:0x62000400,
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
		num_elems:0,
		datapoints:
		[
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
			channelNumStart:0,
			channelNumEnd:7,
		},
		]
	},
	]
},
{
	mod_name:"BLC-8DO-0.5A-N",
	mod_id:0x62400400,
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
		num_elems:1,
		datapoints:
		[
		{
			name:"Overcurrent",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
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
			channelNumStart:0,
			channelNumEnd:7,
		},
		]
	},
	]
},
{
	mod_name:"BLC-2AI-V",
	mod_id:0x23557000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:4,
		datapoints:
		[
		{
			name:"Measurement range",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Data format",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Deactivate diagnostics",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:2,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Deactivate channel",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:3,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
		},
		]
	},
	{
		sect_name:"Diag",
		num_elems:1,
		datapoints:
		[
		{
			name:"Measured value out of range",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
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
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:16,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
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
	mod_name:"BLC-4DO-4A-P",
	mod_id:0x45300300,
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
		num_elems:1,
		datapoints:
		[
		{
			name:"Overcurrent",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
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
			channelNumStart:0,
			channelNumEnd:3,
		},
		]
	},
	]
},
{
	mod_name:"BLC-4DI-P",
	mod_id:0x41003000,
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
		num_elems:0,
		datapoints:
		[
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
			channelNumStart:0,
			channelNumEnd:3,
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
	mod_name:"BLC-2AI-I",
	mod_id:0x22557000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:4,
		datapoints:
		[
		{
			name:"Measurement range",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Data format",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Deactivate diagnostics",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:2,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Deactivate channel",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:3,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
		},
		]
	},
	{
		sect_name:"Diag",
		num_elems:2,
		datapoints:
		[
		{
			name:"Measured value out of range",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Wire break",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
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
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:16,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
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
	mod_name:"BLC-2AI-PT",
	mod_id:0x21577000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:6,
		datapoints:
		[
		{
			name:"Mains suppression",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Data format",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Deactivate diagnostics",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:2,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Deactivate channel",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:3,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"RTD type",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:4,
			bitLen:4,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Measurement mode",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
		},
		]
	},
	{
		sect_name:"Diag",
		num_elems:3,
		datapoints:
		[
		{
			name:"Measured value out of range",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Wire break",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Overcurrent",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:2,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
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
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:16,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
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
	mod_name:"BLC-2AI-TC",
	mod_id:0x21557000,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:5,
		datapoints:
		[
		{
			name:"Mains suppression",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Data format",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Deactivate diagnostics",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:2,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Deactivate channel",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:3,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Thermocouple type",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:4,
			bitLen:4,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
		},
		]
	},
	{
		sect_name:"Diag",
		num_elems:3,
		datapoints:
		[
		{
			name:"Measured value out of range",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Wire break",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Cold junct. comp. wire break",
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:2,
			bitLen:1,
			bitIncremental:8,
			channelNumStart:0,
			channelNumEnd:1,
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
			category:"Analog In",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:16,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
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
	mod_name:"BLC-2AO-I",
	mod_id:0x22080700,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:6,
		datapoints:
		[
		{
			name:"Output range",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:24,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Data format",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:24,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Data representation",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:6,
			bitLen:2,
			bitIncremental:24,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Output on module bus error",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:4,
			bitLen:2,
			bitIncremental:24,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Substitute value",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:16,
			bitIncremental:24,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Deactivate channel",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:3,
			bitLen:1,
			bitIncremental:24,
			channelNumStart:0,
			channelNumEnd:1,
		},
		]
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
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
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:16,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
		},
		]
	},
	]
},
{
	mod_name:"BLC-2AO-V",
	mod_id:0x21080700,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:3,
		datapoints:
		[
		{
			name:"Output range",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:24,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Data format",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:1,
			bitLen:1,
			bitIncremental:24,
			channelNumStart:0,
			channelNumEnd:1,
		},
		{
			name:"Substitute value",
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:16,
			bitIncremental:24,
			channelNumStart:0,
			channelNumEnd:1,
		},
		]
	},
	{
		sect_name:"Diag",
		num_elems:0,
		datapoints:
		[
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
			category:"Analog Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:16,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:1,
		},
		]
	},
	]
},
{
	mod_name:"BLC-PF-24VDC",
	mod_id:0x6300000,
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
		num_elems:3,
		datapoints:
		[
		{
			name:"Undervoltage Vi",
			category:"Global",
			chan_unit:"",
			bitOffset:0,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Undervoltage Vo",
			category:"Global",
			chan_unit:"",
			bitOffset:1,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Overcurrent Ii",
			category:"Global",
			chan_unit:"",
			bitOffset:2,
			bitLen:1,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
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
		num_elems:0,
		datapoints:
		[
		]
	},
	]
},
{
	mod_name:"BLC-4DO-2A-P",
	mod_id:0x43300300,
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
		num_elems:1,
		datapoints:
		[
		{
			name:"Overcurrent",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
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
			channelNumStart:0,
			channelNumEnd:3,
		},
		]
	},
	]
},
{
	mod_name:"BLC-8DO-0.5A-P",
	mod_id:0x61400400,
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
		num_elems:1,
		datapoints:
		[
		{
			name:"Overcurrent",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:7,
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
			channelNumStart:0,
			channelNumEnd:7,
		},
		]
	},
	]
},
{
	mod_name:"BLC-8DI-P",
	mod_id:0x61004000,
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
		num_elems:0,
		datapoints:
		[
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
			channelNumStart:0,
			channelNumEnd:7,
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
	mod_name:"BLC-4DO-0.5A-P",
	mod_id:0x41300300,
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
		num_elems:1,
		datapoints:
		[
		{
			name:"Overcurrent",
			category:"Digital Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
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
			channelNumStart:0,
			channelNumEnd:3,
		},
		]
	},
	]
},
{
	mod_name:"BLC-16DI-P",
	mod_id:0x82005000,
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
		num_elems:0,
		datapoints:
		[
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
			channelNumStart:0,
			channelNumEnd:15,
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
	mod_name:"BLC-4IOL",
	mod_id:0x409BBB00,
	sections:
	[
	{
		sect_name:"Param",
		num_elems:12,
		datapoints:
		[
		{
			name:"Mode",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:4,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Data storage mode",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:4,
			bitLen:2,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Cycle time",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:8,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Revision",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:16,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Activate Quick Start-Up",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:6,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Process input data invalid",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:17,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Deactivate diagnostics Ch0",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:18,
			bitLen:2,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Input data mapping",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:20,
			bitLen:2,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Input data length",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:24,
			bitLen:4,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Output data mapping",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:22,
			bitLen:2,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Output data length",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:28,
			bitLen:4,
			bitIncremental:32,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Activate output",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:7,
			bitLen:1,
			bitIncremental:32,
			channelNumStart:4,
			channelNumEnd:7,
		},
		]
	},
	{
		sect_name:"Diag",
		num_elems:15,
		datapoints:
		[
		{
			name:"Wrong or missing device",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:2,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Data storage error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:3,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Process input data invalid",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:5,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Hardware error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:4,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Maintenance events",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:6,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Out of spec. events",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:7,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Parameterization error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Overtemperature",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:9,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Lower limit value underrun",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:10,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Upper limit value exceeded",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:11,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Undervoltage",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:12,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Overvoltage",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:13,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Overload",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:14,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Common error",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:15,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Overcurrent XSG channel",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:16,
			channelNumStart:4,
			channelNumEnd:7,
		},
		]
	},
	{
		sect_name:"Input",
		num_elems:11,
		datapoints:
		[
		{
			name:"IO-Link input data word 0",
			category:"Global",
			chan_unit:"",
			bitOffset:16,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"IO-Link input data word 1",
			category:"Global",
			chan_unit:"",
			bitOffset:32,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"IO-Link input data word 2",
			category:"Global",
			chan_unit:"",
			bitOffset:48,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"IO-Link input data word 3",
			category:"Global",
			chan_unit:"",
			bitOffset:64,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"IO-Link input data word 4",
			category:"Global",
			chan_unit:"",
			bitOffset:80,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"IO-Link input data word 5",
			category:"Global",
			chan_unit:"",
			bitOffset:96,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"IO-Link input data word 6",
			category:"Global",
			chan_unit:"",
			bitOffset:112,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"Digital input",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:0,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"Input value valid",
			category:"IO-Link channel",
			chan_unit:"Channel",
			bitOffset:8,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:0,
			channelNumEnd:3,
		},
		{
			name:"XSG input",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:4,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:4,
			channelNumEnd:7,
		},
		{
			name:"Overcurrent XSG",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:12,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:4,
			channelNumEnd:7,
		},
		]
	},
	{
		sect_name:"Output",
		num_elems:8,
		datapoints:
		[
		{
			name:"IO-Link output data word 0",
			category:"Global",
			chan_unit:"",
			bitOffset:16,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"IO-Link output data word 1",
			category:"Global",
			chan_unit:"",
			bitOffset:32,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"IO-Link output data word 2",
			category:"Global",
			chan_unit:"",
			bitOffset:48,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"IO-Link output data word 3",
			category:"Global",
			chan_unit:"",
			bitOffset:64,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"IO-Link output data word 4",
			category:"Global",
			chan_unit:"",
			bitOffset:80,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"IO-Link output data word 5",
			category:"Global",
			chan_unit:"",
			bitOffset:96,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"IO-Link output data word 6",
			category:"Global",
			chan_unit:"",
			bitOffset:112,
			bitLen:16,
			bitIncremental:0,
			channelNumStart:0,
			channelNumEnd:0,
		},
		{
			name:"XSG output",
			category:"Digital In/Out",
			chan_unit:"Channel",
			bitOffset:4,
			bitLen:1,
			bitIncremental:1,
			channelNumStart:4,
			channelNumEnd:7,
		},
		]
	},
	]
},
];
