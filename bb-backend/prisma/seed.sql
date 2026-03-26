--
-- PostgreSQL database dump
--

-- Dumped from database version 13.23 (Debian 13.23-1.pgdg13+1)
-- Dumped by pg_dump version 14.13 (Homebrew)

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

ALTER TABLE IF EXISTS ONLY public."Saving" DROP CONSTRAINT IF EXISTS "Saving_userId_fkey";
ALTER TABLE IF EXISTS ONLY public."Income" DROP CONSTRAINT IF EXISTS "Income_userId_fkey";
ALTER TABLE IF EXISTS ONLY public."Expense" DROP CONSTRAINT IF EXISTS "Expense_budgetId_fkey";
ALTER TABLE IF EXISTS ONLY public."Budget" DROP CONSTRAINT IF EXISTS "Budget_userId_fkey";
ALTER TABLE IF EXISTS ONLY public."Budget" DROP CONSTRAINT IF EXISTS "Budget_incomeId_fkey";
ALTER TABLE IF EXISTS ONLY public."Bill" DROP CONSTRAINT IF EXISTS "Bill_userId_fkey";
ALTER TABLE IF EXISTS ONLY public."AddSaving" DROP CONSTRAINT IF EXISTS "AddSaving_savingId_fkey";
ALTER TABLE IF EXISTS ONLY public."AddSaving" DROP CONSTRAINT IF EXISTS "AddSaving_incomeId_fkey";
DROP INDEX IF EXISTS public."User_email_key";
ALTER TABLE IF EXISTS ONLY public._prisma_migrations DROP CONSTRAINT IF EXISTS _prisma_migrations_pkey;
ALTER TABLE IF EXISTS ONLY public."User" DROP CONSTRAINT IF EXISTS "User_pkey";
ALTER TABLE IF EXISTS ONLY public."Saving" DROP CONSTRAINT IF EXISTS "Saving_pkey";
ALTER TABLE IF EXISTS ONLY public."Income" DROP CONSTRAINT IF EXISTS "Income_pkey";
ALTER TABLE IF EXISTS ONLY public."Expense" DROP CONSTRAINT IF EXISTS "Expense_pkey";
ALTER TABLE IF EXISTS ONLY public."Budget" DROP CONSTRAINT IF EXISTS "Budget_pkey";
ALTER TABLE IF EXISTS ONLY public."Bill" DROP CONSTRAINT IF EXISTS "Bill_pkey";
ALTER TABLE IF EXISTS ONLY public."AddSaving" DROP CONSTRAINT IF EXISTS "AddSaving_pkey";
DROP TABLE IF EXISTS public._prisma_migrations;
DROP TABLE IF EXISTS public."User";
DROP TABLE IF EXISTS public."Saving";
DROP TABLE IF EXISTS public."Income";
DROP TABLE IF EXISTS public."Expense";
DROP TABLE IF EXISTS public."Budget";
DROP TABLE IF EXISTS public."Bill";
DROP TABLE IF EXISTS public."AddSaving";
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: AddSaving; Type: TABLE; Schema: public; Owner: bb
--

CREATE TABLE public."AddSaving" (
    id text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    amount double precision NOT NULL,
    "savingId" text NOT NULL,
    "incomeId" text NOT NULL
);


ALTER TABLE public."AddSaving" OWNER TO bb;

--
-- Name: Bill; Type: TABLE; Schema: public; Owner: bb
--

CREATE TABLE public."Bill" (
    id text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    biller text NOT NULL,
    amount double precision NOT NULL,
    "isPaid" boolean DEFAULT false NOT NULL,
    "dueDay" integer NOT NULL,
    "userId" text NOT NULL,
    "dueMonth" integer DEFAULT 0 NOT NULL
);


ALTER TABLE public."Bill" OWNER TO bb;

--
-- Name: Budget; Type: TABLE; Schema: public; Owner: bb
--

CREATE TABLE public."Budget" (
    id text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    description text NOT NULL,
    "userId" text NOT NULL,
    amount double precision NOT NULL,
    "incomeId" text NOT NULL,
    "totalExpenses" double precision DEFAULT 0 NOT NULL
);


ALTER TABLE public."Budget" OWNER TO bb;

--
-- Name: Expense; Type: TABLE; Schema: public; Owner: bb
--

CREATE TABLE public."Expense" (
    id text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    description text NOT NULL,
    amount double precision NOT NULL,
    attachment text,
    "budgetId" text NOT NULL
);


