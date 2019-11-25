import React, {useState, useEffect, useMemo} from 'react'
import PropTypes, {objectOf} from 'prop-types'
import {Input} from 'reactstrap'
import css from './style.module.css'
import classnames from 'classnames'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faBars, faCheck } from '@fortawesome/free-solid-svg-icons'
import elasticlunr from 'elasticlunr'

const mockData = [
    {value: 'id1', label: 'label 1'},
    {value: 'id2', label: 'label 2'},
    {value: 'id3', label: 'label 3'},
    {value: 'id4', label: 'label 4'},
    {value: 'id5', label: 'label 5'},
    {value: 'id6', label: 'label 6'},
    {value: 'id7', label: 'label 7'},
]

const BsSelect = ({data :src, valueName, labelName}) => {
    const [data, setData] = useState([])
    const [filter, setFilter] = useState('')
    const onChangeFilter = e => setFilter(e.target.value)
    const index =  useMemo(() =>elasticlunr(function () {
            this.addField('label')
            this.setRef('value')
        }), [])
    console.log('index', index, src)
    useEffect(() => {
        src.forEach(item => index.addDoc(item))
    }, [src])
    useEffect(() => {
        if (index && filter) {
            console.log('srch', index.search(filter))
        }
    }, [index, filter])
    return (
        <div className="dropdown">
            <div className="dropdown-menu show">
                <div className={classnames(css.bsSearchBox, css.inner)}>
                    <Input type="text" value={filter} onChange={onChangeFilter} />
                </div>
                <div className={css.inner}>
                    <ul className={classnames("dropdown-menu show", css.inner, css.itemsBox)} style={{position: 'static', width: '100%', maxWidth: 300, maxHeight: 200}}>
                        <li className="dropdown-item d-flex justify-content-between">
                            <span className="text-truncate">Lorem ipsu jklsfdaj jkldsaf ;l jk ghkjl ghjl gjl </span>
                            <div className={css.iconBox}><FontAwesomeIcon icon={faCheck} /></div>
                        </li>
                        <li className="dropdown-item d-flex justify-content-between">
                            <span className="text-truncate">Lorem ipsu jklsfdaj jkldsaf ;l jk ghkjl ghjl gjl </span>
                            <div className={css.iconBox}><FontAwesomeIcon icon={faCheck} /></div>
                        </li>
                        <li className="dropdown-item d-flex justify-content-between" title="Lorem ipsu jklsfdaj jkldsaf ;l jk ghkjl ghjl gjl">
                            <span className="text-truncate">Lorem ipsu jklsfdaj jkldsaf ;l jk ghkjl ghjl gjl </span>
                            <div className={css.iconBox}><FontAwesomeIcon icon={faCheck} /></div>
                        </li>
                        <li className="dropdown-item d-flex justify-content-between" title="Lorem ipsu jklsfdaj jkldsaf ;l jk ghkjl ghjl gjl">
                            <span className="text-truncate">Lorem ipsu jklsfdaj jkldsaf ;l jk ghkjl ghjl gjl </span>
                            <div className={css.iconBox}><FontAwesomeIcon icon={faCheck} /></div>
                        </li>
                        <li className="dropdown-item d-flex justify-content-between" title="Lorem ipsu jklsfdaj jkldsaf ;l jk ghkjl ghjl gjl">
                            <span className="text-truncate">Lorem ipsu jklsfdaj jkldsaf ;l jk ghkjl ghjl gjl </span>
                            <div className={css.iconBox}><FontAwesomeIcon icon={faCheck} /></div>
                        </li>

                    </ul>
                </div>
            </div>
        </div>

    )
}

BsSelect.propTypes = {
    valueName: PropTypes.string,
    labelName: PropTypes.string,
    data: PropTypes.arrayOf(objectOf(PropTypes.string))
}
BsSelect.defaultProps = {
    valueName: 'value',
    labelName: 'label',
    data: mockData
}

export default BsSelect