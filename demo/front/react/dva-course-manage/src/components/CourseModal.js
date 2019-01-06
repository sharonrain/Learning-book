import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';
import SelectInput from './SelectInput';

const FormItem = Form.Item;

class CourseEditModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
    }

    showModalHandler = e => {
        if(e) e.stopPropagation();
        this.setState({
            visible: true,
        });
    };

    hideModalHandler = () => {
        this.setState({
            visible: false,
        });
    };

    okHandler = () => {
        const { onOk } = this.props;
        this.props.form.validateFields((err, values) => {
            if(!err) {
                onOk(values);
                this.hideModalHandler();
            }
        });
    };

    render() {
        const { children } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { title, authorName, category, length, watchHref } = this.props.course;
        const { authors } = this.props;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        }
        return (
            <span>
                <span onClick={this.showModalHandler}>{ children }</span>
                <Modal
                    title="Manage Course"
                    visible={this.state.visible}
                    onOk={this.okHandler}
                    onCancel={this.hideModalHandler} >
                    <Form layout="horizontal" onSubmit={this.okHandler}>
                        <FormItem {...formItemLayout} label="Title">
                            {getFieldDecorator('title', {
                                initialValue: title,
                            })(<Input />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="Author">
                            {getFieldDecorator('authorName', {
                                initialValue: authorName,
                            })(<SelectInput defaultOption="Select Author" options={authors} select={authorName || "default"}/>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="Category">
                            {getFieldDecorator('category', {
                                initialValue: category,
                            })(<Input />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="Length">
                            {getFieldDecorator('length', {
                                initialValue: length,
                            })(<Input />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="watchHref">
                            {getFieldDecorator('watchHref', {
                                initialValue: watchHref,
                            })(<Input />)}
                        </FormItem>
                    </Form>
                </Modal>
            </span>
        )
    }
}
export default Form.create()(CourseEditModal);