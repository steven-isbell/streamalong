CREATE TABLE case_managers (
  id SERIAL PRIMARY KEY NOT NULL,
  name varchar(50),
  department varchar(255),
  contact_number varchar(15),
  email varchar(100),
  username varchar(20),
  password text,
  cm_image text,
  google_id varchar(40)
);

CREATE TABLE clients (
  id SERIAL PRIMARY KEY NOT NULL,
  name varchar(50),
  age INTEGER,
  date_of_birth varchar(20),
  case_manager varchar(50),
  case_manager_id INTEGER REFERENCES case_managers(id),
  client_image text
);

CREATE TABLE programs (
  id SERIAL PRIMARY KEY NOT NULL,
  name varchar(50),
  city varchar(50),
  phone_number varchar(20),
  description text,
  image text
);

-- CREATE TABLE program_directors (
--   id SERIAL PRIMARY KEY NOT NULL,
--   name varchar(50),
--   program_name varchar(50),
-- )


-- Havent created yet. add if time
-- CREATE TABLE program (
--   therapist_name varchar(50),
--   stage INTEGER,
--   case_manager_id INTEGER
-- );
