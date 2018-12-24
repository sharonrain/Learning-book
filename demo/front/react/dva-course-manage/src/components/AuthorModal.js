import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;

class AuthorEditModal extends Component {
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
        const { firstName, lastName, email, website } = this.props.record;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        }
        return (
            <span>
                <span onClick={this.showModalHandler}>{ children }</span>
                <Modal
                    title="Edit Author"
                    visible={this.state.visible}
                    onOk={this.okHandler}
                    onCancel={this.hideModalHandler} >
                    <Form layout="horizontal" onSubmit={this.okHandler}>
                        <FormItem {...formItemLayout} label="First Name">
                            {getFieldDecorator('firstName', {
                                initialValue: firstName,
                            })(<Input />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="Last Name">
                            {getFieldDecorator('lastName', {
                                initialValue: lastName,
                            })(<Input />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="Email">
                            {getFieldDecorator('email', {
                                initialValue: email,
                            })(<Input />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="Website">
                            {getFieldDecorator('website', {
                                initialValue: website,
                            })(<Input />)}
                        </FormItem>
                    </Form>
                </Modal>
            </span>
        )
    }
}
export default Form.create()(AuthorEditModal);