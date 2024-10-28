interface IEmail {
  sent(
    sender: string,
    receiver: string,
    message: string,
    isHtml: boolean
  ): void;
}

class GMail implements IEmail {
  sent(sender: string, receiver: string, message: string, isHtml: boolean) {
    this.parameters(sender, receiver, message, isHtml);
    this.sentEmail();
  }

  parameters(
    sender: string,
    receiver: string,
    message: string,
    isHtml: boolean
  ) {}

  sentEmail() {
    console.log("email send by gmail");
  }
}

class Office365 implements IEmail {
  private _sender!: string;
  private _receiver!: string;
  private _message!: string;
  private _isHtml!: boolean;

  sent(sender: string, receiver: string, message: string, isHtml: boolean) {
    this._sender = sender;
    this._receiver = receiver;
    this._message = message;
    this._isHtml = isHtml;
    this.sentMessage();
  }

  addSender(value: string) {
    this._sender = value;
    return this;
  }

  addReceiver(value: string) {
    this._receiver = value;
    return this;
  }

  addMessage(value: string) {
    this._message = value;
    return this;
  }

  isHTML(value: boolean) {
    this._isHtml = value;
    return this;
  }

  sentMessage() {
    console.log("email send by office365");
  }
}

class YahooMail implements IEmail {
  sent(sender: string, receiver: string, message: string, isHtml: boolean) {
    this.executeSentEmail(sender, receiver, message, isHtml);
  }

  executeSentEmail(
    sender: string,
    receiver: string,
    message: string,
    isHtml: boolean
  ) {
    console.log("email send by yahooemail");
  }
}

class App {
  //gmail: GMail
  //office365: Office365
  provider: IEmail;

  constructor() {
    //this.gmail = new GMail()
    //this.provider = new GMail()
    this.provider = new YahooMail();
  }

  sent() {
    const sender = "postmaster@email.com";
    const receiver = "user@email.com";
    const message = "Welcome";

    this.provider.sent(sender, receiver, message, true);
    //this.gmail.parameters(sender, receiver, message, true)
    //this.gmail.sentEmail()
    /*this.office365
            .addSender(sender)
            .addReceiver(receiver)
            .addMessage(message)
            .isHTML(false)
            .sentMessage()*/
  }
}

const app = new App();
app.sent();
