from pydantic import BaseModel, constr, validator
from typing import Optional
from datetime import date

class Compras(BaseModel):
    id_compra: Optional[int] = None
    cantidad: int
    descripcion: str 
    fechaCompra: date
    precioCompra: float
    id_proveedor: int