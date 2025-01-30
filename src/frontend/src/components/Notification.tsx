import NotificationInterface from "../types/NotificationInterface";

const Notification = ({ messageText }: NotificationInterface) => {
  return (
    <>
      <div className="application-notification">{messageText}</div>
    </>
  );
};

export default Notification;
