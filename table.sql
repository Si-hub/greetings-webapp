create table greet_me(
	greet_id serial not null primary key,
    name text not null,
    greet_counter int
	
);
/*insert into greet_me (name, greet_counter) values ('Jan', 1);
select * from greet_me where name='Jan'; /*how many times Jan is greeted*/
/*update greet_me set greet_counter=greet_counter + 1 where name='Jan';/*update records */ 
