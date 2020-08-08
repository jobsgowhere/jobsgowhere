-- Add new columns to table 'person_profile'
ALTER TABLE person_profile    
ADD COLUMN headline TEXT,
ADD COLUMN website TEXT,
ADD COLUMN company TEXT,
ADD COLUMN profile_type TEXT;

-- Drop current_company column from table 'person'
ALTER TABLE person
DROP COLUMN current_company;

