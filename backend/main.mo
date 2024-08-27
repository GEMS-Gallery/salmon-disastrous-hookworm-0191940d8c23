import Array "mo:base/Array";

import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Hash "mo:base/Hash";
import Nat "mo:base/Nat";
import Time "mo:base/Time";
import Result "mo:base/Result";
import Error "mo:base/Error";
import Int "mo:base/Int";
import Iter "mo:base/Iter";

actor {
  type CallRoom = {
    id: Text;
    createdAt: Time.Time;
    participants: Nat;
  };

  stable var callRoomsEntries : [(Text, CallRoom)] = [];
  var callRooms = HashMap.HashMap<Text, CallRoom>(10, Text.equal, Text.hash);

  public func createCallRoom() : async Result.Result<Text, Text> {
    let id = Text.concat("room-", Nat.toText(Int.abs(Time.now()) % 10000));
    let newRoom : CallRoom = {
      id = id;
      createdAt = Time.now();
      participants = 0;
    };
    callRooms.put(id, newRoom);
    #ok(id)
  };

  public query func getCallRoom(roomId: Text) : async Result.Result<CallRoom, Text> {
    switch (callRooms.get(roomId)) {
      case (null) { #err("Room not found") };
      case (?room) { #ok(room) };
    }
  };

  public query func listCallRooms() : async [CallRoom] {
    Iter.toArray(callRooms.vals())
  };

  system func preupgrade() {
    callRoomsEntries := Iter.toArray(callRooms.entries());
  };

  system func postupgrade() {
    callRooms := HashMap.fromIter<Text, CallRoom>(callRoomsEntries.vals(), 10, Text.equal, Text.hash);
    callRoomsEntries := [];
  };
}
