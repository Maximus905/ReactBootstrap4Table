import {CustomInput, Form, FormGroup, Nav, NavItem, NavLink, TabContent, TabPane} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCogs, faFilter} from "@fortawesome/free-solid-svg-icons";
import {ListItems} from "../ListItems";
import PropTypes from "prop-types";
import React from "react";

const FilterContent = (props) => {
    const {settingsTabActive, settingsOn, filterOn} = props
    return (
        <div>
            <Nav tabs fill={true} >
                <NavItem>
                    <NavLink href={'#'} active={!settingsTabActive} onClick={filterOn}>
                        <FontAwesomeIcon icon={faFilter} size={'sm'} />
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href={'#'} active={settingsTabActive} onClick={settingsOn} >
                        <FontAwesomeIcon icon={faCogs} size={'sm'} />
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={settingsTabActive ? 'settings' : 'filter'}>
                <TabPane tabId={'settings'}>
                    <div style={{width: 200, maxHeight: 100}} className={'overflow-auto'}>
                        <Form>
                            <FormGroup>
                                <CustomInput id={'filterType1'} name={'filters'} type={'radio'} label={'filter 1'}  />
                                <CustomInput id={'filterType2'} name={'filters'} type={'radio'} label={'filter 2'} />
                                <CustomInput id={'filterType3'} name={'filters'} type={'radio'} label={'filter 3'} />
                            </FormGroup>
                        </Form>
                    </div>
                </TabPane>
                <TabPane tabId={'filter'}>
                    <ListItems/>
                </TabPane>
            </TabContent>
        </div>

    )
}
FilterContent.propTypes = {
    settingsTabActive: PropTypes.bool,
    settingsOn: PropTypes.func,
    filterOn: PropTypes.func,
}

export default FilterContent