import React, {Component} from 'react';
import { Row, Col } from 'antd';

class Main extends Component {
    render() {
        return (
            <Row className='main'>
                <Col span={6} className="left-side">
                    Route Related Options
                </Col>
                <Col span={16} className="right-side">
                    Google Paris Map
                </Col>
            </Row>
        );
    }
}

export default Main;
