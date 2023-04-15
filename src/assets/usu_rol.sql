CREATE TABLE IF NOT EXISTS usu_rol(
    id_usu_rol INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario INTEGER references usuario(id_usuario),
    id_rol INTEGER references roles(id_rol)
);

