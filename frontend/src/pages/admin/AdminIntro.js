import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading, updateIntroductionData } from "../../redux/rootSlice";
import Loader from "../../components/Loader";

const AdminIntro = () => {
  const dispatch = useDispatch();
  const { portfolioData, isLoading } = useSelector((state) => state.root);
  const [isLocalLoading, setIsLocalLoading] = useState(false);

  const onFinish = async (values) => {
    setIsLocalLoading(true);

    dispatch(ShowLoading());
    try {
      // Include the ID from portfolioData.intro in the values object
      const dataToUpdate = { ...values, _id: portfolioData.intro._id };

      // Dispatching the action with the updated form values including the ID
      dispatch(updateIntroductionData(dataToUpdate));
      console.log("Updated Data:", dataToUpdate);
      message.success("Introduction data updated successfully!");
    } catch (error) {
      message.error("Failed to update introduction data. Please try again.");
    } finally {
      setIsLocalLoading(false);
      dispatch(HideLoading());
    }
  };


  

  return (
    <div className="px-40 sm:w-80 sm:px-4">
      {isLoading || isLocalLoading ? <Loader /> : null}
      <Form
        onFinish={onFinish}
        layout="vertical"
        initialValues={portfolioData.intro}
      >
        <Form.Item name="welcomeText" label={<span className="text-secondary font-poppins">Welcome Text</span>}>
          <Input placeholder="Welcome Text" />
        </Form.Item>
        <Form.Item name="welcomeText2" label={<span className="text-secondary font-poppins">Welcome Text 2</span>}>
          <Input placeholder="Welcome Text 2" />
        </Form.Item>
        <Form.Item name="emoji" label={<span className="text-secondary font-poppins">Emoji Link</span>}>
          <Input placeholder="Emoji Link" />
        </Form.Item>
        <Form.Item name="firstName" label={<span className="text-secondary font-poppins">First Name</span>}>
          <Input placeholder="First Name" />
        </Form.Item>
        <Form.Item name="copyRight" label={<span className="text-secondary font-poppins">Copy Right</span>}>
          <Input placeholder="Copy Right Name" />
        </Form.Item>
        <Form.Item name="image" label={<span className="text-secondary font-poppins">Image Link</span>}>
          <Input placeholder="Image URL" />
        </Form.Item>
        <Form.Item name="lastName" label={<span className="text-secondary font-poppins">Last Name</span>}>
          <Input placeholder="Last Name" />
        </Form.Item>
        <Form.Item name="caption" label={<span className="text-secondary font-poppins">Caption</span>}>
          <Input placeholder="Caption" />
        </Form.Item>
        <Form.Item name="description" label={<span className="text-secondary font-poppins">Description</span>}>
          <Input placeholder="Description" />
        </Form.Item>
        <Form.Item name="Hire" label={<span className="text-secondary font-poppins">CV</span>}>
          <Input placeholder="Hire" />
        </Form.Item>
        <Form.Item name="cv_link" label={<span className="text-secondary font-poppins">CV Link</span>}>
          <Input placeholder="Your CV Link" />
        </Form.Item>
        <Form.List name="roles" label="Roles" className="text-secondary">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <div key={key} className="flex items-center space-x-2 mb-2">
                  <Form.Item
                    {...restField}
                    name={[name]}
                    fieldKey={[fieldKey]}
                    rules={[{ required: true, message: "Role is required" }]}
                  >
                    <Input placeholder="Role" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </div>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  className="w-full flex items-center justify-center"
                  icon={<PlusOutlined />}
                >
                  Add Role
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="w-1/2 bg-white text-black py-4 rounded-lg hover:bg-secondary shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]"
          >
            Update
          </button>
        </div>
      </Form>
    </div>
  );
};

export default AdminIntro;
