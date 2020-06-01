import * as React from 'react';
import * as Models from '../../Models'
import * as Utils from '../../infrastructure/Utils'
import { NavLink } from 'react-router-dom';
import './index.css';
import { StartItem } from '../';
import { Button } from '../../CoreComponents';
import * as RoutPath from '../../infrastructure/RoutePath'
import * as FormatHelper from '../../infrastructure/FormatHelper';
interface ArticleItemProps {
    
}
interface ArticleItemStates {
    
}
export class CreatePostBox extends React.Component<ArticleItemProps, ArticleItemStates> {
    constructor(props: any) {
        super(props);
        this.state = {
            
        };

    }
    static defaultProps = {
        isShowStatus: false
    }
    componentWillMount() {

    }
    renderBody(data) {

    }
    private getPreviewContent(content: string) {
        if (Utils.isNullOrWhiteSpace(content)) return ''
        if (content.length < 200) return content;
        return `${content.substring(0, 200)}`
    }
    private handelOnShowPostStatusPopup() {
        
    }
    public render() {
        return <div className="control_post_news">
            <div className="control_post">
                <span className="post-control">
                    <a href="#" onClick={() => this.handelOnShowPostStatusPopup()}>
                        <span className="mg-l20">Bài viết</span>
                    </a>
                </span>
                <div className="clearfix"></div>
            </div>
            <div className="control_post_new_body">
                <div className="text_area">
                    <div className="avartar_text_area">
                    </div>
                    <div className="text_area_input">
                        <textarea id="post_news" placeholder="Bạn đang nghĩ gì"></textarea>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div>
            <div className="function_post">
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="Status_tagging" style={{ display: 'none' }}>
                            <a href="#">Lampard</a> Cùng với <a href="#" data-toggle="tooltip" data-placement="bottom"
                                title="Hooray!<br />Hooray!">2 người khác</a>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="function_post_tagging" style={{ display: 'none' }}>
                            <select className="form-control">
                                <option thumbnail-image="../../../../assets/images/avartar.JPG">orange</option>
                                <option thumbnail-image="../../../../assets/images/avartar.JPG">white</option>
                                <option thumbnail-image="../../../../assets/images/avartar.JPG">purple</option>
                                <option thumbnail-image="../../../../assets/images/avartar.JPG">purple2</option>
                                <option thumbnail-image="../../../../assets/images/avartar.JPG">purple3</option>
                                <option thumbnail-image="../../../../assets/images/avartar.JPG">purple4</option>
                                <option thumbnail-image="../../../../assets/images/avartar.JPG">purple5</option>
                                <option thumbnail-image="../../../../assets/images/avartar.JPG">purple6</option>
                            </select>
                        </div>
                        <div className="function_post_border">
                            <div id="tagging" className="function_post_item">Gắn thẻ bạn bè</div>
                            <div className="function_post_item">Gắn thẻ bạn bè</div>
                            <div className="function_post_item">Gắn thẻ bạn bè</div>
                            <div className="function_post_item">Gắn thẻ bạn bè</div>
                            <div className="function_post_item">Gắn thẻ bạn bè</div>
                            <div className="function_post_item">Gắn thẻ bạn bè</div>
                            <div className="function_post_item">Gắn thẻ bạn bè</div>
                            <div className="function_post_item">Gắn thẻ bạn bè</div>
                            <div className="function_post_item">Gắn thẻ bạn bè</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="buttom_control_post">
                <div className="Post_buttom">Đăng</div>
            </div>
        </div>
    }
}
