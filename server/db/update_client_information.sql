UPDATE clients
SET name = $1, age = $2, date_of_birth = $3, department = $4, case_manager = $5 client_image = $6
WHERE id = $7;
