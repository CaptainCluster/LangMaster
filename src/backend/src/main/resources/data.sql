INSERT INTO language (name)
VALUES 
    ('Chinese'),
    ('Japanese'),
    ('Korean'),
    ('Finnish'),
    ('Swedish'),
    ('Norwegian'),
    ('Danish'),
    ('French'),
    ('Italian'),
    ('German'),
    ('Spanish'),
    ('Portuguese'),
    ('Russian'),
    ('Polish'),
    ('Romanian'),
    ('Hungarian')
ON CONFLICT (name) DO NOTHING;

INSERT INTO news (content, publication_date)
VALUES 
    ('This is a test article!', current_timestamp)
ON CONFLICT (content) DO NOTHING;

