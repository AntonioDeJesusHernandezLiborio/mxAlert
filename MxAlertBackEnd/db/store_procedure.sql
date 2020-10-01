create procedure sp_type_user_create(in _name VARCHAR(15))
BEGIN
	INSERT INTO tbltipousuario(tipoUsu_nombre) values(_name);
END


create procedure sp_type_user_update(in _id tinyint(4), in _name VARCHAR(15))
BEGIN
	UPDATE tbltipousuario SET tipoUsu_nombre=_name where tipUsu_idUsuario=_id;
END


CREATE PROCEDURE sp_type_user_delete(in _id TINYINT(4))
BEGIN
	DELETE from tbltipousuario WHERE tipUsu_idUsuario=_id;
END

create view vw_typeUser
as
SELECT tipUsu_idUsuario as 'id', tipoUsu_nombre as 'nombre' from tbltipousuario;


CREATE PROCEDURE sp_type_user_read()
BEGIN
	SELECT * FROM vw_typeUser;
END
