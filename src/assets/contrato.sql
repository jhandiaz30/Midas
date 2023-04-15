CREATE TABLE IF NOT EXISTS contrato(
    id_contrato INTEGER PRIMARY KEY AUTOINCREMENT,
    numero TEXT,
    empresa TEXT,
    objetivo TEXT,
    coordinador TEXT,
    fecha_ini Date,
    estado TEXT,
    id_dependencia INTEGER references dependencia(id_dependencia)
);

