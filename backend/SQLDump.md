create table "Admin"
(
    admin_id serial      not null
        constraint "Admin_pkey"
            primary key,
    username varchar(50) not null,
    password varchar(50) not null
);

create table "User"
(
    user_id       serial       not null
        constraint "User_pkey"
            primary key,
    first_name    varchar(50)  not null,
    last_name     varchar(50)  not null,
    date_of_birth date,
    gender        varchar(1)   not null,
    country       varchar(50),
    address       varchar(255),
    email         varchar(255) not null
        constraint "User_email_key"
            unique,
    password      varchar(50)  not null
);


create table "Covid_Report"
(
    report_id                           serial  not null
        constraint "Covid_Report_pkey"
            primary key,
    user_id                             integer not null
        constraint "Covid_Report_user_id_fkey"
            references "User",
    travel_abroad_14days                varchar(1),
    contact_with_infected_person_14days varchar(1),
    visited_healthcare_facility_14days  varchar(1),
    tested_positive_14days              varchar(1),
    fever                               varchar(1),
    breathing_difficulty                varchar(1),
    sore_throat                         varchar(1),
    cough                               varchar(1),
    no_taste                            varchar(1),
    no_smell                            varchar(1),
    headache                            varchar(1)
);
