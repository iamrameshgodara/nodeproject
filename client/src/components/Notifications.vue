<template>
  <top-column>
    <h3>Notifications</h3>
  </top-column>

  <div
    v-for="notification in Notifications"
    :key="notification._id"
    class="notification-field"
  >
    <div class="followed-notification-box" v-if="notification.followed">
      <router-link :to="'/' + notification.sender.username">
        <div class="notification-content">
          <img
            :src="'/avatar/' + notification.sender.avatar"
            alt=""
            class="profile-pic"
          />

          <div>
            <b>
              <router-link
                :to="'/' + notification.sender.username"
                class="underline-on-hover"
              >
                {{ notification.sender.name }}
              </router-link>
            </b>
            Followed you
          </div>
        </div>
      </router-link>
    </div>

    <div class="liked-notification-box" v-if="notification.liked">
      <router-link
        :to="
          '/' +
          notification.post.owner.username +
          '/status/' +
          notification.post._id
        "
      >
        <div class="notification-content">
          <router-link :to="'/' + notification.sender.username">
            <img
              :src="'/avatar/' + notification.sender.avatar"
              alt=""
              class="profile-pic"
            />
          </router-link>

          <div>
            <b>
              <router-link
                :to="'/' + notification.sender.username"
                class="underline-on-hover"
              >
                {{ notification.sender.name }}
              </router-link>
            </b>
            liked your post
          </div>

          <div class="liked-post">
            <p>
              {{ notification.post.post_data }}
            </p>
          </div>
        </div>
      </router-link>
    </div>

    <div class="reposted-notification-box" v-if="notification.reposted">
      <router-link
        :to="
          '/' +
          notification.post.owner.username +
          '/status/' +
          notification.post._id
        "
      >
        <div class="notification-content">
          <router-link :to="'/' + notification.sender.username">
            <img
              :src="'/avatar/' + notification.sender.avatar"
              alt=""
              class="profile-pic"
            />
          </router-link>

          <div>
            <b>
              <router-link
                :to="'/' + notification.sender.username"
                class="underline-on-hover"
              >
                {{ notification.sender.name }}
              </router-link>
            </b>
            Reposted your post
          </div>

          <div class="liked-post">
            <p>
              {{ notification.post.post_data }}
            </p>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
import { getNotifications } from "../PostService";
export default {
  data() {
    return {
      Notifications: [],
    };
  },
  async created() {
    try {
      this.Notifications = await getNotifications();
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style scoped>
.notification-field {
  /* background: chocolate; */
  /* padding: 15px; */
  border-bottom: 1px solid rgb(212, 227, 212);
  /* margin: 10px 0; */
  font-size: 15px;
}
.notification-field:hover {
  background-color: rgba(8, 8, 247, 0.043);
}
.profile-pic {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin-bottom: 5px;
}
.notification-content {
  padding: 15px 20px;
}

.liked-post {
  color: rgb(91, 112, 131);
  margin: 15px 0;
}
</style>