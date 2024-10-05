import NotificationInterface from "../models/NotificationInterface";

const Notification = ({ messageText }: NotificationInterface) => {
  return (<>
    <div className="application-notification">
      {messageText}
    </div>
  </>)
}


export default Notification;
