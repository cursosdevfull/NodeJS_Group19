class Notifications {
  sent() {
    console.log("sms send");
  }
}

class NotificationsEmail extends Notifications {
  sentEmail(email: string) {
    console.log("email send");
  }
}

class NotificationsWhatsapp extends NotificationsEmail {
  sent() {
    console.log("whatsapp send");
  }
}

class NotificationsBot extends Notifications {
  sent() {
    console.log("bot send");
  }
}

class App01 {
  constructor() {
    const notifications = new Notifications();
    notifications.sent();
  }
}

const app01 = new App01();

class App02 {
  constructor() {
    const notifications = new NotificationsEmail();
    notifications.sentEmail("user@email.com");
  }
}
