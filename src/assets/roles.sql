CREATE TABLE IF NOT EXISTS roles(
    id_rol INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT, 
    descripcion TEXT,
    id_app INTEGER references app(id_app),
    tipo_rol TEXT
);
