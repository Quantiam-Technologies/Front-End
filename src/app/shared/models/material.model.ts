import {MaterialLot} from './material-lot.model';
export class Material {

    'slip_material_id': number;
    'attritor_run_profile': number;
    'name': string;
    'grade': string;
    'purity': string;
    'particle_size': string;
    'cas': string;
    'keywords': Text;
    'formula': string;
    'formula_weight': number;
    'supplier_id': number;
    'catalog_deprecated':string;
    'slip_material_category': number;
    'organic': boolean = false;
    'binder': boolean = false;
    'solvent': boolean = false;
    'media': boolean = false;
    'blend': boolean = false;
    'powder': boolean = false;
    '3d_printing_material': boolean = false;
    'molar_mass': number;
    'density': number;
    'require_seive_for_addition': boolean;
    'created_by': boolean;
    'created': Date;
    'updated': Date;
    'sds': boolean;
    'sds_updated_at': Date;
    'sds_revision_date': Date;
    'lots': MaterialLot[];
    

    }
