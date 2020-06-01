import * as React from "react"
import * as ReactDOM from 'react-dom';
import { RouteComponentProps } from 'react-router';
import * as PropTypes from 'prop-types';
import { MarkdownEditor, HeaderPage, RecommendedTag } from '../../components'
import { Button, CreateSVG, Input, Loading, InputCheckbox} from '../../CoreComponents'
import * as RoutePath from '../../infrastructure/RoutePath'
import * as Models from '../../Models'
import * as Utils from '../../infrastructure/Utils'
import './index.css'
import { AccountRepository } from "../../repositories/AccountRepository";
interface RegisterStates {
    account: Models.IAccountSignUp
}
export class Register extends React.Component<RouteComponentProps, RegisterStates>{
    constructor(props) {
        super(props);
        this.state = {
            account: new Object as Models.IAccountSignUp
        }
    }
    static contextTypes = {
        showLayoutNone: PropTypes.func,
        ShowMessage: PropTypes.func
    }
    componentWillMount() {
        //this.context.showLayoutNone(true)
    }
    private async onClickNext() {
        let { account } = this.state
        
        if (Utils.isNullOrWhiteSpace(account.email)) {
            this.context.ShowMessage("danger", "error_email_must_not_be_empty")
            return
        }
        if (!Utils.IsEmail(account.email)) {
            this.context.ShowMessage("danger", "error_invalid_email")
            return
        }
        if (Utils.isNullOrWhiteSpace(account.displayName)) {
            this.context.ShowMessage("danger", "error_display_name_must_not_be_empty")
            return
        }
        if (!Utils.isValidPassword(account.password)) {
            this.context.ShowMessage("danger", "error_invalid_password")
            return
        }
        if (account.password != account.re_pass) {
            this.context.ShowMessage("danger", "error_password_not_match")
            return
        }
        if (!account.accept_policy) {
            this.context.ShowMessage("danger", "error_accept_policy")
            return
        }
        let response = await AccountRepository.SignUp(account);
        if (response == null) {
            this.context.ShowMessage("danger", "error_invalid_data")
            return
        }
        if (response.error != null) {
            this.context.ShowMessage("danger", response.error.code)
            return
        }
        this.context.ShowMessage("success", "sign_up_success")
        document['account'] = response.data
        this.props.history.push(RoutePath.Path.recommend_tags)
    }
    render() {
        return ReactDOM.createPortal(<div><div className="ui page grid headline">
            <div className="center aligned column">
                <div className="ui small steps">
                    <div className="ui active step">
                        Đăng ký
                    </div>
                    <div className="ui disabled step">
                        Chủ đề
                    </div>
                </div>
            </div>
        </div>
            <div className="ui page grid content">
                <div className="four wide column left-side"></div>
                <div className="eight wide column center-frame">
                    <br />
                    <h1 className="ui center aligned teal header logo text-green">
                        Green Code
                    </h1>
                    <div className="form-group">
                        <label>Email</label>
                        <Input placeholder="Email"
                            onChange={(e) => this.setState({ account: { ...this.state.account, email: e.target.value } })}
                            prefix={
                            <i className="fa fa-envelope"></i>
                        } />
                    </div>
                    <div className="form-group">
                        <label>Họ và tên </label>
                        <Input placeholder="DisplayName"
                            onChange={(e) => this.setState({ account: { ...this.state.account, displayName: e.target.value } })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Mật khẩu</label>
                        <Input
                            onChange={(e) => this.setState({ account: { ...this.state.account, password: e.target.value } })}
                            placeholder="Password" type="password" />
                    </div>
                    <div className="form-group">
                        <label>Xác nhận mật khẩu</label>
                        <Input
                            onChange={(e) => this.setState({ account: { ...this.state.account, re_pass: e.target.value } })}
                            placeholder="Re-enter password" type="password" />
                    </div>
                    <div className="form-group">
                        <InputCheckbox
                            onChange={(e) => this.setState({ account: { ...this.state.account, accept_policy: e } })}
                            nameInput="policy" content="Đồng ý với điều khoản sử dụng" />
                    </div>
                    <div className="form-group">
                        <Button type="primary" className="pull-right"
                            onClick={() => this.onClickNext()}>Đăng ký</Button>
                    </div>
                </div>
            </div>
        </div>, document.body)
    }
}