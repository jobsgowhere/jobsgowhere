--
-- PostgreSQL database dump
--

-- Dumped from database version 12.1
-- Dumped by pg_dump version 12.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: person; Type: TABLE DATA; Schema: public; Owner: psub116w
--

INSERT INTO public.person (id, iam_id, first_name, last_name, avatar_url, email, iam_provider, created_at, current_company) VALUES ('a86afb93-0321-4160-b604-702c30181932', 'linkedin', 'Subhransu', 'Behera', 'https://avatars0.githubusercontent.com/u/1495621', 'subh@subhb.org', 'LinkedIn', '2020-04-27 19:10:25', 'SPGroup');
INSERT INTO public.person (id, iam_id, first_name, last_name, avatar_url, email, iam_provider, created_at, current_company) VALUES ('59e55864-3430-4613-add9-dc37aea03c5d', 'linkedin2', 'Sheldon', 'Cheng', 'https://avatars1.githubusercontent.com/u/3888250', 'sheldonscyd@gmail.com', 'LinkedIn', '2020-04-27 19:10:25', 'NTUC');
INSERT INTO public.person (id, iam_id, first_name, last_name, avatar_url, email, iam_provider, created_at, current_company) VALUES ('a392e0b8-1d14-4c57-9869-82a98cd9d748', 'linkedin3', 'Kajal', 'Sinha', 'https://avatars3.githubusercontent.com/u/1764470', 'kajalsinha@gmail.com', 'LinkedIn', '2020-04-27 19:10:25', 'SPGroup');


--
-- Data for Name: job; Type: TABLE DATA; Schema: public; Owner: psub116w
--

INSERT INTO public.job (id, title, description, location, status, person_id, created_at) VALUES ('f8fb5c81-f258-48ce-bad5-1dda4d6325ff', 'Senior Data Scientist', 'We are looking for a Data Scientist who will help us discover patterns hidden in large amounts of data and make decisions from different sources. Your primary focus will be in applying data wrangling and machine learning techniques to build high quality anomaly detection, prediction and recommendation systems integrated with our products.', 'SG', 1, 'a86afb93-0321-4160-b604-702c30181932', '2020-04-24 19:10:25');
INSERT INTO public.job (id, title, description, location, status, person_id, created_at) VALUES ('cc1f7605-2f33-4597-9748-933e64abb7b1', 'Looking for a frontend developer', 'Looking for senior frontend web developer with JS knowledge', 'Singapore', 1, 'a86afb93-0321-4160-b604-702c30181932', '2020-06-02 12:26:35.858429');


--
-- Data for Name: job_provider; Type: TABLE DATA; Schema: public; Owner: psub116w
--

INSERT INTO public.job_provider (person_id, title, website_url, hunting_mode, created_at) VALUES ('a86afb93-0321-4160-b604-702c30181932', 'HR', 'http://spgroup.com.sg/', 1, '2020-04-27 19:10:25');


--
-- Data for Name: job_provider_fav; Type: TABLE DATA; Schema: public; Owner: psub116w
--



--
-- Data for Name: job_seeker; Type: TABLE DATA; Schema: public; Owner: psub116w
--

INSERT INTO public.job_seeker (id, person_id, title, headline, city, seeking_mode, created_at) VALUES ('f5041364-5c6f-4095-b0cf-3577fe5db330', 'a86afb93-0321-4160-b604-702c30181932', 'Senior iOS Developer', 'Mobile and Backend developer looking for urgent opportunities', 'Singapore', 1, '2020-04-27 19:10:25');
INSERT INTO public.job_seeker (id, person_id, title, headline, city, seeking_mode, created_at) VALUES ('038f87f6-eb47-47a0-a04c-6b92d8882c14', '59e55864-3430-4613-add9-dc37aea03c5d', 'Senior Software Engineer', 'JS developer looking for a new role', 'Singapore', 1, '2020-04-27 19:10:25');


--
-- Data for Name: job_seeker_fav; Type: TABLE DATA; Schema: public; Owner: psub116w
--

INSERT INTO public.job_seeker_fav (id, person_id, job_id) VALUES ('43fb922c-ba52-4edc-a113-e8400fd4eaa2', 'a86afb93-0321-4160-b604-702c30181932', 'f8fb5c81-f258-48ce-bad5-1dda4d6325ff');


--
-- Data for Name: skill; Type: TABLE DATA; Schema: public; Owner: psub116w
--



--
-- Data for Name: job_skill_map; Type: TABLE DATA; Schema: public; Owner: psub116w
--



--
-- Data for Name: person_profile; Type: TABLE DATA; Schema: public; Owner: psub116w
--

INSERT INTO public.person_profile (id, person_id, profile_url) VALUES ('0fdb7f9b-df1f-439d-9896-40bffa5dedf7', 'a86afb93-0321-4160-b604-702c30181932', 'https://sg.linkedin.com/in/subhransubehera');
INSERT INTO public.person_profile (id, person_id, profile_url) VALUES ('5d3244bd-67c9-4d27-9b7b-0c4a34cd326d', '59e55864-3430-4613-add9-dc37aea03c5d', 'https://sg.linkedin.com/in/shldn');
INSERT INTO public.person_profile (id, person_id, profile_url) VALUES ('5c88ab9d-51fd-4415-8ad0-1c8bd8080b4b', 'a392e0b8-1d14-4c57-9869-82a98cd9d748', 'https://www.linkedin.com/in/kajalsinha');


--
-- Data for Name: related_skills; Type: TABLE DATA; Schema: public; Owner: psub116w
--


--
-- PostgreSQL database dump complete
--

