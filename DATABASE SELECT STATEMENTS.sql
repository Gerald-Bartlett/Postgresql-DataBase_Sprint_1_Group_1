
--Dr Check
select 'Oncall', a."Doctor_id", c."F_Name", c."L_Name", d."Depart_Name"
  from public."ALL_DOCTORS" a, public."DOC_ON_CALL" c, public."DEPARTMENT" d
  where a."Doctor_id" = c."Doctor_id"
  and a."Depart_Name" = d."Depart_Name"
 union
select 'Regular', a."Doctor_id", c."F_Name", c."L_Name", d."Depart_Name"
  from public."ALL_DOCTORS" a, public."DOC_REG" c, public."DEPARTMENT" d
  where a."Doctor_id" = c."Doctor_id"
  and a."Depart_Name" = d."Depart_Name"
  Order by 1


SELECT e."Patient_Ent_id", c."Patient_Status" ,s."Status", p.*
	from public."ALL_PAT" p, public."PAT_ENTRY" e, public."PAT_CHKUP" c,
	     (Select "Patient_Ent_id", 'Admitted' "Status"
			 From public."PAT_ADMIT"
			 UNION ALL
			 Select "Patient_Ent_id", 'Regular'
			 From public."PAT_REG"
			UNION ALL
			 Select "Patient_Ent_id", 'Operation'
			 From public."PAT_OPR") s
	where p."Patient_id" = e."Patient_id"
	and e."Patient_Ent_id" = s."Patient_Ent_id"
	and  e."Patient_Ent_id" = c."Patient_Ent_id"
	order by 1,2
select * from "PAT_ENTRY"




-- Count for > 1
select "Patient_id", count(*) 
from public."PAT_ENTRY"
GROUP BY "Patient_id"
HAVING COUNT(*) > 1


SELECT "Patient_id", "F_Name", "L_Name"
FROM "ALL_PAT"
WHERE "Sex" = 'F'
ORDER BY "Age" DESC
LIMIT 12;