UPDATE case_managers
SET name = $1, department = $2, contact_number = $3, email = $4, username = $5, password = $6, cm_image = $7
WHERE id = $8;
