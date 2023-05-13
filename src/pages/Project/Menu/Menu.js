import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ReactLogo from '../../../logo.svg';

export default function Menu(props) {

    const {project} = useSelector(state => state.ProjectReducer);

    return (
        <div className="menu">
            <div className="account">
                <div className="avatar">
                    <img src={ReactLogo} alt="logo_reactjs.jpg" style={{ width: '100%' }} />
                </div>
                <div className="account-info">
                    <p style={{ color: '#42526E', fontWeight: 'bold' }}>TanThanh</p>
                    <p style={{ color: '#5E6C84' }}>Personal workspace</p>
                </div>
            </div>
            <div className="control">
                <NavLink to={`/project/board/${project?.id}`} style={{ color: '#172B4D' }} activeClassName="active font-weight-bold text-primary">
                    <div>
                        <i className="fa fa-credit-card" />
                        <span className="ml-2">Board</span>
                    </div>
                </NavLink>
                <NavLink to={`/project/calendar`} style={{ color: '#172B4D' }} activeClassName="active font-weight-bold text-primary">
                    <div>
                        <i class="fa fa-calendar"></i>
                        <span className="ml-2">Calendar</span>
                    </div>
                </NavLink>
                <NavLink to="/project-management" style={{ color: '#172B4D' }} activeClassName="active font-weight-bold text-primary">
                    <div>
                        <i class="fa fa-list"></i>
                        <span className="ml-2">Projects</span>
                    </div>
                </NavLink>
                <NavLink to={`/project/list`} style={{ color: '#172B4D' }} activeClassName="active font-weight-bold text-primary">
                    <div>
                        <i class="fa fa-chart-line"></i>
                        <span className="ml-2">Dashboard</span>
                    </div>
                </NavLink>
            </div >
            <div className="feature">
                <div className="mt-3">
                    <i className="fa fa-truck" />
                    <span className="ml-2">Releases</span>
                </div>
                <div className="mt-3">
                    <i className="fa fa-equals" />
                    <span className="ml-2">Issues and filters</span>
                </div>
                <div className="mt-3">
                    <i className="fa fa-paste" />
                    <span className="ml-2">Pages</span>
                </div>
                <div className="mt-3">
                    <i className="fa fa-location-arrow" />
                    <span className="ml-2">Reports</span>
                </div>
                <div className="mt-3">
                    <i className="fa fa-box" />
                    <span className="ml-2">Components</span>
                </div>
            </div>
        </div >
    )
}
