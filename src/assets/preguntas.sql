CREATE TABLE IF NOT EXISTS preguntas(
    id_pregunta INTEGER PRIMARY KEY AUTOINCREMENT,
    orden_preguntas TEXT,
    titulo TEXT,
    descripcion TEXT NULL,
    imagen TEXT NULL,
    id_app INTEGER references app(id_app)
);

