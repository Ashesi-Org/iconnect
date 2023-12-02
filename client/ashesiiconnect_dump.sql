--
-- PostgreSQL database dump
--

-- Dumped from database version 12.16 (Ubuntu 12.16-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.16 (Ubuntu 12.16-0ubuntu0.20.04.1)

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
-- Name: calculate_due_date(); Type: FUNCTION; Schema: public; Owner: simon
--

CREATE FUNCTION public.calculate_due_date() RETURNS timestamp with time zone
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN CURRENT_TIMESTAMP + INTERVAL '1 week';
END;
$$;


ALTER FUNCTION public.calculate_due_date() OWNER TO simon;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: assigned_issues; Type: TABLE; Schema: public; Owner: simon
--

CREATE TABLE public.assigned_issues (
    assignment_id integer NOT NULL,
    issue_id integer,
    assigned_resolver_id integer,
    due_at timestamp with time zone DEFAULT public.calculate_due_date(),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.assigned_issues OWNER TO simon;

--
-- Name: assigned_issues_assignment_id_seq; Type: SEQUENCE; Schema: public; Owner: simon
--

CREATE SEQUENCE public.assigned_issues_assignment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.assigned_issues_assignment_id_seq OWNER TO simon;

--
-- Name: assigned_issues_assignment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: simon
--

ALTER SEQUENCE public.assigned_issues_assignment_id_seq OWNED BY public.assigned_issues.assignment_id;


--
-- Name: attachments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.attachments (
    attachment_id integer NOT NULL,
    issue_id integer,
    attachment_url character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.attachments OWNER TO postgres;

--
-- Name: attachments_attachment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.attachments_attachment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.attachments_attachment_id_seq OWNER TO postgres;

--
-- Name: attachments_attachment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.attachments_attachment_id_seq OWNED BY public.attachments.attachment_id;


--
-- Name: auth_provider; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_provider (
    id integer NOT NULL,
    user_id integer,
    google_id character varying(255) NOT NULL
);


ALTER TABLE public.auth_provider OWNER TO postgres;

--
-- Name: auth_provider_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_provider_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_provider_id_seq OWNER TO postgres;

--
-- Name: auth_provider_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_provider_id_seq OWNED BY public.auth_provider.id;


--
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    category_id integer NOT NULL,
    name character varying(100) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: categories_category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_category_id_seq OWNER TO postgres;

--
-- Name: categories_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_category_id_seq OWNED BY public.categories.category_id;


--
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    comment_id integer NOT NULL,
    issue_id integer,
    user_id integer,
    comment_text text NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.comments OWNER TO postgres;

--
-- Name: comments_comment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comments_comment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_comment_id_seq OWNER TO postgres;

--
-- Name: comments_comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comments_comment_id_seq OWNED BY public.comments.comment_id;


--
-- Name: issue_resolvers; Type: TABLE; Schema: public; Owner: simon
--

CREATE TABLE public.issue_resolvers (
    resolver_id integer NOT NULL,
    user_id integer,
    category_id integer
);


ALTER TABLE public.issue_resolvers OWNER TO simon;

--
-- Name: issue_resolvers_resolver_id_seq; Type: SEQUENCE; Schema: public; Owner: simon
--

CREATE SEQUENCE public.issue_resolvers_resolver_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.issue_resolvers_resolver_id_seq OWNER TO simon;

--
-- Name: issue_resolvers_resolver_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: simon
--

ALTER SEQUENCE public.issue_resolvers_resolver_id_seq OWNED BY public.issue_resolvers.resolver_id;


--
-- Name: issues; Type: TABLE; Schema: public; Owner: simon
--

CREATE TABLE public.issues (
    issue_id integer NOT NULL,
    user_id integer,
    category_id integer,
    description text NOT NULL,
    status character varying(20) NOT NULL,
    priority character varying(20) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    title character varying(50),
    is_anonymous boolean DEFAULT false,
    attachment_url text,
    CONSTRAINT issues_priority_check CHECK (((priority)::text = ANY ((ARRAY['high'::character varying, 'medium'::character varying, 'low'::character varying])::text[]))),
    CONSTRAINT issues_status_check CHECK (((status)::text = ANY ((ARRAY['open'::character varying, 'in-progress'::character varying, 'resolved'::character varying, 'closed'::character varying])::text[])))
);


ALTER TABLE public.issues OWNER TO simon;

--
-- Name: issues_issue_id_seq; Type: SEQUENCE; Schema: public; Owner: simon
--

CREATE SEQUENCE public.issues_issue_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.issues_issue_id_seq OWNER TO simon;

--
-- Name: issues_issue_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: simon
--

ALTER SEQUENCE public.issues_issue_id_seq OWNED BY public.issues.issue_id;


--
-- Name: notifications; Type: TABLE; Schema: public; Owner: simon
--

CREATE TABLE public.notifications (
    notification_id integer NOT NULL,
    user_id integer,
    issue_id integer,
    notifiction_type character varying(50) NOT NULL,
    message text NOT NULL,
    status character varying(20) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT notifications_notifiction_type_check CHECK (((notifiction_type)::text = ANY ((ARRAY['status'::character varying, 'comment'::character varying, 'attachment'::character varying, 'ban'::character varying, 'admin'::character varying])::text[]))),
    CONSTRAINT notifications_status_check CHECK (((status)::text = ANY ((ARRAY['unread'::character varying, 'read'::character varying])::text[])))
);


ALTER TABLE public.notifications OWNER TO simon;

--
-- Name: notifications_notification_id_seq; Type: SEQUENCE; Schema: public; Owner: simon
--

CREATE SEQUENCE public.notifications_notification_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.notifications_notification_id_seq OWNER TO simon;

--
-- Name: notifications_notification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: simon
--

ALTER SEQUENCE public.notifications_notification_id_seq OWNED BY public.notifications.notification_id;


--
-- Name: room_ban; Type: TABLE; Schema: public; Owner: simon
--

CREATE TABLE public.room_ban (
    ban_id integer NOT NULL,
    room_id integer NOT NULL,
    user_id integer NOT NULL,
    ban_type character varying(50) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.room_ban OWNER TO simon;

--
-- Name: room_ban_ban_id_seq; Type: SEQUENCE; Schema: public; Owner: simon
--

CREATE SEQUENCE public.room_ban_ban_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.room_ban_ban_id_seq OWNER TO simon;

--
-- Name: room_ban_ban_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: simon
--

ALTER SEQUENCE public.room_ban_ban_id_seq OWNED BY public.room_ban.ban_id;


--
-- Name: room_info; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.room_info (
    room_id integer NOT NULL,
    room_desc character varying(255) NOT NULL,
    creator_id integer,
    is_private boolean NOT NULL,
    auto_speaker boolean NOT NULL,
    chat_enabled boolean NOT NULL,
    ended boolean DEFAULT false,
    hand_raise_enabled boolean NOT NULL,
    category_id integer,
    last_active timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.room_info OWNER TO postgres;

--
-- Name: room_info_category; Type: TABLE; Schema: public; Owner: simon
--

CREATE TABLE public.room_info_category (
    room_id integer NOT NULL,
    category_id integer NOT NULL
);


ALTER TABLE public.room_info_category OWNER TO simon;

--
-- Name: room_info_room_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.room_info_room_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.room_info_room_id_seq OWNER TO postgres;

--
-- Name: room_info_room_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.room_info_room_id_seq OWNED BY public.room_info.room_id;


--
-- Name: room_status; Type: TABLE; Schema: public; Owner: simon
--

CREATE TABLE public.room_status (
    status_id integer NOT NULL,
    room_id integer NOT NULL,
    user_id integer NOT NULL,
    is_speaker boolean NOT NULL,
    is_mod boolean NOT NULL,
    raised_hand boolean NOT NULL,
    is_muted boolean NOT NULL
);


ALTER TABLE public.room_status OWNER TO simon;

--
-- Name: room_status_status_id_seq; Type: SEQUENCE; Schema: public; Owner: simon
--

CREATE SEQUENCE public.room_status_status_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.room_status_status_id_seq OWNER TO simon;

--
-- Name: room_status_status_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: simon
--

ALTER SEQUENCE public.room_status_status_id_seq OWNED BY public.room_status.status_id;


--
-- Name: user_data; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_data (
    user_id integer NOT NULL,
    role character varying(50),
    email character varying(100) NOT NULL,
    password character varying(255),
    unique_id character varying(50),
    language character varying(20),
    avatar_url character varying(255),
    display_name character varying(100),
    user_name character varying(100),
    current_room_id integer,
    google_id character varying(50),
    last_seen timestamp with time zone,
    bio text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT user_data_language_check CHECK (((language)::text = ANY ((ARRAY['english'::character varying, 'french'::character varying])::text[]))),
    CONSTRAINT user_data_role_check CHECK (((role)::text = ANY ((ARRAY['student'::character varying, 'administrator'::character varying, 'developer'::character varying])::text[])))
);


ALTER TABLE public.user_data OWNER TO postgres;

--
-- Name: user_data_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_data_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_data_user_id_seq OWNER TO postgres;

--
-- Name: user_data_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_data_user_id_seq OWNED BY public.user_data.user_id;


--
-- Name: user_follows; Type: TABLE; Schema: public; Owner: simon
--

CREATE TABLE public.user_follows (
    follow_id integer NOT NULL,
    user_id integer NOT NULL,
    is_following integer NOT NULL
);


ALTER TABLE public.user_follows OWNER TO simon;

--
-- Name: user_follows_follow_id_seq; Type: SEQUENCE; Schema: public; Owner: simon
--

CREATE SEQUENCE public.user_follows_follow_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_follows_follow_id_seq OWNER TO simon;

--
-- Name: user_follows_follow_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: simon
--

ALTER SEQUENCE public.user_follows_follow_id_seq OWNED BY public.user_follows.follow_id;


--
-- Name: user_notification; Type: TABLE; Schema: public; Owner: simon
--

CREATE TABLE public.user_notification (
    notification_id integer NOT NULL,
    user_id integer NOT NULL,
    room_id integer NOT NULL,
    category character varying(255) NOT NULL,
    content text NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    is_read boolean DEFAULT false
);


ALTER TABLE public.user_notification OWNER TO simon;

--
-- Name: user_notification_notification_id_seq; Type: SEQUENCE; Schema: public; Owner: simon
--

CREATE SEQUENCE public.user_notification_notification_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_notification_notification_id_seq OWNER TO simon;

--
-- Name: user_notification_notification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: simon
--

ALTER SEQUENCE public.user_notification_notification_id_seq OWNED BY public.user_notification.notification_id;


--
-- Name: assigned_issues assignment_id; Type: DEFAULT; Schema: public; Owner: simon
--

ALTER TABLE ONLY public.assigned_issues ALTER COLUMN assignment_id SET DEFAULT nextval('public.assigned_issues_assignment_id_seq'::regclass);


--
-- Name: attachments attachment_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attachments ALTER COLUMN attachment_id SET DEFAULT nextval('public.attachments_attachment_id_seq'::regclass);


--
-- Name: auth_provider id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_provider ALTER COLUMN id SET DEFAULT nextval('public.auth_provider_id_seq'::regclass);


--
-- Name: categories category_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN category_id SET DEFAULT nextval('public.categories_category_id_seq'::regclass);


--
-- Name: comments comment_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments ALTER COLUMN comment_id SET DEFAULT nextval('public.comments_comment_id_seq'::regclass);


--
-- Name: issue_resolvers resolver_id; Type: DEFAULT; Schema: public; Owner: simon
--

ALTER TABLE ONLY public.issue_resolvers ALTER COLUMN resolver_id SET DEFAULT nextval('public.issue_resolvers_resolver_id_seq'::regclass);


--
-- Name: issues issue_id; Type: DEFAULT; Schema: public; Owner: simon
--

ALTER TABLE ONLY public.issues ALTER COLUMN issue_id SET DEFAULT nextval('public.issues_issue_id_seq'::regclass);


--
-- Name: notifications notification_id; Type: DEFAULT; Schema: public; Owner: simon
--

ALTER TABLE ONLY public.notifications ALTER COLUMN notification_id SET DEFAULT nextval('public.notifications_notification_id_seq'::regclass);


--
-- Name: room_ban ban_id; Type: DEFAULT; Schema: public; Owner: simon
--

ALTER TABLE ONLY public.room_ban ALTER COLUMN ban_id SET DEFAULT nextval('public.room_ban_ban_id_seq'::regclass);


--
-- Name: room_info room_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room_info ALTER COLUMN room_id SET DEFAULT nextval('public.room_info_room_id_seq'::regclass);


--
-- Name: room_status status_id; Type: DEFAULT; Schema: public; Owner: simon
--

ALTER TABLE ONLY public.room_status ALTER COLUMN status_id SET DEFAULT nextval('public.room_status_status_id_seq'::regclass);


--
-- Name: user_data user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_data ALTER COLUMN user_id SET DEFAULT nextval('public.user_data_user_id_seq'::regclass);


--
-- Name: user_follows follow_id; Type: DEFAULT; Schema: public; Owner: simon
--

ALTER TABLE ONLY public.user_follows ALTER COLUMN follow_id SET DEFAULT nextval('public.user_follows_follow_id_seq'::regclass);


--
-- Name: user_notification notification_id; Type: DEFAULT; Schema: public; Owner: simon
--

ALTER TABLE ONLY public.user_notification ALTER COLUMN notification_id SET DEFAULT nextval('public.user_notification_notification_id_seq'::regclass);


--
-- Data for Name: assigned_issues; Type: TABLE DATA; Schema: public; Owner: simon
--

COPY public.assigned_issues (assignment_id, issue_id, assigned_resolver_id, due_at, created_at) FROM stdin;
2	47	1	2023-12-07 01:51:21.815397+00	2023-11-30 01:54:28.740237+00
\.


--
-- Data for Name: attachments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.attachments (attachment_id, issue_id, attachment_url, created_at) FROM stdin;
6	6	https://example.com/attachment1.pdf	2023-11-20 01:14:30.960471+00
7	8	https://example.com/attachment2.png	2023-11-20 01:14:30.960471+00
8	7	https://example.com/attachment3.docx	2023-11-20 01:14:30.960471+00
9	8	https://example.com/attachment4.jpg	2023-11-20 01:14:30.960471+00
10	9	https://example.com/attachment5.zip	2023-11-20 01:14:30.960471+00
\.


--
-- Data for Name: auth_provider; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_provider (id, user_id, google_id) FROM stdin;
1	1	107093374653821039363
2	2	106070739805548243971
35	35	103919593409987058779
36	36	113216067377015351707
37	37	111767886188574532999
38	38	109836921357425935701
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (category_id, name, created_at, updated_at) FROM stdin;
1	🏫 Student Affairs Office	2023-11-20 12:15:32.443559+00	2023-11-20 12:15:32.443559+00
2	👮 Campus Security	2023-11-20 12:15:32.575809+00	2023-11-20 12:15:32.575809+00
3	🏥 Health Services	2023-11-20 12:15:32.600193+00	2023-11-20 12:15:32.600193+00
4	🏘️ Housing Department	2023-11-20 12:15:32.624906+00	2023-11-20 12:15:32.624906+00
5	📚 Academic Affairs Office	2023-11-20 12:15:32.649395+00	2023-11-20 12:15:32.649395+00
6	🔧 Campus Facilities Management	2023-11-20 12:15:32.674172+00	2023-11-20 12:15:32.674172+00
7	🌐 Diversity and Inclusion Office	2023-11-20 12:15:32.698974+00	2023-11-20 12:15:32.698974+00
8	💰 Financial Aid Office	2023-11-20 12:15:32.723268+00	2023-11-20 12:15:32.723268+00
9	💼 Career Services	2023-11-20 12:15:32.747673+00	2023-11-20 12:15:32.747673+00
10	💻 Technology Services	2023-11-20 12:15:32.772617+00	2023-11-20 12:15:32.772617+00
\.


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comments (comment_id, issue_id, user_id, comment_text, created_at) FROM stdin;
1	1	36	Scheduled maintenance planned next week.	2023-11-21 00:07:44.961891+00
2	2	36	IT team notified about the WiFi issue.	2023-11-21 00:07:44.961891+00
3	3	36	Replacement chairs ordered.	2023-11-21 00:07:44.961891+00
4	4	37	Plumber assigned to fix the issue.	2023-11-21 00:07:44.961891+00
5	5	37	Electricity restored in Block B.	2023-11-21 00:07:44.961891+00
6	11	1	Paving contractors contacted.	2023-11-21 00:07:44.961891+00
7	12	1	Request forwarded to admin for consideration.	2023-11-21 00:07:44.961891+00
8	13	2	New lighting fixtures installed.	2023-11-21 00:07:44.961891+00
9	14	2	Gym equipment serviced and repaired.	2023-11-21 00:07:44.961891+00
10	6	1	Campus security notified about the broken gate.	2023-11-21 00:08:08.748536+00
11	7	2	Submitted a request for additional parking space.	2023-11-21 00:08:08.748536+00
12	8	2	Library staff working on extending opening hours.	2023-11-21 00:08:08.748536+00
13	9	37	Scheduled a meeting to discuss the issue with course schedules.	2023-11-21 00:08:08.748536+00
14	10	1	Technical team investigating server downtime.	2023-11-21 00:08:08.748536+00
15	11	2	IT department addressing internet connectivity in labs.	2023-11-21 00:08:08.748536+00
16	12	36	Cleaning staff assigned to clear the clogged drains.	2023-11-21 00:08:08.748536+00
17	13	37	Maintenance team fixing the broken windows.	2023-11-21 00:08:08.748536+00
18	14	36	Resolved the issue with the faulty projectors in lecture halls.	2023-11-21 00:08:08.748536+00
19	47	2	Yeah seen thanks for bringing it to our notice will work on resolving it	2023-11-28 23:33:48.887267+00
20	47	2	Okay thank you	2023-11-29 01:07:09.087885+00
21	48	1	Yeah that was a command from the facilities department	2023-11-29 01:37:09.792887+00
\.


--
-- Data for Name: issue_resolvers; Type: TABLE DATA; Schema: public; Owner: simon
--

COPY public.issue_resolvers (resolver_id, user_id, category_id) FROM stdin;
1	2	1
\.


--
-- Data for Name: issues; Type: TABLE DATA; Schema: public; Owner: simon
--

COPY public.issues (issue_id, user_id, category_id, description, status, priority, created_at, updated_at, title, is_anonymous, attachment_url) FROM stdin;
9	2	3	Several pieces of gym equipment in the Fitness Center are broken, limiting students’ ability to engage in fitness activities.	open	low	2023-11-20 22:22:53.725013+00	2023-11-20 22:22:53.725013+00	Gym Equipment Maintenance	f	\N
10	2	2	Students are experiencing persistent WiFi connectivity issues in multiple computer labs, hindering academic work.	resolved	high	2023-11-20 22:22:53.725013+00	2023-11-20 22:22:53.725013+00	WiFi Connectivity Problems	f	\N
11	2	1	There are ongoing plumbing problems in the residential hall bathrooms, causing inconvenience to residents.	closed	medium	2023-11-20 22:22:53.725013+00	2023-11-20 22:22:53.725013+00	Plumbing Troubles in Residential Halls	f	\N
12	2	1	The elevator in the Administration Building requires immediate maintenance due to frequent breakdowns.	in-progress	low	2023-11-20 22:22:53.725013+00	2023-11-20 22:22:53.725013+00	Elevator Maintenance Needed	f	\N
13	2	2	Malfunctions in security cameras across campus parking areas are affecting surveillance and security monitoring.	open	high	2023-11-20 22:22:53.725013+00	2023-11-20 22:22:53.725013+00	Parking Area Security Cameras	f	\N
14	2	3	A fault in the fire alarm system in the Student Center is causing frequent false alarms, disrupting activities.	in-progress	medium	2023-11-20 22:22:53.725013+00	2023-11-20 22:22:53.725013+00	Fire Alarm System Fault	f	\N
15	2	1	Several pieces of furniture in study areas need replacement due to wear and tear, affecting students’ comfort.	closed	low	2023-11-20 22:22:53.725013+00	2023-11-20 22:22:53.725013+00	Furniture Replacement Required	f	\N
16	2	3	Maintenance is required in campus gardens to preserve the aesthetic appeal and ensure a conducive environment.	open	high	2023-11-20 22:22:53.725013+00	2023-11-20 22:22:53.725013+00	Campus Gardens Maintenance	f	\N
17	2	2	Multiple vending machines across the campus are experiencing malfunctions, causing inconvenience to students and staff.	resolved	medium	2023-11-20 22:22:53.725013+00	2023-11-20 22:22:53.725013+00	Vending Machine Issues	f	\N
18	2	1	Repairs are needed in the HVAC system serving faculty offices to maintain a comfortable working environment.	closed	low	2023-11-20 22:22:53.725013+00	2023-11-20 22:22:53.725013+00	HVAC System Repair	f	\N
19	2	3	A surge in IT helpdesk service requests is causing delays in addressing technical issues experienced by students.	open	high	2023-11-20 22:22:53.725013+00	2023-11-20 22:22:53.725013+00	IT Helpdesk Service Requests	f	\N
20	2	2	The organization of library resources needs improvement for easier access and efficient study sessions.	in-progress	medium	2023-11-20 22:22:53.725013+00	2023-11-20 22:22:53.725013+00	Library Resources Organization	f	\N
23	\N	5	A student from the cohort A had his phone rang in class and did not expose himself hence he has been taken to the AJC	open	high	2023-11-22 19:01:22.724308+00	2023-11-22 19:01:22.724308+00	The Software Engineering incidence 	t	
24	2	1	you are the not serious, fuck you all. This is was bull shit	open	high	2023-11-23 01:49:56.175071+00	2023-11-23 01:49:56.175071+00	Fuck you all	f	
25	2	1	you are the not serious, fuck you all. This is was bull shit	open	high	2023-11-23 01:54:21.169086+00	2023-11-23 01:54:21.169086+00	Fuck you all	f	
26	2	1	this was bull shit, you very bad and idiot person	open	high	2023-11-23 01:57:02.758005+00	2023-11-23 01:57:02.758005+00	Fuck you all	t	
27	2	3	Why are you so dump and stupid; You are a shit fuck you all	open	high	2023-11-23 02:01:36.583393+00	2023-11-23 02:01:36.583393+00	That was bullshit	f	
28	2	3	Why are you so dump and stupid; You are a shit fuck you all	open	high	2023-11-23 02:04:56.21954+00	2023-11-23 02:04:56.21954+00	That was bullshit	f	
29	2	1	Fuck you all	open	medium	2023-11-23 02:05:38.010038+00	2023-11-23 02:05:38.010038+00	You are a shit	f	
30	2	1	fuck you all	open	low	2023-11-23 02:09:02.02521+00	2023-11-23 02:09:02.02521+00	what a shit; an idiot person like you	f	
31	2	1	fuck you all	open	low	2023-11-23 02:12:21.495837+00	2023-11-23 02:12:21.495837+00	what a shit; an idiot person like you	f	
32	2	1	fuck you all	open	low	2023-11-23 02:15:04.633724+00	2023-11-23 02:15:04.633724+00	what a shit; an idiot person like you	f	
8	2	2	Students are encountering difficulties with the online course registration system, leading to enrollment issues and scheduling conflicts.	closed	medium	2023-11-20 22:22:53.725013+00	2023-11-20 22:22:53.725013+00	Online Course Registration Problems	f	\N
33	2	1	fuck you all	open	low	2023-11-23 02:15:16.829479+00	2023-11-23 02:15:16.829479+00	what a shit; an idiot person like you	f	
34	2	2	what a shit	open	low	2023-11-23 02:15:54.264104+00	2023-11-23 02:15:54.264104+00	fuck you all	f	
35	2	2	what a shit	open	low	2023-11-23 02:16:44.891869+00	2023-11-23 02:16:44.891869+00	fuck you all	f	
36	2	2	what a shit	open	low	2023-11-23 02:17:13.46253+00	2023-11-23 02:17:13.46253+00	fuck you all	f	
37	2	4	You are very stupid, what the hell and the fuck are you thinking you are	open	medium	2023-11-23 02:53:11.24713+00	2023-11-23 02:53:11.24713+00	fuck you all	f	
38	2	2	Fuck you are, what a shit, who do you think you are	open	low	2023-11-23 02:54:54.683871+00	2023-11-23 02:54:54.683871+00	You are all idiot	f	
39	2	1	You are all fool, fuck you all, what a bull shit	open	medium	2023-11-23 02:57:45.218719+00	2023-11-23 02:57:45.218719+00	Idiot man like you, stupid boy	t	
40	2	1	You are a foolish man	open	medium	2023-11-23 02:59:22.75829+00	2023-11-23 02:59:22.75829+00	Stupid boy and idiot man , what a shit	f	
41	2	1	Foolish man like you 	open	low	2023-11-23 03:03:56.952194+00	2023-11-23 03:03:56.952194+00	You are a bullshit and an animal, stupid	f	
42	2	1	foolishs man	open	medium	2023-11-23 03:04:27.383637+00	2023-11-23 03:04:27.383637+00	hey you idot	f	
43	2	1	hdhd	open	low	2023-11-23 03:04:58.03607+00	2023-11-23 03:04:58.03607+00	yu	f	
44	2	1	hdhegf	open	low	2023-11-23 03:05:18.798764+00	2023-11-23 03:05:18.798764+00	hbchs	f	
45	2	1	You are a stupid man and an idiot	open	medium	2023-11-23 03:06:09.256275+00	2023-11-23 03:06:09.256275+00	Nonsense matters and stupid people	f	
46	2	1	fool stupid shit idiot nonsense	open	medium	2023-11-23 03:06:44.93052+00	2023-11-23 03:06:44.93052+00	bull shit	f	
6	2	3	The cafeteria is facing a severe pest infestation, impacting food safety standards and requiring immediate pest control measures.	in-progress	low	2023-11-20 22:22:53.725013+00	2023-11-20 22:22:53.725013+00	Pest Infestation in Cafeteria	f	\N
2	35	2	We have identified a significant water leakage issue in the Main Library, affecting the reading area and threatening valuable book collections.	open	medium	2023-11-20 22:22:53.725013+00	2023-11-20 22:22:53.725013+00	Water Leakage in Library	f	\N
1	37	1	There is a widespread electrical failure in the West Campus building. The power outage is affecting multiple rooms, disrupting lectures, and hindering day-to-day activities.	closed	high	2023-11-20 22:22:53.725013+00	2023-11-20 22:22:53.725013+00	Electrical Failure	f	\N
3	36	3	Several critical science lab equipment pieces require urgent maintenance to ensure smooth laboratory sessions and accurate experiments.	closed	medium	2023-11-20 22:22:53.725013+00	2023-11-20 22:22:53.725013+00	Science Lab Equipment Maintenance	f	\N
5	2	2	A previously reported network outage in the Student Dorms has been successfully resolved, restoring internet connectivity for residents.	resolved	medium	2023-11-20 22:22:53.725013+00	2023-11-20 22:22:53.725013+00	Network Outage Resolved	f	\N
7	2	1	Several areas in the parking lot are experiencing lighting malfunctions, posing security risks during evening hours.	closed	high	2023-11-20 22:22:53.725013+00	2023-11-20 22:22:53.725013+00	Parking Lot Lighting Issue	f	\N
47	2	1	stupid fool shit nonense	in-progress	low	2023-11-23 03:07:36.870609+00	2023-11-23 03:07:36.870609+00	you are idiot	f	
4	1	1	Numerous AC units in various lecture halls have malfunctioned, leading to uncomfortable learning environments. Immediate repair is necessary.	open	high	2023-11-20 22:22:53.725013+00	2023-11-20 22:22:53.725013+00	AC Units Malfunction In Halls	f	\N
48	1	2	The security at the gym do not always allow us to go gym in the night and we would want to seek you consent on that as to why it is so	open	low	2023-11-29 01:19:42.394132+00	2023-11-29 01:19:42.394132+00	Humble Night Gym Permission	t	
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: simon
--

COPY public.notifications (notification_id, user_id, issue_id, notifiction_type, message, status, created_at, updated_at) FROM stdin;
11	2	10	status	Issue status updated to resolved	unread	2023-11-24 02:39:39.086723+00	2023-11-24 02:39:39.086723+00
12	2	12	comment	New comment added to Issue #12	unread	2023-11-24 02:39:39.086723+00	2023-11-24 02:39:39.086723+00
13	2	20	attachment	Attachment added to Issue #20	unread	2023-11-24 02:39:39.086723+00	2023-11-24 02:39:39.086723+00
14	2	25	ban	You have been temporarily banned	unread	2023-11-24 02:39:39.086723+00	2023-11-24 02:39:39.086723+00
15	2	47	admin	Important announcement from admin	unread	2023-11-24 02:39:39.086723+00	2023-11-24 02:39:39.086723+00
16	2	15	status	Issue #15 status changed to in progress	unread	2023-11-24 02:39:39.086723+00	2023-11-24 02:39:39.086723+00
17	2	28	comment	Reply to your comment on Issue #28	unread	2023-11-24 02:39:39.086723+00	2023-11-24 02:39:39.086723+00
18	2	\N	admin	System update scheduled for maintenance	unread	2023-11-24 02:39:39.086723+00	2023-11-24 02:39:39.086723+00
19	2	19	attachment	New file attached to Issue #22	unread	2023-11-24 02:39:39.086723+00	2023-11-24 02:39:39.086723+00
20	2	30	status	Issue #30 status changed to closed	unread	2023-11-24 02:39:39.086723+00	2023-11-24 02:39:39.086723+00
21	2	8	status	Issue 8 status changed tap to view: closed	unread	2023-11-24 12:25:36.935829+00	2023-11-24 12:25:36.935829+00
22	2	7	status	Issue 7 status changed tap to view: closed	unread	2023-11-24 12:26:03.392242+00	2023-11-24 12:26:03.392242+00
24	1	1	status	Issue 1 has been assigned	unread	2023-11-28 02:36:03.230576+00	2023-11-28 02:36:03.230576+00
25	1	3	status	Issue 3 has been assigned	unread	2023-11-28 02:36:11.397239+00	2023-11-28 02:36:11.397239+00
26	2	5	status	Issue 5 has been assigned	unread	2023-11-28 02:37:35.766959+00	2023-11-28 02:37:35.766959+00
27	2	7	status	Issue 7 has been assigned to you	unread	2023-11-28 02:38:23.678871+00	2023-11-28 02:38:23.678871+00
28	2	47	status	Issue 47 status changed tap to view: in-progress	unread	2023-11-28 03:18:10.953534+00	2023-11-28 03:18:10.953534+00
29	1	47	status	Issue 47 has been assigned to you	unread	2023-11-28 12:12:33.049534+00	2023-11-28 12:12:33.049534+00
30	1	47	status	Issue 47 has been assigned to you	unread	2023-11-28 12:14:05.829707+00	2023-11-28 12:14:05.829707+00
31	1	47	status	Issue 47 has been assigned to you	unread	2023-11-28 12:34:00.448721+00	2023-11-28 12:34:00.448721+00
32	1	48	comment	New comment added to issue 48	unread	2023-11-29 01:37:09.980488+00	2023-11-29 01:37:09.980488+00
33	2	47	status	Issue 47 status changed tap to view: in-progress	unread	2023-11-29 12:13:38.029022+00	2023-11-29 12:13:38.029022+00
34	36	3	status	Issue 3 status changed tap to view: closed	unread	2023-11-29 15:40:49.536065+00	2023-11-29 15:40:49.536065+00
\.


--
-- Data for Name: room_ban; Type: TABLE DATA; Schema: public; Owner: simon
--

COPY public.room_ban (ban_id, room_id, user_id, ban_type, created_at) FROM stdin;
\.


--
-- Data for Name: room_info; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.room_info (room_id, room_desc, creator_id, is_private, auto_speaker, chat_enabled, ended, hand_raise_enabled, category_id, last_active) FROM stdin;
2	Student Housing Issues Room	2	f	t	f	t	t	1	2023-11-22 01:49:54.900938
1	Academic Honor COde	1	f	t	f	t	t	4	2023-11-22 01:49:53.501623
4	Social Misconduct Discussion Forum	35	f	t	f	t	t	\N	2023-11-26 14:12:36.163021
3	Ubora Fraud hearing	37	f	t	t	t	t	2	2023-11-22 04:26:56.285287
6	Ashesi Football Association	2	f	t	f	t	t	\N	2023-11-27 01:07:34.599583
5	Student Entrepreneurship Forum	2	f	t	f	t	t	\N	2023-11-26 15:59:42.94109
8	Ahsesi DLab Discussion Forum	2	f	f	f	f	f	\N	2023-11-27 01:38:54.47958
\.


--
-- Data for Name: room_info_category; Type: TABLE DATA; Schema: public; Owner: simon
--

COPY public.room_info_category (room_id, category_id) FROM stdin;
1	46
1	47
2	48
2	49
7	1
7	2
7	5
1	1
1	4
1	5
2	1
2	4
2	7
3	1
3	10
3	8
4	1
4	6
4	7
5	1
5	3
5	5
6	1
6	3
6	5
8	1
8	3
8	2
\.


--
-- Data for Name: room_status; Type: TABLE DATA; Schema: public; Owner: simon
--

COPY public.room_status (status_id, room_id, user_id, is_speaker, is_mod, raised_hand, is_muted) FROM stdin;
9	2	4	t	f	f	t
177	1	35	t	f	f	t
178	1	36	t	f	f	t
23	2	55	t	f	f	t
181	2	36	t	f	f	t
182	2	37	t	f	f	t
30	1	4	t	f	f	t
192	2	2	t	f	f	t
193	3	2	t	f	f	t
195	1	2	t	f	f	t
196	2	38	t	f	f	t
197	3	38	t	f	f	t
198	3	36	t	f	f	t
199	3	37	t	f	f	t
76	1	1	t	f	f	t
200	3	35	t	f	f	t
234	5	36	t	f	f	t
235	5	2	t	f	f	t
237	8	35	f	f	f	t
\.


--
-- Data for Name: user_data; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_data (user_id, role, email, password, unique_id, language, avatar_url, display_name, user_name, current_room_id, google_id, last_seen, bio, created_at, updated_at) FROM stdin;
38	student	junior.boateng@auaf.edu.af	\N	\N	english	https://lh3.googleusercontent.com/a/ACg8ocLtNOUZzzDWQ6axaOWsROhoDoUM6ZJ0ZE2GZtt85Uc=s96-c	Simon Junior Boateng	boateng5921	\N	109836921357425935701	\N	\N	2023-11-23 10:37:34.06499+00	2023-11-23 10:37:34.06499+00
37	student	asareg197@gmail.com	\N	\N	english	https://lh3.googleusercontent.com/a/ACg8ocIGUq7qZF3UJ4Tp1aRivbwo3MWaqoaNsLdymV--rMJTenk=s96-c	Gladys Asare	asare3670	\N	111767886188574532999	2023-11-22 01:49:54.564023+00	\N	2023-11-20 19:31:17.276473+00	2023-11-20 19:31:17.276473+00
1	student	developerlearner2929@gmail.com	\N	\N	english	https://lh3.googleusercontent.com/a/ACg8ocJoQg6imPtjVGbiBQbQodogAA7zn4-LITGDeM6gn0MOFA=s96-c	developer learner	learner2196	\N	107093374653821039363	2023-11-20 19:40:40.070155+00	\N	2023-11-20 12:57:42.346409+00	2023-11-20 12:57:42.346409+00
36	student	winnerashesi@gmail.com	\N	\N	english	https://lh3.googleusercontent.com/a/ACg8ocILj68OvIQK-CTupaQ38D5-zS_Z-Ka0TlUrV0a6Cl3kgA=s96-c	winner ashesi	ashesi8391	\N	113216067377015351707	2023-11-22 01:51:00.917542+00	\N	2023-11-20 18:26:17.133809+00	2023-11-20 18:26:17.133809+00
35	student	boatengsimonjnr157@gmail.com	\N	\N	english	https://lh3.googleusercontent.com/a/ACg8ocKjd2QyQiNt1w93RcV6Uob9FzLWz4Vy9OEg5awEy4RP9dA=s96-c	Boateng Simon Junior	simonjunior5662	8	103919593409987058779	2023-11-22 01:49:46.410183+00	\N	2023-11-20 16:24:43.445047+00	2023-11-20 16:24:43.445047+00
2	administrator	junioratta2929@gmail.com	\N	\N	english	https://lh3.googleusercontent.com/a/ACg8ocJoEJUa5btn2TGuIyFL-6N_Bo1-33lsrWguBsPfRHGUOA=s96-c	Junior Atta	atta3737	\N	106070739805548243971	2023-11-22 01:49:54.900938+00	\N	2023-11-20 14:17:09.566536+00	2023-11-20 14:17:09.566536+00
\.


--
-- Data for Name: user_follows; Type: TABLE DATA; Schema: public; Owner: simon
--

COPY public.user_follows (follow_id, user_id, is_following) FROM stdin;
\.


--
-- Data for Name: user_notification; Type: TABLE DATA; Schema: public; Owner: simon
--

COPY public.user_notification (notification_id, user_id, room_id, category, content, created_at, is_read) FROM stdin;
\.


--
-- Name: assigned_issues_assignment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: simon
--

SELECT pg_catalog.setval('public.assigned_issues_assignment_id_seq', 4, true);


--
-- Name: attachments_attachment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.attachments_attachment_id_seq', 10, true);


--
-- Name: auth_provider_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_provider_id_seq', 38, true);


--
-- Name: categories_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_category_id_seq', 10, true);


--
-- Name: comments_comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comments_comment_id_seq', 21, true);


--
-- Name: issue_resolvers_resolver_id_seq; Type: SEQUENCE SET; Schema: public; Owner: simon
--

SELECT pg_catalog.setval('public.issue_resolvers_resolver_id_seq', 1, true);


--
-- Name: issues_issue_id_seq; Type: SEQUENCE SET; Schema: public; Owner: simon
--

SELECT pg_catalog.setval('public.issues_issue_id_seq', 51, true);


--
-- Name: notifications_notification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: simon
--

SELECT pg_catalog.setval('public.notifications_notification_id_seq', 34, true);


--
-- Name: room_ban_ban_id_seq; Type: SEQUENCE SET; Schema: public; Owner: simon
--

SELECT pg_catalog.setval('public.room_ban_ban_id_seq', 1, false);


--
-- Name: room_info_room_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.room_info_room_id_seq', 8, true);


--
-- Name: room_status_status_id_seq; Type: SEQUENCE SET; Schema: public; Owner: simon
--

SELECT pg_catalog.setval('public.room_status_status_id_seq', 237, true);


--
-- Name: user_data_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_data_user_id_seq', 38, true);


--
-- Name: user_follows_follow_id_seq; Type: SEQUENCE SET; Schema: public; Owner: simon
--

SELECT pg_catalog.setval('public.user_follows_follow_id_seq', 1, false);


--
-- Name: user_notification_notification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: simon
--

SELECT pg_catalog.setval('public.user_notification_notification_id_seq', 1, false);


--
-- Name: assigned_issues assigned_issues_issue_id_assigned_resolver_id_key; Type: CONSTRAINT; Schema: public; Owner: simon
--

ALTER TABLE ONLY public.assigned_issues
    ADD CONSTRAINT assigned_issues_issue_id_assigned_resolver_id_key UNIQUE (issue_id, assigned_resolver_id);


--
-- Name: assigned_issues assigned_issues_pkey; Type: CONSTRAINT; Schema: public; Owner: simon
--

ALTER TABLE ONLY public.assigned_issues
    ADD CONSTRAINT assigned_issues_pkey PRIMARY KEY (assignment_id);


--
-- Name: attachments attachments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attachments
    ADD CONSTRAINT attachments_pkey PRIMARY KEY (attachment_id);


--
-- Name: auth_provider auth_provider_google_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_provider
    ADD CONSTRAINT auth_provider_google_id_key UNIQUE (google_id);


--
-- Name: auth_provider auth_provider_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_provider
    ADD CONSTRAINT auth_provider_pkey PRIMARY KEY (id);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (category_id);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (comment_id);


--
-- Name: issue_resolvers issue_resolvers_pkey; Type: CONSTRAINT; Schema: public; Owner: simon
--

ALTER TABLE ONLY public.issue_resolvers
    ADD CONSTRAINT issue_resolvers_pkey PRIMARY KEY (resolver_id);


--
-- Name: issue_resolvers issue_resolvers_user_id_category_id_key; Type: CONSTRAINT; Schema: public; Owner: simon
--

ALTER TABLE ONLY public.issue_resolvers
    ADD CONSTRAINT issue_resolvers_user_id_category_id_key UNIQUE (user_id, category_id);


--
-- Name: issues issues_pkey; Type: CONSTRAINT; Schema: public; Owner: simon
--

ALTER TABLE ONLY public.issues
    ADD CONSTRAINT issues_pkey PRIMARY KEY (issue_id);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: simon
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (notification_id);


--
-- Name: room_ban room_ban_pkey; Type: CONSTRAINT; Schema: public; Owner: simon
--

ALTER TABLE ONLY public.room_ban
    ADD CONSTRAINT room_ban_pkey PRIMARY KEY (ban_id);


--
-- Name: room_info_category room_info_category_pkey; Type: CONSTRAINT; Schema: public; Owner: simon
--

ALTER TABLE ONLY public.room_info_category
    ADD CONSTRAINT room_info_category_pkey PRIMARY KEY (room_id, category_id);


--
-- Name: room_info room_info_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room_info
    ADD CONSTRAINT room_info_pkey PRIMARY KEY (room_id);


--
-- Name: room_status room_status_pkey; Type: CONSTRAINT; Schema: public; Owner: simon
--

ALTER TABLE ONLY public.room_status
    ADD CONSTRAINT room_status_pkey PRIMARY KEY (status_id);


--
-- Name: user_data user_data_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_data
    ADD CONSTRAINT user_data_email_key UNIQUE (email);


--
-- Name: user_data user_data_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_data
    ADD CONSTRAINT user_data_pkey PRIMARY KEY (user_id);


--
-- Name: user_follows user_follows_pkey; Type: CONSTRAINT; Schema: public; Owner: simon
--

ALTER TABLE ONLY public.user_follows
    ADD CONSTRAINT user_follows_pkey PRIMARY KEY (follow_id);


--
-- Name: user_notification user_notification_pkey; Type: CONSTRAINT; Schema: public; Owner: simon
--

ALTER TABLE ONLY public.user_notification
    ADD CONSTRAINT user_notification_pkey PRIMARY KEY (notification_id);


--
-- Name: idx_attachment_issue; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_attachment_issue ON public.attachments USING btree (issue_id);


--
-- Name: idx_comment_issue; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_comment_issue ON public.comments USING btree (issue_id);


--
-- Name: idx_issue_resolvers_category_id; Type: INDEX; Schema: public; Owner: simon
--

CREATE INDEX idx_issue_resolvers_category_id ON public.issue_resolvers USING btree (category_id);


--
-- Name: idx_issue_resolvers_user_id; Type: INDEX; Schema: public; Owner: simon
--

CREATE INDEX idx_issue_resolvers_user_id ON public.issue_resolvers USING btree (user_id);


--
-- Name: assigned_issues assigned_issues_assigned_resolver_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: simon
--

ALTER TABLE ONLY public.assigned_issues
    ADD CONSTRAINT assigned_issues_assigned_resolver_id_fkey FOREIGN KEY (assigned_resolver_id) REFERENCES public.issue_resolvers(resolver_id) ON DELETE CASCADE;


--
-- Name: assigned_issues assigned_issues_issue_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: simon
--

ALTER TABLE ONLY public.assigned_issues
    ADD CONSTRAINT assigned_issues_issue_id_fkey FOREIGN KEY (issue_id) REFERENCES public.issues(issue_id) ON DELETE CASCADE;


--
-- Name: auth_provider auth_provider_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_provider
    ADD CONSTRAINT auth_provider_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_data(user_id) ON DELETE CASCADE;


--
-- Name: issue_resolvers issue_resolvers_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: simon
--

ALTER TABLE ONLY public.issue_resolvers
    ADD CONSTRAINT issue_resolvers_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(category_id) ON DELETE CASCADE;


--
-- Name: issue_resolvers issue_resolvers_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: simon
--

ALTER TABLE ONLY public.issue_resolvers
    ADD CONSTRAINT issue_resolvers_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_data(user_id) ON DELETE CASCADE;


--
-- Name: issues issues_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: simon
--

ALTER TABLE ONLY public.issues
    ADD CONSTRAINT issues_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(category_id) ON DELETE SET NULL;


--
-- Name: issues issues_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: simon
--

ALTER TABLE ONLY public.issues
    ADD CONSTRAINT issues_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_data(user_id) ON DELETE CASCADE;


--
-- Name: notifications notifications_issue_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: simon
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_issue_id_fkey FOREIGN KEY (issue_id) REFERENCES public.issues(issue_id) ON DELETE SET NULL;


--
-- Name: notifications notifications_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: simon
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_data(user_id) ON DELETE CASCADE;


--
-- Name: room_info room_info_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room_info
    ADD CONSTRAINT room_info_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(category_id) ON DELETE CASCADE;


--
-- Name: room_info room_info_creator_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room_info
    ADD CONSTRAINT room_info_creator_id_fkey FOREIGN KEY (creator_id) REFERENCES public.user_data(user_id) ON DELETE CASCADE;


--
-- Name: TABLE attachments; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.attachments TO simon;


--
-- Name: TABLE comments; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.comments TO simon;


--
-- PostgreSQL database dump complete
--

