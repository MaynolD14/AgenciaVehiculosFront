from pydantic import BaseModel, constr, validator
from typing import Optional

class Clientes(BaseModel):
    id_cliente: Optional[int] = None
    nombres: str
    direccion: str 
    telefono: str
    email: str