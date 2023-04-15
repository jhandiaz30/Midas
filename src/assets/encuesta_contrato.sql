CREATE TABLE IF NOT EXISTS encuesta_contrato(
    id_encuesta_contrato INTEGER PRIMARY KEY AUTOINCREMENT,
    id_contrato INTEGER references contrato(id_contrato),
    id_encuesta INTEGER references encuesta(id_encuesta)
);
