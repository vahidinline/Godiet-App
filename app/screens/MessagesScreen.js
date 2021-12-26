import React, { useState } from "react";
import { FlatList, View } from "react-native";
import ListItem from "../components/ListItem";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import ListItemSeprator from "../components/ListItemSeprator";
import Screen from "../components/Screen";
const initialMessages = [
  { id: 1, title: "T1", description: "D1", image: require("../assets/bg.png") },
  { id: 2, title: "T2", description: "D2", image: require("../assets/bg.png") },
];
function MessagesScreen(props) {
  const [messages, setMessages] = useState(initialMessages);
  const [refreshing, setRefreshing] = useState(false);
  const handleDelete = (message) => {
    //Delete the message from user side

    setMessages(messages.filter((m) => m.id != message.id));
    // Call the server to delete the message from backend
  };
  return (
    <Screen>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={item.description}
            image={item.image}
            onPress={() => console.log()}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeprator}
        refreshing={refreshing}
        onRefresh={() => {
          setMessages([
            {
              id: 2,
              title: "T2",
              description: "D2",
              image: require("../assets/bg.png"),
            },
          ]);
        }}
      />
    </Screen>
  );
}

export default MessagesScreen;
