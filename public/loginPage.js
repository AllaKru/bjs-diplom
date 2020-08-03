"use strict";

const usForm = new UserForm();

usForm.loginFormCallback = (data) => {
  ApiConnector.login(
    data,
    (response) => {
      if (response.success) {
        location.reload();
      } else {
        usForm.setLoginErrorMessage(response.data);        
      }
    }
    // ApiConnector - это запрос на сервер, респонс - функция которая
    // будет выполняться после ответа сервера
  );
};

usForm.registerFormCallback = (data) => {
  ApiConnector.register(data, (response) => {
    if (response.success) {
      location.reload();
    } else {
      usForm.setRegisterErrorMessage(response.data);
    }
  });
};
