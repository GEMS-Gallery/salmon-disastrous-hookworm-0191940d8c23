export const idlFactory = ({ IDL }) => {
  const Result_1 = IDL.Variant({ 'ok' : IDL.Text, 'err' : IDL.Text });
  const Time = IDL.Int;
  const CallRoom = IDL.Record({
    'id' : IDL.Text,
    'participants' : IDL.Nat,
    'createdAt' : Time,
  });
  const Result = IDL.Variant({ 'ok' : CallRoom, 'err' : IDL.Text });
  return IDL.Service({
    'createCallRoom' : IDL.Func([], [Result_1], []),
    'getCallRoom' : IDL.Func([IDL.Text], [Result], ['query']),
    'listCallRooms' : IDL.Func([], [IDL.Vec(CallRoom)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
