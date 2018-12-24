import request from '../utils/request';
import { PAGE_SIZE } from '../constants';

export const fetch = ({ page }) => request(`/api/courses?_page=${page}&_limit=${PAGE_SIZE}`);

export const fetchCourseByAuthor = ({ authorName }) => request(`/api/courses?authorName=${authorName}`);

export const remove = (id) => request(`/api/courses/${id}`, { method: 'DELETE' });

export const patch = (id, values) => request(`api/courses/${id}`, { method: 'PATCH', body: JSON.stringify(values), headers: { "Content-Type": "application/json" } });

export const create = (values) => request(`api/courses`, { method: 'POST', body: JSON.stringify(values), headers: { "Content-Type": "application/json" } });