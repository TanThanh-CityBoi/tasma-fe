import React from 'react'
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import Header from '../../pages/Project/Header/Header';
import Menu from '../../pages/Project/Menu/Menu';
import SideBar from '../../pages/Project/SideBar/SideBar';

export const JiraBugsTemplate = (props) => {
    const { Component, ...restParam } = props;
    const {project} = useSelector(state => state.ProjectReducer)
    const id = props.computedMatch.params.id || null;
    return <Route path={restParam.path} render={(propsRoute) => {
        return <>
            <div className="jira">

                <SideBar />

                <Menu />

                <div className="main">

                    <Header title={restParam.title} />

                    <h4 style={{ color: '#172B4D', fontWeight: 'bold' }} className='mt-3'>
                        {restParam.title} {(restParam.title === 'Board') ? (` - ${project?.name}`) : ''}
                    </h4>
                    <span className="text-danger font-weight-bold">{(restParam.title === 'Board' && id === 'null') ? 'Empty Project' : ''}</span>
                    <p className="mb-4 text-primary font-weight-bold">{(restParam.title === 'Board' && id === 'null') ? 'Create new project in tab Project Management' : ''}</p>

                    <Component {...propsRoute} />

                </div>

            </div>
        </>
    }} />
}