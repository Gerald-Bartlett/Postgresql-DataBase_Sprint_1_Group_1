SELECT "Patient_id", "Treatment", "Triage"
FROM
"PAT_ENTRY"
INNER JOIN "PAT_ADMIT"
ON "Treatment" = "Triage";
select * from "PAT_ADMIT"