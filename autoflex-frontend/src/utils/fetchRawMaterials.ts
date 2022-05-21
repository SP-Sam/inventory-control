import axios from 'axios';
import {
  INewRawMaterial,
  IRawMaterial,
} from '../interfaces/rawMaterialsInterfaces';

const RAW_MATERIALS_URL = 'http://localhost:3000/rawMaterials';

export async function postRawMaterial(rm: INewRawMaterial) {
  return axios.post(RAW_MATERIALS_URL, rm).then(res => res.data);
}

export async function getRawMaterials() {
  return axios.get(RAW_MATERIALS_URL).then(res => res.data);
}

export async function deleteRawMaterial(code: number) {
  return axios
    .delete(`${RAW_MATERIALS_URL}/${code}`)
    .then(res => res.statusText);
}
