trigger testepttrigger on testept__e (after insert) {
 //Put this into Platform Cache
 for(testept__e evt: Trigger.New) {
     System.debug('new event '+evt);
     Cache.Org.put(evt.ReplayId, JSON.serialize(evt));
 }
}