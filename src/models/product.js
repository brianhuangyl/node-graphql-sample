import _ from 'lodash';
import db from '../db';

const table = () => db.table('products');
function findById(id) { return table().where('id', id); }
function buildRow ({name, price, description, imageUrl}){
  return {
    name,
    price,
    description,
    image_url: imageUrl
  };
}

async function get({ id, first, after } = {}) {
  if (typeof id === 'undefined')
    return table().limit(first).offset(after).select();
  else {
    const data = await findById(id).select()
    return data;
  }
}

async function create(input) {
  const result = await table().insert(buildRow(input));
  return _.first(result)
}
async function update(id, input) {
  const result = await findById(id).update(buildRow(input));
  return id;
}
async function del(id) {
  const result = await findById(id).del()
  return _.first(result);
}

export default {
  get,
  create,
  update,
  del
}
