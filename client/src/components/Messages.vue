<template>
  <top-column><h3 style="padding: 15px">Messages</h3></top-column>
  <div>
    <h2>Chatroom</h2>
    <p>Username:{{ username }}</p>
  </div>
</template>
<script>
import io from "socket.io-client";
export default {
  data() {
    return {
      socket: io(),
      username: "",
    };
  },
  methods: {
    joinServer() {
      this.socket.emit("newUser", this.username);
    },
  },
  created() {
    this.username = prompt("what's your name buddy");
    this.joinServer();
  },
};
</script>