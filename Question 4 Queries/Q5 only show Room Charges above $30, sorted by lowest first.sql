SELECT "Daily_Charge","Room_Num", "Patient_Ent_id"
FROM "ROOM_DETAILS"
WHERE "Daily_Charge" >= '30'
ORDER BY "Daily_Charge" asc