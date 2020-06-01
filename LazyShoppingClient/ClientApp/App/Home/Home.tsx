import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { ArticleItem, StartItem, TourGuide, CreatePostBox } from '../../components'
import { Button } from '../../CoreComponents'
import * as Models from '../../Models'
import * as Utils from '../../infrastructure/Utils'
import * as PropTypes from 'prop-types';
import { ArticleRepository } from '../../repositories/ArticleRepository'
interface HomeStates {
    articles: Models.IArticle[],
    paging: Models.IPaging,
    isLogin: boolean
}
export class Home extends React.Component<RouteComponentProps<any>, HomeStates> {
    constructor(props: any) {
        super(props);

        this.state = {
            articles: [],
            isLogin: Utils.isLogin(),
            paging: { page: 1, limit: 10, totalRecord: 0, hasMore: false } as Models.IPaging
        };

    }
    componentWillMount() {
        this.getArticle()
    }
    private getArticle() {
        let { paging, articles } = this.state
        ArticleRepository.Search(null, null, null, paging.page, paging.limit).then(response => {
            if (response != null && response.data != null) {
                paging.totalRecord = response.data.totalRecord
                paging.hasMore = paging.page * paging.limit >= paging.totalRecord ? false : true
                if (articles == null)
                    articles = [];
                if (Utils.isArrNullOrHaveNoItem(response.data.datas))
                    return
                articles = articles.concat(response.data.datas)
                this.setState({ articles: articles, paging: paging })
            }
        })
    }
    private onClickGetMoreArticle() {
        let { paging } = this.state
        paging.page += 1;
        this.setState({ paging: paging }, () => this.getArticle());
    }
    private renderArticles() {
        let { articles } = this.state
        if (Utils.isArrNullOrHaveNoItem(articles)) return null
        return <div className="text-left">{articles.map(item => {
            return <ArticleItem key={item.id} article={item} />


        })}
        </div>
    }
    public render() {
        let { isLogin } = this.state
        return <div className="home pd_lr_110">
            <CreatePostBox />
            {!isLogin && <TourGuide />}
        </div>
    }
}
