import * as React from "react"
import * as ReactDOM from 'react-dom';
import { RouteComponentProps } from 'react-router';
import * as PropTypes from 'prop-types';
import { MarkdownEditor, HeaderPage, RecommendedTag } from '../../components'
import { Button, CreateSVG, Input, Loading, InputCheckbox } from '../../CoreComponents'
import * as RoutePath from '../../infrastructure/RoutePath'
import * as Models from '../../Models'
import * as Utils from '../../infrastructure/Utils'
import { NavLink } from 'react-router-dom';
import './index.css'
import { AccountRepository } from "../../repositories/AccountRepository";
interface LoginState {
    account: Models.IAccount
}
export class Login extends React.Component<RouteComponentProps, LoginState>{
    constructor(props) {
        super(props);
        this.state = {
            account: new Object as Models.IAccount
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

    }
    private Login() {
        let { account } = this.state
        debugger
        if (Utils.isNullOrWhiteSpace(account.email)
            || Utils.isNullOrWhiteSpace(account.password)) {
            this.context.ShowMessage("error", "Email hoặc mật khẩu không đúng")
            return
        }
        AccountRepository.Login({ email: account.email, password: account.password }).then(response => {
            if (response.error != null) {
                this.context.ShowMessage("error", response.error.code)
                return
            }
            document['account'] = response
            this.context.ShowMessage("success", "sign_up_success")
        })
    }
    private renderFooter() {
        return <div className="footer pd_lr_110 flex">
            <div className="flex">
                <NavLink className="text-main" to={RoutePath.Path.legal_term}>
                    Điều khoản
                </NavLink>
                <NavLink target="_blank" className="text-main" to={RoutePath.Path.legal_term}>
                    Phản hồi
                </NavLink>
                <NavLink target="_blank" className="text-main" to={RoutePath.Path.legal_term}>
                    Facebook
                </NavLink>
                <div className="copyright">
                    <span>
                        Copyright © 2019 greencode
                        </span>
                </div>
            </div>
        </div>
    }
    render() {
        let { account } = this.state
        return ReactDOM.createPortal(<div>
            <h1 className="error">Allied Login Form</h1>
            <div className="w3layouts-two-grids">
                <div className="mid-class">
                    <div className="txt-left-side">
                        <h2> Login Here </h2>
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget</p>
                        <form action="#" method="post">
                            <div className="form-left-to-w3l">
                                <span className="fa fa-envelope-o" aria-hidden="true"></span>
                                <Input value={account != null ? account.email : ''}
                                    onChange={(e) => this.setState({ account: { ...this.state.account, email: e.target.value } })} type="email" />
                                <div className="clear"></div>
                            </div>
                            <div className="form-left-to-w3l mt-10 ">

                                <span className="fa fa-lock" aria-hidden="true"></span>
                                <Input type="password" value={account != null ? account.password : ''}
                                    onChange={(e) => this.setState({ account: { ...this.state.account, password: e.target.value } })} />
                                <div className="clear"></div>
                            </div>
                            <div className="main-two-w3ls mt-10">
                                <div className="left-side-forget">
                                    <input type="checkbox" className="checked" />
                                    <span className="remenber-me">Remember me </span>
                                </div>
                                <div className="right-side-forget">
                                    <a href="#" className="for">Forgot password...?</a>
                                </div>
                            </div>
                            <div className="btnn">
                                <Button type="primary" onClick={() => this.Login()}>Login </Button>
                            </div>
                        </form>
                        <div className="w3layouts_more-buttn">
                            <h3>Don't Have an account..?
                        <a href="#">Register Here
                        </a>
                            </h3>
                        </div>

                    </div>
                    <div className="img-right-side">
                        <h3>Welcome To Allied Login Form</h3>
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget</p>
                        <img src="assets/images/b11.png" className="img-fluid" alt="" />
                    </div>
                </div>
            </div>
            {this.renderFooter()}
        </div>, document.body)
    }
}