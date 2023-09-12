from pydantic import BaseModel, constr, validator
from typing import Optional

class Proveedores(BaseModel):
    id_proveedor: Optional[int] = None
    nombres: str
    telefono: str 
    email: str
    empresa: str