import {MaterialLotContainer} from '../models/material-lot-container.model';

export class MaterialLot {

    'lot_id': number;
    'slip_material_id': number;
    'lot_name': string;
    'created_by': number;
    'created': Date;
    'updated': Date;    
    'containers': MaterialLotContainer[];

}


