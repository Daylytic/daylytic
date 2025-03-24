import { App, Form } from "antd";
import { client } from "~/services/api-client";

export const useContact = () => {
    const [form] = Form.useForm();
    const { message: antMessage } = App.useApp();

    const sendMessage = async (email: string, name: string, message: string) => {
        try {
            const request = await client.POST("/contact/", {
                body: { email, name, message },
            });

            if (request.response.status === 204) {
                antMessage.success("Message sent successfully!");
            } else {
                antMessage.error("We could not send your message. Please wait a while.");
            }
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };

    const onFinish = async (values) => {
        await sendMessage(values.email, values.name, values.message);
    };

    const onFinishFailed = (errorInfo) => {
        console.error("Failed:", errorInfo);
    };

    return { form, onFinish, onFinishFailed, }
}