CREATE TABLE IF NOT EXISTS respuestas_enc(
    id_respuesta INTEGER PRIMARY KEY AUTOINCREMENT,
    respuesta TEXT, 
    observacion TEXT,
    evidencia TEXT,
    id_opcion_rta INTEGER references opciones_rta(id_opcion_rta),
    id_pregunta INTEGER references preguntas(id_pregunta),
    id_encuesta INTEGER references encuestas(id_encuesta)
);
	