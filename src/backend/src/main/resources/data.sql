INSERT INTO
    language (name)
VALUES
    ('Chinese'),
    ('Finnish'),
    ('French'),
    ('Japanese')
    ON CONFLICT (name)
    	DO NOTHING;

