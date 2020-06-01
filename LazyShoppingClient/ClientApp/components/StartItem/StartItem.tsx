import * as React from 'react';
import * as Models from '../../Models'
import * as Utils from '../../infrastructure/Utils'
import { NavLink } from 'react-router-dom';
import { Avatar, ArticleStatus, TagDisplay } from '../';
import * as RoutPath from '../../infrastructure/RoutePath'
import * as FormatHelper from '../../infrastructure/FormatHelper';
interface ArticleItemProps {
    
}
interface ArticleItemStates {
    
}
export class StartItem extends React.Component<ArticleItemProps, ArticleItemStates> {
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
    public render() {
        return <div className="row cwp17-two align-items-center">
            <div className="col-md-6 cwp17-image">
                <img src="assets/images/business.png" className="img-fluid" alt="" />
            </div>
            <div className="col-md-6 cwp17-text">
                <h2>Chỉ 3 bước đơn giản để bắt đầu</h2>
                <p>Nhấn tiếp tục để tìm hiểu thêm nhé!. </p>

            </div>
        </div>
    }
}
