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
	order by 2,1