ALTER TABLE public."Expense" OWNER TO bb;

--
-- Name: Income; Type: TABLE; Schema: public; Owner: bb
--

CREATE TABLE public."Income" (
    id text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    amount double precision NOT NULL,
    "userId" text NOT NULL,
    source text NOT NULL,
    source_account text NOT NULL
);


ALTER TABLE public."Income" OWNER TO bb;

--
-- Name: Saving; Type: TABLE; Schema: public; Owner: bb
--

CREATE TABLE public."Saving" (
    id text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    goal text NOT NULL,
    goal_amount double precision NOT NULL,
    "userId" text NOT NULL,
    total double precision DEFAULT 0 NOT NULL
);


ALTER TABLE public."Saving" OWNER TO bb;

--
-- Name: User; Type: TABLE; Schema: public; Owner: bb
--

CREATE TABLE public."User" (
    id text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL
);


ALTER TABLE public."User" OWNER TO bb;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: bb
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO bb;

--
-- Data for Name: AddSaving; Type: TABLE DATA; Schema: public; Owner: bb
--

COPY public."AddSaving" (id, "createdAt", "updatedAt", amount, "savingId", "incomeId") FROM stdin;
\.


--
-- Data for Name: Bill; Type: TABLE DATA; Schema: public; Owner: bb
--

COPY public."Bill" (id, "createdAt", "updatedAt", biller, amount, "isPaid", "dueDay", "userId", "dueMonth") FROM stdin;
\.


--
-- Data for Name: Budget; Type: TABLE DATA; Schema: public; Owner: bb
--

COPY public."Budget" (id, "createdAt", "updatedAt", description, "userId", amount, "incomeId", "totalExpenses") FROM stdin;
40e88b69-1263-41ba-8473-ceb88cd58d1d	2026-03-25 13:02:30.617	2026-03-25 13:02:30.617	Shopping	c8296ae8-66be-459d-b3b5-cb70a00148fb	500	2bb38274-d654-4b20-9c04-ca361361a622	0
c87930c9-a2da-4036-9e95-ce2b2a01799b	2026-03-25 13:02:50.472	2026-03-25 13:02:50.472	Groceries	c8296ae8-66be-459d-b3b5-cb70a00148fb	400	2bb38274-d654-4b20-9c04-ca361361a622	0
\.


--
-- Data for Name: Expense; Type: TABLE DATA; Schema: public; Owner: bb
--

COPY public."Expense" (id, "createdAt", "updatedAt", description, amount, attachment, "budgetId") FROM stdin;
96904ad7-6758-497e-b26c-03ced44106c4	2026-03-25 13:04:01.817	2026-03-25 13:04:01.817	T shirt Uniqlo	8.5	\N	40e88b69-1263-41ba-8473-ceb88cd58d1d
\.


--
-- Data for Name: Income; Type: TABLE DATA; Schema: public; Owner: bb
--

COPY public."Income" (id, "createdAt", "updatedAt", amount, "userId", source, source_account) FROM stdin;
2bb38274-d654-4b20-9c04-ca361361a622	2026-03-25 13:02:08.95	2026-03-25 13:02:50.475	9100	c8296ae8-66be-459d-b3b5-cb70a00148fb	cw Pay	MANUAL
\.


--
-- Data for Name: Saving; Type: TABLE DATA; Schema: public; Owner: bb
--

COPY public."Saving" (id, "createdAt", "updatedAt", goal, goal_amount, "userId", total) FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: bb
--

