REVOKE CONNECT ON DATABASE seabnb FROM PUBLIC, zacharyinouye;
SELECT 
    pg_terminate_backend(pid) 
FROM 
    pg_stat_activity 
WHERE 
    pid <> pg_backend_pid()
    AND datname = 'database_name';
DROP DATABASE seabnb;