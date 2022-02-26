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