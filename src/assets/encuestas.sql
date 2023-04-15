CREATE TABLE IF NOT EXISTS encuestas(
    id_encuesta INTEGER PRIMARY KEY AUTOINCREMENT,
    numero_grupo_trabajo INTEGER NOT NULL,
    numero_de_consignacion INTEGER NOT NULL,
    nombre_jefe_consignacion TEXT NOT NULL,
    actividad_realizar TEXT NOT NULL,
    fecha_sistema Date NULL,
    fecha_encuesta Date NULL,
    id_contrato INTEGER NULL,
    id_app INTEGER references app(id_app),
    id_usuario INTEGER references usuario(id_usuario),  
    estado TEXT NOT NULL
);
