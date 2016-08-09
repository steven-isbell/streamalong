UPDATE case_managers
SET name = $1, department = $2, contact_number = $3, email = $4, user_role = $5
WHERE id = $6;