COPY public."User" (id, "createdAt", "updatedAt", name, email, password) FROM stdin;
f54e893f-6b1d-4c04-affd-e20a625e01f0	2026-03-25 12:56:16.613	2026-03-25 12:56:16.613	John Earl Bascos	1129bascos@gmail.com	123456
c8296ae8-66be-459d-b3b5-cb70a00148fb	2026-03-25 13:01:43.146	2026-03-25 13:01:43.146	Test User	test@gmail.com	testtest
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: bb
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
0638711b-18d0-4739-910e-b6c81c8ef03c	12c9d197d7e8bb6119602171ac2f6de036ad2186581f35f8fbd1a7871b876ea0	2026-03-25 12:55:41.257569+00	20231007132045_add_user_model	\N	\N	2026-03-25 12:55:41.240653+00	1
22a4ee12-94be-4706-8a61-be704f937116	e55d27e30dede144d695e57e2f79fb4d1b9d013dc5becd53a7437c7761136d88	2026-03-25 12:55:41.35501+00	20231209132012_relate_budget_and_income	\N	\N	2026-03-25 12:55:41.35111+00	1
f1b702c0-a7db-44ad-b8c8-168d000607ed	752aed36d680a5fa971dd4eca6bf2edd706e19f00c74067ec2fa73a606801d0d	2026-03-25 12:55:41.272398+00	20231014084352_add_budget_field	\N	\N	2026-03-25 12:55:41.259334+00	1
dd0b1e4c-ce5c-407d-ae34-7587bdc154ae	402b47ae244c9029b04820000de06c8b7d9a543906c0d8a911e4ecfa7e7ac58d	2026-03-25 12:55:41.277698+00	20231014085606_corrected_amount_data_type	\N	\N	2026-03-25 12:55:41.273735+00	1
1359f1ca-41af-43e3-979e-ab62725b554d	420889a7a52065e8f7f90325a9b9d7ef0c2d0af66f2c34731199f4fa6580b185	2026-03-25 12:55:41.28359+00	20231014091119_delete_budget_name	\N	\N	2026-03-25 12:55:41.279069+00	1
6c2961bc-ff9a-4767-93af-c9d2ca3eafe7	a2411ba18eb8ce9c05fe115245d5961a2cd456f8b391ab8bf7e89161ef275731	2026-03-25 12:55:41.359239+00	20231209163922_add_total_expenses	\N	\N	2026-03-25 12:55:41.356179+00	1
a629d89d-57a4-424e-9de3-67c4b7b969f0	7f8db0e37d7dafdaf36efbd987fd14fd1c6f1c212ff2230b143c69fbdb7a2753	2026-03-25 12:55:41.29144+00	20231014094529_remove_default	\N	\N	2026-03-25 12:55:41.28554+00	1
d4435909-b662-4802-892b-3c648bcc9e48	7ee4980d3585dd96a58ff06537251fce1f7fdb258e290ed64378dc89df77fa74	2026-03-25 12:55:41.301118+00	20231018141840_add_expense_model	\N	\N	2026-03-25 12:55:41.292684+00	1
9510cdcc-95e9-4983-ad6d-6b0d0a71897d	aa286fca09f48471b949b877f04aff3d583ccdfe6128a1c258221f9e27a0b932	2026-03-25 12:55:41.309611+00	20231127092534_add_bill	\N	\N	2026-03-25 12:55:41.302606+00	1
d1742b38-f49e-46bc-887a-73cc94199ab9	4b5824147d429e10f2f0dbc0f1819f7bcfba44f331b1954406e6a3262d55e877	2026-03-25 12:55:41.369865+00	20231210044534_add_savings_plan	\N	\N	2026-03-25 12:55:41.360495+00	1
733e54e4-db6d-44a5-b27c-548ea0da247e	85bec0311dbedf6899d92de3c055ad14297b408e7466293ac46666cd92f88d94	2026-03-25 12:55:41.314911+00	20231127093530_change_due_date	\N	\N	2026-03-25 12:55:41.311049+00	1
28097cff-9324-46bd-844b-1f209e514d68	f1c953a201a4fc4cff69dea058f963f033cd0d2afbb1456a5dcdabf02b058880	2026-03-25 12:55:41.319983+00	20231127094545_conect_bill_and_user	\N	\N	2026-03-25 12:55:41.316122+00	1
eee7779c-deb4-4079-a644-eb6296300419	61811707b4c8f25125867933db12573b8b61edb9070f5798a32357003bcfdf60	2026-03-25 12:55:41.325+00	20231206073445_add_due_month_field	\N	\N	2026-03-25 12:55:41.321588+00	1
b23e46bc-b130-480a-a627-40e026d1be77	f2f9816498a3c736ee138308a78084ec0cc955a1bf79ebb6281f6c35ef88e556	2026-03-25 12:55:41.374604+00	20231210061523_disconnect_saving_plan_and_income	\N	\N	2026-03-25 12:55:41.371149+00	1
40d9761a-7be8-45a5-afd9-174d839f3fb5	7a2f0ff1052205815e68dd84d7c60f6692e53529b40956481b00d70103857460	2026-03-25 12:55:41.334362+00	20231209071443_add_account	\N	\N	2026-03-25 12:55:41.326261+00	1
4108f8e6-66f5-49d9-acf3-64391d3db8e7	768d017df2ae2c600c212f2347dfa9ea3ef7bb532839d7c246df121e0a23254c	2026-03-25 12:55:41.344533+00	20231209071609_add_income	\N	\N	2026-03-25 12:55:41.335547+00	1
256a9e43-523c-49cd-840f-e3f8cbbe0a51	22ca7abe6ac96be086271e3124413e2e38ce0172585ac3cc485db7799c0dc55c	2026-03-25 12:55:41.349843+00	20231209071842_add_income	\N	\N	2026-03-25 12:55:41.345955+00	1
e2ab71a6-a85c-470d-814d-871682fca161	ca994fc9e11eb332c5a4894975d3e6c6b898e514fc66a212d716f992770316e8	2026-03-25 12:55:41.380137+00	20231210071445_add_total	\N	\N	2026-03-25 12:55:41.376007+00	1
8780d846-caae-4976-92dc-504a8368d0c3	c957d564d22df17e48eb8f1d38f08305d51b6617cac65b83caa5fd2157986859	2026-03-25 12:55:41.389274+00	20231210072248_add_add_saving	\N	\N	2026-03-25 12:55:41.381263+00	1
64cd3be2-e958-456e-9ac5-8fbed94613b4	17330d79f2da950498d66c9c9a5a58ac06a372bf98c325a19ada83b5a86fc65e	2026-03-25 12:55:41.395147+00	20231210122108_connect_income_and_add_saving	\N	\N	2026-03-25 12:55:41.390485+00	1
\.


