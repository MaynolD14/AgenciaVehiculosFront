from pydantic import BaseModel, constr, validator
from typing import Optional

class Vehiculos(BaseModel):
    id_vehiculo: Optional[int] = None
    marca: str
    modelo: str
    año: str 
    stock: int
    precio_uni: float