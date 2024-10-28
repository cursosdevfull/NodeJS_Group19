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

const notifications = new NotificationsEmail();
notifications.sent();
