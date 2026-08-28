import pool from '../../config/db.js';

export class VehiculoModel {
  static async obtenerTodos() {
    let conn;
    try {
      conn = await pool.getConnection();
      const query = `
        SELECT 
          v.*, 
          c.nombre_clasificacion
        FROM vehiculos v
        LEFT JOIN clasificaciones_vehiculos c ON v.id_clasificacion = c.id_clasificacion
      `;
      return await conn.query(query);
    } finally {
      if (conn) conn.release();
    }
  }

  static async obtenerPorId(id) {
    let conn;
    try {
      conn = await pool.getConnection();
      const query = `
        SELECT 
          v.*, 
          c.nombre_clasificacion
        FROM vehiculos v
        LEFT JOIN clasificaciones_vehiculos c ON v.id_clasificacion = c.id_clasificacion
        WHERE v.id_vehiculo = ?
      `;
      const rows = await conn.query(query, [id]);
      return rows[0] || null;
    } finally {
      if (conn) conn.release();
    }
  }


  static async obtenerPorPlaca(placa) {
    let conn;
    try {
      conn = await pool.getConnection();
      const query = `
      SELECT 
        v.*, 
        c.nombre_clasificacion
      FROM vehiculos v
      LEFT JOIN clasificaciones_vehiculos c ON v.id_clasificacion = c.id_clasificacion
      WHERE v.placa = ?
    `;
      const rows = await conn.query(query, [placa]);
      return rows[0] || null;
    } finally {
      if (conn) conn.release();
    }
  }

  static async crear(datos) {
    let conn;
    const {
      id_clasificacion,
      placa,
      marca,
      modelo = null,
      anio,
      numero_chasis,
      numero_motor = null,
      capacidad_carga = null,
      capacidad_arrastre = null,
      estado = 'Activo',
      id_acoplado_actual = null
    } = datos;

    try {
      conn = await pool.getConnection();
      const query = `
        INSERT INTO vehiculos (
          id_clasificacion, placa, marca, modelo, anio, 
          numero_chasis, numero_motor, capacidad_carga, 
          capacidad_arrastre, estado, id_acoplado_actual
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const result = await conn.query(query, [
        id_clasificacion, placa, marca, modelo, anio,
        numero_chasis, numero_motor, capacidad_carga,
        capacidad_arrastre, estado, id_acoplado_actual
      ]);
      return Number(result.insertId);
    } finally {
      if (conn) conn.release();
    }
  }

  static async actualizar(id, datos) {
    let conn;
    const {
      id_clasificacion,
      placa,
      marca,
      modelo,
      anio,
      numero_chasis,
      numero_motor,
      capacidad_carga,
      capacidad_arrastre,
      estado,
      id_acoplado_actual
    } = datos;

    try {
      conn = await pool.getConnection();
      const query = `
        UPDATE vehiculos SET 
          id_clasificacion = ?,
          placa = ?,
          marca = ?,
          modelo = ?,
          anio = ?,
          numero_chasis = ?,
          numero_motor = ?,
          capacidad_carga = ?,
          capacidad_arrastre = ?,
          estado = ?,
          id_acoplado_actual = ?
        WHERE id_vehiculo = ?
      `;
      const result = await conn.query(query, [
        id_clasificacion, placa, marca, modelo, anio,
        numero_chasis, numero_motor, capacidad_carga,
        capacidad_arrastre, estado, id_acoplado_actual, id
      ]);
      return result.affectedRows > 0;
    } finally {
      if (conn) conn.release();
    }
  }

  static async eliminar(id) {
    let conn;
    try {
      conn = await pool.getConnection();
      const result = await conn.query('DELETE FROM vehiculos WHERE id_vehiculo = ?', [id]);
      return result.affectedRows > 0;
    } finally {
      if (conn) conn.release();
    }
  }
}