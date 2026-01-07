import db from "../config/db.js";
async function merge(userId, sessionId){
  if(userId && sessionId){
      await db.query(`
        UPDATE  cart 
        SET user_id = ?, session_id = null
        WHERE session_id = ? AND user_id IS NULL`, [userId, sessionId]);
    

    await db.query(`UPDATE checkout_snapshot
      SET user_id =?, session_id = null
      WHERE session_id =? AND user_id IS NULL`, [userId, sessionId]);

      await db.query(`UPDATE orders
      SET user_id =?, session_id = null
      WHERE session_id =? AND user_id IS NULL`, [userId, sessionId]);
  }
}

export default merge;
