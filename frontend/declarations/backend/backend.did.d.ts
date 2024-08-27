import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface CallRoom {
  'id' : string,
  'participants' : bigint,
  'createdAt' : Time,
}
export type Result = { 'ok' : CallRoom } |
  { 'err' : string };
export type Result_1 = { 'ok' : string } |
  { 'err' : string };
export type Time = bigint;
export interface _SERVICE {
  'createCallRoom' : ActorMethod<[], Result_1>,
  'getCallRoom' : ActorMethod<[string], Result>,
  'listCallRooms' : ActorMethod<[], Array<CallRoom>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
