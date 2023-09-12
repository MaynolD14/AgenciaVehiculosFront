from fastapi import Depends, FastAPI, Body
from models.clientes import Clientes
from models.compras import Compras
from models.proveedores import Proveedores
from models.vehiculos import Vehiculos
from models.ventas import Ventas
from typing import Optional, Tuple, Any
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException, Request, Response
from fastapi.responses import JSONResponse
from pydantic import BaseModel, constr, validator
from db_connection.db import get_database_connection
import uvicorn
from fastapi.security import HTTPAuthorizationCredentials
from fastapi.security import HTTPBearer
from concurrent.futures import ThreadPoolExecutor
import re 

app = FastAPI()

# Crear un ThreadPoolExecutor con un número máximo de hilos
executor = ThreadPoolExecutor(max_workers=5)

origins = [
    "http://localhost",
    "http://localhost:4200",
    # Agrega aquí los otros orígenes permitidos
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

mydb = get_database_connection()


from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import mysql.connector

app = FastAPI()

#################### CRUD CLIENTES #####################
# Método para crear un cliente
@app.post("/clientes", tags=["Clientes"])
def crear_cliente(cliente: Clientes):
    cursor = mydb.cursor()
    consulta = "INSERT INTO clientes (nombres, direccion, telefono, email) VALUES (%s, %s, %s, %s)"
    valores = (cliente.nombres, cliente.direccion, cliente.telefono, cliente.email)
    cursor.execute(consulta, valores)
    mydb.commit()
    cliente_creado = {"id_cliente": cursor.lastrowid, **cliente.dict()}
    return cliente_creado

# Método para obtener todos los clientes
@app.get("/clientes", tags=["Clientes"])
def obtener_clientes():
    cursor = mydb.cursor(dictionary=True)
    cursor.execute("SELECT * FROM clientes;")
    clientes = cursor.fetchall()
    cursor.close()
    return clientes

# Método para obtener un cliente por su ID
@app.get("/clientes/{id_cliente}", tags=["Clientes"])
def obtener_cliente_id(id_cliente: int):
    cursor = mydb.cursor(dictionary=True)
    consulta = "SELECT * FROM clientes WHERE id_cliente = %s"
    valores = (id_cliente,)
    cursor.execute(consulta, valores)
    cliente = cursor.fetchone()
    if cliente is None:
        raise HTTPException(status_code=404, detail="El cliente no existe")
    return cliente

# Método para actualizar un cliente por su ID
@app.put("/clientes/{id_cliente}", tags=["Clientes"])
def actualizar_cliente(id_cliente: int, cliente: Clientes):
    cursor = mydb.cursor()
    consulta = "UPDATE clientes SET nombres = %s, direccion = %s, telefono = %s, email = %s WHERE id_cliente = %s"
    valores = (cliente.nombres, cliente.direccion, cliente.telefono, cliente.email, id_cliente)
    cursor.execute(consulta, valores)
    mydb.commit()
    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="El cliente no existe")
    cliente_actualizado = {"id_cliente": id_cliente, **cliente.dict()}
    return cliente_actualizado

# Método para eliminar un cliente por su ID
@app.delete("/clientes/{id_cliente}", tags=["Clientes"])
def eliminar_cliente(id_cliente: int):
    cursor = mydb.cursor()
    consulta = "DELETE FROM clientes WHERE id_cliente = %s"
    valores = (id_cliente,)
    cursor.execute(consulta, valores)
    mydb.commit()
    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="El cliente no existe")
    return {"Mensaje": "El cliente ha sido eliminado correctamente"}

########### CRUD VEHICULOS ###########

# Método para crear un vehículo
@app.post("/vehiculos", tags=["Vehiculos"])
def crear_vehiculo(vehiculo: Vehiculos):
    cursor = mydb.cursor()
    consulta = "INSERT INTO vehiculos (marca, modelo, año, stock, precio_uni) VALUES (%s, %s, %s, %s, %s)"
    valores = (vehiculo.marca, vehiculo.modelo, vehiculo.año, vehiculo.stock, vehiculo.precio_uni)
    cursor.execute(consulta, valores)
    mydb.commit()
    vehiculo_creado = {"id_vehiculo": cursor.lastrowid, **vehiculo.dict()}
    return vehiculo_creado

# Método para obtener todos los vehículos
@app.get("/vehiculos", tags=["Vehiculos"])
def obtener_vehiculos():
    cursor = mydb.cursor(dictionary=True)
    cursor.execute("SELECT * FROM vehiculos;")
    vehiculos = cursor.fetchall()
    cursor.close()
    return vehiculos

