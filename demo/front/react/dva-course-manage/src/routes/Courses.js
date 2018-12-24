import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import styles from '../style/Authors.css';
import CourseModal from '../components/CourseModal';
import { PAGE_SIZE } from '../constants';

class Courses extends React.PureComponent {
    render() {
        const { dispatch, list: dataSource, loading, total, page: current, authors } = this.props;
        const deleteHandler = (id) => dispatch({
            type: 'courses/remove',
            payload: id,
        });
        const pageChangeHandler = (page) => dispatch({
            type: 'courses/fetch',
            payload: { page },
        });
        const editHandler = (id, values) => dispatch({
            type: 'courses/patch',
            payload: { id, values },
        });

        const createHandler = (values) => dispatch({
            type: 'courses/create',
            payload: values,
        });
        const goToManageAuthor = () => this.context.router.history.push('/authors');


        const columns = [
            {
                title: '',
                dataIndex: 'watchHref',
                key: 'watchHref',
                render: watchHref => <a href={watchHref}>Watch</a>,
            },
            {
                title: 'Title',
                dataIndex: 'title',
                key: 'title',
            },
            {
                title: 'Author',
                dataIndex: 'authorName',
                key: 'authorName',
            },
            {
                title: 'Category',
                dataIndex: 'category',
                key: 'category',
            },
            {
                title: 'Length',
                dataIndex: 'length',
                key: 'length',
            },
            {
                title: 'Operation',
                key: 'operation',
                render: (text, course) => (
                    <span className={styles.operation}>
                        <CourseModal course={course} authors={authors} onOk={editHandler.bind(null, course.id)} >
                            <a>Edit</a>
                        </CourseModal>
                        <Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, course.id)}>
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
                        <CourseModal course={{}} authors={authors} onOk={createHandler}>
                            <Button type="primary">Add Course</Button>
                        </CourseModal>
                        <Button type="second" onClick={goToManageAuthor}>Manage Author</Button>
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
    const { list, total, page, authors } = state.courses;
    return {
        loading: state.loading.models.courses,
        list,
        total,
        page,
        authors: authors.map(author => ({ value: `${author.firstName}_${author.lastName}`, text: `${author.firstName}_${author.lastName}` })),
    };
}
Courses.contextTypes = {
    router: PropTypes.object
};
export default connect(mapStateToProps)(Courses);