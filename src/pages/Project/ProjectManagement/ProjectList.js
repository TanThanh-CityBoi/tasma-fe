import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  Button,
  Tag,
  Avatar,
  Popconfirm,
  Popover,
  AutoComplete,
} from "antd";
import { NavLink } from "react-router-dom";
import { FormOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  ADD_MEMBER_TO_PROJECT_SAGA,
  DELETE_MEMBER_FROM_PROJECT_SAGA,
  DELETE_PORJECT_SAGA,
  GET_ALL_PROJECTS_SAGA,
  GET_PROJECT_DETAIL_SAGA,
} from "../../../redux/constants/ProjectConst";
import { SEARCH_USER_SAGA } from "../../../redux/constants/UserConst";
import { USER_LOGIN_LOCAL_STORAGE } from "../../../util/config/constants";
import { FiUserPlus, FiUsers } from "react-icons/fi";
import ConfirmModal from './ConfirmModal'
import dateFormat from "dateformat";

export default function ProjectList(props) {
  const projects = useSelector((state) => state.ProjectReducer.projects);
  const usersSearched = useSelector((state) => state.UserReducer.usersSearched);
  const [usernameSearch, setUsernameSearch] = useState("");
  const userLogin = {
    ...JSON.parse(localStorage.getItem(USER_LOGIN_LOCAL_STORAGE)),
  };

  let dataConvert = projects.map((item, index) => {
    return {
      ...item,
      projectCategoryName: item.projectCategory.name,
      createdDate: dateFormat(new Date(item.createdDate), "mmm d, yyyy h:MM"),
    };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: GET_ALL_PROJECTS_SAGA,
    });
    return () => {};
  }, []);

  const searchRef = useRef(null);

  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null,
  });

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  const clearFilters = () => {
    setState({ filteredInfo: null });
  };

  const clearAll = () => {
    setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  const setNameSort = () => {
    setState({
      sortedInfo: {
        order: "descend",
        columnKey: "name",
      },
    });
  };

  const content = (record, index) => {
    return (
      <div>
        <AutoComplete
          value={usernameSearch}
          onChange={(value) => {
            setUsernameSearch(value);
          }}
          options={
            usersSearched
              ?.filter((user) => {
                let index = record.members.findIndex(
                  (member) => member.id === user.id
                );
                if (index !== -1) {
                  return false;
                }
                return true;
              })
              .map((user, index) => {
                return {label: <div>
                                {user?.firstName ? <><p className="mb-0">{user?.firstName + " " + user?.lastName} </p> 
                                <span style={{ fontSize: "12px"}}>{user.login}</span> </>: <></>}
                                </div>, 
                        value: user.id, 
                        key: index };
              })
          }
          style={{ width: "100%", minWidth: "250px" }}
          onSelect={(value, option) => {
            setUsernameSearch(option.label);
            dispatch({
              type: ADD_MEMBER_TO_PROJECT_SAGA,
              project: {
                ...record,
                members: [...record.members, { id: value }],
              },
            });
          }}
          onSearch={(value) => {
            if (searchRef.current) {
              clearTimeout(searchRef.current);
            }
            searchRef.current = setTimeout(() => {
              dispatch({
                type: SEARCH_USER_SAGA,
                username: value,
              });
            }, 300);
          }}
          placeholder="Username"
        />
      </div>
    );
  };

  let { sortedInfo, filteredInfo } = state;
  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || {};
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => {
        return (
          <NavLink
            to={`/project/board/${record.id}`}
            style={{ cursor: "pointer", color: "#6675df", fontWeight: "bold" }}
          >
            {text}
          </NavLink>
        );
      },
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "Category",
      dataIndex: "projectCategoryName",
      key: "projectCategoryName",
      filters: [
        { text: "Personal Project", value: "Personal Project" },
        { text: "Group Project", value: "Group Project" },
      ],
      filteredValue: filteredInfo.projectCategoryName || null,
      onFilter: (value, record) => record.projectCategoryName.includes(value),
      ellipsis: true,
    },
    {
      title: "Member",
      dataIndex: "member",
      key: "id",
      render: (text, record, index) => {
        return (
          <div>
            <Avatar.Group
              maxCount={2}
              maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
              key={index}
            >
              {record.members.map((member, index) => {
                return member.imageUrl === "" || member.imageUrl === null ? (
                  <Avatar key={index}>
                    {member.login.charAt(0).toUpperCase()}
                  </Avatar>
                ) : (
                  <Avatar src={member.imageUrl} key={index} />
                );
              })}
            </Avatar.Group>
            <Popover
              placement="topLeft"
              title={"Add Member"}
              content={content(record, index)}
              trigger="click"
            >
              <Button
                size="small"
                style={{
                  fontSize: 18,
                  border: "none",
                }}
              >
                <FiUserPlus />
              </Button>
            </Popover>

            <Popover
              placement="topLeft"
              title={"Members"}
              content={() => {
                return (
                  <table className="table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Avatar</th>
                        <th>Account</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {record.members?.map((member, index) => {
                        return (
                          <tr key={index}>
                            <th>{member.id}</th>
                            <td>
                              {member.imageUrl === "" ||
                              member.imageUrl === null ? (
                                <Avatar key={index}>
                                  {member.login.charAt(0).toUpperCase()}
                                </Avatar>
                              ) : (
                                <Avatar src={member.imageUrl} key={index} />
                              )}
                            </td>
                            <td>{<div>
                                {member?.firstName ? <><p className="mb-0">{member?.firstName + " " + member?.lastName} </p> 
                                <span style={{ fontSize: "12px"}}>{member.login}</span> </>: <></>}
                                </div>}
                            </td>
                            <td>
                              {record?.createdBy !== userLogin?.email ? (
                                <></>
                              ) : member?.id === userLogin?.id ? (
                                <></>
                              ) : (
                                <Button
                                  className="ml-1"
                                  size="small"
                                  style={{
                                    fontWeight: "bold",
                                    fontSize: 15,
                                    border: "none",
                                  }}
                                  onClick={() => {
                                    dispatch({
                                      type: DELETE_MEMBER_FROM_PROJECT_SAGA,
                                      project: {
                                        ...record,
                                        members: record.members.filter(
                                          (item) => item.id !== member.id
                                        ),
                                      },
                                    });
                                  }}
                                >
                                  <DeleteOutlined style={{ fontSize: 18 }} />
                                </Button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                );
              }}
              trigger="click"
            >
              <Button size="small" style={{ fontSize: 18, border: "none" }}>
                <FiUsers />
              </Button>
            </Popover>
          </div>
        );
      },
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      key: "createdDate",
      sorter: (a, b) =>
        new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime(),
      sortOrder: sortedInfo.columnKey === "createdDate" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
      render: (text, record, index) => {
        return record.createdBy === userLogin?.email ? (
          <Tag color="#0ea5e9" key={index}>
            {record.createdBy}
          </Tag>
        ) : (
          <Tag color="blue" key={index}>
            {record.createdBy}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "",
      key: "id",
      render: (text, record, index) => (
        <div style={{ display: "flex" }}>
          <div>
            <span
              style={{ cursor: "pointer" }}
              key={index}
              onClick={() => {
                showModalViewProject(record.id);
              }}
            >
              <EyeOutlined style={{ fontSize: 18 }} />
            </span>
          </div>
          <div>
            <span
              className="ml-3"
              style={{
                padding: 6,
                borderRadius: "3px",
                paddingBottom: 8,
                cursor: "pointer",
              }}
              onClick={() => {
                showEditProjectDrawer(record.id);
              }}
            >
              <FormOutlined style={{ fontSize: 18 }} />
            </span>
          </div>
          {userLogin.email === record.createdBy ? (
            <div>
              {/* <span>
                <Popconfirm
                  title="Are you sure to delete this project?"
                  onConfirm={() => {
                    dispatch({
                      type: DELETE_PORJECT_SAGA,
                      id: record.id,
                      createdBy: record.createdBy,
                    });
                  }}
                  okText="Yes"
                  cancelText="No"
                >
                  <span
                    className="ml-2"
                    style={{
                      padding: 6,
                      borderRadius: "3px",
                      paddingBottom: 8,
                      cursor: "pointer",
                    }}
                  >
                    <DeleteOutlined style={{ fontSize: 18 }} />
                  </span>
                </Popconfirm>
              </span> */}
            </div>
          ) : (
            <div>
              <span>
                <ConfirmModal 
                  title={`Leave project: ${record?.name}`}
                  description="You won't be able to see any information about this project !!"
                  handleSubmit={()=>{
                  dispatch({
                    type: DELETE_MEMBER_FROM_PROJECT_SAGA,
                    project: {
                      ...record,
                      members: record.members.filter(
                        (item) => item.id !== userLogin.id
                      ),
                    },
                  });
                }}></ConfirmModal>
                {/* <Popconfirm
                  title="Leave this project ?  "
                  onConfirm={() => {
                    
                  }}
                  okText="Yes"
                  cancelText="No"
                >
                  
                </Popconfirm> */}
              </span>
            </div>
          )}
        </div>
      ),
    },
  ];

  const showModalViewProject = (id) => {
    dispatch({
      type: GET_PROJECT_DETAIL_SAGA,
      actionDispatch: "VIEW_PROJECT",
      id,
    });
  };

  const showEditProjectDrawer = (id) => {
    dispatch({
      type: GET_PROJECT_DETAIL_SAGA,
      actionDispatch: "EDIT_PROJECT",
      id,
    });
  };

  return (
    <div className="mt-5">
      <div className="info" style={{ display: "flex", marginBottom: "36px" }}>
        <div className="search-block">
          <i className="fa fa-search mt-1" />
          <input className="search" />
        </div>
        <Button style={{ marginLeft: 25 }} onClick={setNameSort}>
          Sort Name
        </Button>
        <Button style={{ marginLeft: 25 }} onClick={clearFilters}>
          Clear filters
        </Button>
        <Button style={{ marginLeft: 25 }} onClick={clearAll}>
          Clear all
        </Button>

        <div style={{ marginLeft: 30 }}>
          <NavLink to="/project-management/settings">
            <button
              className="btn btn-sm text-white"
              type="button"
              style={{ background: "#6675df" }}
            >
              <i className="fa fa-plus"></i>
              <span style={{ marginLeft: 4 }}>New Project</span>
            </button>
          </NavLink>
        </div>
      </div>
      <Table
        columns={columns}
        rowKey={"id"}
        dataSource={dataConvert}
        onChange={handleChange}
      />
    </div>
  );
}
