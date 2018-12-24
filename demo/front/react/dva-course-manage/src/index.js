import dva from 'dva';
import './index.css';
import 'antd/dist/antd.css';
import createLoading from 'dva-loading';

// 1. Initialize
const app = dva({
    initialState: {
        products: [
            { name: 'dva', id: 1 },
            { name: 'antd', id: 2 },
        ],
    },
    history: window.g_history,
});
app.use(createLoading());

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/products').default);
app.model(require('./models/count').default);
app.model(require('./models/authors').default);
app.model(require('./models/courses').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