--
-- Name: AddSaving AddSaving_pkey; Type: CONSTRAINT; Schema: public; Owner: bb
--

ALTER TABLE ONLY public."AddSaving"
    ADD CONSTRAINT "AddSaving_pkey" PRIMARY KEY (id);


--
-- Name: Bill Bill_pkey; Type: CONSTRAINT; Schema: public; Owner: bb
--

ALTER TABLE ONLY public."Bill"
    ADD CONSTRAINT "Bill_pkey" PRIMARY KEY (id);


--
-- Name: Budget Budget_pkey; Type: CONSTRAINT; Schema: public; Owner: bb
--

ALTER TABLE ONLY public."Budget"
    ADD CONSTRAINT "Budget_pkey" PRIMARY KEY (id);


--
-- Name: Expense Expense_pkey; Type: CONSTRAINT; Schema: public; Owner: bb
--

ALTER TABLE ONLY public."Expense"
    ADD CONSTRAINT "Expense_pkey" PRIMARY KEY (id);


--
-- Name: Income Income_pkey; Type: CONSTRAINT; Schema: public; Owner: bb
--

ALTER TABLE ONLY public."Income"
    ADD CONSTRAINT "Income_pkey" PRIMARY KEY (id);


--
-- Name: Saving Saving_pkey; Type: CONSTRAINT; Schema: public; Owner: bb
--

ALTER TABLE ONLY public."Saving"
    ADD CONSTRAINT "Saving_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: bb
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: bb
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: bb
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: AddSaving AddSaving_incomeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bb
--

ALTER TABLE ONLY public."AddSaving"
    ADD CONSTRAINT "AddSaving_incomeId_fkey" FOREIGN KEY ("incomeId") REFERENCES public."Income"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: AddSaving AddSaving_savingId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bb
--

ALTER TABLE ONLY public."AddSaving"
    ADD CONSTRAINT "AddSaving_savingId_fkey" FOREIGN KEY ("savingId") REFERENCES public."Saving"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Bill Bill_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bb
--

ALTER TABLE ONLY public."Bill"
    ADD CONSTRAINT "Bill_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Budget Budget_incomeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bb
--

ALTER TABLE ONLY public."Budget"
    ADD CONSTRAINT "Budget_incomeId_fkey" FOREIGN KEY ("incomeId") REFERENCES public."Income"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Budget Budget_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bb
--

ALTER TABLE ONLY public."Budget"
    ADD CONSTRAINT "Budget_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Expense Expense_budgetId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bb
--

ALTER TABLE ONLY public."Expense"
    ADD CONSTRAINT "Expense_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES public."Budget"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Income Income_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bb
--

ALTER TABLE ONLY public."Income"
    ADD CONSTRAINT "Income_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Saving Saving_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bb
--

ALTER TABLE ONLY public."Saving"
    ADD CONSTRAINT "Saving_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

