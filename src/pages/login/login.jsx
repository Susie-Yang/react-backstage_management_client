import React, {Component} from 'react'
import { Form, Icon, Input, Button } from 'antd';

import './login.less'
import logo from './images/logo.png'

class Login extends Component{

  handleSubmit = (e) => {
    e.preventDefault()

    // 对所有表单字段进行检验
    this.props.form.validateFields((err,values) => {
      // 检验成功
      if(!err) {
        console.log('提交登录的Ajax请求', values);
      } else {
        console.log('校验失败！');
      }
    })
    // // 得到form对象
    // const form = this.props.form
    // // 获取表单项的输入数据
    // const values = form.getFieldsValue()
  }

  // 对密码进行自定义验证
  validatePwd = (rule, value, callback) => {
    console.log(rule, value);
    if(!value){
      callback('密码必须输入')
    }else if(value.length < 4){
      callback('密码长度不能小于4位')
    }else if(value.length > 12){
      callback('密码长度不能大于12位')
    }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
      callback('密码必须是英文/数字/下划线组成！')
    }else{
      callback() // 验证通过
    }
  }

  render(){

    // 得到具有强大功能的form对象
    const form = this.props.form
    const { getFieldDecorator } = form 

    return(
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo"/>
          <h1>React项目：后台管理系统</h1>
        </header>
        <section className="login-content">
          <h2>用户登录</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {
                getFieldDecorator('username',{
                  rules: [
                    { required: true, whitespace: true, message: '用户名必须输入！' },
                    { min: 4, message: '用户名至少4位！' },
                    { max: 12, message: '用户名最多12位！' },
                    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文/数字/下划线组成！' }
                  ],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="用户名"
                  />
                )
              }
            </Form.Item>
            <Form.Item>
              {
                getFieldDecorator('password',{
                  rules:[
                    {
                      validator: this.validatePwd
                    }
                  ]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                  />
                )
              }
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}

/**
 * 包装Form组件生成一个新的组件：Form(Login)
 * 新组件会向Form组件传递一个强大的对象属性：form
 */
const WrapLogin = Form.create()(Login)
export default WrapLogin