-- Drop columns from table 'person_profile'
ALTER TABLE person_profile
DROP COLUMN headline, 
DROP COLUMN website, 
DROP COLUMN company, 
DROP COLUMN profile_type;

-- Add current_company column to table 'person'
ALTER TABLE person
ADD COLUMN current_company TEXT;