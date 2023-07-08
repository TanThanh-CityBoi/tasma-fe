import { Avatar } from 'antd';
import React, { useEffect } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { GET_PROJECT_BOARD_SAGA } from '../../../redux/constants/ProjectConst';
import { 
    GET_ALL_TASKS_BY_PROJECT_SAGA, 
    GET_TASK_DETAIL_SAGA, 
    UPDATE_TASK_STATUS_SAGA, 
    SHOW_CREATE_TASK_MODAL_SAGA 
} from '../../../redux/constants/TaskConst';
import { FcMediumPriority, FcLowPriority, FcHighPriority } from "react-icons/fc";
import { AiFillBug } from "react-icons/ai";
import { MdTask } from "react-icons/md";

export default function Board(props) {

   let { project } = useSelector((state) => state.ProjectReducer);
   let { backLog, inProgress, underReview, cancelled, done } = useSelector((state) => state.TaskReducer.tasks);
   const taksList = [
      {
         key: "BACKLOG",
         status: "BACKLOG",
         items: backLog?.items,
      },
      {
         key: "IN_PROGRESS",
         status: "IN PROGRESS",
         items: inProgress?.items,
      },
      {
         key: "UNDER_REVIEW",
         status: "UNDER REVIEW",
         items: underReview?.items,
      },
      {
         key: "CANCELLED",
         status: "CANCELLED",
         items: cancelled?.items,
      },
      {
         key: "DONE",
         status: "DONE",
         items: done?.items,
      },
   ];

   const dispatch = useDispatch();

   useEffect(() => {
      const id = props.match.params.id;
      dispatch({
         type: GET_PROJECT_BOARD_SAGA,
         id,
      });
      dispatch({
         type: GET_ALL_TASKS_BY_PROJECT_SAGA,
         projectId: id,
      });
   }, []);

   const renderAllTask = (tasks) => {
      return tasks.map((task, index) => {
         return (
            <li
               className="list-group-item"
               data-toggle="modal"
               data-target="#infoModal"
               style={{ cursor: "pointer" }}
               key={index}
               onClick={() => {
                  dispatch({
                     type: GET_TASK_DETAIL_SAGA,
                     taskId: task.id,
                  });
               }}
            >
               <p>{task.name}</p>
               <div className="block" style={{ display: "flex" }}>
                  <div className="block-right">
                     <div className="avatar-group" style={{ display: "flex" }}>
                        <div className="avatar-block">
                           <Avatar.Group
                              maxCount={2}
                              maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                              key={index}
                           >
                              {task.usersAssign?.map((member, index) => {
                                 return member.imageUrl === "" || member.imageUrl === null ? (
                                    <Avatar key={index}>{member.login.charAt(0).toUpperCase()}</Avatar>
                                 ) : (
                                    <Avatar src={member.imageUrl} key={index} />
                                 );
                              })}
                           </Avatar.Group>
                        </div>
                     </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                     <div style={{ width: 24, height: 24, lineHeight: "34px" }}>
                        <div style={{ cursor: "pointer" }}>
                           <i className="fa fa-bookmark" style={{ fontSize: 18 }} />
                        </div>
                     </div>
                     <div style={{ width: 24, height: 24, lineHeight: "34px" }}>
                        <div style={{ cursor: "pointer" }}>
                           <i className="fa fa-check-square" style={{ fontSize: 18 }} />
                        </div>
                     </div>
                     <div style={{ width: 24, height: 24, lineHeight: "34px" }}>
                        <div style={{ cursor: "pointer" }}>
                           <i className="fa fa-arrow-up" style={{ fontSize: 18 }} />
                        </div>
                     </div>
                  </div>
               </div>
            </li>
         );
      });
   };

   const handleDragEnd = (result) => {
      let { source, destination, draggableId } = result;

      if (!result.destination) {
         return;
      }
      if (source.index === destination.index && source.droppableId === destination.droppableId) {
         return;
      }

      // let taskIdUpdate = draggableId;
      // let statusUpdate = destination.droppableId;

      let taskUpdate = {
         id: Number(draggableId),
         status: destination.droppableId,
      };

      console.log(taskUpdate);

      dispatch({
         type: UPDATE_TASK_STATUS_SAGA,
         taskUpdate,
      });
   };

   const renderCardTaskList = () => {
      return (
         <DragDropContext onDragEnd={handleDragEnd}>
            {taksList?.map((taskListDetail, index) => {
               return (
                  <Droppable droppableId={taskListDetail.status} key={index}>
                     {(provided) => {
                        return (
                           <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              key={index}
                              className="card"
                              style={{ width: "17rem", height: "auto", paddingBottom: 10 }}
                           >
                              <div className={`card-header bg-status-${taskListDetail.key}`}>
                                 {taskListDetail.status} <span>{taskListDetail?.items?.length}</span>
                              </div>
                              <ul
                                 ref={provided.innerRef}
                                 {...provided.droppableProps}
                                 key={index}
                                 className="list-group list-group-flush"
                              >
                                 {taskListDetail?.items?.map((task, index) => {
                                    return (
                                       <Draggable
                                          key={task.id.toString()}
                                          index={index}
                                          draggableId={task.id.toString()}
                                       >
                                          {(provided) => {
                                             return (
                                                <li
                                                   ref={provided.innerRef}
                                                   {...provided.draggableProps}
                                                   {...provided.dragHandleProps}
                                                   className="list-group-item"
                                                   data-toggle="modal"
                                                   data-target="#infoModal"
                                                   onClick={() => {
                                                      dispatch({
                                                         type: GET_TASK_DETAIL_SAGA,
                                                         taskId: task.id,
                                                      });
                                                   }}
                                                >
                                                   <p>{task.name}</p>
                                                   <div className="block" style={{ display: "flex" }}>
                                                      <div className="block-right">
                                                         <div className="avatar-group" style={{ display: "flex" }}>
                                                            <div className="avatar-block">
                                                               <Avatar.Group
                                                                  maxCount={2}
                                                                  maxStyle={{
                                                                     color: "#f56a00",
                                                                     backgroundColor: "#fde3cf",
                                                                  }}
                                                                  key={index}
                                                               >
                                                                  {task.usersAssign?.map((member, index) => {
                                                                     return member.imageUrl === "" ||
                                                                        member.imageUrl === null ? (
                                                                        <Avatar key={index}>
                                                                           {member.login.charAt(0).toUpperCase()}
                                                                        </Avatar>
                                                                     ) : (
                                                                        <Avatar src={member.imageUrl} key={index} />
                                                                     );
                                                                  })}
                                                               </Avatar.Group>
                                                            </div>
                                                         </div>
                                                      </div>
                                                      <div style={{ display: "flex", justifyContent: "center" }}>
                                                         {task.type === "New Task" ? (
                                                            <div style={{ marginRight: "4px" }}>
                                                               <MdTask
                                                                  style={{
                                                                     width: 22,
                                                                     height: 22,
                                                                     color: "#007bff",
                                                                     marginTop: "4px",
                                                                  }}
                                                               />
                                                            </div>
                                                         ) : (
                                                            <div style={{ marginRight: "4px" }}>
                                                               <AiFillBug
                                                                  style={{
                                                                     width: 22,
                                                                     height: 22,
                                                                     color: "#e91e63",
                                                                     marginTop: "4px",
                                                                  }}
                                                               />
                                                            </div>
                                                         )}

                                                         {task.priority === "High" ? (
                                                            <div>
                                                               <FcHighPriority
                                                                  style={{ width: 22, height: 22, marginTop: "4px" }}
                                                               />
                                                            </div>
                                                         ) : (
                                                            <></>
                                                         )}

                                                         {task.priority === "Medium" ? (
                                                            <div>
                                                               <FcMediumPriority
                                                                  style={{ width: 22, height: 22, marginTop: "4px" }}
                                                               />
                                                            </div>
                                                         ) : (
                                                            <></>
                                                         )}

                                                         {task.priority === "Low" ? (
                                                            <div>
                                                               <FcLowPriority
                                                                  style={{ width: 22, height: 22, marginTop: "4px" }}
                                                               />
                                                            </div>
                                                         ) : (
                                                            <></>
                                                         )}
                                                      </div>
                                                   </div>
                                                </li>
                                             );
                                          }}
                                       </Draggable>
                                    );
                                 })}
                              </ul>

                              {provided.placeholder}
                           </div>
                        );
                     }}
                  </Droppable>
               );
            })}
         </DragDropContext>
      );
   };

   return (
      <div>
         {/* <Infor />
            <Content /> */}
         <div className="info" style={{ display: "flex" }}>
            <div className="search-block">
               <input className="search mt-1" />
               <i className="fa fa-search mt-2" />
            </div>
            <div className="avatar-group" style={{ display: "flex" }}>
               <Avatar.Group maxCount={4} size="large" maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
                  {project.members?.map((member, index) => {
                     return member.imageUrl === "" || member.imageUrl === null ? (
                        <Avatar key={index}>{member.login.charAt(0).toUpperCase()}</Avatar>
                     ) : (
                        <Avatar src={member.imageUrl} key={index} />
                     );
                  })}
               </Avatar.Group>
            </div>
            <div style={{ marginLeft: 20 }} className="text ml-5">
               Only My Issues
            </div>
            <div style={{ marginLeft: 20 }} className="text">
               Recently Updated
            </div>

            <div style={{ marginLeft: 20 }} className="ml-5">
               <button
                  className="btn btn-primary btn-sm"
                  type="button"
                  onClick={() => {
                     dispatch({
                        type: SHOW_CREATE_TASK_MODAL_SAGA,
                     });
                  }}
               >
                  <i className="fa fa-plus"></i>
                  <span style={{ marginLeft: 4 }}>New Issues</span>
               </button>
            </div>
         </div>

         <div className="content" style={{ display: "flex" }}>
            {renderCardTaskList()}
            {/* {renderAllTaskByStatus(backLog)}

                {renderAllTaskByStatus(selectedForDev)}

                {renderAllTaskByStatus(inProgress)}

                {renderAllTaskByStatus(done)} */}
         </div>
      </div>
   );
}
