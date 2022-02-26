SELECT "Fees_Per_Call","Doctor_id", "L_Name","F_Name"
FROM "DOC_ON_CALL"
WHERE "Fees_Per_Call" >= '65'
ORDER BY "Fees_Per_Call" ASC