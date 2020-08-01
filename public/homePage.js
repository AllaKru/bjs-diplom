"use strict";

const LogButton = new LogoutButton();
LogButton.action = (data) => {
  ApiConnector.logout((response) => {
    if (response.success) {
      location.reload();
    }
  });
};

ApiConnector.current((response) => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  }
});
const rates = new RatesBoard();

const receiveCurrencyrates = (data) => {
  ApiConnector.getStocks((response) => {
    rates.clearTable();
    rates.fillTable(response.data);
  });
};
setInterval(receiveCurrencyrates, 60000);

const money = new MoneyManager();
money.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      money.setMessage(true, "Счет пополнен!"); //не получилось
    } else money.setMessage(false, "Ошибка пополнения!");
  });
};
money.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      money.setMessage(true, "Конвертация произведена!"); //не получилось
    } else money.setMessage(false, "Ошибка конвертации!");
  });
};

money.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      money.setMessage(true, "Перевод выполнен!"); //не получилось
    } else money.setMessage(false, "Ошибка перевода!");
  });
};

const favorite = new FavoritesWidget();
ApiConnector.getFavorites((response) => {
  if (response.success) {
    favorite.clearTable();
    favorite.fillTable(response.data);
    money.updateUsersList(response.data);
  }
});

favorite.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, (response) => {
    if (response.success) {
      favorite.clearTable();
      favorite.fillTable(data); //response? data.response?
      money.updateUsersList(data);
      favorite.setMessage(true, "Пользователь добавлен!");
    } else favorite.setMessage(false, "Пользователь не добавлен!");
  });
};

favorite.removeUserCallback = (data) => {
  ApiConnector.removeUserFromFavorites(data, (response) => {
    if (response.success) {
      favorite.clearTable();
      favorite.fillTable(data);
      money.updateUsersList(data);
      favorite.setMessage(true, "Пользователь удален!");
    } else favorite.setMessage(false, "Пользователь не удален!");
  });
};
//-----------------

//   favorite.setMessage = (isSuccses, message) => {
//       if (isSuccses){
//          message = "Пользователь добавлен!"
//       }

//       else {message = "Пользователь не добавлен!";}

// }
//favorite.setMessage(isSuccses, message)()
