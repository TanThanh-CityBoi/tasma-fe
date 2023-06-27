import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';


export default function Menu(props) {

    const {project} = useSelector(state => state.ProjectReducer);
    const projects = useSelector(state => state.ProjectReducer.projects);


    return (
        <div className="menu">
            <div className="account">
                <div className="avatar">
                    <img src='logo.png' alt="logo.png" style={{ width: 50, height: 50, marginBottom: 2 }} />
                </div>
                <div className="account-info">
                    <p style={{ color: '#42526E', fontWeight: 'bold' }}>Tasma</p>
                    <p style={{ color: '#5E6C84' }}>Task management</p>
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
                <NavLink to={`/chart`} style={{ color: '#172B4D' }} activeClassName="active font-weight-bold text-primary">
                    <div>
                        <i class="fa fa-chart-line"></i>
                        <span className="ml-2">Dashboard</span>
                    </div>
                </NavLink>
            </div >
            <div className="feature">

                <NavLink to={`/chatapp`} style={{ color: '#172B4D' }} activeClassName="active font-weight-bold text-primary">
                    <div>
                        <i class="fa fa-comments"></i>
                        <span className="ml-2">Chat Room</span>
                    </div>
                </NavLink>

                <NavLink to="/chatbot" style={{ color: '#172B4D' }} activeClassName="active font-weight-bold text-primary">
                    <div style={{ marginBottom: '10px' }}>
                        <i className="fas fa-question-circle"></i>
                        <span className="ml-2">AI Support</span>
                    </div>
                </NavLink>
            </div>
        </div >
    )
}
