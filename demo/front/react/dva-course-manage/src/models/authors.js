import * as authorsService from '../services/authors';
import * as coursesService from '../services/courses';

export default {
    namespace: 'authors',
    state: {
        list: [],
        total: null,
        page: null,
    },
    reducers: {
        save(state, { payload: {data: list, total, page } }) {
            return { ...state, list, total, page };
        },
    },
    effects: {
        *fetch({ payload: { page = 1 } }, { call, put }) {
            const { data, headers } = yield call(authorsService.fetch, { page });
            yield put({
              type: 'save',
              payload: {
                data,
                total: parseInt(headers['x-total-count'], 10),
                page: parseInt(page, 10),
              },
            });
        },
        *remove({ payload: values }, { call, put }) {
            const { data: coursesForAuthor } = yield call(coursesService.fetchCourseByAuthor, { authorName: `${values.firstName} ${values.lastName}` });
            if (coursesForAuthor.length > 0) {
                alert("you can't delete author who have courses!");
            } else {
                yield call(authorsService.remove, values.id);
                yield put({ type: 'reload' });
            }
        },
        *patch({ payload: { id, values } }, { call, put }) {
            yield call(authorsService.patch, id, values);
            yield put({ type: 'reload' });
        },
        *create({ payload: values }, { call, put }) {
            yield call(authorsService.create, values);
            yield put({ type: 'reload' });
        },
        *reload(action, { put, select }) {
            const page = yield select(state => state.authors.page) || 1;
            yield put({ type: 'fetch', payload: { page } });
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
          return history.listen(({ pathname, query }) => {
            if (pathname === '/authors') {
              dispatch({ type: 'fetch', payload: query || { } });
            }
          });
        },
    },
};