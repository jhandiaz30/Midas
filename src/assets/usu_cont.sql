CREATE TABLE IF NOT EXISTS usu_cont(
    id_usu_cont INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario INTEGER references usuario(id_usuario),
    id_contrato INTEGER references contrato(id_contrato),
    tipo_usu TEXT NULL
);


