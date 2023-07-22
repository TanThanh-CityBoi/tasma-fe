import { Editor } from "@tinymce/tinymce-react";
import {
  AutoComplete,
  Avatar,
  Button,
  Input,
  Modal,
  Popconfirm,
  Popover,
  Select,
  Tag,
} from "antd";
import React, { useRef, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  CREATE_COMMENT_SAGA,
  DELETE_COMMENT_SAGA,
} from "../../../redux/constants/CommentConts";
import { GET_LIST_MEMBERS_SAGA } from "../../../redux/constants/ProjectConst";
import { UPDATE_TASK_SAGA } from "../../../redux/constants/TaskConst";
import { USER_LOGIN_LOCAL_STORAGE } from "../../../util/config/constants";
import { openNotification } from "../../../util/notification/notification";
import { format } from "date-fns";
import { AiOutlineEdit } from "react-icons/ai"

const { Option } = Select;

function ViewTaskModal(props) {
  const { visible, task } = useSelector((state) => state.ViewTaskReducer);

  const [visibleEditTaskName, setVisibleEditTaskName] = useState(false);
  const [taskName, setTaskName] = useState();
  const [description, setDescription] = useState();
  const [commentContent, setCommentContent] = useState("");

  const [usernameSearch, setUsernameSearch] = useState("");
  const { members } = useSelector((state) => state.ListMembersReducer);

  const [timeTrackingSpent, setTimeTrackingSpent] = useState(
    task?.timeTrackingSpent || 0
  );
  const [timeOriginalEstimate, setTimeOriginalEstimate] = useState(
    task?.originalEstimate || 0
  );
  const [taskReporter, setTaskReporter] = useState(task?.reporter?.login || "");

  const dispatch = useDispatch();

  let userLogin = {
    login: "Account",
    imageUrl: "",
  };
  if (localStorage.getItem(USER_LOGIN_LOCAL_STORAGE)) {
    userLogin = {
      ...JSON.parse(localStorage.getItem(USER_LOGIN_LOCAL_STORAGE)),
    };
  }

  const searchRef = useRef(null);

  const content = () => {
    return (
      <div>
        <AutoComplete
          value={usernameSearch}
          onChange={(value) => {
            setUsernameSearch(value);
          }}
          options={members
            ?.filter((member) => {
              let index = task.usersAssign?.findIndex(
                (userAssign) => userAssign.id == member.id
              );
              if (index !== -1) {
                return false;
              }
              return true;
            })
            .map((user, index) => {
              return { label: <div>
                              {user?.firstName ? <><p className="mb-0">{user?.firstName + " " + user?.lastName} </p> 
                              <span style={{ fontSize: "12px"}}>{user.login}</span> </>: <></>}
                              </div>,      
                        value: user.id, 
                        key: index 
                      };
            })}
          style={{ width: "100%", minWidth: "250px" }}
          onSelect={(value, option) => {
            setUsernameSearch(option.label);
            let newUsersAssign = [...task.usersAssign, { id: value }];
            dispatch({
              type: UPDATE_TASK_SAGA,
              taskUpdate: { ...task, usersAssign: newUsersAssign },
            });
          }}
          onSearch={(value) => {
            if (searchRef.current) {
              clearTimeout(searchRef.current);
            }
            searchRef.current = setTimeout(() => {
              dispatch({
                type: GET_LIST_MEMBERS_SAGA,
                projectId: task?.project.id,
              });
            }, 300);
          }}
          placeholder="Username"
        />
      </div>
    );
  };

  const reporterContent = () => {
    return (
      <div>
        <AutoComplete
          value={usernameSearch}
          onChange={(value) => {
            setUsernameSearch(value);
          }}
          options={members.map((user, index) => {
            return { label: <div>
                            {user?.firstName ? <><p className="mb-0">{user?.firstName + " " + user?.lastName} </p> 
                            <span style={{ fontSize: "12px"}}>{user.login}</span> </>: <></>}
                            </div> , 
                    value: user.id, 
                    key: index 
                  };
          })}
          style={{ width: "100%", minWidth: "250px" }}
          onSelect={(value, option) => {
            setUsernameSearch(option.label);
            dispatch({
              type: UPDATE_TASK_SAGA,
              taskUpdate: { ...task, reporter: value },
            });
            setTaskReporter(value?.login);
          }}
          onSearch={(value) => {
            if (searchRef.current) {
              clearTimeout(searchRef.current);
            }
            searchRef.current = setTimeout(() => {
              dispatch({
                type: GET_LIST_MEMBERS_SAGA,
                projectId: task?.project.id,
              });
            }, 300);
          }}
          placeholder="Username"
        />
      </div>
    );
  };

  const usersAssign = task?.usersAssign;

  const renderTimeTracking = () => {
    const timeTrackingSpent = task?.timeTrackingSpent;
    const timeTrackingRemaining = task?.timeTrackingRemaining;
    const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
    const percent = Math.round((Number(timeTrackingSpent) / max) * 100);

    return (
      <div style={{ display: "flex" }}>
        <i className="fa fa-clock" />
        <div style={{ width: "100%" }}>
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${percent}%` }}
              aria-valuenow={25}
              aria-valuemin={Number(timeTrackingSpent)}
              aria-valuemax={max}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p className="logged">{timeTrackingSpent}h logged</p>
            <p className="estimate-time">{timeTrackingRemaining}h estimated</p>
          </div>
        </div>
      </div>
    );
  };

  const renderCommnets = () => {
    return task?.comments?.map((comment, index) => {
      return (
        <div className="comment-item" key={index}>
          <div className="display-comment" style={{ display: "flex" }}>
            <div className="avatar">
              {comment.user.imageUrl === "" ||
              comment.user.imageUrl === null ? (
                <Avatar icon={<i className="fa fa-user-alt"></i>} />
              ) : (
                <Avatar src={comment.user.imageUrl} />
              )}
            </div>
            <div>
              <p style={{ marginBottom: 5, fontSize: 16, color: "#42526E" }}>
                {comment.user.login}
              </p>
              <p style={{ marginBottom: 0, color: "172B4D" }}>
                {comment.content}
              </p>
              {userLogin.id === comment.user.id ? (
                <div>
                  <span
                    style={{
                      color: "#65676B",
                      cursor: "pointer",
                      fontSize: 12,
                    }}
                  >
                    Edit{" "}
                  </span>
                  •
                  <Popconfirm
                    title="Are you sure to delete this comment?"
                    onConfirm={() => {
                      dispatch({
                        type: DELETE_COMMENT_SAGA,
                        commentId: comment.id,
                        taskId: task.id,
                      });
                    }}
                    okText="Yes"
                    cancelText="No"
                  >
                    <span
                      style={{
                        color: "#65676B",
                        cursor: "pointer",
                        fontSize: 12,
                      }}
                    >
                      {" "}
                      Delete
                    </span>
                  </Popconfirm>
                </div>
              ) : (
                <div>
                  <span
                    style={{
                      color: "#65676B",
                      cursor: "pointer",
                      fontSize: 12,
                    }}
                  >
                    Like{" "}
                  </span>
                  •
                  <span
                    style={{
                      color: "#65676B",
                      cursor: "pointer",
                      fontSize: 12,
                    }}
                  >
                    {" "}
                    Response
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <Modal
        title="Task Detail"
        centered
        visible={visible}
        onCancel={() => {
          dispatch({
            type: "CLOSE_MODAL_VIEW_TASK",
          });
          setVisibleEditTaskName(false);
          setCommentContent("");
        }}
        footer={[]}
        width={1000}
      >
        <div style={{ fontWeight: 500 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <Select
                name="type"
                value={task?.type}
                onChange={(value) => {
                  dispatch({
                    type: UPDATE_TASK_SAGA,
                    taskUpdate: { ...task, type: value },
                  });
                }}
              >
                <Option value="New Task">New Task</Option>
                <Option value="Bugs">Bugs</Option>
              </Select>
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ cursor: "pointer" }}>
                <i className="fab fa-telegram-plane" />
                <span style={{ paddingRight: 20 }}> Give feedback</span>
              </div>
              <div style={{ cursor: "pointer" }}>
                <i className="fa fa-link" />
                <span style={{ paddingRight: 20 }}> Copy link</span>
              </div>
              <div style={{ cursor: "pointer" }}>
                <i className="fa fa-trash-alt" />
                <span style={{ paddingRight: 20 }}> Delete</span>
              </div>
            </div>
          </div>
          <div className="container-fluid mt-3">
            <div className="row">
              <div className="col-8">
                <div>
                  {visibleEditTaskName === true ? (
                    <form
                      className="form-group"
                      style={{ display: "flex" }}
                      onSubmit={() => {
                        dispatch({
                          type: UPDATE_TASK_SAGA,
                          taskUpdate: { ...task, name: taskName },
                        });
                        setVisibleEditTaskName(false);
                      }}
                    >
                      <Input
                        type="text"
                        name="name"
                        required="required"
                        onChange={(e) => {
                          setTaskName(e.target.value);
                        }}
                        value={taskName}
                      />
                      <Button type="primary" htmlType="submit" className="ml-2">
                        OK
                      </Button>
                    </form>
                  ) : (
                    <div className="form-group">
                      <span
                        style={{
                          fontWeight: 500,
                          color: "#172B4D",
                          fontSize: 24,
                        }}
                      >
                        {task?.name}
                      </span>
                      <i
                        className="fa fa-edit ml-2"
                        style={{
                          cursor: "pointer",
                          fontSize: 18,
                          color: "#23B6A4",
                        }}
                        onClick={() => {
                          setVisibleEditTaskName(true);
                          setTaskName(props.taskName);
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className="mt-3">
                  <p>Description</p>
                  <Editor
                    name="description"
                    initialValue={task?.description}
                    init={{
                      height: 300,
                      menubar: false,
                      plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount",
                      ],
                      toolbar:
                        "undo redo | formatselect | " +
                        "bold italic backcolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    }}
                    onEditorChange={(content, editor) => {
                      setDescription(content);
                    }}
                  />
                </div>
                <div className="mt-3">
                  <Button
                    type="primary"
                    onClick={() => {
                      let newDescription = task?.description;
                      if (description) {
                        newDescription = description;
                      }
                      dispatch({
                        type: UPDATE_TASK_SAGA,
                        taskUpdate: { ...task, description: newDescription },
                      });
                    }}
                  >
                    Save
                  </Button>
                  <Button
                    className="ml-2"
                    onClick={() => {
                      dispatch({
                        type: "CLOSE_MODAL_VIEW_TASK",
                      });
                      setVisibleEditTaskName(false);
                      setCommentContent("");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
                <div className="comment mt-5">
                  <h6>Comment</h6>
                  <div
                    className="block-comment mt-4"
                    style={{ display: "flex" }}
                  >
                    <div className="avatar">
                      {userLogin.imageUrl === "" ||
                      userLogin.imageUrl === null ? (
                        <Avatar icon={<i className="fa fa-user-alt"></i>} />
                      ) : (
                        <Avatar
                          src={userLogin.imageUrl}
                          style={{ width: 40, height: 40 }}
                        />
                      )}
                    </div>
                    <div className="input-comment">
                      <Input
                        type="text"
                        placeholder="Add a comment..."
                        value={commentContent}
                        onChange={(e) => {
                          setCommentContent(e.target.value);
                        }}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            console.log("Enter click: Comment sending");
                            if (commentContent === "") {
                              openNotification(
                                "error",
                                "Fail!",
                                "Please add a comment...!"
                              );
                              return;
                            }
                            let newComment = {
                              user: {
                                id: userLogin.id,
                              },
                              task: {
                                id: task.id,
                              },
                              content: commentContent,
                            };
                            dispatch({
                              type: CREATE_COMMENT_SAGA,
                              newComment: newComment,
                            });
                            setCommentContent("");
                          }
                        }}
                      />
                    </div>
                    <div>
                      <Button
                        type="primary"
                        style={{ height: 40 }}
                        className="ml-2"
                        onClick={() => {
                          if (commentContent === "") {
                            openNotification(
                              "error",
                              "Fail!",
                              "Please add a comment...!"
                            );
                            return;
                          }
                          let newComment = {
                            user: {
                              id: userLogin.id,
                            },
                            task: {
                              id: task.id,
                            },
                            content: commentContent,
                          };
                          dispatch({
                            type: CREATE_COMMENT_SAGA,
                            newComment: newComment,
                          });
                          setCommentContent("");
                        }}
                      >
                        Sent
                      </Button>
                    </div>
                  </div>
                  <div className="lastest-comment mt-4">{renderCommnets()}</div>
                </div>
              </div>
              <div className="col-4">
                <div className="row">
                  <div className="status col-6">
                    <h6>STATUS</h6>
                    <Select
                      name="status"
                      value={task?.status}
                      onChange={(value) => {
                        dispatch({
                          type: UPDATE_TASK_SAGA,
                          taskUpdate: { ...task, status: value },
                        });
                      }}
                    >
                      <Option value="BACKLOG">BACKLOG</Option>
                      <Option value="IN PROGRESS">IN PROGRESS</Option>
                      <Option value="UNDER REVIEW">UNDER REVIEW</Option>
                      <Option value="CANCELLED">CANCELLED</Option>
                      <Option value="DONE">DONE</Option>
                    </Select>
                  </div>
                  <div className="priority col-6">
                    <h6>PRIORITY</h6>
                    <Select
                      name="priority"
                      value={task?.priority}
                      style={{ width: "100px" }}
                      onChange={(value) => {
                        dispatch({
                          type: UPDATE_TASK_SAGA,
                          taskUpdate: { ...task, priority: value },
                        });
                      }}
                    >
                      <Option value="High">High</Option>
                      <Option value="Medium">Medium</Option>
                      <Option value="Low">Low</Option>
                    </Select>
                  </div>
                </div>

                <div className="reporter mt-3">
                  <h6>ASSIGNEES</h6>
                  <div>
                    {usersAssign?.map((user, index) => {
                      const username = user?.firstName || user?.login 
                      const isLongTag = username.length > 10;

                      return (
                        <Tag className="mt-2" key={index}>
                            <span className="">
                              {isLongTag
                                ? `${username.slice(0, 10)}...`
                                : username}
                            </span>

                            <i
                            className="fa fa-times ml-2"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              let newUsersAssign = task.usersAssign.filter(
                                (userAssign) => userAssign.id !== user.id
                              );
                              dispatch({
                                type: UPDATE_TASK_SAGA,
                                taskUpdate: {
                                  ...task,
                                  usersAssign: newUsersAssign,
                                },
                              });
                            }}
                          />
                        </Tag>
                      );
                    })}
                    <br></br>
                    <Popover
                      placement="topLeft"
                      title={"Add Member"}
                      content={content()}
                      trigger="click"
                    >
                      <Tag
                        className="site-tag-plus d-flex justify-content-center mt-2"
                        style={{ cursor: "pointer", width: "100%" }}
                      >
                        <span style={{ color: "#0052CC" }}>
                          <i className="fa fa-plus" /> ADD MORE
                        </span>
                      </Tag>
                    </Popover>
                  </div>
                </div>

                <div className="reporter mt-3">
                  <h6>REPORTER</h6>
                  <div>
                    

                    <Popover
                      placement="topLeft"
                      title={"Change Reporter"}
                      content={reporterContent()}
                      trigger="click"
                    >
                      <Tag
                        className="site-tag-plus"
                        style={{ cursor: "pointer", width: "100%",  background:'#FFF' }}
                      >
                        <div className="d-flex justify-content-between">
                          <div style={{ display: "flex", alignItems: "center", marginRight: "0px", background:'#FFF', padding: "3px 0px" }} className="item">
                            <div className="avatar">
                              <img
                                src={
                                  task?.reporter?.imageUrl || "/avatars/avatar-10.jpg"
                                }
                                alt="avatar.jpg"
                              />
                            </div>
                            <div className="name">
                              <div className="ml-1 mr-2">
                                {task?.reporter?.firstName || task?.reporter?.login}
                              </div>
                            </div>
                          </div>

                          <div className="d-flex align-items-center mr-1 ml-3"><AiOutlineEdit size={20}/></div>
                        </div>
                      </Tag>
                    </Popover>
                  </div>
                </div>

                <div className="estimate">
                  <h6>START DATE</h6>
                  <Input
                    type="datetime-local"
                    name="startDate"
                    value={
                      task?.startDate
                        ? format(new Date(task?.startDate), "yyyy-MM-dd HH:ss")
                        : ""
                    }
                    onChange={(e) => {
                      let startDate = task?.startDate || 0;
                      if (e.target.value !== "") {
                        startDate = e.target.value;
                      }
                      dispatch({
                        type: UPDATE_TASK_SAGA,
                        taskUpdate: {
                          ...task,
                          startDate: startDate,
                        },
                      });
                    }}
                  />
                </div>

                <div className="estimate mt-3">
                  <h6>DUE DATE</h6>
                  <Input
                    type="datetime-local"
                    name="dueDate"
                    value={
                      task?.dueDate
                        ? format(new Date(task?.dueDate), "yyyy-MM-dd HH:ss")
                        : ""
                    }
                    onChange={(e) => {
                      let dueDate = task?.dueDate || 0;
                      if (e.target.value !== "") {
                        dueDate = e.target.value;
                      }
                      dispatch({
                        type: UPDATE_TASK_SAGA,
                        taskUpdate: {
                          ...task,
                          dueDate: dueDate,
                        },
                      });
                    }}
                  />
                </div>

                <div className="estimate mt-3">
                  <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                  <Input
                    type="number"
                    name="originalEstimate"
                    value={task?.originalEstimate}
                    onChange={(e) => {
                      let originalEstimate = task?.originalEstimate || 0;
                      if (e.target.value !== "") {
                        originalEstimate = e.target.value;
                      }
                      dispatch({
                        type: UPDATE_TASK_SAGA,
                        taskUpdate: {
                          ...task,
                          originalEstimate: originalEstimate,
                          timeTrackingRemaining:
                            originalEstimate - task?.timeTrackingSpent,
                        },
                      });
                      setTimeOriginalEstimate(originalEstimate);
                    }}
                  />
                </div>

                <div className="estimate  mt-3">
                  <h6>TIME SPENT (HOURS)</h6>
                  <Input
                    type="number"
                    name="timeTrackingSpent"
                    value={task?.timeTrackingSpent}
                    onChange={(e) => {
                      let timeTrackingSpent = task?.timeTrackingSpent || 0;
                      if (e.target.value !== "") {
                        timeTrackingSpent = e.target.value;
                      }
                      dispatch({
                        type: UPDATE_TASK_SAGA,
                        taskUpdate: {
                          ...task,
                          timeTrackingSpent: timeTrackingSpent,
                          timeTrackingRemaining:
                            task?.originalEstimate - timeTrackingSpent,
                        },
                      });
                      setTimeTrackingSpent(timeTrackingSpent);
                    }}
                  />
                </div>

                <div className="time-tracking mt-3">
                  <h6>TIME TRACKING</h6>
                  {renderTimeTracking()}
                </div>
                <div style={{ color: "#929398" }}>
                  Create at:{" "}
                  {task?.createdDate
                    ? format(new Date(task.createdDate), "dd-MM-yyyy __ HH:mm")
                    : ""}
                </div>
                <div style={{ color: "#929398" }}>
                  Update at:{" "}
                  {task?.lastModifiedDate
                    ? format(
                        new Date(task.lastModifiedDate),
                        "dd-MM-yyyy __ HH:mm"
                      )
                    : ""}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    taskName: state.ViewTaskReducer.task.name,
    description: state.ViewTaskReducer.task.description,
  };
};

export default connect(mapStateToProps)(ViewTaskModal);
