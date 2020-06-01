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
        return <header className="master-header">
            <div className="container">
                <div className="navbar navbar-default">

                    <div className="logo">
                        <NavLink to="/">
                            greencode
                        </NavLink>

                    </div>
                    <div className="toolbox">

                        <Input placeholder='Tìm kiếm'
                            ref={component => this.ref_txtSearch = component}
                            prefix={<CreateSVG size={18} svgName='iconSearch' />}
                            onKeyUp={(e) => this.onSearch(e)}
                        />
                    </div>
                    <div className="user_info">
                        {isLogin == false ? <div className="right-menu">
                            <span className="mx-lg-4 mx-md-2  mx-1">
                                <Input value={account != null ? account.email : ''}
                                    onChange={(e) => this.setState({ account: { ...this.state.account, email: e.target.value } })} />
                            </span>
                            <span>
                                <Input type="password" value={account != null ? account.password : ''}
                                    onChange={(e) => this.setState({ account: { ...this.state.account, password: e.target.value } })} />
                            </span>
                            <Button type="primary" onClick={() => this.Login()}>Login </Button>
                        </div>
                            : <div className="top-forms text-center mt-lg-3 mt-md-1 mt-0">
                                <span>Welcome Back!</span>
                                <span className="mx-lg-4 mx-md-2  mx-1">
                                    <a href="login.html">
                                        {account.displayName}
                                    </a>
                                </span>
                                {!Utils.isLogin() && <span>
                                    <NavLink to={RoutePath.Path.register}>
                                        <i className="far fa-user"></i> Register
                                </NavLink>
                                </span>}
                            </div>}
                    </div>
                </div>
            </div>
        </header>
    }
}
