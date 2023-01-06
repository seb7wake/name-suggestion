import api from "./api";

function addUser(name, email, role) {
    return new Promise((res) => {
      api.post(`/create-user`, {
        name: name,
        email: email,
        role: role
      }).then((response) => {
        res(response.data);
        return response.data;
      }).catch((error) => {
        console.log(error);
      });
  })
  }

  function bulkAddUsers(users) {
    console.log(users)
    return new Promise((res) => {
      api.post(`/bulk-create-users`, {
        users: users
      }).then((response) => {
        res(response.data);
        return response.data;
      }).catch((error) => {
        console.log(error);
      });
  })
  }
  
  function search(query) {
    return new Promise((res) => {
      api.get(`/search?query=${query}`).then((response) => {
        res(response.data);
        return response.data;
      }).catch((error) => {
        console.log(error);
      });
  })
  }
  
  function getAllUsers() {
    return new Promise((res) => {
      api.get("/users").then((response, reject) => {
        res(response.data);
        return response.data;
      }).catch((error) => {
        console.log(error);
      });
  })
  }
  
  export { getAllUsers, search, addUser, bulkAddUsers };