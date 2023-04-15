CREATE TABLE IF NOT EXISTS firmas(
    id_Firma INTEGER PRIMARY KEY AUTOINCREMENT,
    Nombres TEXT, 
    cedula TEXT,
    firma TEXT,
    id_encuesta INTEGER references encuestas(id_encuesta)
);
