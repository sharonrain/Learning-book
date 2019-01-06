import * as coursesService from '../services/courses';
import * as authorsService from '../services/authors';

export default {
    namespace: 'courses',
    state: {
        list: [],
        total: null,
        page: null,
        authors: [],
    },
    reducers: {
        save(state, { payload: {data: list, total, page, authors } }) {
            return { ...state, list, total, page, authors };
        },
    },
    effects: {
        *fetch({ payload: { page = 1 } }, { call, put }) {
            const { data, headers } = yield call(coursesService.fetch, { page });
            const { data: authors } = yield call(authorsService.fetchAllAuthors)
            yield put({
              type: 'save',
              payload: {
                data,
                total: parseInt(headers['x-total-count'], 10),
                page: parseInt(page, 10),
                authors,
              },
            });
        },
        *remove({ payload: id }, { call, put }) {
            yield call(coursesService.remove, id);
            yield put({ type: 'reload' });
        },
        *patch({ payload: { id, values } }, { call, put }) {
            yield call(coursesService.patch, id, values);
            yield put({ type: 'reload' });
        },
        *create({ payload: values }, { call, put }) {
            yield call(coursesService.create, values);
            yield put({ type: 'reload' });
        },
        *reload(action, { put, select }) {
            const page = yield select(state => state.courses.page) || 1;
            yield put({ type: 'fetch', payload: { page } });
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
          return history.listen(({ pathname, query }) => {
            if (pathname === '/courses') {
              dispatch({ type: 'fetch', payload: query || { } });
            }
          });
        },
    },
};