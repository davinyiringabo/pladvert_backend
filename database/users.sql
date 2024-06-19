
CREATE TABLE IF NOT EXISTS public.owner
(
    id character varying(200) COLLATE pg_catalog."default" NOT NULL,
    user_id character varying(200) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT owner_pkey PRIMARY KEY (id),
    CONSTRAINT owner_user_id_fkey FOREIGN KEY (user_id)
)

CREATE TABLE IF NOT EXISTS public.users
(
    id character varying(100) COLLATE pg_catalog."default" NOT NULL,
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    password character varying(200) COLLATE pg_catalog."default" NOT NULL,
    role character(20) COLLATE pg_catalog."default" NOT NULL,
    phone character(14) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT user_pkey PRIMARY KEY (id)
)

CREATE TABLE paymentmethods (
    id character varying(100) not null PRIMARY KEY,
    name character varying(200),
    number integer not null,
    type character(20) not null,
    cvc integer,
    expdate character varying(20),
    user_id character varying(100) not null,
    CONSTRAINT pfkey FOREIGN KEY(user_id) REFERENCES users (id)
);