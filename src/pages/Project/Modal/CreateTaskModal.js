import React, { useEffect, useState } from 'react';
import { Modal, Select, Slider, Button } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { useSelector, useDispatch, connect } from "react-redux";
import { GET_LIST_MEMBERS_SAGA, GET_ALL_PROJECTS_SAGA, GET_PROJECT_BOARD_SAGA } from "../../../redux/constants/ProjectConst";
import { CREATE_TASK_SAGA } from "../../../redux/constants/TaskConst";
import { useFormik } from "formik";
import * as Yup from "yup";

function CreateTaskModal(props) {
   const { visible } = useSelector((state) => state.CreateTaskReducer);
   const { project } = useSelector((state) => state.ProjectReducer);
   const { members } = useSelector((state) => state.ListMembersReducer);
   const [usersAssign, setUsersAssign] = useState([]);
   const [reporter, setReporter] = useState({});

   const [timeTracking, setTimeTracking] = useState({
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
   });

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch({
         type: GET_LIST_MEMBERS_SAGA,
         projectId: project?.id,
      });

      return () => {};
   }, [project]);

   const userOptions = members.map((user, index) => {
      return { 
         value: user.id, 
         label: <div>
               {user?.firstName ? <><p className="mb-0">{user?.firstName + " " + user?.lastName} </p> 
               <span style={{ fontSize: "12px"}}>{user.login}</span> </>: <></>}
               </div>, 
         key: index 
      };
   });

   const [size, setSize] = React.useState("default");

   const handleSubmit = (values) => {
      
      dispatch({
         type: CREATE_TASK_SAGA,
         newTask: { ...values },
      });
   };

   const formik = useFormik({
      validateOnChange: true,
      validateOnBlur: true,
      validateOnMount: false,
      initialValues: {
         name: "",
         type: "New Task",
         priority: "High",
         timeTrackingSpent: 0,
         timeTrackingRemaining: 0,
         originalEstimate: 0,
         description: "",
         usersAssign: [],
         startDate: "",
         dueDate: "",
         status: "BACKLOG",
      },
      validationSchema: Yup.object({
         name: Yup.string().required('Task name is required'),
      }),
      onSubmit: (values) => {
         handleSubmit({...values, projectId: project?.id});
      },
    });

   return (
      <>
         <Modal
            title="Create Task"
            centered
            visible={visible}
            onOk={() => {}}
            onCancel={() => {
               dispatch({
                  type: "HIDDEN_CREATE_TASK_MODAL",
               });
            }}
            footer={[]}
            width={1000}
         >
            <form className="container" onSubmit={formik.handleSubmit}>
               <div className="form-group">
                  <p>Name</p>
                  <input className="form-control" type="text" name="name" required="required" onChange={formik.handleChange} />
                  {formik.errors.name && formik.touched.name && (
                     <div className="d-flex text-danger">{formik.errors.name}</div>
                  )}
               </div>
               <div className="form-group">
                  <div className="row">
                     <div className="col-6">
                        <p>Status</p>
                        <select name="status" className="form-control" onChange={formik.handleChange}>
                           <option value="BACKLOG">BACKLOG</option>
                           <option value="IN PROGRESS">IN PROGRESS</option>
                           <option value="UNDER REVIEW">UNDER REVIEW</option>
                           <option value="CANCELLED">CANCELLED</option>
                           <option value="DONE">DONE</option>
                        </select>
                     </div>
                     <div className="col-6">
                        <p>Priority</p>
                        <select name="priority" className="form-control" onChange={formik.handleChange}>
                           <option value={"High"}>High</option>
                           <option value={"Medium"}>Medium</option>
                           <option value={"Low"}>Low</option>
                        </select>
                     </div>
                  </div>
               </div>
               <div className="form-group">
                  <div className="row">
                     <div className="col-6">
                        <p>Reporter</p>
                        <Select
                           mode="single"
                           size={size}
                           options={userOptions}
                           placeholder="Please select"
                           value={reporter}
                           optionFilterProp="label"
                           onChange={(value) => {
                              setReporter(value);
                              formik.setFieldValue("reporter", value);
                           }}
                           style={{ width: "100%" }}
                        ></Select>
                     </div>
                     <div className="col-6">
                        <p>Task type</p>
                        <select className="form-control" name="type" onChange={formik.handleChange}>
                           <option value={"New Task"}>New Task</option>
                           <option value={"Bugs"}>Bugs</option>
                        </select>
                     </div>
                  </div>
               </div>
               <div className="form-group">
                  <div className="row">
                     <div className="col-6">
                        <p>Assignees</p>
                        <Select
                           mode="multiple"
                           size={size}
                           options={userOptions}
                           placeholder="Please select"
                           value={usersAssign}
                           optionFilterProp="label"
                           onChange={(values) => {
                              setUsersAssign(values);
                              formik.setFieldValue("usersAssign", values);
                           }}
                           style={{ width: "100%" }}
                        ></Select>
                     </div>
                     <div className="col-6">
                        <p>Time tracking</p>
                        <Slider
                           defaultValue={30}
                           max={Number(timeTracking.timeTrackingSpent) + Number(timeTracking.timeTrackingRemaining)}
                           value={timeTracking.timeTrackingSpent}
                        />
                        <div className="row">
                           <div className="col-6 text-left font-weight-bold">
                              {timeTracking.timeTrackingSpent}h spent
                           </div>
                           <div className="col-6 text-right font-weight-bold">
                              {timeTracking.timeTrackingRemaining}h remaining
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="row mt-2">
                     <div className="col-6">
                        <div className="row">
                           <div className="col-6">
                              <p>Start Date</p>
                              <input
                                 type="datetime-local"
                                 id="startDate"
                                 name="startDate"
                                 onChange={formik.handleChange}
                                 className="form-control"
                              ></input>
                           </div>
                           <div className="col-6">
                              <p>Due Date</p>
                              <input
                                 type="datetime-local"
                                 id="dueDate"
                                 name="dueDate"
                                 onChange={formik.handleChange}
                                 className="form-control"
                              ></input>
                           </div>
                        </div>
                     </div>
                     <div className="col-6">
                        <div className="row">
                           <div className="col-6">
                              <p>Time spent (hours)</p>
                              <input
                                 className="form-control"
                                 type="number"
                                 name="timeTrackingSpent"
                                 defaultValue={0}
                                 min={0}
                                 onChange={(e) => {
                                    setTimeTracking({
                                       ...timeTracking,
                                       timeTrackingSpent: e.target.value,
                                    });
                                    formik.setFieldValue("timeTrackingSpent", e.target.value);
                                 }}
                              />
                           </div>

                           <div className="col-6">
                              <p>Original Estimate (hours)</p>
                              <input
                                 className="form-control"
                                 type="number"
                                 name="originalEstimate"
                                 defaultValue={0}
                                 min={0}
                                 onChange={(e) => {
                                    setTimeTracking({
                                       ...timeTracking,
                                       timeTrackingRemaining: e.target.value - timeTracking.timeTrackingSpent,
                                    });
                                    formik.setFieldValue(
                                       "timeTrackingRemaining",
                                       e.target.value - timeTracking.timeTrackingSpent
                                    );

                                    formik.setFieldValue("originalEstimate", e.target.value);
                                 }}
                              />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="form-group">
                  <p>Description</p>
                  <Editor
                     init={{
                        height: 250,
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
                        content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                     }}
                     onEditorChange={(content, editor) => {
                        formik.setFieldValue("description", content);
                     }}
                  />
               </div>
               <div>
                  <button type="submit" className="btn btn-primary">
                     Save
                  </button>
                  <button
                     className="ml-2 btn btn-secondary"
                     style={{background: "#FFF", color: "#000"}}
                     onClick={() => {
                        dispatch({
                           type: "HIDDEN_CREATE_TASK_MODAL",
                        });
                     }}
                  >
                     Cancel
                  </button>
               </div>
            </form>
         </Modal>
      </>
   );
}

export default CreateTaskModal;