# Método para obtener un vehículo por su ID
@app.get("/vehiculos/{id_vehiculo}", tags=["Vehiculos"])
def obtener_vehiculo_id(id_vehiculo: int):
    cursor = mydb.cursor(dictionary=True)
    consulta = "SELECT * FROM vehiculos WHERE id_vehiculo = %s"
    valores = (id_vehiculo,)
    cursor.execute(consulta, valores)
    vehiculo = cursor.fetchone()
    if vehiculo is None:
        raise HTTPException(status_code=404, detail="El vehículo no existe")
    return vehiculo

# Método para actualizar un vehículo por su ID
@app.put("/vehiculos/{id_vehiculo}", tags=["Vehiculos"])
def actualizar_vehiculo(id_vehiculo: int, vehiculo: Vehiculos):
    cursor = mydb.cursor()
    consulta = "UPDATE vehiculos SET marca = %s, modelo = %s, año = %s, stock = %s, precio_uni = %s WHERE id_vehiculo = %s"
    valores = (vehiculo.marca, vehiculo.modelo, vehiculo.año, vehiculo.stock, vehiculo.precio_uni, id_vehiculo)
    cursor.execute(consulta, valores)
    mydb.commit()
    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="El vehículo no existe")
    vehiculo_actualizado = {"id_vehiculo": id_vehiculo, **vehiculo.dict()}
    return vehiculo_actualizado

# Método para eliminar un vehículo por su ID
@app.delete("/vehiculos/{id_vehiculo}", tags=["Vehiculos"])
def eliminar_vehiculo(id_vehiculo: int):
    cursor = mydb.cursor()
    consulta = "DELETE FROM vehiculos WHERE id_vehiculo = %s"
    valores = (id_vehiculo,)
    cursor.execute(consulta, valores)
    mydb.commit()
    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="El vehículo no existe")
    return {"Mensaje": "El vehículo ha sido eliminado correctamente"}

################### CRUD PROVEEDORES ####################

# Método para crear un proveedor
@app.post("/proveedores", tags=["Proveedores"])
def crear_proveedor(proveedor: Proveedores):
    cursor = mydb.cursor()
    consulta = "INSERT INTO proveedores (nombres, telefono, email, empresa) VALUES (%s, %s, %s, %s)"
    valores = (proveedor.nombres, proveedor.telefono, proveedor.email, proveedor.empresa)
    cursor.execute(consulta, valores)
    mydb.commit()
    proveedor_creado = {"id_proveedor": cursor.lastrowid, **proveedor.dict()}
    return proveedor_creado

# Método para obtener todos los proveedores
@app.get("/proveedores", tags=["Proveedores"])
def obtener_proveedores():
    cursor = mydb.cursor(dictionary=True)
    cursor.execute("SELECT * FROM proveedores;")
    proveedores = cursor.fetchall()
    cursor.close()
    return proveedores

# Método para obtener un proveedor por su ID
@app.get("/proveedores/{id_proveedor}", tags=["Proveedores"])
def obtener_proveedor_id(id_proveedor: int):
    cursor = mydb.cursor(dictionary=True)
    consulta = "SELECT * FROM proveedores WHERE id_proveedor = %s"
    valores = (id_proveedor,)
    cursor.execute(consulta, valores)
    proveedor = cursor.fetchone()
    if proveedor is None:
        raise HTTPException(status_code=404, detail="El proveedor no existe")
    return proveedor

# Método para actualizar un proveedor por su ID
@app.put("/proveedores/{id_proveedor}", tags=["Proveedores"])
def actualizar_proveedor(id_proveedor: int, proveedor: Proveedores):
    cursor = mydb.cursor()
    consulta = "UPDATE proveedores SET nombres = %s, telefono = %s, email = %s, empresa = %s WHERE id_proveedor = %s"
    valores = (proveedor.nombres, proveedor.telefono, proveedor.email, proveedor.empresa, id_proveedor)
    cursor.execute(consulta, valores)
    mydb.commit()
    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="El proveedor no existe")
    proveedor_actualizado = {"id_proveedor": id_proveedor, **proveedor.dict()}
    return proveedor_actualizado

# Método para eliminar un proveedor por su ID
@app.delete("/proveedores/{id_proveedor}", tags=["Proveedores"])
def eliminar_proveedor(id_proveedor: int):
    cursor = mydb.cursor()
    consulta = "DELETE FROM proveedores WHERE id_proveedor = %s"
    valores = (id_proveedor,)
    cursor.execute(consulta, valores)
    mydb.commit()
    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="El proveedor no existe")
    return {"Mensaje": "El proveedor ha sido eliminado correctamente"}

################### CRUD VENTAS ########################

# Método para crear una venta
@app.post("/ventas", tags=["Ventas"])
def crear_venta(venta: Ventas):
    cursor = mydb.cursor()
    consulta = "INSERT INTO ventas (id_vehiculo, id_cliente, fechaVenta, Cantidad, Precio, Total) VALUES (%s, %s, %s, %s, %s, %s)"
    valores = (venta.id_vehiculo, venta.id_cliente, venta.fechaVenta, venta.Cantidad, venta.Precio, venta.Total)
    cursor.execute(consulta, valores)
    mydb.commit()
    venta_creada = {"id_venta": cursor.lastrowid, **venta.dict()}
    return venta_creada

