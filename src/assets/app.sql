CREATE TABLE IF NOT EXISTS app(
    id_app INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT, 
    descripcion TEXT,
    estado TEXT,
    parametrizable TEXT,
    macroproceso TEXT NULL,
    proceso TEXT NULL,
    versión TEXT NULL,
    codigo TEXT NULL
);
