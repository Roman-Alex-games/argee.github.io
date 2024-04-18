/********************************************************************************
 *
 * Copyright (c) 2016 by TUSA
 *
 ********************************************************************************
 *
 *  Initial Author       : Roman Glistvain
 *  Maintainers          : Roman Glistvain
 *
 *
 ********************************************************************************
 *
 *  DESCRIPTION: ARGEE Code Generator
 *
 *******************************************************************************/

var ARGEE_nst_code_gen=(function()
{ 

var curr_enc_elem=null;

// assume r3 -> global vars, r4 -> local function frame, r5 -> used for pointer vars, r6-> TMP register, R12 -> global mirror register

var glob_var_reg=3; // r3
var loc_funct_frame_reg=4; // r4
var pointer_var_reg=5; //r5
var tmp_reg=6; // r6 -> maybe 
var glob_mirr_reg=11;

var process=ARGEE_nst_process;
var parse=ARGEE_nst_parse;
var findVarElem=ARGEE_nst_process.findVarElem;
var findFunctBlock=ARGEE_nst_process.findFunctBlock;
var stopCompilation=ARGEE_nst_parse.stopCompilation;
var ELEM=ARGEE_nst_parse.ELEM;
var token_types=ARGEE_nst_parse.token_types;
var VAR_REF=process.VAR_REF;
var arm7_mode=true;
function getARM7_Mode()
{
	return arm7_mode;
}
// to determine if the device is ARM7 or not -> check the GW ID of the device. If it is BLCEN or FEN20-Med -> this is ARM7
function setARM7_Mode(mode)
{
	arm7_mode=mode;
}


//r7 -> current task frame

var ASM_OP=
{
	BRANCH:0,
	ADD:1,
	SUB:2,
	MUL:3,
	DIV:4,
	LDW:5,
	STW:6,
	AND:7,
	OR:8,
	// comparison OPs
	GT:9,  // >
	GE:10, // >=
	LT:11, // <
	LE:12, // <=
	EQ:13, // ==
	NE:14, // !=
	MOV:15,	
	CMP:16,
	B_LT:17,
	POP_PC:18,
	NEG:19,
	BL:20, // branch with link
	CBZ:21, // Conditional branch if Zero
	CBNZ:22,
	PUSH_CONSEQ_REGS:23,
	POP_CONSEQ_REGS:24,
	BLX:25,
	LDH:26,
	LDB:27,
	STH:28,
	STB:29,
	MLS:30,
	TO_INT:31,
	TO_FLOAT:32,
	F_PUSH:33,
	F_POP:34,
	F_ADD:35,
	F_SUB:36,
	F_DIV:37,
	F_MULT:38,

	F_GT:39,  // >
	F_GE:40, // >=
	F_LT:41, // <
	F_LE:42, // <=
	F_EQ:43, // ==
	F_NE:44, // !=
	F_MOV:45,

	REG_TO_FP:46,
	FP_TO_REG:47,
	UBFX:48,
	SBFX:49,
	BFI:50,
	LDW_FORCED_4_BYTE:51,
	STW_FORCED_4_BYTE:52,
	NOT:53,
	B_EQ:54,
	B_NE:55,
	LSL:56,
	LSR:57,
	BX:58,
	MOV_CONST_4BYTE:59,
};

// always ITTE, COND
var it_encoding=
[
 {op:ASM_OP.GT,op1:ASM_OP.F_GT,enc:(0xbf<<8)|(0xd<<4)|(4<<0)|(0<<3),sign:">"},// Actual opcode is LE
 {op:ASM_OP.GE,op1:ASM_OP.F_GE,enc:(0xbf<<8)|(0xB<<4)|(4<<0)|(0<<3),sign:">="},// Actual opcode is LT
 {op:ASM_OP.LT,op1:ASM_OP.F_LT,enc:(0xbf<<8)|(0xA<<4)|(4<<0)|(1<<3),sign:"<"},// Actual opcode is GE
 {op:ASM_OP.LE,op1:ASM_OP.F_LE,enc:(0xbf<<8)|(0xC<<4)|(4<<0)|(1<<3),sign:"<="},// Actual opcode is GT
 {op:ASM_OP.EQ,op1:ASM_OP.F_EQ,enc:(0xbf<<8)|(0x1<<4)|(4<<0)|(0<<3),sign:"=="},// Actual opcode is NE
 {op:ASM_OP.NE,op1:ASM_OP.F_NE,enc:(0xbf<<8)|(0x0<<4)|(4<<0)|(1<<3),sign:"<>"},// Actual opcode is EQ
];

var b_cond_encoding=
[
 {op:ASM_OP.GT,enc:(0xd<<12)|(0xC<<8),sign:">"},// Actual opcode is LE
 {op:ASM_OP.GE,enc:(0xd<<12)|(0xA<<8),sign:">="},// Actual opcode is LT
 {op:ASM_OP.LT,enc:(0xd<<12)|(0xB<<8),sign:"<"},// Actual opcode is GE
 {op:ASM_OP.LE,enc:(0xd<<12)|(0xD<<8),sign:"<="},// Actual opcode is GT
 {op:ASM_OP.EQ,enc:(0xd<<12)|(0x0<<8),sign:"=="},// Actual opcode is NE
 {op:ASM_OP.NE,enc:(0xd<<12)|(0x1<<8),sign:"<>"},// Actual opcode is EQ
];   

var conv_tmp=new ArrayBuffer(4);
var conv_tmp_dv=new DataView(conv_tmp);

var debug_asm=false;

function inject_debug()
{
	if (debug_asm==true)
	{
		encodeAsm1(ASM_OP.MOV,12,-1,-1,-1, rel_pc);
	}
}

function encodeAsm(op,r1,r2,r3,r4,imm)
{
	encodeAsm1(op,r1,r2,r3,r4,imm);
	
}


function savePCForReturnFromOS()
{
	encodeAsm(ASM_OP.MOV,15,7,-1,-1, null); // move PC to R7
}
	
// VAL : 0 -> WAIT, 1 -> PREEMPT, 2-> Exception
function returnToOs(val,move_pc)
{
	if (move_pc==true) // for WAIT statements the PC is copied into R7 before expression evaluation.
	{
		savePCForReturnFromOS();  // by design ARGEE preemption point and PC are inside the area which results in 2 byte instruction
	}
	encodeAsm(ASM_OP.MOV,2,-1,-1,-1,  val);   // R2:=VAL
	encodeAsm(ASM_OP.POP_PC,-1,-1,-1,-1,  null); // POP PC
}

// general format should work for all encodings

var asm_descr=[];

function addAsmDescr(pos,len, descr)
{
	asm_descr[asm_descr.length]={pos:pos,len:len,descr:descr};
}

function genRegOp(dest_reg,reg1,reg2,op)
{
	switch(op)
	{
		case token_types.PLUS:
		{
			encodeAsm(ASM_OP.ADD,reg1,reg2,dest_reg,-1,null);
			break;
		}
		case token_types.MINUS:
		{
			encodeAsm(ASM_OP.SUB,reg1,reg2,dest_reg,-1,null);
			break;
		}
		case token_types.LESS:
		{
			encodeAsm(ASM_OP.LT,reg1,reg2,dest_reg,-1,null);
			break;
		}
		case token_types.LESS_EQ:
		{
			encodeAsm(ASM_OP.LE,reg1,reg2,dest_reg,-1,null);
			break;
		}
		case token_types.NOT_EQ:
		{
			encodeAsm(ASM_OP.NE,reg1,reg2,dest_reg,-1,null);
			break;
		}
		case token_types.EQ:
		{
			encodeAsm(ASM_OP.EQ,reg1,reg2,dest_reg,-1,null);
			break;
		}
		case token_types.BIGGER:
		{
			encodeAsm(ASM_OP.GT,reg1,reg2,dest_reg,-1,null);
			break;
		}
		case token_types.BIGGER_OR_EQ:
		{
			encodeAsm(ASM_OP.GE,reg1,reg2,dest_reg,-1,null);
			break;
		}
		case token_types.DIV:
		{
			if (arm7_mode==true)
			{
				// dest reg is always r0, arguments are r0,r1
				encodeAsm(ASM_OP.BL,-1,-1,1,-1,relJumpAddr(div_jump_addr)); 
			}
			else
			{
				encodeAsm(ASM_OP.DIV,reg1,reg2,dest_reg,-1,null);
			}
			break;
		}

		case token_types.MOD:
		{
			if (arm7_mode==true)
			{
				encodeAsm(ASM_OP.BL,-1,-1,1,-1,relJumpAddr(mod_jump_addr)); 
			}
			else 
			{
				encodeAsm(ASM_OP.DIV,reg1,reg2,14,-1,null);
				encodeAsm(ASM_OP.MLS,reg1,14,reg2,dest_reg,null);
			}

			break;
		}
		case token_types.MULT:
		{
			if (dest_reg==reg1)
			{
				encodeAsm(ASM_OP.MUL,reg2,reg1,-1,-1,null);
			}
			else if (dest_reg==reg2)
			{
				encodeAsm(ASM_OP.MUL,reg1,reg2,-1,-1,null);
			}
			else
			{
				stopCompilation("3 register multiplication not supported",curr_enc_elem);
			}
			break;
		}
		

		case token_types.AND:
		{
			encodeAsm(ASM_OP.AND,reg2,dest_reg,-1,-1,null);
			break;
		}
		case token_types.NOT:
			encodeAsm(ASM_OP.NOT,reg1,dest_reg,-1,-1,null);
			break;
		
		case token_types.OR:
		{
			encodeAsm(ASM_OP.OR,reg2,dest_reg,-1,-1,null);
			break;
		}
		
		case token_types.F_ADD:
		{
			encodeAsm(ASM_OP.F_ADD,reg1,reg2,dest_reg,-1,null);
			break;
		}
		case token_types.F_SUB:
		{
			encodeAsm(ASM_OP.F_SUB,reg1,reg2,dest_reg,-1,null);
			break;
		}
		case token_types.F_MULT:
		{
			encodeAsm(ASM_OP.F_MULT,reg1,reg2,dest_reg,-1,null);
			break;
		}
		case token_types.F_DIV:
		{
			encodeAsm(ASM_OP.F_DIV,reg1,reg2,dest_reg,-1,null);
			break;
		}
		
		case token_types.F_LESS:
		{
			encodeAsm(ASM_OP.F_LT,reg1,reg2,dest_reg,-1,null);
			break;
		}
		case token_types.F_LESS_EQ:
		{
			encodeAsm(ASM_OP.F_LE,reg1,reg2,dest_reg,-1,null);
			break;
		}
		case token_types.F_NOT_EQ:
		{
			encodeAsm(ASM_OP.F_NE,reg1,reg2,dest_reg,-1,null);
			break;
		}
		case token_types.F_EQ:
		{
			encodeAsm(ASM_OP.F_EQ,reg1,reg2,dest_reg,-1,null);
			break;
		}
		case token_types.F_BIGGER:
		{
			encodeAsm(ASM_OP.F_GT,reg1,reg2,dest_reg,-1,null);
			break;
		}
		case token_types.F_BIGGER_OR_EQ:
		{
			encodeAsm(ASM_OP.F_GE,reg1,reg2,dest_reg,-1,null);
			break;
		}
		
	}
}

function storeInstruction32Bit(pos,val)
{
	var data=[];
	data[0]=(val>>0)&0xff;
	data[1]=(val>>8)&0xff;
	data[2]=(val>>16)&0xff;
	data[3]=(val>>24)&0xff;
	compiled_program_DataView.setUint8(pos+2,data[0]);
	compiled_program_DataView.setUint8(pos+3,data[1]);
	compiled_program_DataView.setUint8(pos+0,data[2]);
	compiled_program_DataView.setUint8(pos+1,data[3]);
}

function encodeAsm1(op,r1,r2,r3,r4,imm)
{
	var tmp,i;
	switch(op)
	{
		case ASM_OP.UBFX:
		    r4=r4-1;
			addAsmDescr(rel_pc,4,"UBFX (src)r"+r1+"(dst)r"+r2+"(lsb)"+r3+"(width)"+r4);
			//tmp=((r1)<<16)|((r3)<<8)|((r2)<<0)|(0xf<<12)|(251<<24);
			tmp=(0xf<<(12+16))|(0xf<<(6+16))|(r1<<16)|(r2<<8)|(((r3>>2)&7)<<12)|((r3&3)<<6)|(r4&0x1f);
			storeInstruction32Bit(rel_pc,tmp);rel_pc+=4;
			break;
		case ASM_OP.BFI:
			addAsmDescr(rel_pc,4,"BFI (src)r"+r1+"(dst)r"+r2+"(lsb)"+r3+"(msbit)"+r4);
			//tmp=((r1)<<16)|((r3)<<8)|((r2)<<0)|(0xf<<12)|(251<<24);
			tmp=(0xf<<(12+16))|(0x3<<(8+16))|(0x3<<(5+16))|(r1<<16)|(r2<<8)|(((r3>>2)&7)<<12)|((r3&3)<<6)|(r4&0x1f);
			storeInstruction32Bit(rel_pc,tmp);rel_pc+=4;
			break;
		
		case ASM_OP.TO_INT:
			addAsmDescr(rel_pc,4,"VCVT_TO_INT s"+r1+",s"+r1);
			tmp=(7<<(13+16))|(7<<(9+16))|(1<<(7+16))|(7<<(3+16))|(5<<16)|(5<<9)|(1<<6)|((r1&1)<<(16+6))|((r1&1)<<(5))|((r1>>1)<<12)|((r1>>1)<<0)|(1<<7);
			storeInstruction32Bit(rel_pc,tmp);rel_pc+=4;
			addAsmDescr(rel_pc,4,"r"+r2+":= s"+r1);
			tmp=(7<<(13+16))|(7<<(9+16))|(1<<(4+16))|(5<<9)|(1<<4)|((r1&1)<<(7))|((r1>>1)<<16)|(r2<<12);
			storeInstruction32Bit(rel_pc,tmp);rel_pc+=4;
			break;
		case ASM_OP.TO_FLOAT:
			addAsmDescr(rel_pc,4,"s"+r2+":= r"+r1);
			tmp=(7<<(13+16))|(7<<(9+16))|(5<<9)|(1<<4)|((r2&1)<<(7))|((r2>>1)<<16)|(r1<<12);
			storeInstruction32Bit(rel_pc,tmp);rel_pc+=4;
			addAsmDescr(rel_pc,4,"VCVT_TO_FLOAT s"+r2+",s"+r2);
			tmp=(7<<(13+16))|(7<<(9+16))|(1<<(7+16))|(7<<(3+16))|(0<<16)|(5<<9)|(1<<6)|((r2&1)<<(16+6))|((r2&1)<<(5))|((r2>>1)<<12)|((r2>>1)<<0)|(1<<7);
			storeInstruction32Bit(rel_pc,tmp);rel_pc+=4;
			break;
        case ASM_OP.REG_TO_FP:
			addAsmDescr(rel_pc,4,"s"+r2+":= r"+r1);
			tmp=(7<<(13+16))|(7<<(9+16))|(5<<9)|(1<<4)|((r2&1)<<(7))|((r2>>1)<<16)|(r1<<12);
			storeInstruction32Bit(rel_pc,tmp);rel_pc+=4;
			break;
        case ASM_OP.FP_TO_REG:
			addAsmDescr(rel_pc,4,"r"+r2+":= s"+r1);
			tmp=(7<<(13+16))|(7<<(9+16))|(1<<(4+16))|(5<<9)|(1<<4)|((r1&1)<<(7))|((r1>>1)<<16)|(r2<<12);
			storeInstruction32Bit(rel_pc,tmp);rel_pc+=4;
			break;
		case ASM_OP.F_ADD:
			addAsmDescr(rel_pc,4,"s"+r3+":= s"+r1+"+s"+r2);
			tmp=(7<<(13+16))|(7<<(9+16))|(3<<(4+16))|(5<<9)|((r3&1)<<(6+16))|((r3>>1)<<12)|((r1&1)<<(7))|((r1>>1)<<16)|((r2&1)<<(5))|((r2>>1)<<0);
			storeInstruction32Bit(rel_pc,tmp);rel_pc+=4;
			break;
		case ASM_OP.F_SUB:
			addAsmDescr(rel_pc,4,"s"+r3+":= s"+r1+"-s"+r2);
			tmp=(7<<(13+16))|(7<<(9+16))|(3<<(4+16))|(5<<9)|(1<<6)|((r3&1)<<(6+16))|((r3>>1)<<12)|((r1&1)<<(7))|((r1>>1)<<16)|((r2&1)<<(5))|((r2>>1)<<0);
			storeInstruction32Bit(rel_pc,tmp);rel_pc+=4;
			break;
		case ASM_OP.F_MULT:
			addAsmDescr(rel_pc,4,"s"+r3+":= s"+r1+"*s"+r2);
			tmp=(7<<(13+16))|(7<<(9+16))|(2<<(4+16))|(5<<9)|((r3&1)<<(6+16))|((r3>>1)<<12)|((r1&1)<<(7))|((r1>>1)<<16)|((r2&1)<<(5))|((r2>>1)<<0);
			storeInstruction32Bit(rel_pc,tmp);rel_pc+=4;
			break;
		case ASM_OP.F_DIV:
			addAsmDescr(rel_pc,4,"s"+r3+":= s"+r1+"/s"+r2);
			tmp=(7<<(13+16))|(7<<(9+16))|(1<<(7+16))|(0<<(4+16))|(5<<9)|((r3&1)<<(6+16))|((r3>>1)<<12)|((r1&1)<<(7))|((r1>>1)<<16)|((r2&1)<<(5))|((r2>>1)<<0);
			storeInstruction32Bit(rel_pc,tmp);rel_pc+=4;
			break;
		case ASM_OP.F_PUSH:
			addAsmDescr(rel_pc,4,"f_push s"+r1+","+imm);
			tmp=(7<<(13+16))|(3<<(10+16))|(1<<(8+16))|(1<<(5+16))|(0xD<<16)|(5<<9)|((r1&1)<<(6+16))|((r1>>1)<<12)|(imm<<0);
			storeInstruction32Bit(rel_pc,tmp);rel_pc+=4;
			break;
		case ASM_OP.F_POP:
			addAsmDescr(rel_pc,4,"f_pop s"+r1+","+imm);
			tmp=(7<<(13+16))|(3<<(10+16))|(1<<(7+16))|(0xf<<(2+16))|(1<<16)|(5<<9)|((r1&1)<<(6+16))|((r1>>1)<<12)|(imm<<0);
			storeInstruction32Bit(rel_pc,tmp);rel_pc+=4;
			break;
		case ASM_OP.F_MOV:
			addAsmDescr(rel_pc,4,"s"+r2+":=s"+r1);
			tmp=(7<<(13+16))|(7<<(9+16))|(1<<(7+16))|(3<<(4+16))|(5<<9)|(1<<6)|((r2&1)<<(6+16))|((r2>>1)<<12)|((r1&1)<<(5))|((r1>>1)<<0);
			storeInstruction32Bit(rel_pc,tmp);rel_pc+=4;
			break;
			
			
		case ASM_OP.BLX:
			addAsmDescr(rel_pc,2,"BLX r"+r1);
			tmp=(0xF<<7)|(1<<14)|(r1<<3);
			compiled_program_DataView.setUint16(rel_pc,tmp,true);rel_pc+=2;	
			break;

		case ASM_OP.BX:
			addAsmDescr(rel_pc,2,"BX r"+r1);
			tmp=(0x7<<8)|(1<<14)|(r1<<3);
			compiled_program_DataView.setUint16(rel_pc,tmp,true);rel_pc+=2;	
			break;
			
		case ASM_OP.PUSH_CONSEQ_REGS:
		case ASM_OP.POP_CONSEQ_REGS:
			// assume we are only pushing and poping r0-r7
			var registers=0;
			for(i=r1;i<=r2;i++)
			{
				registers|=1<<i;
			}
			if (op==ASM_OP.PUSH_CONSEQ_REGS)
			{
				addAsmDescr(rel_pc,2,"push {r"+r1+"-r"+r2+"}");
				tmp=(0xB<<12)|(1<<10)|registers;
			}
			else
			{
				addAsmDescr(rel_pc,2,"pop {r"+r1+"-r"+r2+"}");
				tmp=(0xB<<12)|(1<<10)|(1<<11)|registers;
			}
			compiled_program_DataView.setUint16(rel_pc,tmp,true);rel_pc+=2;	
			break;
		case ASM_OP.CBNZ:
			// don't need to branch far -> can ignore "i"
			addAsmDescr(rel_pc,2,"CBNZ r"+r1+",PC+"+imm);
			imm>>=1;
			tmp=r1|(imm<<3)|(0xb<<12)|(9<<8);
			
			compiled_program_DataView.setUint16(rel_pc,tmp,true);rel_pc+=2;	
			break;
		
		case ASM_OP.CBZ:
			// don't need to branch far -> can ignore "i"
			addAsmDescr(rel_pc,2,"CBZ r"+r1+",PC+"+imm);
			imm>>=1;
			tmp=r1|(imm<<3)|(0xb<<12)|(1<<8);
			
			compiled_program_DataView.setUint16(rel_pc,tmp,true);rel_pc+=2;	
			break;
		case ASM_OP.BL:
			imm-=4;
			addAsmDescr(rel_pc,4,"BL PC+"+imm);
			conv_tmp_dv.setInt32(0,imm,true);
			var conv;
			conv=conv_tmp_dv.getUint32(0,true);
			conv>>=1;
			var S=0;
			if (imm<0)
			{
				S=1;
			}
			tmp=(conv&0x7ff)|(0x1f<<11)|(((conv>>11)&0x3ff)<<16)|(S<<26)|(0xf<<28);
			
			storeInstruction32Bit(rel_pc,tmp);rel_pc+=4;
			break;
			
		case ASM_OP.NEG:
			//r2:=-r1.
			tmp=(0x9<<6)|(1<<14)|(r1<<3)|r2;
			addAsmDescr(rel_pc,2,"NEG r"+r2+",r"+r1);
			compiled_program_DataView.setUint16(rel_pc,tmp,true);rel_pc+=2;	
			break;

		case ASM_OP.NOT:
			//r2:=~r1.
			tmp=(0x1<<14)|(0xf<<6)|(r1<<3)|r2;
			addAsmDescr(rel_pc,2,"r"+r2+":=~r"+r1);
			compiled_program_DataView.setUint16(rel_pc,tmp,true);rel_pc+=2;	
			break;

			
		case ASM_OP.POP_PC:
			tmp=(0xf<<10)|(1<<15)|(1<<8);
			addAsmDescr(rel_pc,2,"POP PC");
			compiled_program_DataView.setUint16(rel_pc,tmp,true);rel_pc+=2;	
			break;

		case ASM_OP.LSL:
			if (imm!=null)
			{
				tmp=(imm<<6)|(r1<<3)|(r2<<0);
				addAsmDescr(rel_pc,2,"r"+r2+":=r"+r1+"<<"+imm);
				compiled_program_DataView.setUint16(rel_pc,tmp,true);rel_pc+=2;	
			}
			else
			{
				tmp=(1<<14)|(1<<7)|(r1<<3)|(r2<<0);
				addAsmDescr(rel_pc,2,"r"+r2+":=r"+r2+"<<r"+r1);
				compiled_program_DataView.setUint16(rel_pc,tmp,true);rel_pc+=2;	
			}
				
			break;
		case ASM_OP.LSR:
			tmp=(1<<11)|(imm<<6)|(r1<<3)|(r2<<0);
			addAsmDescr(rel_pc,2,"r"+r2+":=r"+r1+">>"+imm);
			compiled_program_DataView.setUint16(rel_pc,tmp,true);rel_pc+=2;	
			break;

			
		case ASM_OP.CMP:
			if (imm!=null)
			{
				if ((imm<255)&&(imm>=0))
				{
					//CMP r1,imm
					tmp=imm|(r1<<8)|(5<<11);
					addAsmDescr(rel_pc,2,"CMP r"+r1+","+imm);
					compiled_program_DataView.setUint16(rel_pc,tmp,true);rel_pc+=2;	
				}
				else
				{
					stopCompilation("Can not compare larger immediate values",curr_enc_elem);
				}
			}
			else
			{
				// CMP r1,r2
				tmp=(0x10A)<<6|(r1<<0)|(r2<<3);
				addAsmDescr(rel_pc,2,"CMP r"+r1+",r"+r2);
				compiled_program_DataView.setUint16(rel_pc,tmp,true);rel_pc+=2;	
			}
			break;
		case ASM_OP.MOV_CONST_4BYTE:
			//r1:=imm
			tmp=(0xf<<(12+16))|(9<<(6+16))|
			    (imm&0xff)|(r1<<8)|(((imm>>8)&0x7)<<12)|(((imm>>11)&1)<<26)|(((imm>>12)&0xf)<<16);
			addAsmDescr(rel_pc,4,"r"+r1+":="+imm+";//"+imm.toString(16));
			storeInstruction32Bit(rel_pc,tmp);rel_pc+=4;
			break;
		case ASM_OP.MOV:
			if (imm!=null)
			{
				if ((imm<255)&&(imm>=0))
				{
					//r1:=imm
					tmp=imm|(r1<<8)|(1<<13);
					addAsmDescr(rel_pc,2,"r"+r1+":="+imm+";//"+imm.toString(16));
					compiled_program_DataView.setUint16(rel_pc,tmp,true);rel_pc+=2;	
				}
				else if ((arm7_mode==false)&&((imm<65536)&&(imm>=0)))
				{
					//r1:=imm
					tmp=(0xf<<(12+16))|(9<<(6+16))|
					    (imm&0xff)|(r1<<8)|(((imm>>8)&0x7)<<12)|(((imm>>11)&1)<<26)|(((imm>>12)&0xf)<<16);
					addAsmDescr(rel_pc,4,"r"+r1+":="+imm+";//"+imm.toString(16));
					storeInstruction32Bit(rel_pc,tmp);rel_pc+=4;
				}
				else
				{
					if (arm7_mode==true)
					{
						// Use literal pool
						if ((rel_pc%4)==0)
						{
							// LDR
							tmp=(0x9<<11)|(r1<<8)|(0);
							addAsmDescr(rel_pc,2,"LDR_LIT r"+r1);
							compiled_program_DataView.setUint16(rel_pc,tmp,true);rel_pc+=2;	
							encodeAsm(ASM_OP.BRANCH,-1,-1,-1,-1,2);
							addAsmDescr(rel_pc,4,".lit="+imm);
							compiled_program_DataView.setUint32(rel_pc,imm,true);rel_pc+=4;	
						}
						else
						{
							// add nop -> Add r0,r0,0
							encodeAsm(ASM_OP.ADD,0,0,1,-1,0); 
							// LDR
							tmp=(0x9<<11)|(r1<<8)|(0);
							addAsmDescr(rel_pc,2,"LDR_LIT r"+r1);
							compiled_program_DataView.setUint16(rel_pc,tmp,true);rel_pc+=2;	
							encodeAsm(ASM_OP.BRANCH,-1,-1,-1,-1,2);
							addAsmDescr(rel_pc,4,".lit="+imm);
							compiled_program_DataView.setUint32(rel_pc,imm,true);rel_pc+=4;	
						}
					}
					else
					{
						// use 2 instructions -> MOV and MOVT
						//r1:=imm
						// MOV
						var imm1=imm&0xffff;
						tmp=(0xf<<(12+16))|(9<<(6+16))|
						    (imm1&0xff)|(r1<<8)|(((imm1>>8)&0x7)<<12)|(((imm1>>11)&1)<<26)|(((imm1>>12)&0xf)<<16);
						addAsmDescr(rel_pc,4,"LOW r"+r1+":="+imm1+";//"+imm.toString(16));
						storeInstruction32Bit(rel_pc,tmp);rel_pc+=4;
						//MOVT
						imm1=(imm>>16)&0xffff;
						tmp=(0xf<<(12+16))|(11<<(6+16))|
						    (imm1&0xff)|(r1<<8)|(((imm1>>8)&0x7)<<12)|(((imm1>>11)&1)<<26)|(((imm1>>12)&0xf)<<16);
						addAsmDescr(rel_pc,4,"HIGH r"+r1+":="+imm1+";//"+imm.toString(16));
						storeInstruction32Bit(rel_pc,tmp);rel_pc+=4;
					}
				}
			}
			else
			{
				//r2:=r1
				
				
				addAsmDescr(rel_pc,2,"r"+r2+":=r"+r1);
				
				var D=0;
				if (r2>7)
				{
					D=1;
					r2=r2&0x7;
				}
				
				tmp=(r1<<3)|(r2<<0)|(3<<9)|(1<<14)|(D<<7);
				compiled_program_DataView.setUint16(rel_pc,tmp,true);rel_pc+=2;	
			}
			break;
		case ASM_OP.B_EQ:
			 if ((imm>=-(128*2))&&(imm<=(127*2)))
			 {
				// 2 byte form
				conv_tmp_dv.setInt32(0,imm,true);
				tmp=conv_tmp_dv.getUint32(0,true);
				tmp>>=1;
				tmp&=0xff;
				tmp|=0xd<<12;
				tmp|=0x0<<8;
				addAsmDescr(rel_pc,2,"B.EQ PC+"+imm);
				compiled_program_DataView.setUint16(rel_pc,tmp,true);rel_pc+=2;	
			 }
			 else
			 {
				 // 4 byte form
				 stopCompilation("Long conditional branch is not yet implemented",curr_enc_elem);
			 }
			 break;			
		case ASM_OP.B_NE:
			 if ((imm>=-(128*2))&&(imm<=(127*2)))
			 {
				// 2 byte form
				conv_tmp_dv.setInt32(0,imm,true);
				tmp=conv_tmp_dv.getUint32(0,true);
				tmp>>=1;
				tmp&=0xff;
				tmp|=0xd<<12;
				tmp|=0x1<<8;
				addAsmDescr(rel_pc,2,"B.EQ PC+"+imm);
				compiled_program_DataView.setUint16(rel_pc,tmp,true);rel_pc+=2;	
			 }
			 else
			 {
				 // 4 byte form
				 stopCompilation("Long conditional branch is not yet implemented",curr_enc_elem);
			 }
			 break;			
			
		case ASM_OP.B_LT:
			 if ((imm>=-(128*2))&&(imm<=(127*2)))
			 {
				// 2 byte form
				conv_tmp_dv.setInt32(0,imm,true);
				tmp=conv_tmp_dv.getUint32(0,true);
				tmp>>=1;
				tmp&=0xff;
				tmp|=0xd<<12;
				tmp|=0xb<<8;
				addAsmDescr(rel_pc,2,"B.LT PC+"+imm);
				compiled_program_DataView.setUint16(rel_pc,tmp,true);rel_pc+=2;	
			 }
			 else
			 {
				 // 4 byte form
				 stopCompilation("Long branch(LT) is not yet implemented",curr_enc_elem);
			 }
			 break;			
		case ASM_OP.BRANCH:
 			 conv_tmp_dv.setInt32(0,imm,true);
			 tmp=conv_tmp_dv.getUint32(0,true);

			 if ((imm>=-2024)&&(imm<=2024))
			 {
				// 2 byte form
				tmp>>=1;
				tmp&=0x7ff;
				tmp|=7<<13;
				addAsmDescr(rel_pc,2,"JMP PC+"+imm);
				compiled_program_DataView.setUint16(rel_pc,tmp,true);rel_pc+=2;	
			 }
			 else
			 {
				 // 4 byte form
				 // long jump not supported -> too much work to add vairable lebgth BL in While,If ....
/*				 
				 addAsmDescr(rel_pc,4,"JMP.W PC+"+imm);
				 var tmp_new;
				 tmp>>=1;
				 if (imm<0)
				 {
					tmp_new=((tmp&0x7ff)|((tmp>>11)&0x3ff)<<16)|(0xf<<(12+16))|(1<<15)|(1<<12)|(1<<11)|(1<<13)|(1<<(10+16));
				 }
				 else
				 {
					tmp_new=((tmp&0x7ff)|((tmp>>11)&0x3ff)<<16)|(0xf<<(12+16))|(1<<15)|(1<<12);
				 }					
				 storeInstruction32Bit(rel_pc,tmp_new);rel_pc+=4;
				 */
				  stopCompilation("Long branch is not yet implemented",curr_enc_elem);
				 
			 }
			 break;
		case ASM_OP.ADD:
			if ((r1<8)&&(r2<8)&&(r3<8))
			{					
				if (imm!=null)
				{
					 if ((imm<=7)&&(r2!=-1))
					 {
						tmp=imm<<6;
						tmp|=(r1)<<3;
						tmp|=(r2)<<0;
						tmp|=0x7<<10;	
						addAsmDescr(rel_pc,2,"r"+r2+":=r"+r1+"+"+imm);
						compiled_program_DataView.setUint16(rel_pc,tmp,true);rel_pc+=2;	 
					 }
					 else if (imm<=256)
					 {
						tmp=imm;
						tmp|=(r1)<<8;
						tmp|=0x3<<12;	
						addAsmDescr(rel_pc,2,"r"+r1+":=r"+r1+"+"+imm);
						compiled_program_DataView.setUint16(rel_pc,tmp,true);rel_pc+=2;	
					 }
					 else
					 {
						 // maybe it is an overkill (to use push/pop instruction) I might be OK with scratch register
						 //addAsmDescr(rel_pc,8,"r"+r1+":=r"+r1+"+"+imm);
						 encodeAsm(ASM_OP.PUSH_CONSEQ_REGS,2,2,-1,-1,null); 
 						 encodeAsm1(ASM_OP.MOV,2,-1,-1,-1, imm);
						 encodeAsm1(ASM_OP.ADD,r1,2,r2,-1, null);
						 encodeAsm(ASM_OP.POP_CONSEQ_REGS,2,2,-1,-1,null); 
					 }
				}
				else
				{				
					 //r3:=r1+r2
					 addAsmDescr(rel_pc,2,"r"+r3+":="+"r"+r1+"+r"+r2);
					 tmp=r3;
					 tmp|=(r1)<<3;
					 tmp|=(r2)<<6;
					 tmp|=0x3<<11;	
					 compiled_program_DataView.setUint16(rel_pc,tmp,true);rel_pc+=2;	
				}
			}
			else
			{
				if (imm!=null)
				{
					if (arm7_mode==true)
					{
						encodeAsm1(ASM_OP.MOV,2,-1,-1,-1, imm);
						encodeAsm1(ASM_OP.ADD,r1,2,r2,-1, null);
					}
					else
					{
						addAsmDescr(rel_pc,4,"r"+r2+":=r"+r1+"+"+imm);
						tmp=(((imm>>(3+8))&0x1)<<(10+16))|(((imm>>(8))&0x7)<<(12))|(imm&0xff)|(r2<<8)|(r1<<16)|(0xf<<(12+16))|(0x1<<(9+16));
						storeInstruction32Bit(rel_pc,tmp);rel_pc+=4;
					}
				}
				else
				{
					stopCompilation("Not yet: LARGE Register Adds",curr_enc_elem);
				}
			}
			break;
		case ASM_OP.SUB:
			if ((r1<8)&&(r2<8)&&(r3<8))
			{
				if (imm!=null)
				{
					 if (imm<=256)
					 {
						tmp=imm;
						tmp|=(r1)<<8;
						tmp|=0x7<<11;	
						addAsmDescr(rel_pc,2,"r"+r1+":="+"r"+r1+"-"+imm);
						compiled_program_DataView.setUint16(rel_pc,tmp,true);rel_pc+=2;	
					 }
					 else
					 {
						stopCompilation("Not yet: SUB with large immediate",curr_enc_elem);
					 }
				}
				else
				{				
					 //r3:=r1-r2
					 tmp=r3;
					 tmp|=(r1)<<3;
					 tmp|=(r2)<<6;
					 tmp|=0xd<<9;	
					 addAsmDescr(rel_pc,2,"r"+r3+":="+"r"+r1+"-r"+r2);
					 compiled_program_DataView.setUint16(rel_pc,tmp,true);rel_pc+=2;	
				}
			}
			else
			{
				if (imm!=null)
				{
					stopCompilation("Not yet: SUB with large immediate",curr_enc_elem);
				}
				else
				{
					if (arm7_mode==false)
					{
						addAsmDescr(rel_pc,4,"r"+r3+":="+"r"+r1+"-r"+r2);
						tmp=(r3<<8)|(r1<<16)|(r2<<0)|(7<<(13+16))|(5<<(9+16))|(0xd<<(5+16));
						storeInstruction32Bit(rel_pc,tmp);rel_pc+=4;
					}
					else
					{
						stopCompilation("Not Supported in SAM7-1",curr_enc_elem);
					}

				}
			}
			break;
		case ASM_OP.MUL:
		{
			if (r3!=-1)
			{
				if (arm7_mode==true)
				{
					stopCompilation("3 register multiplication not supported",curr_enc_elem);
				}
				else
				{
					// Always generate 32 bit version
					//r3:=r1*r2; (r1->rn)
					addAsmDescr(rel_pc,4,"r"+r3+":="+"r"+r1+"*r"+r2);
					tmp=((r1)<<16)|((r3)<<8)|((r2)<<0)|(0xf<<12)|(251<<24);
					storeInstruction32Bit(rel_pc,tmp);rel_pc+=4;
				}
			}
			else
			{
				//r2:=r1*r2; 
				addAsmDescr(rel_pc,2,"r"+r2+":="+"r"+r1+"*r"+r2);		
				tmp=((r1)<<3)|((r2)<<0)|(0xd<<6)|(1<<14);
				compiled_program_DataView.setUint16(rel_pc,tmp,true);rel_pc+=2;
			}
			break;
		}
		case ASM_OP.DIV:
		{
			// only between registers
			// Always generate 32 bit version
			//r3:=r1/r2; (r1->rn)
			addAsmDescr(rel_pc,4,"r"+r3+":="+"r"+r1+"/r"+r2);
			tmp=((r1)<<16)|((r3)<<8)|((r2)<<0)|(0xf<<12)|(0xf<<4)|(4025<<20);
			storeInstruction32Bit(rel_pc,tmp);rel_pc+=4;
			break;
		}
		case ASM_OP.MLS:
		{
			addAsmDescr(rel_pc,4,"r"+r4+":=r"+r1+"-r"+r2+"*r"+r3);
			tmp=((r1)<<12)|((r2)<<16)|((r3)<<0)|(r4<<8)|(0xf<<(12+16))|(0xb<<(8+16))|(1<<4);
			storeInstruction32Bit(rel_pc,tmp);rel_pc+=4;
			break;
		}
		case ASM_OP.LDW_FORCED_4_BYTE:
		{
			if ((imm!=null)&&(imm>=4096))
			{
				stopCompilation("Too many global variables which are not function block instances > 4096 bytes");
			}
		}
		// fallthrough
		case ASM_OP.LDW:
		{
			if (imm!=null)
			{
				if ((((imm<128)&&(imm>=0))&&(r1<8)&&(r2<8))&&(op!=ASM_OP.LDW_FORCED_4_BYTE))
				{
					//r2:=r1[imm]
					var conv=imm>>2;
					tmp=(r2<<0)|(r1<<3)|(conv<<6)|(0xd<<11);
					addAsmDescr(rel_pc,2,"r"+r2+":="+"r"+r1+"["+imm+"]");
					compiled_program_DataView.setUint16(rel_pc,tmp,true);rel_pc+=2;
				}
				else
				{
					//r2:=r1[imm]
					if ((arm7_mode==false)&&(imm<4096))
					{
						conv_tmp_dv.setInt32(0,imm,true);
						tmp=conv_tmp_dv.getUint32(0,true);
						tmp&=0xfff;
						tmp=((r1)<<16)|((r2)<<12)|(tmp)|(3981<<20);
						addAsmDescr(rel_pc,4,"r"+r2+":="+"r"+r1+"["+imm+"]");
						storeInstruction32Bit(rel_pc,tmp);rel_pc+=4;
					}
					else
					{	
						encodeAsm1(ASM_OP.MOV,2,-1,-1,-1, imm);
						encodeAsm1(ASM_OP.LDW,r1,2,r2,-1, null);
					}	
				}
			}
			else if (r3==-1)
			{
				//r2:=[r1]
				tmp=((r1)<<3)|((r2)<<0)|(0xf<<11);
				addAsmDescr(rel_pc,2,"r"+r2+":=[r"+r1+"]");
				compiled_program_DataView.setUint16(rel_pc,tmp,true);rel_pc+=2;
			}
			else  
			{
				//r3:=r1[r2]
				tmp=(r1<<3)|(r2<<6)|(r3<<0)|(0xb<<11);
				addAsmDescr(rel_pc,2,"r"+r3+":=r"+r1+"[r"+r2+"]");
				compiled_program_DataView.setUint16(rel_pc,tmp,true);rel_pc+=2;
			}
			break;
		}
		case ASM_OP.LDH:
		{
			if (imm!=null)
			{
				//r2:=r1[imm]
				if ((arm7_mode==false)&&(imm<4096))
				{
					conv_tmp_dv.setInt32(0,imm,true);
					tmp=conv_tmp_dv.getUint32(0,true);
					tmp&=0xfff;
					tmp=((r1)<<16)|((r2)<<12)|(tmp)|(3979<<20);
					addAsmDescr(rel_pc,4,"r"+r2+":="+"r"+r1+"["+imm+"].H");
					storeInstruction32Bit(rel_pc,tmp);rel_pc+=4;
				}
				else
				{
					encodeAsm1(ASM_OP.MOV,2,-1,-1,-1, imm);
					encodeAsm1(ASM_OP.LDH,r1,2,r2,-1, null);
				}
			}
			else if (r3==-1)
			{
				//r2:=[r1]
				tmp=((r1)<<3)|((r2)<<0)|(0x11<<11);
				addAsmDescr(rel_pc,2,"r"+r2+":=[r"+r1+"].H");
				compiled_program_DataView.setUint16(rel_pc,tmp,true);rel_pc+=2;
			}
			else if ((r1<8)&&(r2<8)&&(r3<8))
			{
				//r3:=r1[r2]
				tmp=(r1<<3)|(r2<<6)|(r3<<0)|(0x2D<<9);
				addAsmDescr(rel_pc,2,"r"+r3+":=r"+r1+"[r"+r2+"].H");
				compiled_program_DataView.setUint16(rel_pc,tmp,true);rel_pc+=2;
			}
			else
			{
				if (arm7_mode==false)
				{
					//r3:=r1[r2]
					tmp=(r3<<12)|(r1<<16)|(r2<<0)|(0x1f<<(16+11))|(3<<(16+4));
					addAsmDescr(rel_pc,4,"r"+r3+":=r"+r1+"[r"+r2+"].H");
					storeInstruction32Bit(rel_pc,tmp);rel_pc+=4;
				}
				else
				{
					stopCompilation("Not Supported in SAM7-2");
				}
			}
				
			break;
		}

		case ASM_OP.LDB:
		{
			if (imm!=null)
			{
				//r2:=r1[imm]
				if ((arm7_mode==false)&&(imm<4096))
				{
					conv_tmp_dv.setInt32(0,imm,true);
					tmp=conv_tmp_dv.getUint32(0,true);
					tmp&=0xfff;
					tmp=((r1)<<16)|((r2)<<12)|(tmp)|(0xf89<<20);
					addAsmDescr(rel_pc,4,"r"+r2+":="+"r"+r1+"["+imm+"].B");
					storeInstruction32Bit(rel_pc,tmp);rel_pc+=4;
				}
				else
				{
					encodeAsm1(ASM_OP.MOV,2,-1,-1,-1, imm);
					encodeAsm1(ASM_OP.LDB,r1,2,r2,-1, null);
				}	
			}
			else if (r3==-1)
			{
				//r2:=[r1]
				tmp=((r1)<<3)|((r2)<<0)|(0xF<<11);
				addAsmDescr(rel_pc,2,"r"+r2+":=[r"+r1+"].B");
				compiled_program_DataView.setUint16(rel_pc,tmp,true);rel_pc+=2;
			}
			else  
			{
				//r3:=r1[r2]
				tmp=(r1<<3)|(r2<<6)|(r3<<0)|(0x17<<10);
				addAsmDescr(rel_pc,2,"r"+r3+":=r"+r1+"[r"+r2+"].B");
				compiled_program_DataView.setUint16(rel_pc,tmp,true);rel_pc+=2;
			}
			break;
		}
		
		case ASM_OP.STW_FORCED_4_BYTE:
		{
			if ((imm!=null)&&(imm>=4096))
			{
				stopCompilation("Too many global variables which are not function block instances > 4096 bytes");
			}
		}
		// fallthrough
		case ASM_OP.STW:
		{
			if (imm!=null)
			{
				if (((imm<128)&&(imm>=0))&&(r1<8)&&(r2<8)&&(op!=ASM_OP.STW_FORCED_4_BYTE))
				{
					//r2[imm]:=r1
					var conv=imm>>2;
					tmp=(r2<<3)|(r1<<0)|(conv<<6)|(3<<13);
					addAsmDescr(rel_pc,2,"r"+r2+"["+imm+"]:=r"+r1);
					compiled_program_DataView.setUint16(rel_pc,tmp,true);rel_pc+=2;
				}
				else
				{
					//r2[imm]:=r1
					if ((arm7_mode==false)&&(imm<4096))
					{
						conv_tmp_dv.setInt32(0,imm,true);
						tmp=conv_tmp_dv.getUint32(0,true);
						tmp&=0xfff;
						tmp=((r2)<<16)|((r1)<<12)|(tmp)|(3980<<20);
						addAsmDescr(rel_pc,4,"r"+r2+"["+imm+"]:=r"+r1);
						storeInstruction32Bit(rel_pc,tmp);rel_pc+=4;
					}
					else
					{
						encodeAsm1(ASM_OP.MOV,2,-1,-1,-1, imm);
						encodeAsm1(ASM_OP.STW,r2,2,r1,-1, null);
					}
				}
			}
			else if (r3==-1)
			{
				//[r2]:=r1
				addAsmDescr(rel_pc,2,"[r"+r2+"]:=r"+r1);
				tmp=((r2)<<3)|((r1)<<0)|(0xC<<11);
				compiled_program_DataView.setUint16(rel_pc,tmp,true);rel_pc+=2;
			}
			else 
			{
				//r1[r2]:=r3
				addAsmDescr(rel_pc,2,"r"+r1+"[r"+r2+"]:="+"r"+r3);
				tmp=(r1<<3)|(r2<<6)|(r3<<0)|(0x5<<12);
				compiled_program_DataView.setUint16(rel_pc,tmp,true);rel_pc+=2;
			}
			
			break;
		}
		
		case ASM_OP.STH:
		{
			if (imm!=null)
			{
				//r2[imm]:=r1
				if ((arm7_mode==false)&&(imm<4096))
				{
					conv_tmp_dv.setInt32(0,imm,true);
					tmp=conv_tmp_dv.getUint32(0,true);
					tmp&=0xfff;
					tmp=((r2)<<16)|((r1)<<12)|(tmp)|(0xF8a<<20);
					addAsmDescr(rel_pc,4,"r"+r2+"["+imm+"].H:=r"+r1);
					storeInstruction32Bit(rel_pc,tmp);rel_pc+=4;
				}
				else
				{
					encodeAsm1(ASM_OP.MOV,2,-1,-1,-1, imm);
					encodeAsm1(ASM_OP.STH,r2,2,r1,-1, null);
				}
			}
			else if (r3==-1)
			{
				//[r2]:=r1
				addAsmDescr(rel_pc,2,"[r"+r2+"].H:=r"+r1);
				tmp=((r2)<<3)|((r1)<<0)|(0x1<<15);
				compiled_program_DataView.setUint16(rel_pc,tmp,true);rel_pc+=2;
			}
			else if ((r1<8)&&(r2<8)&&(r3<8))
			{
				//r1[r2]:=r3
				addAsmDescr(rel_pc,2,"r"+r1+"[r"+r2+"].H:="+"r"+r3);
				tmp=(r1<<3)|(r2<<6)|(r3<<0)|(0x29<<9);
				compiled_program_DataView.setUint16(rel_pc,tmp,true);rel_pc+=2;
			}
			else 
			{
				if (arm7_mode==false)
				{	
					//r1[r2]:=r3
					tmp=(r3<<12)|(r1<<16)|(r2<<0)|(0x1f<<(16+11))|(2<<(16+4));
					addAsmDescr(rel_pc,4,"r"+r1+"[r"+r2+"].H:="+"r"+r3);
					storeInstruction32Bit(rel_pc,tmp);rel_pc+=4;
				}
				else
				{
					stopCompilation("Not Supported in SAM7-3");
				}
			}

			break;
		}

		case ASM_OP.STB:
		{
			if (imm!=null)
			{
				if ((arm7_mode==false)&&(imm<4096))
				{
					//r2[imm]:=r1
					conv_tmp_dv.setInt32(0,imm,true);
					tmp=conv_tmp_dv.getUint32(0,true);
					tmp&=0xfff;
					tmp=((r2)<<16)|((r1)<<12)|(tmp)|(0xF88<<20);
					addAsmDescr(rel_pc,4,"r"+r2+"["+imm+"].B:=r"+r1);
					storeInstruction32Bit(rel_pc,tmp);rel_pc+=4;
				}
				else
				{
					encodeAsm1(ASM_OP.MOV,2,-1,-1,-1, imm);
					encodeAsm1(ASM_OP.STB,r2,2,r1,-1, null);
				}
			}
			else if (r3==-1)
			{
				//[r2]:=r1
				addAsmDescr(rel_pc,2,"[r"+r2+"].B:=r"+r1);
				tmp=((r2)<<3)|((r1)<<0)|(0x7<<12);
				compiled_program_DataView.setUint16(rel_pc,tmp,true);rel_pc+=2;
			}
			else
			{
				//r1[r2]:=r3
				addAsmDescr(rel_pc,2,"r"+r1+"[r"+r2+"].B:="+"r"+r3);
				tmp=(r1<<3)|(r2<<6)|(r3<<0)|(0x15<<10);
				compiled_program_DataView.setUint16(rel_pc,tmp,true);rel_pc+=2;
			}
			break;
		}
		
		
		case ASM_OP.AND:
		{
			if (imm==null)
			{
				if ((r1<8)&&(r2<8)&&(r3<8))
				{
					tmp=(1<<14)|(r1<<3)|(r2<<0);
					addAsmDescr(rel_pc,2,"r"+r2+":="+"r"+r2+" AND "+"r"+r1);
					compiled_program_DataView.setUint16(rel_pc,tmp,true);rel_pc+=2;
				}
				else
				{	
					tmp=(r3<<8)|(r1<<0)|(r2<<16)|(117<<25);
					addAsmDescr(rel_pc,4,"r"+r3+":="+"r"+r1+" AND r"+r2);
					storeInstruction32Bit(rel_pc,tmp);rel_pc+=4;
				}
			}
			else
			{
				if (arm7_mode==false)
				{
					tmp=(r2<<8)|(r1<<16)|(((imm>>(8+3))&1)<<(10+16))|(((imm>>8)&0x7)<<(12))|(((imm)&0xff)<<(0))|(0xf<<(16+12));
					addAsmDescr(rel_pc,4,"r"+r2+":="+"r"+r1+" AND "+imm);
					storeInstruction32Bit(rel_pc,tmp);rel_pc+=4;
				}
				else
				{
					stopCompilation("Not yet: AND with  immediate");
				}
			}
			break;
		}
		case ASM_OP.OR:
		{
			if (imm==null)
			{
				if ((r1<8)&&(r2<8)&&(r3<8))
				{
					addAsmDescr(rel_pc,4,"r"+r2+":="+"r"+r2+" OR "+"r"+r1);
					tmp=(1<<14)|(3<<8)|(r1<<3)|(r2<<0);
					compiled_program_DataView.setUint16(rel_pc,tmp,true);rel_pc+=2;
				}
				else
				{
					addAsmDescr(rel_pc,4,"r"+r3+":="+"r"+r1+" OR r"+r2);
					tmp=(r3<<8)|(r1<<0)|(r2<<16)|(3748<<20);
					storeInstruction32Bit(rel_pc,tmp);rel_pc+=4;
				}
			}
			else
			{	
				stopCompilation("Not yet: OR with  immediate");
			}
			break;
		}
		case ASM_OP.F_GT:
		case ASM_OP.F_GE:
		case ASM_OP.F_LT:
		case ASM_OP.F_LE:
		case ASM_OP.F_EQ:
		case ASM_OP.F_NE:
		{
			// r3:=s1>s2
			addAsmDescr(rel_pc,4,"f_cmp s"+r1+",s"+r2);
			tmp=(7<<(13+16))|(7<<(9+16))|(1<<(7+16))|(0xd<<(2+16))|(5<<9)|(1<<6)|((r1&1)<<(6+16))|((r1>>1)<<12)|((r2&1)<<(5))|((r2>>1)<<0);
			storeInstruction32Bit(rel_pc,tmp);rel_pc+=4;
			addAsmDescr(rel_pc,4,"VMRS");
			tmp=(7<<(13+16))|(7<<(9+16))|(1<<(16))|(0xF<<(4+16))|(5<<9)|(1<<4)|(0xf<<12);
			storeInstruction32Bit(rel_pc,tmp);rel_pc+=4;
			for(i=0;i<it_encoding.length;i++)
			{
				if (it_encoding[i].op1==op)
				{
					addAsmDescr(rel_pc,6,"r"+r3+":="+"r"+r1+it_encoding[i].sign+"r"+r2);
					compiled_program_DataView.setUint16(rel_pc,it_encoding[i].enc,true);rel_pc+=2;
					tmp=(1<<13)|(r3<<8)|0;
					compiled_program_DataView.setUint16(rel_pc,tmp,true);rel_pc+=2;
					tmp=(1<<13)|(r3<<8)|1;
					compiled_program_DataView.setUint16(rel_pc,tmp,true);rel_pc+=2;
					return;
				}
			}
			break;
		}



		case ASM_OP.GT:
		case ASM_OP.GE:
		case ASM_OP.LT:
		case ASM_OP.LE:
		case ASM_OP.EQ:
		case ASM_OP.NE:
		{
			// r3:=r1>r2
		    if (arm7_mode==true)
			{
				encodeAsm1(ASM_OP.MOV,tmp_reg,-1,-1,-1, 1); // R6:=1
				encodeAsm1(ASM_OP.CMP,r1,r2,-1,-1, null); // CMP R1,R2
				for(i=0;i<b_cond_encoding.length;i++)
	
				{
					if (b_cond_encoding[i].op==op)
					{
						addAsmDescr(rel_pc,2,"b_cond "+b_cond_encoding[i].sign+",2");
						compiled_program_DataView.setUint16(rel_pc,b_cond_encoding[i].enc,true);rel_pc+=2;
						encodeAsm1(ASM_OP.MOV,tmp_reg,-1,-1,-1, 0); // R6:=0
						encodeAsm1(ASM_OP.MOV,tmp_reg,r3,-1,-1, null); // R3:=R6
						return;
					}
				}
				stopCompilation("Invalid compare instruction");				
			}
			else
			{
				addAsmDescr(rel_pc,2,"CMP r"+r1+","+"r"+r2);
				tmp=(r1<<0)|(r2<<3)|(5<<7)|(1<<14);  // CMP R1,R2
				compiled_program_DataView.setUint16(rel_pc,tmp,true);rel_pc+=2;
				for(i=0;i<it_encoding.length;i++)
				{
					if (it_encoding[i].op==op)
					{
						addAsmDescr(rel_pc,6,"r"+r3+":="+"r"+r1+it_encoding[i].sign+"r"+r2);
						compiled_program_DataView.setUint16(rel_pc,it_encoding[i].enc,true);rel_pc+=2;
						tmp=(1<<13)|(r3<<8)|0;
						compiled_program_DataView.setUint16(rel_pc,tmp,true);rel_pc+=2;
						tmp=(1<<13)|(r3<<8)|1;
						compiled_program_DataView.setUint16(rel_pc,tmp,true);rel_pc+=2;
						return;
					}
				}
				stopCompilation("Invalid compare instruction");
			}


			break;
		}
	}		 
	
}


var active_temp_var=0;
var rel_pc;

var addr_wait_return,addr_preempt_return,addr_funct_return;

var loop_label_cnt;

var compiled_program;
var compiled_program_len=0;
var compiled_program_DataView;

var curr_task_elem,preempt_point_elem,funct_tbl_offset,func_tbl_len_offset;
var save_sp_offset,save_lr_offset,save_lr_caller_offset,save_fp_caller_offset;
var inst_trace_cnt_offset;

function getInstrTraceOffset()
{
	return inst_trace_cnt_offset;
}

function GetCompiledProgLen()
{
	return compiled_program_len;
}
function GetCompiledDataview()
{
	return compiled_program_DataView;
}

var C_arr="";

function relJumpAddr(dest_addr)
{
	return dest_addr-(rel_pc);
}

var task_structure_addrs=[];

function getTaskAddrs()
{
	return task_structure_addrs;
}


function generateAsm(ast)
{
	var i,j;
	asm_descr_ast=[];
	asm_descr=[];
	compiled_program=new ArrayBuffer(1024*100);
	compiled_program_DataView=new DataView(compiled_program);
	loop_label_cnt=0;
	patch_points=[];
	curr_task_elem=findVarElem(globals,"CURR_TASK");
	save_sp_offset=findVarElem(globals,"SAVE_SP");
	save_lr_offset=findVarElem(globals,"SAVE_LR");
	preempt_point_elem=findVarElem(globals,"PREEMPT_ARGEE");
	funct_tbl_offset=findVarElem(globals,"PTR_TO_FUNCT_TBL");
	save_lr_caller_offset=findVarElem(globals,"SAVE_LR_CALLER");
	save_fp_caller_offset=findVarElem(globals,"SAVE_FP_CALLER");
	func_tbl_len_offset=findVarElem(globals,"FUNCT_TBL_LEN");
	inst_trace_cnt_offset=findVarElem(globals,"INSTR_TRACE_TBL");
	// code for preemption_point and for out_of_bounds_check
	generateFixedFunctionAsmCode();
	
	
	generateProgCode(ast);
	replaceLongJumps();
	
	
	
	
	// setup offsets of initialized elements of task data structures
	var i;
	var first_task=null;
	task_structure_addrs=[];
	var dv;
	for(i=0;i<globals.list[0].list.length;i++)
	{
		if (globals.list[0].list[i].segm_type==token_types.VAR_TASK)
		{
			if (globals.list[0].list[i].type.range_start!=undefined)
			{
				stopCompilation("Arrays of tasks are not allowed",globals.list[0].list[i]);
			}
			task_structure_addrs[task_structure_addrs.length]=globals.list[0].list[i].offset;	
		}
	}
	
	var curr_task=0;
	for(i=0;i<globals.list[0].list.length;i++)
	{
		if (globals.list[0].list[i].segm_type==token_types.VAR_TASK)
		{
			if (first_task==null)
			{
				first_task=globals.list[0].list[i];
			}
			var functBlock=findFunctBlock(globals.list[0].list[i].type.data);
			globals.list[0].list[i].initialize=new ArrayBuffer(globals.list[0].list[i].size);
			dv=new DataView(globals.list[0].list[i].initialize);
			// skip the prologue of the task.
			// Main program always sets R4 and PC to point to the right place in the task.
			// this way first start is the same as every other start
			dv.setUint32(0,functBlock.rel_addr+8,true); 
			
			dv.setUint32(4,globals.list[0].list[i].offset,true);
			if ((curr_task+1)!=task_structure_addrs.length)
			{
				dv.setUint32(8,task_structure_addrs[curr_task+1],true);
			}
			else
			{
				dv.setUint32(8,task_structure_addrs[0],true);
			}
			curr_task++;
		}
	}
	curr_task_elem.initialize=new ArrayBuffer(curr_task_elem.size);
	dv=new DataView(curr_task_elem.initialize);
	dv.setUint32(0,first_task.offset,true); // CURR_TASK
	preempt_point_elem.initialize=new ArrayBuffer(preempt_point_elem.size);
	dv=new DataView(preempt_point_elem.initialize);
	dv.setUint32(0,0,true); // PREEMPT_ARGEE


	// initalize INSTR_TRACE_TBL
	inst_trace_cnt_offset.initialize=new ArrayBuffer(inst_trace_cnt_offset.size);
	dv=new DataView(inst_trace_cnt_offset.initialize);
	dv.setUint16(0,nst_inst_trace_buf,true); // INSTR_TRACE_TBL length
	dv.setUint16(2,0,true); // INSTR_TRACE_TBL curr_cnt
	
	
	// create initialized program variables
	for(i=0;i<globals.list[0].list.length;i++)
	{
		if (globals.list[0].list[i].initialize!=undefined)
		{
			var dv1=new DataView(globals.list[0].list[i].initialize);
			var j;
			for(j=0;j<globals.list[0].list[i].size;j++)
			{
				compiled_program_DataView.setUint8(globals.list[0].list[i].offset+j,dv1.getUint8(j));
			}
		}
	}

	process.applyInitializers(compiled_program_DataView);
	
	GOM.setObjArr("ARGEE_RUN_CODE",0,GOM.convArrBufToArr(compiled_program,rel_pc));
	compiled_program_len=rel_pc;
	
	
	
	/*	
	// generate the C array
	C_arr="const unsigned char NST_Comp[]={";
	for(i=0;i<rel_pc;i++)
	{
		C_arr+=compiled_program_DataView.getUint8(i);
		C_arr+=",";
	}
	C_arr+="};";
	var res_div=this.document.getElementById("result");
	res_div.innerHTML=C_arr;
	var range = document.createRange();
    range.selectNode(res_div);
    window.getSelection().addRange(range);
	document.execCommand('copy');
	*/
	
}


/*function addToAsmOutput(str)
{
	asm_output+=rel_pc+":"+str+"\n";
}*/


function generateVarAddrCalcAsm(elem)
{
	var offset;
	var pos;
	var i;
	var ref_reg;
	var bit_offset=-1,bit_len=-1;
	
	
	
	switch(elem.var_ref_type)
	{
		case VAR_REF.LOCAL:
		case VAR_REF.GLOBAL:
		    if (elem.var_ref_type==VAR_REF.LOCAL)
			{
				ref_reg=loc_funct_frame_reg;
			}
			else
			{
				ref_reg=glob_var_reg;
			}
			offset=elem.ref_addr;
			pos=0;
			if (elem.offset_list.length!=0)
			{
				// add base to this
				if (elem.offset_list[0].offset!=undefined)
				{					
					offset+=elem.offset_list[0].offset;
				}
				else
				{
					bit_offset=elem.offset_list[0].bit_offset;
					bit_len=elem.offset_list[0].bit_len;
				}
				pos++;
			}
			break;
		case VAR_REF.POINTER:
			
			ref_reg=pointer_var_reg;
			offset=0;
			pos=0;
			if (elem.offset_list.length!=0)
			{
				// add base to this	
				offset+=elem.offset_list[0].offset;
				pos++;
			}
			break;
	}
	if (elem.offset_list.length==pos)
	{
		if (elem.var_ref_type==VAR_REF.POINTER)
		{
			encodeAsm(ASM_OP.LDW,loc_funct_frame_reg,pointer_var_reg,-1,-1,elem.ref_addr);
		}
		return {ref:ref_reg,size:elem.last_type.link.var_size,simp_offset:offset,bit_offset:bit_offset,bit_len:bit_len};
	}
	else
	{
		// later on - optimize for having a single element index -> no need to save and load R1
		
		encodeAsm(ASM_OP.MOV,1,-1,-1,-1,offset);
		// Array 
		// Index in the array can not be a pointer variable, can not be another array element -> It can only be a constant or a regular variable 
		
		if (elem.var_ref_type==VAR_REF.POINTER)
		{
			encodeAsm(ASM_OP.LDW,loc_funct_frame_reg,pointer_var_reg,-1,-1,elem.ref_addr);
		}
		
		switch(ref_reg)
		{
			case 3: encodeAsm(ASM_OP.MOV,3,tmp_reg,-1,-1,null); break;
			case 4: encodeAsm(ASM_OP.MOV,4,tmp_reg,-1,-1,null); break;
			case 5: encodeAsm(ASM_OP.MOV,5,tmp_reg,-1,-1,null); break;
		}

		
		for(i=pos;i<elem.offset_list.length;i++)
		{
			
			if (elem.offset_list[i].size!=undefined)
			{
				// 
				if (
				    (
					  (elem.offset_list[i].num.enum_type==ELEM.EXPR_VAR)&&
					  (elem.offset_list[i].num.list.length==1)&&
					  (elem.offset_list[i].num.var_ref_type!=VAR_REF.POINTER)
					)
					||
					(elem.offset_list[i].num.enum_type==ELEM.CONST)
				   )
				{
					genNext(2,elem.offset_list[i].num,null);
				}
				else
				{
					stopCompilation("array index can not be expression or a pointer variable",elem);
				}
				// perform array bounds check (R2->actual offset from the beginning of array, R1-> array address (from_ref_reg))
				encodeAsm(ASM_OP.BL,-1,-1,1,-1,relJumpAddr(arrayBoundsCheckAddr_gen));
				// if check fails - the program terminates and we don't reach this place
				// the exception can provide the LR to indicate the actual piece of code where the 
				// exception originated
				
				// if everything was successull with the bounds check -> the bounds check function will 
				// automatically perform r1:=r1+r2; r1=r1+4;
			}
			else if (elem.offset_list[i].offset!=undefined)
			{
				encodeAsm(ASM_OP.ADD,1,1,-1,-1,elem.offset_list[i].offset);
			}
		}
		
		return {ref:ref_reg,size:elem.last_type.link.var_size,offset_reg:1};
	}
}

function getDataElemPointer(reg,ast)
{
	var offset=generateVarAddrCalcAsm(ast);
	var src;
	var reg_access=true;	
	if (offset.simp_offset!=undefined)
	{
		src=offset.simp_offset;
		reg_access=false;
	}
	else
	{
		src=1;
	}
	if (reg!=0)
	{
		encodeAsm(ASM_OP.PUSH_CONSEQ_REGS,0,0,-1,-1,null); 
	}
	if (reg_access==false)
	{
		encodeAsm(ASM_OP.MOV,0,-1,-1,-1,src);
		encodeAsm(ASM_OP.ADD,offset.ref,0,0,-1,null);
	}
	else
	{
		//encodeAsm(ASM_OP.MOV,0,-1,-1,-1,src);
		//encodeAsm(ASM_OP.ADD,0,offset.ref,src,-1,null);
		encodeAsm(ASM_OP.ADD,src,offset.ref,0,-1,null);
		
	}
	if (reg!=0)
	{
		encodeAsm(ASM_OP.MOV,0,reg,-1,-1,null);
		encodeAsm(ASM_OP.POP_CONSEQ_REGS,0,0,-1,-1,null); 
	}
}
var last_var_is_ptr=false;
function generateReadVar(reg,ast,allow_ptr)
{
	
	var src=1;
	var reg_access=true;
	

	// pointer is a data structure or array (without index)
	if (((ast.last_type.link.cdt!=undefined)&&(ast.last_type.link.cdt==true))||((ast.last_type.link.enum_type!=undefined)&&(ast.last_type.link.enum_type==ELEM.FUNCT_BLOCK))
		||((ast.list[ast.list.length-1].enum_type==ELEM.EXPR_VAR)&&(ast.list[ast.list.length-1].link.type.range_start!=undefined))
		||(allow_ptr==2) // forced pointer assignment
		)
	{
		if (allow_ptr==false)
		{
			stopCompilation("invalid pointer variable",ast);
		}
		getDataElemPointer(reg,ast);
		last_var_is_ptr=true;
		return;
	}
	
	var offset=generateVarAddrCalcAsm(ast);
	
	if (offset.simp_offset!=undefined)
	{
		src=offset.simp_offset;
		reg_access=false;
	}
	var reg_back=reg;
	if (ast.fp==true)
	{
		reg=tmp_reg; // register 6 is used as a scratch register during FP operations
	}
	
	if (reg_access==false)
	{
		
		switch(offset.size)
		{
			case 4:
				if (offset.bit_offset!=-1)
				{
					if ((offset.bit_offset+offset.bit_len)>32)
					{
						stopCompilation("Crossing the 32 bit boundary in bitmap is not allowed",ast);
					}
					if (arm7_mode==true)
					{
						if ((rel_pc%4)!=0)
						{
							// add nop -> Add r0,r0,0
							encodeAsm(ASM_OP.ADD,0,0,1,-1,0); 
						}
	
						if (reg==0)
						{
							encodeAsm(ASM_OP.BL,-1,-1,1,-1,relJumpAddr(ubfx_r0_jump_addr)); 
						}
						else
						{
							encodeAsm(ASM_OP.BL,-1,-1,1,-1,relJumpAddr(ubfx_r1_jump_addr)); 
						}
						var tmp1=((src&0xffff)<<16)|((offset.bit_offset&0xff)<<8)|((offset.bit_len&0xff));
						addAsmDescr(rel_pc,4,".data="+tmp1);
						compiled_program_DataView.setUint32(rel_pc,tmp1,true);rel_pc+=4;	
					}
					else
					{
						encodeAsm(ASM_OP.LDW,offset.ref,reg,-1,-1,src);
						encodeAsm(ASM_OP.UBFX,reg,reg,offset.bit_offset,offset.bit_len,null);
					}
				}
				else
				{
					encodeAsm(ASM_OP.LDW,offset.ref,reg,-1,-1,src);
				}
				//addToAsmOutput(reg+":=LDW"+offset.ref+"["+src+"]");rel_pc+=4;
				break;
			case 2:
				encodeAsm(ASM_OP.LDH,offset.ref,reg,-1,-1,src);
				//addToAsmOutput(reg+":=LDH"+offset.ref+"["+src+"]");rel_pc+=4;
				//stopCompilation("invalid var 2 bytes",ast);
				break;
			case 1:
				encodeAsm(ASM_OP.LDB,offset.ref,reg,-1,-1,src);
				//addToAsmOutput(reg+":=LDB"+offset.ref+"["+src+"]");rel_pc+=4;
				//stopCompilation("invalid var 1 bytes",ast);
				break;
		}
	}
	else
	{
		switch(offset.size)
		{
			case 4:
				encodeAsm(ASM_OP.LDW,offset.ref,src,reg,-1,null);
				//addToAsmOutput(reg+":=LDW"+offset.ref+"["+src+"]");rel_pc+=4;
				break;
			case 2:
				encodeAsm(ASM_OP.LDH,offset.ref,src,reg,-1,null);
				//addToAsmOutput(reg+":=LDH"+offset.ref+"["+src+"]");rel_pc+=4;
				//stopCompilation("invalid var 2 bytes",ast);
				break;
			case 1:
				encodeAsm(ASM_OP.LDB,offset.ref,src,reg,-1,null);
				//addToAsmOutput(reg+":=LDB"+offset.ref+"["+src+"]");rel_pc+=4;
				//stopCompilation("invalid var 1 bytes",ast);
				break;
		}
	}
	if (ast.fp==true)
	{
		encodeAsm(ASM_OP.REG_TO_FP,reg,reg_back,-1,-1,null);		
	}
}



function generateWriteVar(ast,allow_ptr)
{
	var offset;


	if ((ast.enum_type==ELEM.EXPR_VAR)&&(ast.list[ast.list.length-1].enum_type==ELEM.EXPR_VAR)&&
	    (ast.list[ast.list.length-1].link.segm_type==token_types.VAR_INPUT)&&(ast.parent_node.enum_type!=ELEM.FUNC_BLOCK_VAR_ASSIGN))
	{
		stopCompilation("Can not assign a value to input variable",ast.list[ast.list.length-1]);			
	}
	
	if ((((ast.last_type.link.cdt!=undefined)&&(ast.last_type.link.cdt==true))||((ast.last_type.link.enum_type!=undefined)&&(ast.last_type.link.enum_type==ELEM.FUNCT_BLOCK))
			||((ast.list[ast.list.length-1].enum_type==ELEM.EXPR_VAR)&&(ast.list[ast.list.length-1].link.type.range_start!=undefined)))
		    ||(allow_ptr==2) // forced pointer assignment
		)
	{
		if (ast.list[ast.list.length-1].link==undefined)
		{
			stopCompilation("Invalid assignment",ast);
		}
		// Destination is an array or data structure
		if (ast.list[ast.list.length-1].link.segm_type!=token_types.VAR_INOUT)
		{
			stopCompilation("Can not assign an array or data structure unless it is VAR_IN_OUT",ast.list[ast.list.length-1]);
		}
		if (last_var_is_ptr!=true)
		{
			stopCompilation("Can not assign a value to array or data structure",ast.list[ast.list.length-1]);			
		}
		if (allow_ptr==false)
		{
				stopCompilation("invalid pointer variable",ast);
		}
		getDataElemPointer(1,ast);
		encodeAsm(ASM_OP.STW,0,1,-1,-1,null);
		return;
	}
	else
	{
		if (last_var_is_ptr==true)
		{
			stopCompilation("Can not assign a pointer to a regular variable",ast.list[ast.list.length-1]);
		}	
	}

	


	
			
	// assume value to be written is in r0;
	if ((ast.offset_list.length==0)||
	     ((ast.offset_list.length==1)&&((ast.offset_list[0].offset!=undefined)||(ast.offset_list[0].bit_offset!=undefined))))
	{
		offset=generateVarAddrCalcAsm(ast);
	}		
	else
	{
		// I may not need to save R0 size it is saved in expression evaluation
		encodeAsm(ASM_OP.PUSH_CONSEQ_REGS,0,0,-1,-1,null); 
		offset=generateVarAddrCalcAsm(ast);
		encodeAsm(ASM_OP.POP_CONSEQ_REGS,0,0,-1,-1,null); 
		
	}
	var src=1;
	var reg_access=true;
	if (offset.simp_offset!=undefined)
	{
		src=offset.simp_offset;
		reg_access=false;
	}
	
	if (ast.fp==true)
	{
		encodeAsm(ASM_OP.FP_TO_REG,0,0,-1,-1,null);
	}
	
	if (reg_access==false)
	{
		switch(offset.size)
		{
			case 4:
			
				if (offset.bit_offset!=-1)
				{
					if ((offset.bit_offset+offset.bit_len)>32)
					{
						stopCompilation("Crossing the 32 bit boundary in bitmap is not allowed",ast);
					}
					
					if (arm7_mode==true)
					{
						if ((rel_pc%4)!=0)
						{
							// add nop -> Add r0,r0,0
							encodeAsm(ASM_OP.ADD,0,0,1,-1,0); 
						}
						// we can use R1/r2 as scrap registers during the assignment
						encodeAsm(ASM_OP.BL,-1,-1,1,-1,relJumpAddr(bfi_jump_addr)); 
						var tmp1=((src&0xffff)<<16)|((offset.bit_offset&0xff)<<8)|((offset.bit_len&0xff));
						addAsmDescr(rel_pc,4,".data="+tmp1);
						compiled_program_DataView.setUint32(rel_pc,tmp1,true);rel_pc+=4;	
					}
					else
					{
						// we can use R1/r2 as scrap registers during the assignment
						encodeAsm(ASM_OP.LDW,offset.ref,1,-1,-1,src);		
						encodeAsm(ASM_OP.BFI,0,1,offset.bit_offset,offset.bit_offset+offset.bit_len-1,null);		
						encodeAsm(ASM_OP.STW,1,offset.ref,-1,-1,src); 
					}
				}
				else
				{
					encodeAsm(ASM_OP.STW,0,offset.ref,-1,-1,src); 
				}
				//addToAsmOutput("STW r0,"+offset.ref+"["+src+"]");rel_pc+=4;
				break;
			case 2:
				encodeAsm(ASM_OP.STH,0,offset.ref,-1,-1,src); 
				//addToAsmOutput("STH r0,"+offset.ref+"["+src+"]");rel_pc+=4;
				//stopCompilation("invalid var 2 bytes",ast);
				break;
			case 1:
				encodeAsm(ASM_OP.STB,0,offset.ref,-1,-1,src); 
				//addToAsmOutput("STB r0,"+offset.ref+"["+src+"]");rel_pc+=4;
				//stopCompilation("invalid var 1 bytes",ast);
				break;
		}
	}
	else
	{
		switch(offset.size)
		{
			case 4:
				encodeAsm(ASM_OP.STW,offset.ref,src,0,-1,null); 
				//addToAsmOutput("STW r0,"+offset.ref+"["+src+"]");rel_pc+=4;
				break;
			case 2:
				encodeAsm(ASM_OP.STH,offset.ref,src,0,-1,null); 
				//addToAsmOutput("STH r0,"+offset.ref+"["+src+"]");rel_pc+=4;
				//stopCompilation("invalid var 2 bytes",ast);
				break;
			case 1:
				encodeAsm(ASM_OP.STB,offset.ref,src,0,-1,null); 
				//addToAsmOutput("STB r0,"+offset.ref+"["+src+"]");rel_pc+=4;
				//stopCompilation("invalid var 1 bytes",ast);
				break;
		}
	}
}

function genNext(reg,ast,op)
{
	if (ast.enum_type==ELEM.EXPR)
	{
		if (ast.fp==true)
		{
			encodeAsm(ASM_OP.F_PUSH,0,-1,-1,-1,1); 
		}
		else
		{
			encodeAsm(ASM_OP.PUSH_CONSEQ_REGS,0,0,-1,-1,null); 
		}
	}
	generateExprAsm(reg,ast,false);
	if (ast.enum_type==ELEM.EXPR)
	{
		if (op==null)
		{
			if (ast.fp==true)
			{
				encodeAsm(ASM_OP.F_POP,0,-1,-1,-1,1); 
			}
			else
			{
				encodeAsm(ASM_OP.POP_CONSEQ_REGS,0,0,-1,-1,null); 
			}
		}
		else
		{
			if (ast.fp==true)
			{
				encodeAsm(ASM_OP.F_POP,0,-1,-1,-1,1); 
			}
			else
			{
				encodeAsm(ASM_OP.POP_CONSEQ_REGS,0,0,-1,-1,null); 
			}
			genRegOp(0,0,reg,op.data);			
		}
	}
	else
	{
		if (op!=null)
		{
			genRegOp(0,0,reg,op.data);			
		}
	}
}

function generateExprAsm(reg,ast,allow_ptr)
{
	var i;
	var pos;
	switch(ast.enum_type)
	{
		case ELEM.TO_FLOAT:
			 generateExprAsm(tmp_reg,ast.list[0],false);
			 encodeAsm(ASM_OP.TO_FLOAT,tmp_reg,reg,-1,-1,null); 
			 break;
		case ELEM.TO_INT:
			 generateExprAsm(0,ast.list[0],false);
			 encodeAsm(ASM_OP.TO_INT,0,reg,-1,-1,null); 
			 break;

		case ELEM.FUNC:
			 if (reg!=0)
			 {
				 encodeAsm(ASM_OP.PUSH_CONSEQ_REGS,0,0,-1,-1,null); 
			 }
			 generateProgCode(ast);
			 if (reg!=0)
			 {
				 encodeAsm(ASM_OP.MOV,0,reg,-1,-1,null);
				 encodeAsm(ASM_OP.POP_CONSEQ_REGS,0,0,-1,-1,null); 
			 }
				 
			 break;
		case ELEM.CONST:
			 encodeAsm(ASM_OP.MOV,reg,-1,-1,-1,ast.data); 
			 break;
		case ELEM.EXPR_VAR:
			 generateReadVar(reg,ast,allow_ptr);
			 break;
		case ELEM.EXPR:
		     if (ast.list[0].enum_type==ELEM.OP)
			 {
			    if (ast.list[0].data==token_types.MINUS)
				{
					generateExprAsm(0,ast.list[1],false);
					encodeAsm(ASM_OP.NEG,0,0,-1,-1,null);
				}
				else if (ast.list[0].data==token_types.NOT)
				{
					generateExprAsm(0,ast.list[1],false);
					encodeAsm(ASM_OP.NOT,0,0,-1,-1,null);
				}
				else
				{
					//generateExprAsm("r0",ast.list[1]);
					//addToAsmOutput("r0:=NOT r0"); rel_pc+=2;
					stopCompilation("invalid expression type " +ast.list[0].data+ " ",ast);
				}
				pos=2;
			 }
			 else
			 {
				generateExprAsm(0,ast.list[0],allow_ptr); 
				pos=1;
			 }
		     for(i=pos;i<ast.list.length;i+=2)
			 {
				genNext(1,ast.list[i+1],ast.list[i]); 
			 }
			 if (reg!=0)
			 {
				if (ast.fp==true)
				{
					encodeAsm(ASM_OP.F_MOV,0,reg,-1,-1,null);  
				}
				else
				{					
					encodeAsm(ASM_OP.MOV,0,reg,-1,-1,null);  
				}
				//addToAsmOutput(reg+":=r0");rel_pc+=2;
			 }
			 break;
	}
}



function prettyPrintAsm()
{
	var i;
	asm_descr.sort(compareDescr);
	for(i=0;i<asm_descr.length;i++)
	{
		console.log(asm_descr[i].pos+"  "+asm_descr[i].descr);
	}
}

function prettyPrintAsm_to_str()
{
	var i;
	var str="";
	asm_descr.sort(compareDescr);
	for(i=0;i<asm_descr.length;i++)
	{
		str+=asm_descr[i].pos+"  "+asm_descr[i].descr+"\n";
	}
	return str;
}


function findAsmPos(pos)
{
	var i;
	for(i=0;i<asm_descr.length;i++)
	{
		if (asm_descr[i].pos==pos)
		{
			return i;
		}
	}
	return -1;
}

var asm_descr_ast=[];

function addAsmAST_Mapping(ast)
{
	var elem;
	//if ((asm_map_cnt%2)==0)
	{
		elem=asm_descr_ast.length;
		asm_descr_ast[elem]={start_pos:rel_pc,obj:ast};
	}
	/*else
	{
		elem=asm_descr_ast.length-1;
		asm_descr_ast[elem].end_pos=rel_pos;
	}*/
}




function printCompiled()
{
	var i;
	asm_descr.sort(compareDescr);
	console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
	// merge arrays
	for(i=0;i<asm_descr_ast.length;i++)
	{
		var pos=findAsmPos(asm_descr_ast[i].start_pos);
		asm_descr[pos].obj=asm_descr_ast[i].obj;
	}
	for(i=0;i<asm_descr.length;i++)
	{
		var asm_enc;
		if (asm_descr[i].obj!=undefined)
		{
			parse.quickPrintAST(asm_descr[i].obj);
		}
		if (asm_descr[i].len==2)
		{
			asm_enc=pad(compiled_program_DataView.getUint16(asm_descr[i].pos,true).toString(16),4);
		}
		else
		{
			asm_enc=pad(compiled_program_DataView.getUint32(asm_descr[i].pos,true).toString(16),8);
		}
		console.log(asm_descr[i].pos+"  "+asm_enc+" "+asm_descr[i].descr);
	}
	
}

function findAddrInAsmElements(addr)
{
	var i;
	for(i=0;i<(asm_descr_ast.length-1);i++)
	{
		if ((asm_descr_ast[i].start_pos<=addr)&&(asm_descr_ast[i+1].start_pos>addr))
		{
			return asm_descr_ast[i].obj;
		}
	}
	return null;
}

function printCompiledToStr()
{
	var i;
	var str="";
	asm_descr.sort(compareDescr);
	// merge arrays
	for(i=0;i<asm_descr_ast.length;i++)
	{
		var pos=findAsmPos(asm_descr_ast[i].start_pos);
		asm_descr[pos].obj=asm_descr_ast[i].obj;
	}
	for(i=0;i<asm_descr.length;i++)
	{
		var asm_enc;
		if (asm_descr[i].obj!=undefined)
		{
			str+=quickPrintASTtoStr(asm_descr[i].obj);
		}
		if (asm_descr[i].len==2)
		{
			asm_enc=pad(compiled_program_DataView.getUint16(asm_descr[i].pos,true).toString(16),4);
		}
		else
		{
			asm_enc=pad(compiled_program_DataView.getUint32(asm_descr[i].pos,true).toString(16),8);
		}
		str+=asm_descr[i].pos+"(0x"+(asm_descr[i].pos.toString(16))+")  "+asm_enc+" "+asm_descr[i].descr+"\n";
	}
	return str;
	
}

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}	

/*function printCompiledAST(parent,ast)
{
	var i;
	if ((ast.enum_type==ELEM.EXPR)&&(parent.enum_type!=ELEM.EXPR))
	{
		quickPrintAST(ast);
	}
	if (ast.asm_addr_list!=undefined)
	{
		for(i=0;i<ast.asm_addr_list.length;i++)
		{
			var pos=findAsmPos(ast.asm_addr_list[i].start_addr);
			for(j=0;j<ast.asm_addr_list[i].end_addr;j++)
			{
				if ((asm_descr.length<=(pos+j))||(asm_descr[pos+j].pos==ast.asm_addr_list[i].end_addr))
				{
					break;
				}
				var asm_enc;
				if (asm_descr[pos+j].len==2)
				{
					asm_enc=pad(compiled_program_DataView.getUint16(asm_descr[pos+j].pos,true).toString(16),4);
				}
				else
				{
					asm_enc=pad(compiled_program_DataView.getUint32(asm_descr[pos+j].pos,true).toString(16),8);
				}
				console.log(asm_descr[pos+j].pos+"  "+asm_enc+" "+asm_descr[pos+j].descr);
			}
			if ((ast.list!=undefined)&&(ast.list[i]!=undefined))
			{
				printCompiledAST(ast,ast.list[i]);
			}
		}
	}
	else
	{
		if (ast.list!=undefined)
		{
			for(i=0;i<ast.list.length;i++)
			{
				printCompiledAST(ast,ast.list[i]);
			}
		}
	}		
}
*/


function compareDescr(a,b)
{
	if (a.pos<b.pos)
	{
		return -1;
	}
	else if (a.pos>b.pos)
	{
		return 1;
	}
	return 0;
}



var patch_points=[];

var JMP_TYPE=
{
	NEAR:0,
	FAR:1,
};
	

function addPatchPoint(func,type)
{
	var curr_patch=patch_points.length;
	patch_points[curr_patch]={func:func,patch:curr_patch,pc:rel_pc,type:type};
	if (type==JMP_TYPE.NEAR)
	{
		rel_pc+=2;
	}
	else
	{
		rel_pc+=4;	
	}
	return curr_patch;
}

function findFuncBlock(name)
{
	var i;
	for(i=0;i<globals.list[1].list.length;i++)
	{
		if (globals.list[1].list[i].name==name)
		{
			return globals.list[1].list[i];
		}
	}
	return null;
}

function replacePatch(patch_index,rel_branch)
{
	var curr_rel_pc=rel_pc;
	var loc=patch_points[patch_index].pc;
	rel_pc=loc;
	if (patch_points[patch_index].type==JMP_TYPE.FAR)
	{
		encodeAsm(ASM_OP.BL,-1,-1,-1,-1,rel_branch);
	}
	else
	{
		encodeAsm(ASM_OP.BRANCH,-1,-1,-1,-1,rel_branch);
	}
	rel_pc=curr_rel_pc;
}

function replaceCondJumpPatch(pos,op)
{
	var curr_rel_pc=rel_pc;
	var jump_offset=curr_rel_pc-4-pos;
	rel_pc=pos;
	encodeAsm(op,-1,-1,-1,-1,jump_offset);
	rel_pc=curr_rel_pc;
}

function replaceLongJumps()
{
	for(i=0;i<patch_points.length;i++)
	{
		if ((patch_points[i].func!=null)&&(patch_points[i].type==JMP_TYPE.FAR))
		{
			var func=findFuncBlock(patch_points[i].func);
			var branch_len=func.rel_addr-patch_points[i].pc;
			replacePatch(i,branch_len);
		}
	}
}


var arrayBoundsCheckAddr_3,arrayBoundsCheckAddr_4,arrayBoundsCheckAddr_5,arrayBoundsCheckAddr_gen;
var preemptionPointAddr;
var functCallAddr_01_arg,functCallAddr_2_arg,functCallAddr_3_arg,functCallAddr_4_arg;
var waitUntilAddr,contextSwitchAddr;
var breakpoint_jmp_addr;

function getBreakpointJmpAddr()
{
	return breakpoint_jmp_addr;
}


function JumpInstTraceWithAST(ast,check_r0)
{
	if (ast.disable_trace==true)
	{
		return;
	}
	var tmp1=ast.line_num;	
	if (tmp1>(nst_inst_trace_buf*8))
	{
		// can't record this trace
		// no need to do run-time checks
		return;
	}
	if ((check_r0==true)||(arm7_mode==true))
	{
		encodeAsm(ASM_OP.BL,-1,-1,1,-1,relJumpAddr(instr_trace_jmp_addr));
	}
	else
	{
		encodeAsm(ASM_OP.BL,-1,-1,1,-1,relJumpAddr(instr_trace_jmp_addr_skip_r0_check)); 
	}
	
	addAsmDescr(rel_pc,2,".data="+tmp1);
	compiled_program_DataView.setUint16(rel_pc,tmp1,true);rel_pc+=2;						
}

var instr_trace_jmp_addr,
    instr_trace_jmp_addr_skip_r0_check,bfi_jump_addr,
	ubfx_r0_jump_addr,ubfx_r1_jump_addr,
	div_jump_addr,mod_jump_addr;

// generate the code which does array_bounds_check and preemption_point
function generateFixedFunctionAsmCode()

{
	var patch_points_at=[];
	var pc_at=[];
	var i;
	var curr_patch=0;

	if (arm7_mode==true)
	{	
		arrayBoundsCheckAddr_gen=rel_pc;
		
		encodeAsm(ASM_OP.PUSH_CONSEQ_REGS,0,1,-1,-1,null); 
		encodeAsm(ASM_OP.PUSH_CONSEQ_REGS,5,5,-1,-1,null); 
		encodeAsm(ASM_OP.LDH,tmp_reg,1,5,-1,null); // R5:=ref_reg[array_addr] -> size of array
		encodeAsm(ASM_OP.ADD,1,1,-1,-1,2); // increment array_addr by 2 -> get to "element size"
		encodeAsm(ASM_OP.LDH,tmp_reg,1,0,-1,null); // R0:=ref_reg[array_addr] -> element size
		
		
		encodeAsm(ASM_OP.MUL,0,2,-1,-1,null);
		
		encodeAsm(ASM_OP.CMP,2,5,-1,-1,null);
		encodeAsm(ASM_OP.POP_CONSEQ_REGS,5,5,-1,-1,null); 
		encodeAsm(ASM_OP.POP_CONSEQ_REGS,0,1,-1,-1,null); 
		
		curr_patch=rel_pc;
		//encodeAsm(ASM_OP.B_LT,-1,-1,-1,-1,14);
		rel_pc+=2;
		// Jump to application
		encodeAsm(ASM_OP.MOV,14,7,-1,-1,null); // LR is copied into return pos
		encodeAsm(ASM_OP.MOV,0,-1,-1,-1,2); // exception code=2
		encodeAsm(ASM_OP.LDW_FORCED_4_BYTE,glob_var_reg,tmp_reg,-1,-1,save_lr_offset.offset);
		encodeAsm(ASM_OP.LDW_FORCED_4_BYTE,glob_var_reg,5,-1,-1,save_sp_offset.offset);
		encodeAsm(ASM_OP.MOV,5,13,-1,-1,null);
		encodeAsm(ASM_OP.MOV,tmp_reg,15,-1,-1,null); // jump to the main program - it will handle task switching				break;
	
	    // if in-bounds -> adjust the R1
		replaceCondJumpPatch(curr_patch,ASM_OP.B_LT);
		encodeAsm(ASM_OP.ADD,1,2,1,-1,null);
		encodeAsm(ASM_OP.ADD,1,1,-1,-1,4);
		encodeAsm(ASM_OP.MOV,14,15,-1,-1,null); // PC:=LR
		
		
		
		
		// preemption point
		preemptionPointAddr=rel_pc;
		encodeAsm(ASM_OP.LDW_FORCED_4_BYTE,glob_var_reg,0,-1,-1,preempt_point_elem.offset);
		encodeAsm(ASM_OP.CMP,0,-1,-1,-1,0); // CMP R0,0
		curr_patch=rel_pc;
		//encodeAsm(ASM_OP.B_EQ,0,-1,-1,-1,0);
		rel_pc+=2;
		encodeAsm(ASM_OP.MOV,0,-1,-1,-1,1); // r0 -> return code -> 0 - wait, 1-> preempt
		// has to be last instruction -> to avoid PC adjustment in the PG_Task
		encodeAsm(ASM_OP.MOV,14,7,-1,-1,null); // save LR in R7 (used to store data to current task
		encodeAsm(ASM_OP.SUB,7,-1,-1,-1,1); // clear the last bit of LR
		encodeAsm(ASM_OP.LDW_FORCED_4_BYTE,glob_var_reg,tmp_reg,-1,-1,save_lr_offset.offset);
		encodeAsm(ASM_OP.MOV,tmp_reg,15,-1,-1,null); // jump to the main program - it will handle task switching				break;
		replaceCondJumpPatch(curr_patch,ASM_OP.B_EQ);	
		encodeAsm(ASM_OP.MOV,14,15,-1,-1,null); // PC:=LR
		
		
		// wait until
		waitUntilAddr=rel_pc;
		encodeAsm(ASM_OP.LSL,0,0,-1,-1,31); // R0<<31
		encodeAsm(ASM_OP.LSR,0,0,-1,-1,31); // R0>>31
		encodeAsm(ASM_OP.CMP,0,-1,-1,-1,0); // CMP R0,0
		curr_patch=rel_pc;
		//encodeAsm(ASM_OP.B_NE,0,-1,-1,-1,0);
		rel_pc+=2;
	 	encodeAsm(ASM_OP.MOV,0,-1,-1,-1,0); // r0 -> return code -> 0 - wait, 1-> preempt
		encodeAsm(ASM_OP.LDW_FORCED_4_BYTE,glob_var_reg,tmp_reg,-1,-1,save_lr_offset.offset);
		encodeAsm(ASM_OP.MOV,tmp_reg,15,-1,-1,null); // jump to the main program - it will handle task switching				break;
		replaceCondJumpPatch(curr_patch,ASM_OP.B_NE);	
	    encodeAsm(ASM_OP.MOV,14,15,-1,-1,null); // PC:=LR
		
		// Context switch
		contextSwitchAddr=rel_pc;
		encodeAsm(ASM_OP.MOV,0,-1,-1,-1,8); // r0 -> return code -> 0 - wait, 1-> preempt, 8 -> context switch
		// has to be last instruction -> to avoid PC adjustment in the PG_Task
		encodeAsm(ASM_OP.MOV,14,7,-1,-1,null); // save LR in R7 (used to store data to current task
		encodeAsm(ASM_OP.SUB,7,-1,-1,-1,1); // clear the last bit of LR	
		encodeAsm(ASM_OP.LDW_FORCED_4_BYTE,glob_var_reg,tmp_reg,-1,-1,save_lr_offset.offset);
		encodeAsm(ASM_OP.MOV,tmp_reg,15,-1,-1,null); // jump to the main program - it will handle task switching				break;
	
		
		
		
		// function call in the firmware (based on the function number)
		functCallAddr_4_arg=rel_pc;
		encodeAsm(ASM_OP.POP_CONSEQ_REGS,3,3,-1,-1,null); 
		functCallAddr_3_arg=rel_pc;
		encodeAsm(ASM_OP.POP_CONSEQ_REGS,2,2,-1,-1,null); 
		functCallAddr_2_arg=rel_pc;
		encodeAsm(ASM_OP.POP_CONSEQ_REGS,1,1,-1,-1,null); 
		encodeAsm(ASM_OP.POP_CONSEQ_REGS,0,0,-1,-1,null); 
		functCallAddr_01_arg=rel_pc;
	
		
		encodeAsm(ASM_OP.PUSH_CONSEQ_REGS,5,7,-1,-1,null);
		encodeAsm(ASM_OP.PUSH_CONSEQ_REGS,2,2,-1,-1,null); 	
		encodeAsm(ASM_OP.MOV,5,-1,-1,-1,4);
		encodeAsm(ASM_OP.MUL,5,tmp_reg,-1,-1,null);
		encodeAsm(ASM_OP.MOV,glob_mirr_reg,7,-1,-1,null);
		encodeAsm(ASM_OP.LDW_FORCED_4_BYTE,7,5,-1,-1,funct_tbl_offset.offset); //get_function_tbl_offset
		encodeAsm(ASM_OP.LDW,5,tmp_reg,5,-1,null); //get pointer within the function table
	
		encodeAsm(ASM_OP.MOV,14,tmp_reg,-1,-1,null);
	    encodeAsm(ASM_OP.STW_FORCED_4_BYTE,tmp_reg,7,-1,-1,save_lr_caller_offset.offset); 
		encodeAsm(ASM_OP.STW_FORCED_4_BYTE,4,7,-1,-1,save_fp_caller_offset.offset); 
		
		encodeAsm(ASM_OP.MOV,15,2,-1,-1,null); // MOV R2,PC
		encodeAsm(ASM_OP.ADD,2,-1,-1,-1,7); // ADD R2,#7 // need an odd number for LR
		encodeAsm(ASM_OP.MOV,2,14,-1,-1,null); // MOV LR,R2
		encodeAsm(ASM_OP.POP_CONSEQ_REGS,2,2,-1,-1,null); 
		encodeAsm(ASM_OP.BX,5,-1,-1,-1,null); 
		encodeAsm(ASM_OP.MOV,7,glob_mirr_reg,-1,-1,null);
	    encodeAsm(ASM_OP.LDW_FORCED_4_BYTE,7,tmp_reg,-1,-1,save_lr_caller_offset.offset); 
		encodeAsm(ASM_OP.MOV,tmp_reg,14,-1,-1,null);
		
		// assume that if we are here -> we returned successfully -> no exceptions
	    encodeAsm(ASM_OP.POP_CONSEQ_REGS,5,7,-1,-1,null); 
		
		encodeAsm(ASM_OP.POP_CONSEQ_REGS,1,3,-1,-1,null); // restore normal regs
		encodeAsm(ASM_OP.MOV,14,15,-1,-1,null); // PC:=LR
	
		// breakpoint_jmp_addr
		breakpoint_jmp_addr=rel_pc;
		encodeAsm(ASM_OP.MOV,0,-1,-1,-1,3); // r0 -> 3 -> breakpoint
		encodeAsm(ASM_OP.MOV,14,7,-1,-1,null); // save LR in R7 (used to store data to current task
		encodeAsm(ASM_OP.SUB,7,-1,-1,-1,1); // clear the last bit of LR
		encodeAsm(ASM_OP.LDW_FORCED_4_BYTE,glob_var_reg,tmp_reg,-1,-1,save_lr_offset.offset);
		encodeAsm(ASM_OP.MOV,tmp_reg,15,-1,-1,null); // jump to the main program - it will handle task switching				break;
	
	
		
		// fixed direct asm_call functions
		var dir_asm_calls=findVarElem(globals,"DIRECT_ASM_CALLS");
		//instr_trace_jmp_addr
		div_jump_addr=dir_asm_calls.offset+0*12;
		mod_jump_addr=dir_asm_calls.offset+1*12;
		instr_trace_jmp_addr=dir_asm_calls.offset+2*12;
		bfi_jump_addr=dir_asm_calls.offset+3*12;
		ubfx_r0_jump_addr=dir_asm_calls.offset+4*12;
		ubfx_r1_jump_addr=dir_asm_calls.offset+5*12;
	}
	else
	{
		arrayBoundsCheckAddr_gen=rel_pc;
		
		encodeAsm(ASM_OP.PUSH_CONSEQ_REGS,0,1,-1,-1,null); 
		encodeAsm(ASM_OP.PUSH_CONSEQ_REGS,5,5,-1,-1,null); 
		encodeAsm(ASM_OP.LDH,6,1,5,-1,null); // R5:=ref_reg[array_addr] -> size of array
		encodeAsm(ASM_OP.ADD,1,1,-1,-1,2); // increment array_addr by 2 -> get to "element size"
		encodeAsm(ASM_OP.LDH,6,1,0,-1,null); // R0:=ref_reg[array_addr] -> element size
		
		
		encodeAsm(ASM_OP.MUL,0,2,-1,-1,null);
		
		encodeAsm(ASM_OP.CMP,2,5,-1,-1,null);
		encodeAsm(ASM_OP.POP_CONSEQ_REGS,5,5,-1,-1,null); 
		encodeAsm(ASM_OP.POP_CONSEQ_REGS,0,1,-1,-1,null); 
		
		
		encodeAsm(ASM_OP.B_LT,-1,-1,-1,-1,14);
		// Jump to application
		encodeAsm(ASM_OP.MOV,14,7,-1,-1,null); // LR is copied into return pos
		encodeAsm(ASM_OP.MOV,0,-1,-1,-1,2); // exception code=2
		encodeAsm(ASM_OP.LDW_FORCED_4_BYTE,glob_var_reg,6,-1,-1,save_lr_offset.offset);
		encodeAsm(ASM_OP.LDW_FORCED_4_BYTE,glob_var_reg,5,-1,-1,save_sp_offset.offset);
		encodeAsm(ASM_OP.MOV,5,13,-1,-1,null);
		encodeAsm(ASM_OP.MOV,6,15,-1,-1,null); // jump to the main program - it will handle task switching				break;
	
	    // if in-bounds -> adjust the R1
		encodeAsm(ASM_OP.ADD,1,2,1,-1,null);
		encodeAsm(ASM_OP.ADD,1,1,-1,-1,4);
		encodeAsm(ASM_OP.MOV,14,15,-1,-1,null); // PC:=LR
		
		
		
		
		// preemption point
		preemptionPointAddr=rel_pc;
		encodeAsm(ASM_OP.LDW_FORCED_4_BYTE,glob_var_reg,0,-1,-1,preempt_point_elem.offset);
		encodeAsm(ASM_OP.CBZ,0,-1,-1,-1,10);
		encodeAsm(ASM_OP.MOV,0,-1,-1,-1,1); // r0 -> return code -> 0 - wait, 1-> preempt
		// has to be last instruction -> to avoid PC adjustment in the PG_Task
		encodeAsm(ASM_OP.MOV,14,7,-1,-1,null); // save LR in R7 (used to store data to current task
		encodeAsm(ASM_OP.SUB,7,-1,-1,-1,1); // clear the last bit of LR
		encodeAsm(ASM_OP.LDW_FORCED_4_BYTE,glob_var_reg,6,-1,-1,save_lr_offset.offset);
		encodeAsm(ASM_OP.MOV,6,15,-1,-1,null); // jump to the main program - it will handle task switching				break;
		encodeAsm(ASM_OP.MOV,14,15,-1,-1,null); // PC:=LR
		
		
		// wait until
		waitUntilAddr=rel_pc;
		encodeAsm(ASM_OP.CBNZ,0,-1,-1,-1,6);
	 	encodeAsm(ASM_OP.MOV,0,-1,-1,-1,0); // r0 -> return code -> 0 - wait, 1-> preempt
		encodeAsm(ASM_OP.LDW_FORCED_4_BYTE,glob_var_reg,6,-1,-1,save_lr_offset.offset);
		encodeAsm(ASM_OP.MOV,6,15,-1,-1,null); // jump to the main program - it will handle task switching				break;
	    encodeAsm(ASM_OP.MOV,14,15,-1,-1,null); // PC:=LR
		
		// Context switch
		contextSwitchAddr=rel_pc;
		encodeAsm(ASM_OP.MOV,0,-1,-1,-1,8); // r0 -> return code -> 0 - wait, 1-> preempt, 8 -> context switch
		// has to be last instruction -> to avoid PC adjustment in the PG_Task
		encodeAsm(ASM_OP.MOV,14,7,-1,-1,null); // save LR in R7 (used to store data to current task
		encodeAsm(ASM_OP.SUB,7,-1,-1,-1,1); // clear the last bit of LR	
		encodeAsm(ASM_OP.LDW_FORCED_4_BYTE,glob_var_reg,6,-1,-1,save_lr_offset.offset);
		encodeAsm(ASM_OP.MOV,6,15,-1,-1,null); // jump to the main program - it will handle task switching				break;
	
		
		
		
		// function call in the firmware (based on the function number)
		functCallAddr_4_arg=rel_pc;
		encodeAsm(ASM_OP.POP_CONSEQ_REGS,3,3,-1,-1,null); 
		functCallAddr_3_arg=rel_pc;
		encodeAsm(ASM_OP.POP_CONSEQ_REGS,2,2,-1,-1,null); 
		functCallAddr_2_arg=rel_pc;
		encodeAsm(ASM_OP.POP_CONSEQ_REGS,1,1,-1,-1,null); 
		encodeAsm(ASM_OP.POP_CONSEQ_REGS,0,0,-1,-1,null); 
		functCallAddr_01_arg=rel_pc;
	
		
		encodeAsm(ASM_OP.PUSH_CONSEQ_REGS,5,7,-1,-1,null); 
		encodeAsm(ASM_OP.MOV,5,-1,-1,-1,4);
		encodeAsm(ASM_OP.MUL,5,6,-1,-1,null);
		encodeAsm(ASM_OP.MOV,11,7,-1,-1,null);
		encodeAsm(ASM_OP.LDW_FORCED_4_BYTE,7,5,-1,-1,funct_tbl_offset.offset); //get_function_tbl_offset
		encodeAsm(ASM_OP.LDW,5,6,5,-1,null); //get pointer within the function table
	
		encodeAsm(ASM_OP.MOV,14,6,-1,-1,null);
	    encodeAsm(ASM_OP.STW_FORCED_4_BYTE,6,7,-1,-1,save_lr_caller_offset.offset); 
		encodeAsm(ASM_OP.STW_FORCED_4_BYTE,4,7,-1,-1,save_fp_caller_offset.offset); 
		
		encodeAsm(ASM_OP.BLX,5,-1,-1,-1,null); 
		encodeAsm(ASM_OP.MOV,7,11,-1,-1,null);
	    encodeAsm(ASM_OP.LDW_FORCED_4_BYTE,7,6,-1,-1,save_lr_caller_offset.offset); 
		encodeAsm(ASM_OP.MOV,6,14,-1,-1,null);
		
		// assume that if we are here -> we returned successfully -> no exceptions
	    encodeAsm(ASM_OP.POP_CONSEQ_REGS,5,7,-1,-1,null); 
		
		encodeAsm(ASM_OP.POP_CONSEQ_REGS,1,3,-1,-1,null); // restore normal regs
		encodeAsm(ASM_OP.MOV,14,15,-1,-1,null); // PC:=LR
	
		// breakpoint_jmp_addr
		breakpoint_jmp_addr=rel_pc;
		encodeAsm(ASM_OP.MOV,0,-1,-1,-1,3); // r0 -> 3 -> breakpoint
		encodeAsm(ASM_OP.MOV,14,7,-1,-1,null); // save LR in R7 (used to store data to current task
		encodeAsm(ASM_OP.SUB,7,-1,-1,-1,1); // clear the last bit of LR
		encodeAsm(ASM_OP.LDW_FORCED_4_BYTE,glob_var_reg,6,-1,-1,save_lr_offset.offset);
		encodeAsm(ASM_OP.MOV,6,15,-1,-1,null); // jump to the main program - it will handle task switching				break;
		
		
		instr_trace_jmp_addr_skip_r0_check=rel_pc;
		encodeAsm(ASM_OP.MOV,0,-1,-1,-1,1); // R0:=1
		//instr_trace_jmp_addr
		instr_trace_jmp_addr=rel_pc;
		encodeAsm(ASM_OP.AND,0,0,-1,-1,1); // r0:=R0&1
		encodeAsm(ASM_OP.CBZ,0,-1,-1,-1,32); // IF R0=0-> skip
		encodeAsm(ASM_OP.PUSH_CONSEQ_REGS,0,4,-1,-1,null);
		encodeAsm(ASM_OP.MOV,14,1,-1,-1,null); // R1:=R14
		encodeAsm(ASM_OP.SUB,1,-1,-1,-1,1); // clear the last bit of R1(LR)
		encodeAsm(ASM_OP.LDH,1,1,-1,-1,0); // R1:=R1[0].H
		encodeAsm(ASM_OP.LSR,1,2,-1,-1,5); // R2:=R1>>5 (divide by 32)
		encodeAsm(ASM_OP.LSL,2,2,-1,-1,2); // R2:=R2<<4 (multiply by 4)
		encodeAsm(ASM_OP.MOV_CONST_4BYTE,4,-1,-1,-1,inst_trace_cnt_offset.offset+4); // R4:=inst_trace_cnt_offset.offset+4
		encodeAsm(ASM_OP.ADD,2,4,2,-1,null); // r2:=r4+r2
		encodeAsm(ASM_OP.AND,1,1,-1,-1,31); // R1:=R1&(31)
		encodeAsm(ASM_OP.LSL,1,0,-1,-1,null); // r0:=r0<<R1
		encodeAsm(ASM_OP.LDW,3,2,1,-1,null); // r1:=R3[r2]
		encodeAsm(ASM_OP.OR,0,1,-1,-1,null); // r1:=r1|R0	
		encodeAsm(ASM_OP.STW,3,2,1,-1,null); // R3[r2]:=r1
		encodeAsm(ASM_OP.POP_CONSEQ_REGS,0,4,-1,-1,null); // restore normal regs
		encodeAsm(ASM_OP.ADD,14,14,-1,-1,2); // adjust LR
		encodeAsm(ASM_OP.MOV,14,15,-1,-1,null); // jump back



	}
}	


		
// second argument -> allow pointer read. This is only done when dealing with 
// function_block calls or assignments of in_out vars
function generateProgCode(ast)
{
	var i,j;
	curr_enc_elem=ast;
	switch(ast.enum_type)
	{
		case ELEM.ELEM_FUNC_BLOCK_PROLOGUE:
		{
			// R0 -> FP
			// LR -> RET addr
			addAsmAST_Mapping(ast);
			encodeAsm(ASM_OP.MOV,14,1,-1,-1,null);
			encodeAsm(ASM_OP.STW,1,0,-1,-1,0);
			encodeAsm(ASM_OP.STW,4,0,-1,-1,4);
			encodeAsm(ASM_OP.MOV,0,4,-1,-1,null);
			break;
		}
		case ELEM.WAIT_UNTIL:
		{
			 if ((ast.list[0].enum_type==ELEM.CONST)&&(parseInt(ast.list[0].data)==1))
			 {
	 			addAsmAST_Mapping(ast);
				encodeAsm(ASM_OP.BL,-1,-1,1,-1,relJumpAddr(contextSwitchAddr)); 			 
			 }
			 else
			 {
				 ast.asm_begin=rel_pc;
				 encodeAsm(ASM_OP.MOV,15,7,-1,-1,null); // save PC in R7 (used to store data to current task
				 addAsmAST_Mapping(ast);
				 generateProgCode(ast.list[0]);
				 JumpInstTraceWithAST(ast,true);
				 encodeAsm(ASM_OP.BL,-1,-1,1,-1,relJumpAddr(waitUntilAddr)); 			 
				 ast.asm_end=rel_pc;
			 }				 
			 break;
		}
		case ELEM.ELEM_CONTEXT_SWITCH:
		{
			addAsmAST_Mapping(ast);
			encodeAsm(ASM_OP.BL,-1,-1,1,-1,relJumpAddr(contextSwitchAddr)); 			 
			break;
		}
		case ELEM.ELEM_PREEMPTION_POINT:
		{
			addAsmAST_Mapping(ast);
			encodeAsm(ASM_OP.BL,-1,-1,1,-1,relJumpAddr(preemptionPointAddr)); 
			break;
		}
		case ELEM.ELEM_RETURN:
		{
			addAsmAST_Mapping(ast);
			inject_debug();
			encodeAsm(ASM_OP.LDW,loc_funct_frame_reg,1,-1,-1,0); //return PC
			encodeAsm(ASM_OP.LDW,loc_funct_frame_reg,4,-1,-1,4); //return FP
			encodeAsm(ASM_OP.MOV,1,15,-1,-1,null); //jump to correct PC
			break;
		}
		
		case ELEM.EXPR_VAR:
		case ELEM.CONST:
		case ELEM.EXPR:
			 generateExprAsm(0,ast,false);
			 break;
		case ELEM.ASSIGN:
		case ELEM.FUNC_BLOCK_VAR_ASSIGN:
		{
			 var pointer_assign=false; 
			 if (ast.enum_type==ELEM.ASSIGN)
			 {
				ast.asm_begin=rel_pc;
			 }
			 if ((ast.enum_type==ELEM.FUNC_BLOCK_VAR_ASSIGN)&&
			    (ast.list[0].list[ast.list[0].list.length-1].link.is_pointer==true))
			 { 
				if (ast.list[1].enum_type!=ELEM.EXPR_VAR)
				{
					stopCompilation("Assigning var_inout to expression",ast.list[1]);
				}
				// check type compatibility in asisgnment
				if (ast.list[1].last_type.data.localeCompare(ast.list[0].last_type.data)!=0)
				{
					if (((ast.list[1].last_type.data=="RETAIN_INT")&&(ast.list[0].last_type.data=="INT"))||
					    ((ast.list[1].last_type.data=="RETAIN_REAL")&&(ast.list[0].last_type.data=="REAL")))
						{
						}
					else
					{						
						stopCompilation("Incompatible types",ast.list[1]);
					}
				}
				// check assignment between scalar and array types
				if (!(
				    ((ast.list[1].last_type.range_start!=undefined)&&(ast.list[0].last_type.range_start==undefined)&&(ast.list[1].list[ast.list[1].list.length-1].enum_type==ELEM.EXPR_VAR_ARR_IND))
					||
					(((ast.list[1].last_type.range_start==undefined)&&(ast.list[0].last_type.range_start==undefined))||
				    ((ast.list[1].last_type.range_start!=undefined)&&(ast.list[1].list[ast.list[1].list.length-1].enum_type!=ELEM.EXPR_VAR_ARR_IND)&&(ast.list[0].last_type.range_start!=undefined)))
					))
				{
					stopCompilation("assignment between scalar and array",ast.list[1]);
				}
						
				
				
				pointer_assign=true;
			 }
					
			 last_var_is_ptr=false;
			 addAsmAST_Mapping(ast.list[1]);
			 inject_debug();
			 if ((ast.list[1].enum_type==ELEM.EXPR)||(ast.list[1].enum_type==ELEM.CONST)||
			     (ast.list[1].enum_type==ELEM.TO_FLOAT)||(ast.list[1].enum_type==ELEM.TO_INT))
			 {
				generateExprAsm(0,ast.list[1],false); 
			 }
			 else if (ast.list[1].enum_type==ELEM.EXPR_VAR)
			 {
				 if (pointer_assign==true)
				 {
					generateReadVar(0,ast.list[1],2); // forced pointer assign  
				 }
				 else
				 {
					generateExprAsm(0,ast.list[1],true); 
				 }
			 }
			 else // func
			 {
				 generateProgCode(ast.list[1]);
			 }
			 // check pointer style assignments
			 
			 addAsmAST_Mapping(ast.list[0]);
			 if (pointer_assign==true)
			 {
				generateWriteVar(ast.list[0],2);
			 }
			 else
			 {
				 generateWriteVar(ast.list[0],true);
			 }
			 inject_debug();
 			 if (ast.enum_type==ELEM.ASSIGN)
			 {
				ast.asm_end=rel_pc; 
			 }

			 break;
		}
		case ELEM.TRACE:
		case ELEM.LADDER_TRACE:
			ast.enum_type==ELEM.FUNC_NO_RETURN;
			if (ast.enum_type==ELEM.TRACE)
			{
				ast.func_descr=PROCESS.findBuiltInFunc("TRACE");
			}
			else
			{
				ast.func_descr=PROCESS.findBuiltInFunc("LADDER_TRACE");
			}
			var line=ast.list[1].data;
			var str=ast.data;
			trace_mapping[trace_mapping.length]={line:line,str:str};
			// fallthrough
		case ELEM.FUNC:
		case ELEM.FUNC_NO_RETURN:
		{
			 if ((ast.enum_type==ELEM.FUNC_NO_RETURN)&&(ast.data!="LADDER_CONDITION"))
			 {
				ast.asm_begin=rel_pc; 
			 }

			 
			 if (ast.data=="LADDER_CONDITION")
			 {
				addAsmAST_Mapping(ast);
			}
			 
			inject_debug();
			// calculate location of the function
			encodeAsm(ASM_OP.PUSH_CONSEQ_REGS,1,3,-1,-1,null); 
			
			if (ast.func_descr==null)
			{
				stopCompilation("Function does not exist",ast);
			}
			
			// special handling for LADDER_COIL, LADDER_ASSIGN
			if ((ast.data=="LADDER_COIL")||(ast.data=="LADDER_ASSIGN"))
			{
				// add 2 arguments
					
				var obj1,obj2;
				obj1=new Object();
				obj2=new Object();
				ARGEE_nst_parse.setObjType(obj1,"CONST",ELEM.CONST,true);
				ARGEE_nst_parse.setObjType(obj2,"CONST",ELEM.CONST,true);
				if (ast.list[0].enum_type!=ELEM.EXPR_VAR)
				{
					stopCompilation("Destination has to be a variable",ast);
				}
				if ((ast.list[0].last_type.range_start!=undefined)&&(ast.list[0].list[ast.list[0].list.length-1].enum_type!=ELEM.EXPR_VAR_ARR_IND))
				{
					stopCompilation("Destination can't be an array - it has to be an array element",ast);
				}

				if (ast.list[0].list[0].bit_offset!=undefined)
				{
					obj1.data=ast.list[0].list[0].bit_offset;
					obj2.data=ast.list[0].list[0].bit_len;
				}
				else
				{
					obj1.data=0;
					obj2.data=32;
				}
				ast.list.splice(ast.list.length,0,obj1,obj2);
				ast.func_descr=PROCESS.findBuiltInSpecialFunc(ast.data);
			}
			var num_args=0;
			for(i=0;i<4;i++)
			{
				if (ast.func_descr.arg_types[i]==null)
				{
					break;
				}
				num_args++;
			}
			
			var act_num_args=ast.list.length;
			if (ast.func_descr.pack_to!=undefined)
			{
				act_num_args--;
			}
			
			
			if (num_args!=act_num_args)
			{
				stopCompilation("Mismatch in number of arguments to the function",ast);
			}
			
			// up to 4 arguments are allowed 
			for(i=0;i<ast.list.length;i++)
			{
				if (ast.func_descr.arg_types[i]==null)
				{
					stopCompilation("too many function arguments ",ast);
				}
				if (ast.func_descr.arg_types[i].charAt(0)=='@')
				{
					if (ast.list[i].last_type==undefined)
					{
						stopCompilation("Function argument " +i+ " can not be a constant ",ast);
					}
					if ((ast.list[i].last_type.range_end==undefined)||(ast.list[i].last_type.data!=ast.func_descr.arg_types[i].substring(1)))
					{
						if ((i==0)&&(ast.data=="ARRAY_INIT")&&(ast.list[i].last_type.range_end!=undefined)&&
						    ((ast.list[i].last_type.data=="INT")||(ast.list[i].last_type.data=="BYTE")||
							 (ast.list[i].last_type.data=="WORD")))
							 {
								 
							 }
						else if (((i==1)||(i==2))&&(ast.data=="SPECIAL_SERVICE")&&(ast.list[i].last_type.range_end!=undefined)&&
						    ((ast.list[i].last_type.data=="INT")||(ast.list[i].last_type.data=="BYTE")||
							 (ast.list[i].last_type.data=="WORD")))
							 {
								 
							 }
						else
							 {
								stopCompilation("Function argument array type mismatch (arg " +i+ ") ",ast);
							 }
					}
				}
				else if (ast.func_descr.arg_types[i].charAt(0)=='&')
				{
					if (ast.list[i].last_type==undefined)
					{
						stopCompilation("Function argument " +i+ " can not be a constant ",ast);
					}
					
					if ((ast.data=="LADDER_ASSIGN")&&
					    ((ast.list[i].last_type.data=="RETAIN_REAL")||
						 (ast.list[i].last_type.data=="REAL")))
						 {
							 // ladder assign can work on floating point numbers
						 }
					else if ((ast.data=="LADDER_ASSIGN")&&
					    ((ast.list[i].last_type.data=="WORD")||
						 (ast.list[i].last_type.data=="BYTE")))
						 {
							 // ladder assign can work on WORDS and BYTES
							 if (ast.list[i].last_type.data=="BYTE")
							 {
								ast.list[3].data=33;
							 }
							 else
							 {
								ast.list[3].data=34; 
							 }
						 }
					else if ((ast.list[i].last_type.data!=ast.func_descr.arg_types[i].substring(1))&&
					    (ast.list[i].last_type.data.localeCompare("RETAIN_INT")!=0)&&
						(ast.list[i].last_type.data.localeCompare("STATE")!=0)&&
						 (ast.func_descr.arg_types[i].localeCompare("INT")!=0))
					{
						stopCompilation("Function argument type mismatch (arg " +i+ ") ",ast);
					}
				}
				else if (((ast.list[i].enum_type==ELEM.CONST)||(ast.list[i].last_type==undefined))&&(ast.func_descr.arg_types[i]=="INT"))
				{
					
				}
				else 
				{
					if (ast.list[i].last_type==undefined)
					{
						stopCompilation("Function argument " +i+ " can not be a constant ",ast);
					}
					if ((ast.list[i].last_type.data!=ast.func_descr.arg_types[i])&&
 				         (ast.list[i].last_type.data.localeCompare("RETAIN_INT")!=0)&&
						 (ast.list[i].last_type.data.localeCompare("STATE")!=0)&&
						 (ast.func_descr.arg_types[i].localeCompare("INT")!=0))
					{
						stopCompilation("Function argument type mismatch (arg " +i+ ") ",ast);
					}
				}
				inject_debug();
				if (ast.func_descr.arg_types[i].charAt(0)=='&')
				{
					getDataElemPointer(0,ast.list[i]);
				}
				else
				{
					generateExprAsm(0,ast.list[i],true);
				}
				if ((ast.func_descr.arg_types[i].charAt(0)!='&')&&(ast.list[i].fp==true))
				{
					encodeAsm(ASM_OP.FP_TO_REG,0,0,-1,-1,null);
				}
				
				if ((ast.func_descr.pack_to!=undefined)&&(i==ast.func_descr.pack_to))
				{
					encodeAsm(ASM_OP.POP_CONSEQ_REGS,1,1,-1,-1,null);
					encodeAsm(ASM_OP.LSL,1,1,-1,-1,16);
					encodeAsm(ASM_OP.ADD,1,0,0,-1,null);
				}
				if (ast.list.length>1)
				{
					encodeAsm(ASM_OP.PUSH_CONSEQ_REGS,0,0,-1,-1,null); 
				}
			}
			/*if (ast.list.length>1)
			{
				for(i=(ast.list.length-1);i>=0;i--)
				{
					encodeAsm(ASM_OP.POP_CONSEQ_REGS,i,i,-1,-1,null); 
				}
			}*/
			if (ast.data=="LADDER_CONDITION")
			{
				addAsmAST_Mapping(ast);
				JumpInstTraceWithAST(ast,true);
			}
			encodeAsm(ASM_OP.MOV,tmp_reg,-1,-1,-1,ast.func_descr.func_num);
			var num_args=ast.list.length;
			if (ast.func_descr.pack_to!=undefined)
			{
				num_args--;
			}
			switch(num_args)
			{
				case 0:
				case 1:
					encodeAsm(ASM_OP.BL,-1,-1,1,-1,relJumpAddr(functCallAddr_01_arg));
					break;
				case 2:
					encodeAsm(ASM_OP.BL,-1,-1,1,-1,relJumpAddr(functCallAddr_2_arg));
					break;
				case 3:
					encodeAsm(ASM_OP.BL,-1,-1,1,-1,relJumpAddr(functCallAddr_3_arg));
					break;
				case 4:
					encodeAsm(ASM_OP.BL,-1,-1,1,-1,relJumpAddr(functCallAddr_4_arg));
					break;
			}
  		    
			if ((ast.enum_type==ELEM.FUNC_NO_RETURN)&&(ast.data!="LADDER_CONDITION"))
			 {
				ast.asm_end=rel_pc; 
			 }
			 last_var_is_ptr=false;

			break;
		}
		case ELEM.WHILE:
		{
			var pc_begin,pc_end;
			var pc_at=[];
			var patch_points_at=[];
			var act_label;
			var curr_patch;
			
			
			inject_debug();
			pc_begin=rel_pc;
			loop_label_cnt++;
			act_label=loop_label_cnt;
			addAsmAST_Mapping(ast.list[0]);
			generateProgCode(ast.list[0]);
		    JumpInstTraceWithAST(ast,true);
			if (arm7_mode==true)
			{
				encodeAsm(ASM_OP.LSL,0,0,-1,-1,31); // R0<<31
				encodeAsm(ASM_OP.LSR,0,0,-1,-1,31); // R0>>31
				encodeAsm(ASM_OP.CMP,0,-1,-1,-1,0);
				curr_patch=rel_pc;
				//encodeAsm(ASM_OP.B_NE,-1,-1,-1,-1,0);
				rel_pc+=2;
				pc_at[0]=rel_pc;
				patch_points_at[0]=addPatchPoint(null,JMP_TYPE.FAR);
				replaceCondJumpPatch(curr_patch,ASM_OP.B_NE);
			}
			else
			{
				encodeAsm(ASM_OP.CBNZ,0,-1,-1,-1,2);
				pc_at[0]=rel_pc;
				patch_points_at[0]=addPatchPoint(null,JMP_TYPE.FAR);
			}
			generateProgCode(ast.list[1]);
			pc_at[1]=rel_pc;
			patch_points_at[1]=addPatchPoint(null,JMP_TYPE.FAR);
			replacePatch(patch_points_at[1],pc_begin-pc_at[1]);
			replacePatch(patch_points_at[0],rel_pc-pc_at[0]);
			inject_debug();
			
			break;
		}
		case ELEM.IF:
		{
			var pc_begin,pc_end;
			var pc_at=[];
			var patch_points_at=[];
			var act_label;
			var curr_patch;
			loop_label_cnt++;
			act_label=loop_label_cnt;

			
			
			for(i=0,j=0;i<ast.list.length;i+=2,j++)
			{
				if ((ast.list[i].enum_type==ELEM.CONST)&&(ast.list[i].data=="1")&&(i==(ast.list.length-2)))
				{
					// else -> no need to evaluate anything -> just insert the code
					addAsmAST_Mapping(ast.list[i]);
					encodeAsm(ASM_OP.MOV,0,-1,-1,-1,1); // r0 -> 1 forced trace 
					if (arm7_mode==true)
					{
						JumpInstTraceWithAST(ast.list[i],true);
					}	
					else
					{
						JumpInstTraceWithAST(ast.list[i],false);
					}
					// nop instruction
					addAsmAST_Mapping(ast.list[i+1]);
					
					generateProgCode(ast.list[i+1]);
				}
				else
				{
					addAsmAST_Mapping(ast.list[i]);
					generateProgCode(ast.list[i]);
					JumpInstTraceWithAST(ast.list[i],true);
					if (arm7_mode==true)
					{
						encodeAsm(ASM_OP.LSL,0,0,-1,-1,31); // R0<<31
						encodeAsm(ASM_OP.LSR,0,0,-1,-1,31); // R0>>31
						encodeAsm(ASM_OP.CMP,0,-1,-1,-1,0);
						curr_patch=rel_pc;
						//encodeAsm(ASM_OP.B_NE,-1,-1,-1,-1,0);
						rel_pc+=2;
						pc_at[3*j+0]=rel_pc;
						patch_points_at[3*j+0]=addPatchPoint(null,JMP_TYPE.FAR);
						replaceCondJumpPatch(curr_patch,ASM_OP.B_NE);
					}
					else
					{
						encodeAsm(ASM_OP.CBNZ,0,-1,-1,-1,2);
						pc_at[3*j+0]=rel_pc;
						patch_points_at[3*j+0]=addPatchPoint(null,JMP_TYPE.FAR);
					}
					addAsmAST_Mapping(ast.list[i+1]);
					generateProgCode(ast.list[i+1]);
					if ((i+1)!=(ast.list.length-1))
					{
						pc_at[3*j+1]=rel_pc;
						// make a "FAR" branch here
						patch_points_at[3*j+1]=addPatchPoint(null,JMP_TYPE.FAR);
					}
					pc_at[3*j+2]=rel_pc;
				}
			}
			
			
			
			pc_end=rel_pc;
			for(i=0,j=0;i<ast.list.length;i+=2,j++)
			{
				if (!(((ast.list[i].enum_type==ELEM.CONST)&&(ast.list[i].data=="1")&&(i==(ast.list.length-2)))))
				{
					replacePatch(patch_points_at[3*j+0],(pc_at[3*j+2]-pc_at[3*j+0]));
					if ((i+1)!=(ast.list.length-1))
					{
						replacePatch(patch_points_at[3*j+1],(pc_end-pc_at[3*j+1]));
					}
				}					
			}
			break;
		}
		case ELEM.COMMENT_BLOCK:
		{
			break;
		}
		case ELEM.FUNC_BLOCK_CALL:
		{
			// generate assignments (if any)
			if (ast.list[0].last_type.link.list==undefined)
			{
				stopCompilation("not a function block",ast);
			}
			if (ast.list[0].last_type.link.task_function_block==true)
			{
				stopCompilation("Tasks can not be called",ast);
			}
			if (ast.list[0].last_type.link.list.length<2)
			{
				stopCompilation("Invoking function block without code",ast);
			}
			if ((ast.list[0].list!=undefined)&&(ast.list[0].list.length>2))
			{
				stopCompilation("Function block is not a simple function block with index",ast);
			}

			if (ast.list[0].last_type.range_start!=undefined)
			{
				if ((ast.list[0].list!=undefined)&&(ast.list[0].list[1]!=undefined)&&(ast.list[0].list[1].enum_type==ELEM.EXPR_VAR_ARR_IND))
				{
				}
				else
				{
					stopCompilation("Can not call function block of Array type (has to be scalar)",ast);
				}
			}
			// check if all var_in_outs are assigned in subsequent statements
			var func_block_vars=ast.list[0].last_type.link.list[0].list;
			for(i=0;i<func_block_vars.length;i++)
			{
				if (func_block_vars[i].is_pointer==true)
				{
					var found=false;
					if (ast.list[1].list==undefined)
					{
						stopCompilation("Invoking function block without assigning var_inout",ast.list[0]);
					}
					for(j=0;j<ast.list[1].list.length;j++)
					{
						if (ast.list[1].list[j].list[0].list[ast.list[1].list[j].list[0].list.length-1].data!=undefined)
						{
							var name=ast.list[1].list[j].list[0].list[ast.list[1].list[j].list[0].list.length-1].data;
							if(name.localeCompare(func_block_vars[i].name)==0)
							{
								found=true;
								break;
							}
						}
					}
					if (found==false)
					{
						stopCompilation("Invoking function block without assigning var_inout \""+func_block_vars[i].name+"\"",ast.list[0]);
					}
				}
			}
			
			inject_debug();
			ast.asm_begin=rel_pc;
			generateProgCode(ast.list[1]);	
			ast.asm_end=rel_pc;
			addAsmAST_Mapping(ast.list[0]);
			//generateReadVar(0,ast.list[0]);
			getDataElemPointer(0,ast.list[0]);
			addPatchPoint(ast.list[0].last_type.data,JMP_TYPE.FAR);
			break;	
		}
		default:	
		{
			if (ast.list!=undefined)
			{
				if ((ast.enum_type==ELEM.FUNCT_BLOCK)||(ast.enum_type==ELEM.TASK))
				{
					ast.rel_addr=rel_pc;
				}
				for(i=0;i<ast.list.length;i++)
				{
					generateProgCode(ast.list[i]);
				}
			}
			break;
		}		
	}
}	

var globals;

function showAssemly()
{
	printCompiled();
}

function createProjectFile()
{
	// Project header -> 
	// Env -> 3.0.0.0, Kernel 3.0.0.0
	// checksum
	// LIO scanlist 
	
	
}

function GetCurrTaskFP_Offset()
{
	return curr_task_elem.offset;
}


function UpdateControlSegObjs()
{
	GOM.setObjNum("ARGEE_CTRL_PREEMPT_POINT_OFFSET",0,preempt_point_elem.offset);
	GOM.setObjNum("ARGEE_CTRL_SAVE_LR_OFFSET",0,save_lr_offset.offset);
	GOM.setObjNum("ARGEE_CTRL_SAVE_SP_OFFSET",0,save_sp_offset.offset);
	GOM.setObjNum("ARGEE_CTRL_CURR_TASK_OFFSET",0,curr_task_elem.offset);
	GOM.setObjNum("ARGEE_CTRL_FUNCT_TBL_OFFSET",0,funct_tbl_offset.offset);
	GOM.setObjNum("ARGEE_CTRL_FUNCT_TBL_LEN_OFFSET",0,func_tbl_len_offset.offset);
	GOM.setObjNum("ARGEE_CTRL_LR_CALLER_OFFSET",0,save_lr_caller_offset.offset);
	GOM.setObjNum("ARGEE_CTRL_FP_CALLER_OFFSET",0,save_fp_caller_offset.offset);
}

var invocation = new XMLHttpRequest();
var url_prefix="http://192.168.1.253";

/*
function UploadProg()
{
	 if(invocation)
    {
      invocation.open('POST', url_prefix+'/pg', true);
		invocation.onreadystatechange=function()
		{
			console.log("upload stat "+invocation.readyState+" "+invocation.status);
			if ((invocation.readyState==4)&&(invocation.status==200))
			{
				if (refresh_timer_id!=null)
				{
					clearInterval(refresh_timer_id);
				}
				refresh_timer_id=setInterval(getVarsAjax,100);
			}
			
		} 
		var mapped_ranges=[]
		var ctrl_seg_size=17*4;
		var len=compiled_program_len+ctrl_seg_size;
		var arr=new ArrayBuffer(3+len+4);
		var dataView=new DataView(arr);
		var i;
		var curr_offset=0;
		dataView.setUint8(0,2); // code = upload proc code
		dataView.setUint16(1,len,true); // length of request =len
		curr_offset=3;
		
		//length element
		dataView.setUint32(curr_offset,len,true);curr_offset+=4; 
		// control elements
		dataView.setUint32(curr_offset,preempt_point_elem.offset,true);curr_offset+=4; 
		dataView.setUint32(curr_offset,curr_task_elem.offset,true);curr_offset+=4; 
		dataView.setUint32(curr_offset,save_sp_offset.offset,true);curr_offset+=4; 
		dataView.setUint32(curr_offset,save_lr_offset.offset,true);curr_offset+=4; 
		dataView.setUint32(curr_offset,funct_tbl_offset.offset,true);curr_offset+=4; 
		dataView.setUint32(curr_offset,func_tbl_len_offset.offset,true);curr_offset+=4; 
		dataView.setUint32(curr_offset,save_lr_caller_offset.offset,true);curr_offset+=4; 
		dataView.setUint32(curr_offset,save_fp_caller_offset.offset,true);curr_offset+=4; 
		
		
		
		// add to additional longs as reserved
		for(i=0;i<8;i++)
		{
			dataView.setUint32(curr_offset,0xDEADBEEF,true);curr_offset+=4; 
		}
		dataView.setUint32(curr_offset,process.getProgStartOffset(),true);curr_offset+=4; 
		
		//dataView.setUint8(curr_offset,mapped_ranges.length);curr_offset++ 
		for(i=0;i<mapped_ranges.length;i++)
		{
			/*dataView.setUint8(curr_offset,mapped_ranges[i].dst_long_offset);curr_offset++ ;
			dataView.setUint8(curr_offset,mapped_ranges[i].dst_bit_offset);curr_offset++ ;
			dataView.setUint8(curr_offset,mapped_ranges[i].src_segm);curr_offset++ ;
			dataView.setUint8(curr_offset,mapped_ranges[i].slot);curr_offset++ ;
			dataView.setUint8(curr_offset,mapped_ranges[i].byte_offset);curr_offset++; 
			dataView.setUint8(curr_offset,mapped_ranges[i].bit_offset);curr_offset++; 
			dataView.setUint8(curr_offset,mapped_ranges[i].num_bits);curr_offset++ ;
			dataView.setUint8(curr_offset,0);curr_offset++; // reserved 
		}

		dv_patched_debug_code=compiled_program_DataView;
		
		for(i=0;i<compiled_program_len;i++)
		{
			dataView.setUint8(curr_offset+i,dv_patched_debug_code.getUint8(i));
		}
		
		
			
		
		
		
        invocation.send(arr);
		
		//displayVarTree(arr,1,[],0);
    }
	invocation.timeout=4000;
}
*/


var trace_mapping=[];	

function findTraceStr(line)
{
	var i;
	for(i=0;i<trace_mapping.length;i++)
	{
		if (trace_mapping[i].line==line)
		{
			return trace_mapping[i].str;
		}
	}
	return null;
}


function generate(ast)
{
	globals=ast;
	rel_pc=process.getProgStartOffset();
	trace_mapping=[];
	try
	{
		generateAsm(ast);
		if (debug_console==true)
		{
			showAssemly();
		}
		UpdateControlSegObjs();
		var max_code_size=findCodeSizeLimit(GOM.getObjNum("MULTPC_ORDER_NUM",0));
		if (rel_pc>=max_code_size)
		{
			stopCompilation("Code size is too large "+rel_pc+" (max "+max_code_size+" )");
		}
	}
	catch(e)
	{
		PARSE.setErrMsg(e);
		console.log("Error: "+(e.err_msg) + " in the program on line: "+ (parse.getTokenStartLine()+1));
		//var res_inner=this.document.getElementById("comp_res_id");
		//res_inner.innerHTML="Error: "+(e.err_msg) + " in the program on line: "+ (token_start_line+1);
		return null;
	}
	return true;
	
}

function getFinalAST()
{
	return globals;
}


return {
	generate:generate,
	GetCompiledProgLen:GetCompiledProgLen,
	GetCompiledDataview:GetCompiledDataview,
	UpdateControlSegObjs:UpdateControlSegObjs,
	GetCurrTaskFP_Offset:GetCurrTaskFP_Offset,
	getBreakpointJmpAddr:getBreakpointJmpAddr,
	getInstrTraceOffset:getInstrTraceOffset,
	findAddrInAsmElements:findAddrInAsmElements,
	getTaskAddrs:getTaskAddrs,
	getFinalAST:getFinalAST,
	getARM7_Mode:getARM7_Mode,
	setARM7_Mode:setARM7_Mode,
	findTraceStr:findTraceStr,
}
}());
	
var GEN=ARGEE_nst_code_gen;	

	
	