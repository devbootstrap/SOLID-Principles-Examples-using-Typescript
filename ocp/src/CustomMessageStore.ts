import MessageStore from "./MessageStore";
import StoreLoggerSplunk from "./StoreLoggerSplunk";

export default class CustomMessageStore extends MessageStore {
  get Logger() {
    return new StoreLoggerSplunk()
  }
}