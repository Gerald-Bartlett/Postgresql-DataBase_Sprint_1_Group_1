select "Patient_id", count(*) 
from public."PAT_ENTRY"
GROUP BY "Patient_id"
HAVING COUNT(*) > 1

