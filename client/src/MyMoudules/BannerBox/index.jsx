import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import {fetchBanner} from '../../redux/repertoire.redux';
import { Carousel } from 'antd-mobile';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import {HOST} from '../../const/host'
import '../../containers/repertoire/repertoire.less';

@connect(
    state => state.repertoire,
    {fetchBanner}
)
class BannerBox extends PureComponent {
    constructor(props) {
        super(props);
        this.state={}
    }

    // 初始化发送请求
    componentDidMount() {
        this.props.fetchBanner();
    }

    render () {
        return (
            <div className="banner">
                {
                    this.props.bannerData ? 
                        <Carousel
                            autoplay={true}
                            infinite
                            selectedIndex={1}
                            beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                            afterChange={index => console.log('slide to', index)}
                        >
                            {this.props.bannerData.map(val => (
                                <Link
                                    key={val}
                                    to={`${HOST}/albumdetail/3`}
                                    style={{ display: 'inline-block', width: '100%'}}
                                >
                                    <img
                                        src={val}
                                        alt=""
                                        className="banner-img"
                                        onLoad={() => {
                                            // fire window resize event to change height
                                            window.dispatchEvent(new Event('resize'));
                                            this.setState({ imgHeight: 'auto' });
                                        }}
                                    />
                                </Link>
                            ))}
                        </Carousel>
                    :null
                }
            </div>
        )
    }
}

export default BannerBox;