CREATE TABLE IF NOT EXISTS usuario(
    id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT, 
    usuario TEXT,
    clave TEXT,
    estado TEXT,
    cedula TEXT NULL
);
