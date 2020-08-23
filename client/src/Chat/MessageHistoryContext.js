import React, { useState } from "react";

const MessageHistoryContext = React.createContext([{}, () => {}]);

const MessageHistoryProvider = (props) => {
  const [messages, setMessages] = useState(
      [{
        content: "Test",
      },
      {
        content: "Banana",
      }
    ]);

  return (
    <MessageHistoryContext.Provider value={[messages, setMessages]}>
      {props.children}
    </MessageHistoryContext.Provider>
  );
};

export { MessageHistoryContext, MessageHistoryProvider };
