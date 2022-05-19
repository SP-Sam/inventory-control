import axios from 'axios';

export async function getRawMaterials() {
  return axios.get('http://localhost:3000/rawMaterials').then(res => res.data);
}