# Método para obtener todas las ventas
@app.get("/ventas", tags=["Ventas"])
def obtener_ventas():
    cursor = mydb.cursor(dictionary=True)
    cursor.execute("SELECT * FROM ventas;")
    ventas = cursor.fetchall()
    cursor.close()
    return ventas

# Método para obtener una venta por su ID
@app.get("/ventas/{id_venta}", tags=["Ventas"])
def obtener_venta_id(id_venta: int):
    cursor = mydb.cursor(dictionary=True)
    consulta = "SELECT * FROM ventas WHERE id_venta = %s"
    valores = (id_venta,)
    cursor.execute(consulta, valores)
    venta = cursor.fetchone()
    if venta is None:
        raise HTTPException(status_code=404, detail="La venta no existe")
    return venta

# Método para actualizar una venta por su ID
@app.put("/ventas/{id_venta}", tags=["Ventas"])
def actualizar_venta(id_venta: int, venta: Ventas):
    cursor = mydb.cursor()
    consulta = "UPDATE ventas SET id_vehiculo = %s, id_cliente = %s, fechaVenta = %s, Cantidad = %s, Precio = %s, Total = %s WHERE id_venta = %s"
    valores = (venta.id_vehiculo, venta.id_cliente, venta.fechaVenta, venta.Cantidad, venta.Precio, venta.Total, id_venta)
    cursor.execute(consulta, valores)
    mydb.commit()
    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="La venta no existe")
    venta_actualizada = {"id_venta": id_venta, **venta.dict()}
    return venta_actualizada

# Método para eliminar una venta por su ID
@app.delete("/ventas/{id_venta}", tags=["Ventas"])
def eliminar_venta(id_venta: int):
    cursor = mydb.cursor()
    consulta = "DELETE FROM ventas WHERE id_venta = %s"
    valores = (id_venta,)
    cursor.execute(consulta, valores)
    mydb.commit()
    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="La venta no existe")
    return {"Mensaje": "La venta ha sido eliminada correctamente"}


################### CRUD COMPRAS ###################

# Método para crear una compra
@app.post("/compras", tags=["Compras"])
def crear_compra(compra: Compras):
    cursor = mydb.cursor()
    consulta = "INSERT INTO compras (cantidad, descripcion, fechaCompra, precioCompra, id_proveedor) VALUES (%s, %s, %s, %s, %s)"
    valores = (compra.cantidad, compra.descripcion, compra.fechaCompra, compra.precioCompra, compra.id_proveedor)
    cursor.execute(consulta, valores)
    mydb.commit()
    compra_creada = {"id_compra": cursor.lastrowid, **compra.dict()}
    return compra_creada

# Método para obtener todas las compras
@app.get("/compras", tags=["Compras"])
def obtener_compras():
    cursor = mydb.cursor(dictionary=True)
    cursor.execute("SELECT * FROM compras;")
    compras = cursor.fetchall()
    cursor.close()
    return compras

# Método para obtener una compra por su ID
@app.get("/compras/{id_compra}", tags=["Compras"])
def obtener_compra_id(id_compra: int):
    cursor = mydb.cursor(dictionary=True)
    consulta = "SELECT * FROM compras WHERE id_compra = %s"
    valores = (id_compra,)
    cursor.execute(consulta, valores)
    compra = cursor.fetchone()
    if compra is None:
        raise HTTPException(status_code=404, detail="La compra no existe")
    return compra

# Método para actualizar una compra por su ID
@app.put("/compras/{id_compra}", tags=["Compras"])
def actualizar_compra(id_compra: int, compra: Compras):
    cursor = mydb.cursor()
    consulta = "UPDATE compras SET cantidad = %s, descripcion = %s, fechaCompra = %s, precioCompra = %s, id_proveedor = %s WHERE id_compra = %s"
    valores = (compra.cantidad, compra.descripcion, compra.fechaCompra, compra.precioCompra, compra.id_proveedor, id_compra)
    cursor.execute(consulta, valores)
    mydb.commit()
    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="La compra no existe")
    compra_actualizada = {"id_compra": id_compra, **compra.dict()}
    return compra_actualizada

# Método para eliminar una compra por su ID
@app.delete("/compras/{id_compra}", tags=["Compras"])
def eliminar_compra(id_compra: int):
    cursor = mydb.cursor()
    consulta = "DELETE FROM compras WHERE id_compra = %s"
    valores = (id_compra,)
    cursor.execute(consulta, valores)
    mydb.commit()
    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="La compra no existe")
    return {"Mensaje": "La compra ha sido eliminada correctamente"}
