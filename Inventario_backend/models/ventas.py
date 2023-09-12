from pydantic import BaseModel, constr, validator
from typing import Optional
from datetime import date

class Ventas(BaseModel):
    id_venta: Optional[int] = None
    id_vehiculo: int
    id_cliente: int
    fechaVenta: date
    Cantidad: int
    Precio: float
    Total: float
    
    