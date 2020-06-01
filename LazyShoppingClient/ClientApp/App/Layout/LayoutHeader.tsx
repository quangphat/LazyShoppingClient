import * as React from 'react';
import { Button, CreateSVG, Input } from '../../CoreComponents'
import * as Models from '../../Models'
import * as H from 'history';
import * as Utils from '../../infrastructure/Utils'
import * as PropTypes from 'prop-types';
import * as RoutePath from '../../infrastructure/RoutePath'
import { NavLink } from 'react-router-dom';
import { AccountRepository } from '../../repositories/AccountRepository'
interface LayoutHeaderProps {
    account: Models.IAccount
    onSearch: Function,
    routerHistory: H.History
}
interface LayoutHeaderStates {
    account: Models.IAccount
}
export class LayoutHeader extends React.Component<LayoutHeaderProps, LayoutHeaderStates> {
    ref_txtSearch: any;
    constructor(props: any) {
        super(props);
        
        this.state = {
            account: this.props.account
        };
        
    }
    static contextTypes = {
        ShowMessage: PropTypes.func
    }
    componentWillReceiveProps(newProps: LayoutHeaderProps) {
        if (this.props.routerHistory.location.pathname != "/search") {
            this.ref_txtSearch.state.value = ""
        }
    }
    private onSearch(e) {
        if (this.props.onSearch)
            this.props.onSearch(e)
    }
    private Login() {
        let { account } = this.state
        if (Utils.isNullOrUndefined(account)
            || Utils.isNullOrWhiteSpace(account.email)
            || Utils.isNullOrWhiteSpace(account.password)) {
            this.context.ShowMessage("error", "Email hoặc mật khẩu không đúng")
            return
        }
        AccountRepository.Login({ email: account.email, password: account.password }).then(response => {
            if (response.error != null) {
                this.context.ShowMessage("error",response.error.code)
                return
            }
            document['account'] = response
            this.context.ShowMessage("success", "sign_up_success")
        })
    }
    public render() {
        let isLogin = Utils.isLogin();
        let { account } = this.state
        return <div className="w3l-bootstrap-header fixed-top">
            <nav className="navbar navbar-expand-lg navbar-light p-2">
                <div className="container">
                    <a className="navbar-brand" href="index.html"><span className="fa fa-diamond"></span>Lazy</a>
                    
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="index.html">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="about.html">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="contact.html">Contact</a>
                            </li>
                        </ul>
                        {!isLogin && <div className="form-inline">
                            <a href="#login.html" className="login mr-4">Log in</a>
                            <a href="#signup.html" className="btn btn-primary btn-theme">Create Free Account</a>
                        </div>}
                    </div>
                </div>
            </nav>
        </div>
    }
}
