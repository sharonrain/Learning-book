import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import PropTypes from "prop-types";
import styles from '../style/Authors.css';
import UserModal from '../components/AuthorModal';
import { PAGE_SIZE } from '../constants';

class Authors extends React.PureComponent
{
    render() {
        const { dispatch, list: dataSource, loading, total, page: current } = this.props;
        const deleteHandler = (record) => {
            dispatch({
                type: 'authors/remove',
                payload: record,
            })
        };
        const pageChangeHandler = (page) => dispatch({
            type: 'authors/fetch',
            payload: { page },
        });
        const editHandler = (id, values) => dispatch({
            type: 'authors/patch',
            payload: { id, values },
        });

        const createHandler = (values) => dispatch({
            type: 'authors/create',
            payload: values,
        });

        const goToManageCourse = () => this.context.router.history.push('/courses');

        const columns = [
            {
                title: 'Name',
                key: 'name',
                render: (text, record) => <a href="">{`${record.firstName} ${record.lastName}`}</a>,
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: 'Website',
                dataIndex: 'website',
                key: 'website',
            },
            {
                title: 'Operation',
                key: 'operation',
                render: (text, record) => (
                    <span className={styles.operation}>
                        <UserModal record={record} onOk={editHandler.bind(null, record.id)} >
                            <a>Edit</a>
                        </UserModal>
                        <Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, record)}>
                            <a href="">Delete</a>
                        </Popconfirm>
                    </span>
                ),
            },
        ];

        return (
            <div className={styles.normal}>
                <div>
                    <div className={styles.create}>
                        <UserModal record={{}} onOk={createHandler}>
                            <Button type="primary">Create Author</Button>
                        </UserModal>
                        <Button type="second" onClick={goToManageCourse}>Manage Course</Button>
                    </div>
                    <Table columns={columns} dataSource={dataSource} loading={loading} rowKey={record => record.id} pagination={false}
                    />
                    <Pagination className="ant-table-pagination" total={total} current={current} pageSize={PAGE_SIZE} onChange={pageChangeHandler} />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { list, total, page } = state.authors;
    return {
        loading: state.loading.models.authors,
        list,
        total,
        page,
    };
}

Authors.contextTypes = {
    router: PropTypes.object
};
export default connect(mapStateToProps)(Authors);