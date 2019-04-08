import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'antd-mobile';
import WhiteSpace from '../../components/whiteSpace';
import Title from '../../components/title';
import SongsList from '../../components/songs-list/songs-list';
import {fetchBanner,fetchRecommend,fetchReSongsData} from '../../redux/repertoire.redux';
import { connect } from 'react-redux';
import './repertoire.less';
import {HOST} from '../../const/host'
import _ from 'lodash';

import {BannerBox} from '../../MyMoudules'
@connect(
    state=>state.repertoire,
    {fetchBanner,fetchRecommend,fetchReSongsData}
)
class Repertoire extends Component {
    constructor(props) {
        super(props)
        this.state = {};
    }
    componentDidMount(){
        // this.props.fetchBanner();
        this.props.fetchRecommend();
        this.props.fetchReSongsData()
    }

    shouldComponentUpdate(nextProps, nextState){
        if (!_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState)) {
            return true
        } else {
            return false
        }
    }

    render() {
        return (
            <div id="repertoire">
                {/* banner层代码 */}
                <BannerBox />
                {/* 空格 */}
                <WhiteSpace></WhiteSpace>
                {/* day推荐 */}
                <Title title="每日推荐"></Title>
                <div className="recommend">
                    {
                        this.props.recommendData?
                            <div className="recommend-wrapper">
                                {
                                    this.props.recommendData.map(v=>(
                                        <Link to={`${HOST}/songlistdetail/${v.id}`} key={v.src} className="recommend-item">
                                            <div>
                                                <img src={v.src} alt=""/>
                                            </div>
                                            <div className="item-name">{v.name}</div>
                                        </Link>
                                    ))
                                }
                            </div>
                            :
                            ""
                    }
                </div>
                <WhiteSpace></WhiteSpace>
                
                <Title title="曲库好歌"></Title>
                {
                    this.props.reSongsData?
                        <SongsList songs={this.props.reSongsData}></SongsList>
                        :
                        ""
                }


            </div>
        )
    }
}
export default Repertoire