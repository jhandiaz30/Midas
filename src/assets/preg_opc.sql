CREATE TABLE IF NOT EXISTS preg_opc(
    id_pre_opc INTEGER PRIMARY KEY AUTOINCREMENT,
    id_pregunta INTEGER references preguntas(id_pregunta), 
    id_opcion_rta INTEGER references opciones_rta(id_opcion_rta)
);

