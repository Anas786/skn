import React, { createContext, useState } from "react";
import { toast } from "react-toastify";
import { errorToast } from "../utils";
import { ERROR_MESSAGE, NOTIFICATION_SENT_MESSAGE, } from "../constants";
import { db } from "../firebase";
import { collection, getDocs, addDoc, query, orderBy, startAfter, startAt, limit } from "firebase/firestore";

export const NotificationContext = createContext();

export const NotificationContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const onFailRequest = { status: false, message: ERROR_MESSAGE };

  const getUsers = async (responseCallback) => {
    try {
      await getDocs(collection(db, "users"))
        .then((querySnapshot) => {
          const users = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setUsers(users);
          console.log({ users });
          if (responseCallback) responseCallback({ status: true });
        })
        .catch((err) => {
          if (responseCallback) responseCallback(onFailRequest);
          errorToast(onFailRequest);
        });
    } catch (err) {
      console.log({ err });
      if (responseCallback) responseCallback(onFailRequest);
      errorToast(onFailRequest);
    }
  };
  
  const getNotifications = async (responseCallback) => {
    try {
      await getDocs(query(collection(db, "notifications"), orderBy("datetime", "desc") ))
        .then((querySnapshot) => {
          const notifications = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setNotifications({data: notifications});
          if (responseCallback) responseCallback({ status: true });
        })
        .catch((err) => {
          if (responseCallback) responseCallback(onFailRequest);
          errorToast(onFailRequest);
        });
    } catch (err) {
      console.log({ err });
      if (responseCallback) responseCallback(onFailRequest);
      errorToast(onFailRequest);
    }
  };
  
  const sendNotifications = async (data, responseCallback) => {
    try {

      let docRef = []
      for(const rec of data.recipient_email){
        await sendPushNotifiction({ title: data.title, body: data.body, token: rec.token })
        const resp = await addDoc(collection(db, "notifications"), {
          title: data.title,
          body: data.body,
          datetime: new Date(),
          recipient_email: rec.email,
          recipient_id: rec.id,
          recipient_token: rec.token,
        });
        docRef.push(resp);
      }
      if(docRef.length > 0){
        if (responseCallback) responseCallback(docRef);
        toast.success(NOTIFICATION_SENT_MESSAGE);
      }
    } catch (err) {
      console.log({ err });
      if (responseCallback) responseCallback(onFailRequest);
      errorToast(onFailRequest);
    }
  };

  const sendPushNotifiction = async (notification) => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "key=AAAAbb4v58g:APA91bEofDThuWwIr4iVLoIbbQWdCOxDC9XKzlwOF51eSfi4N9e3MZiteqe61uwb7g7baAVuAX1cQzpkSht9K9ay9Rdo4IqEhtKmy48bFaKrS26RqQ7VnzBZhLhS0D3TVb7BPAgMW9f4");
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        "to": notification.token,
        "notification": {
          "body": notification.body,
          "title": notification.title
        }
      });
      
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      
      await fetch("https://fcm.googleapis.com/fcm/send", requestOptions)
        // .then(response => response.text())
        // .then(result => console.log(result))
        // .catch(error => console.log('error', error));
    } catch (err) {
      console.log({ err });
      errorToast(onFailRequest);
    }
  }

  return (
    <NotificationContext.Provider
      value={{
        users,
        notifications,
        sendNotifications,
        getNotifications,
        getUsers,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
