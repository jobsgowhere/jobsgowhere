-- Add your rollback scripts here
DROP TABLE IF EXISTS job_provider_fav cascade;
DROP TABLE IF EXISTS job_seeker_fav cascade;
DROP TABLE IF EXISTS job_provider cascade;
DROP TABLE IF EXISTS job_seeker cascade;
DROP TABLE IF EXISTS job cascade;
DROP TABLE IF EXISTS person_profile cascade;
DROP TABLE IF EXISTS person cascade;