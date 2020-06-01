import * as React from 'react';
import * as Models from '../../Models'
import * as Utils from '../../infrastructure/Utils'
import { NavLink } from 'react-router-dom';
import {  StartItem } from '../';
import * as RoutPath from '../../infrastructure/RoutePath'
import * as FormatHelper from '../../infrastructure/FormatHelper';
interface ArticleItemProps {
    
}
interface ArticleItemStates {
    
}
export class TourGuide extends React.Component<ArticleItemProps, ArticleItemStates> {
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
        return <section className="w3l-index-block5">
            <div className="section-info py-5">
                <div className="container py-md-3">
                    <StartItem />
                    <a href="#signup.html" style={{ float: "right" }}>Tiếp tục »</a>
                </div>
            </div>
        </section>
    }
}
