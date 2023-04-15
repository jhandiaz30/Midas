CREATE TABLE IF NOT EXISTS parametrizacions(
    id_parametrizacion INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NULL, 
    subtitulo TEXT NULL,
    imagen TEXT NULL,
    descripcion TEXT NULL,
    activo TEXT NOT NULL
);

