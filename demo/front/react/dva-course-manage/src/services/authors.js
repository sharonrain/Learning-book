import request from '../utils/request';
import { PAGE_SIZE } from '../constants';

export const fetch = ({ page }) => request(`/api/authors?_page=${page}&_limit=${PAGE_SIZE}`);

export const fetchAllAuthors = () => request(`/api/authors`);

export const remove = (id) => request(`/api/authors/${id}`, { method: 'DELETE' });

export const patch = (id, values) => request(`api/authors/${id}`, { method: 'PATCH', body: JSON.stringify(values), headers: { "Content-Type": "application/json" } });

export const create = (values) => request(`api/authors`, { method: 'POST', body: JSON.stringify(values), headers: { "Content-Type": "application/json" } });