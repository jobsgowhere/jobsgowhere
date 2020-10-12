-- Add new column to table 'job'
ALTER TABLE job
ADD COLUMN job_link TEXT NOT NULL DEFAULT '';
