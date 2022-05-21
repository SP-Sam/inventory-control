import axios from 'axios';

export async function getRawMaterials() {
  return axios.get('http://localhost:3000/rawMaterials').then(res => res.data);
}

export async function deleteRawMaterial(code: number) {
  return axios
    .delete(`http://localhost:3000/rawMaterials/${code}`)
    .then(res => res.status);
}
