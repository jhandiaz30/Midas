CREATE TABLE IF NOT EXISTS opciones_rta(
    id_opcion_rta INTEGER PRIMARY KEY AUTOINCREMENT,
    orden_opciones TEXT, 
    titulo TEXT,
    descripcion TEXT NULL,
    valor TEXT
);
