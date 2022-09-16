import React, {Component} from 'react';
import { Row, Col } from 'antd';
import Map from './Map';

class Main extends Component {
    render() {
        return (
            <Row className='main'>
                <Col span={4} className="left-side">
                    Route Related Options
                </Col>
                <Col span={16} className="right-side">
                    <Map />
                </Col>
            </Row>
        );
    }
}

export default Main;
