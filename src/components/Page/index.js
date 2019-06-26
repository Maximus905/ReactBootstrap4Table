import React from 'react';
import PropTypes from 'prop-types';
import css from "./style.module.css"
import classNames from 'classnames'

const Page = props => {
    return (
        <div className={classNames(css.pageBox, "d-flex", "flex-column", props.className)}>
            {props.children}
        </div>
    )
}

const PageHeader = props => {
    return (
        <header className={props.className}>
            {props.children}
        </header>
    )
}

const PageMain = props => {
    return (
        <main className={classNames(css.main, "container-fluid", "flex-grow-1", props.className)}>
            {props.children}
        </main>
    )
}

const PageFooter = props => {
    return (
        <footer className={props.className}>
            {props.children}
        </footer>
    )
}

Page.propTypes = {
    className: PropTypes.string
}
PageHeader.propTypes = {
    className: PropTypes.string
}
PageMain.propTypes = {
    className: PropTypes.string
}
PageFooter.propTypes = {
    className: PropTypes.string
}

// export default Page;
export {Page, PageHeader, PageMain, PageFooter}
