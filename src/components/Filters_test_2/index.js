import React, {useState} from 'react'
import DropDown from "../DropDown";
import PropTypes from 'prop-types'
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap'
import classnames from 'classnames'
import css from './style.module.scss'



const Content = () => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }

    return (
        <div className={classnames(css.filters, css.filtersDark)}>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '1'}, css.navLink)}
                        onClick={() => { toggle('1'); }}
                    >
                        фильтр
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '2' }, css.navLink)}
                        onClick={() => { toggle('2'); }}
                    >
                        настройка
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                      <p>Tab 1 Contents</p>
                </TabPane>
                <TabPane tabId="2">
                    <Row>
                        <Col sm="6">
                            <Card body>
                                <CardTitle>Special Title Treatment</CardTitle>
                                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                <Button>Go somewhere</Button>
                            </Card>
                        </Col>
                        <Col sm="6">
                            <Card body>
                                <CardTitle>Special Title Treatment</CardTitle>
                                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                <Button>Go somewhere</Button>
                            </Card>
                        </Col>
                    </Row>
                </TabPane>
            </TabContent>
        </div>
    )
}

const Filters_old = (props) => {
    return (
        <DropDown opened={true}>
            {<Content />}
        </DropDown>

    )
}
Filters_old.propTypes = {
    opened: PropTypes.bool
}
Filters_old.defaultProps = {
    opened: false
}

export default Filters_old